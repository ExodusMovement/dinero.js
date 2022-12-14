import * as _BN from 'bn.js';

import type { Currency } from 'dinero.js';

// workaround for rollup/typescript not agreeing on BN default export types
// eslint-disable-next-line import/namespace
const { BN } = _BN;

export function castToBnjsCurrency(currency: Currency<number>): Currency<BN> {
  return {
    ...currency,
    base: Array.isArray(currency.base)
      ? currency.base.map((b) => new BN(b))
      : new BN(currency.base as number),
    exponent: new BN(currency.exponent),
  };
}
