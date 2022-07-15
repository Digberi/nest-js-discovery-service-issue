import { Inject } from '@nestjs/common';

export const TEZOS_TOOLKIT = Symbol('TEZOS_TOOLKIT');

export const InjectTezosToolkit = () => Inject(TEZOS_TOOLKIT);
