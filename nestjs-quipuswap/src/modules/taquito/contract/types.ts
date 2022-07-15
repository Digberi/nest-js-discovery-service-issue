import { TezosToolkit } from '@taquito/taquito';

export type PromiseTaquitoContract = ReturnType<TezosToolkit['contract']['at']>;

export type TaquitoContract = Awaited<PromiseTaquitoContract>;
