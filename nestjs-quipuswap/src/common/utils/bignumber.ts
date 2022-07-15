/* eslint-disable @typescript-eslint/no-magic-numbers */
import BigNumber from 'bignumber.js';

export const fromDecimals = (num: BigNumber, decimals: number) =>
  num.div(new BigNumber(10).pow(decimals));

export const toDecimals = (num: BigNumber, decimals: number) =>
  num.pow(new BigNumber(10).pow(decimals));

export const ZERO = new BigNumber(0);
