import { Injectable } from '@nestjs/common';
import { TezosToolkit } from '@taquito/taquito';

import { InjectTezosToolkit } from './taquito.injector';

@Injectable()
export class TaquitoService {
  constructor(@InjectTezosToolkit() private readonly tezos: TezosToolkit) {}

  async getContract(address: string) {
    return await this.tezos.contract.at(address);
  }
}
