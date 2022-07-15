import { SetMetadata } from '@nestjs/common';

import { TEZOS_BLOCK_SUBSCRIPTION } from '../constants';
import {
  OnTezosBlockDecoratorConfig,
  TaquitoSubscriberMetadataConfiguration,
} from '../types';

const LOWEST_PRIORITY = 0;

export const OnTezosBlock = ({
  priority = LOWEST_PRIORITY,
}: OnTezosBlockDecoratorConfig = {}) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    SetMetadata<symbol, TaquitoSubscriberMetadataConfiguration>(
      TEZOS_BLOCK_SUBSCRIPTION,
      {
        priority,
        target: target.constructor.name,
        methodName: propertyKey,
        callback: descriptor.value,
      },
    )(target, propertyKey, descriptor);
  };
};
