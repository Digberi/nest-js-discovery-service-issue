import { Inject } from '@nestjs/common';

import { getTaquitoContractKey } from './get-contract-key';

export const addressForContract: string[] = new Array<string>();

export function Contract(contractKey: string) {
  if (!addressForContract.includes(contractKey)) {
    addressForContract.push(contractKey);
  }
  return Inject(getTaquitoContractKey(contractKey));
}
