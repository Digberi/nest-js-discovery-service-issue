/* eslint-disable @typescript-eslint/no-magic-numbers */
import BigNumber from 'bignumber.js';

import { isDefined, isNotNull } from './checks';
import { Nullable } from './types';

export const isEmptyArray = (array: Array<any>) => array.length === 0;
export const makeCleanArray = (array: Array<any>) =>
  array.filter((item) => isDefined(item));

export const getFirstElement = <Type>(array: Array<Type>): Type => array[0];

export const getLastElement = <Type>(
  array: Nullable<Array<Type>>,
): Nullable<Type> => (isNotNull(array) ? array[array.length - 1] : null);

export const fillIndexArray = (value: number): Array<BigNumber> => {
  const indexArray = [];
  for (let i = 0; i < value; i++) {
    indexArray[i] = new BigNumber(i);
  }
  return indexArray;
};
