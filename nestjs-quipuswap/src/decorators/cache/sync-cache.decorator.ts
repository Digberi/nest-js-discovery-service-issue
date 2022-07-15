import { Cache } from './cache.core';
import { getCacheKey } from './helpers';
import { CacheProps, Keys } from './types';

export function SyncCache(props?: CacheProps) {
  const cache = new Cache(props);
  return function (
    target: any,
    propertyKey: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    descriptor: TypedPropertyDescriptor<Function>,
  ) {
    const originalFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cacheKey = `${Keys.SYNC}${getCacheKey(args)}`;
      if (!cache.get(cacheKey)) {
        const result = originalFunction.apply(this, args);

        cache.set(cacheKey, result);
      }

      return cache.get(cacheKey);
    };
  };
}
