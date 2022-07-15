import { isEmptyArray } from '@common';
import { Injectable, Logger } from '@nestjs/common';
import { TezosToolkit } from '@taquito/taquito';

import { InjectTezosToolkit } from './taquito.injector';
import { TaquitoSubscriberMetadataConfiguration } from './types';

@Injectable()
export class TaquitoSubscriber {
  constructor(@InjectTezosToolkit() private readonly tezos: TezosToolkit) {}

  subscribe(list: Array<TaquitoSubscriberMetadataConfiguration>) {
    if (isEmptyArray(list)) {
      return;
    }

    list.sort((a, b) => b.priority - a.priority);

    let blockHash: string = null;
    const spawnSub = () => {
      const sub = this.tezos.stream.subscribe('head');

      sub.on('data', async (hash) => {
        const blockHeaderRespone = await this.tezos.rpc.getBlockHeader({
          block: hash,
        });

        const { level, timestamp } = blockHeaderRespone;

        if (blockHash && blockHash !== hash) {
          for (const { callback } of list) {
            await callback({ level, hash, timestamp });
          }
        }

        blockHash = hash;
      });
      sub.on('error', (err: Error) => {
        Logger.error(err, TaquitoSubscriber.name);
        sub.close();
        spawnSub();
      });
    };

    spawnSub();
  }
}
