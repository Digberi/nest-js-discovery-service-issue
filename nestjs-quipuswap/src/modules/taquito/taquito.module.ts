import {
  Module,
  DynamicModule,
  Type,
  ForwardReference,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DiscoveryService,
  MetadataScanner,
  ModulesContainer,
} from '@nestjs/core';
import { TezosToolkit, SetProviderOptions } from '@taquito/taquito';

import { createContractProviders } from './contract';
import { TaquitoExplorer } from './taquito.explorer';
import { TEZOS_TOOLKIT } from './taquito.injector';
import { TaquitoService } from './taquito.service';
import { TaquitoSubscriber } from './taquito.subscriber';

interface TaquitoModuleFactory {
  useFactory: (configsService: ConfigService) => SetProviderOptions['rpc'];
  imports?: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
  contractKeys?: Array<string>;
}

@Module({})
export class TaquitoModule implements OnApplicationBootstrap {
  static forRoot({
    useFactory,
    imports,
    contractKeys,
  }: TaquitoModuleFactory): DynamicModule {
    const tezosToolkit = {
      provide: TEZOS_TOOLKIT,
      useFactory: (configsService: ConfigService) => {
        const tezosRpc = useFactory(configsService);

        return new TezosToolkit(tezosRpc);
      },
      imports: imports ? [...imports] : undefined,
      inject: [ConfigService],
    };

    const contracts = createContractProviders(contractKeys);

    return {
      global: true,
      module: TaquitoModule,
      providers: [
        ModulesContainer,
        DiscoveryService,
        MetadataScanner,
        TaquitoService,
        TaquitoSubscriber,
        TaquitoExplorer,
        tezosToolkit,
        ConfigService,
        ...contracts,
      ],
      exports: [
        MetadataScanner,
        TaquitoService,
        tezosToolkit,
        TaquitoSubscriber,
        TaquitoExplorer,
        ...contracts,
      ],
    };
  }

  constructor(
    private readonly taquitoExplorer: TaquitoExplorer,
    private readonly tezosSubscribe: TaquitoSubscriber,
  ) {}

  async onApplicationBootstrap() {
    const taquitoSubscribers = this.taquitoExplorer.explore();
    this.tezosSubscribe.subscribe(taquitoSubscribers);
  }
}
