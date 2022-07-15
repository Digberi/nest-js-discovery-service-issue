/* eslint-disable @typescript-eslint/no-magic-numbers */
import { sleep } from '@common';
import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TaquitoModule } from '../taquito.module';
import { TaquitoService } from '../taquito.service';
import { addressForContract } from './contract.decorator';
import { getTaquitoContractKey } from './get-contract-key';
import { PromiseTaquitoContract } from './types';

async function contractFactory(
  taquitoService: TaquitoService,
  configSerive: ConfigService,
  contractKey: string,
  tryCount = 0,
): PromiseTaquitoContract {
  const contractFactoryLogger = new Logger(
    `${TaquitoModule.name} ${contractFactory.name}`,
    { timestamp: true },
  );
  const contractAddress = configSerive.get(contractKey);

  if (!contractAddress) {
    throw new Error(
      `Can not get contract address from config by ${contractKey}`,
    );
  }

  try {
    if (tryCount) {
      await sleep(3000);
    }

    tryCount = tryCount + 1;
    const contract = await taquitoService.getContract(contractAddress);

    contractFactoryLogger.log(`Contract "${contractAddress}" was loaded`);

    return contract;
  } catch (error) {
    contractFactoryLogger.error(
      `Loading contract "${contractAddress}" was failed: ${error.message}`,
    );

    if (tryCount === 5) {
      throw Error(`Loading contract ${contractAddress} failed`);
    }

    return await contractFactory(
      taquitoService,
      configSerive,
      contractKey,
      tryCount,
    );
  }
}

function createContractProvider(
  contractKey: string,
): Provider<PromiseTaquitoContract> {
  return {
    provide: getTaquitoContractKey(contractKey),
    useFactory: async (taquito, config) =>
      await contractFactory(taquito, config, contractKey),
    inject: [TaquitoService, ConfigService],
  };
}

export function createContractProviders(
  address?: Array<string>,
): Array<Provider<PromiseTaquitoContract>> {
  return (address ?? addressForContract).map((contractKey: string) =>
    createContractProvider(contractKey),
  );
}
