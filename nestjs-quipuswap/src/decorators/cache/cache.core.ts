import { isDefined, isNotNull } from '@common';

import { CacheProps, isUpgradableProps } from './types';

export class Cache<Key extends string, Value> {
  public readonly updatable: boolean = false;

  private readonly map = new Map<Key, Value>();
  private readonly lifetime: number = null;

  constructor(props?: CacheProps) {
    if (isDefined(props)) {
      this.lifetime = props.lifetime ?? null;
      if (isUpgradableProps(props)) {
        this.updatable = Boolean(props.updatable);
      }
    }
  }

  set(key: Key, value: Value) {
    this.map.set(key, value);
    if (isNotNull(this.lifetime) && !this.updatable) {
      setTimeout(() => {
        this.clearValue(key, value);
      }, this.lifetime);
    }
  }

  get(key: Key) {
    return this.map.get(key);
  }

  runUpdate<T extends [any]>(
    key: Key,
    callback: (args: T) => Promise<any>,
    args: T,
  ) {
    if (!this.updatable) {
      return;
    }

    if (isNotNull(this.lifetime)) {
      setInterval(async () => {
        const result = await callback(...(args as [any]));

        this.set(key, result);
      }, this.lifetime);
    }
  }

  private clearValue(key: Key, value: Value) {
    if (value === this.map.get(key)) {
      this.map.delete(key);
    }
  }
}
