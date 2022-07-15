import { AsyncFunction } from '@common';

import { Cache } from './cache.core';
import { getCacheKey } from './helpers';
import { CacheProps, Keys } from './types';

export function AsyncCache(props?: CacheProps) {
  const cache = new Cache(props);
  return function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<AsyncFunction>,
  ) {
    const originalFunction = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${Keys.ASYNC}${getCacheKey(args)}`;
      if (!cache.get(cacheKey)) {
        const result = await originalFunction.apply(this, args);

        cache.set(cacheKey, result);

        if (cache.updatable) {
          cache.runUpdate(cacheKey, originalFunction.bind(this), args as [any]);
        }
      }

      return cache.get(cacheKey);
    };
  };
}
