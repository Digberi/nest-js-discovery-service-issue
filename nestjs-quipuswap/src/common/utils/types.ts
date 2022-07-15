import { BigNumber } from 'bignumber.js';

export type AsyncFunction = (...args: any[]) => Promise<any>;

export type Nullable<Type> = null | Type;
export type Undefined<Type> = undefined | Type;
export type Optional<Type> = null | undefined | Type;

export interface Token {
  address: string;
  tokenId?: BigNumber;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type MetadataConfigurationCallback = Function;

export interface MetadataConfiguration<
  Func extends MetadataConfigurationCallback,
> {
  target: string;
  methodName: string;
  callback: Func;
}
