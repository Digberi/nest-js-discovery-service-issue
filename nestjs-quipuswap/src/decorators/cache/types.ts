export enum Keys {
  ASYNC = 'ASYNC_CACHE_KEY',
  SYNC = 'SYNC_CACHE_KEY',
}

export interface CachePropsLifetime {
  lifetime: number;
}

export interface CachePropsUpdatable {
  lifetime: number;
  updatable: boolean;
}

export type CacheProps = CachePropsLifetime | CachePropsUpdatable;

export const isUpgradableProps = (
  props: CacheProps,
): props is CachePropsUpdatable => 'updatable' in props;
