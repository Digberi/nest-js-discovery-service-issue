import { MetadataConfiguration } from '@common';
import { MichelsonMapKey } from '@taquito/michelson-encoder';
import { MichelsonMap } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';

export interface BlockInfo {
  level: number;
  hash: string;
  timestamp: string;
}

export type address = string;
export type timestamp = string;
export type key_hash = string;
export type nat = BigNumber;
export type bytes = any; //VALIDATE!

export type BigMapKeyType = string | number | object;

export interface BigMap<Key extends BigMapKeyType, Value> {
  get(keyToEncode: Key, block?: number): Promise<Value | undefined>;
  getMultipleValues(
    keysToEncode: Array<Key>,
    block?: number,
    batchSize?: number,
  ): Promise<MichelsonMap<MichelsonMapKey, Value | undefined>>;
  toJSON(): string;
  toString(): string;
}

export type OnTezosBlockCallback = (blockInfo: BlockInfo) => Promise<void>;

export interface OnTezosBlockDecoratorConfig {
  priority?: number;
}

export interface TaquitoSubscriberMetadataConfiguration
  extends MetadataConfiguration<OnTezosBlockCallback>,
    Required<OnTezosBlockDecoratorConfig> {}
