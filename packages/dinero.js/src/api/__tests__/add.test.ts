import { EUR, USD, MGA, MRU } from '@dinero.js/currencies';
import Big from 'big.js';
import * as _BN from 'bn.js';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  castToBnjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
  createBnjsDinero,
} from 'test-utils';

import { add, toSnapshot } from '..';

// workaround for rollup/typescript not agreeing on BN default export types
// eslint-disable-next-line import/namespace
const { BN } = _BN;

describe('add', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    describe('decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 100, currency: USD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 600,
          currency: USD,
          scale: 2,
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: -500, currency: USD });
        const d2 = dinero({ amount: -100, currency: USD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: -600,
          currency: USD,
          scale: 2,
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 6000,
          currency: USD,
          scale: 3,
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 100, currency: EUR });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: 8, currency: MGA });
        const d2 = dinero({ amount: 3, currency: MGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 11,
          currency: MGA,
          scale: 1,
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: -8, currency: MGA });
        const d2 = dinero({ amount: -3, currency: MGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: -11,
          currency: MGA,
          scale: 1,
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 8, currency: MGA });
        const d2 = dinero({ amount: 10, currency: MGA, scale: 2 });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 50,
          currency: MGA,
          scale: 2,
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 8, currency: MRU });
        const d2 = dinero({ amount: 8, currency: MGA });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintMGA = castToBigintCurrency(MGA);
    const bigintMRU = castToBigintCurrency(MRU);

    describe('decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 100n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 600n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it('adds up positive Dinero objects with large integers', () => {
        const d1 = dinero({
          amount: 1000000000000000050n,
          currency: bigintUSD,
        });
        const d2 = dinero({ amount: 10n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 1000000000000000060n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: -500n, currency: bigintUSD });
        const d2 = dinero({ amount: -100n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: -600n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it('adds up negative Dinero objects with large integers', () => {
        const d1 = dinero({
          amount: -1000000000000000050n,
          currency: bigintUSD,
        });
        const d2 = dinero({ amount: -10n, currency: bigintUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: -1000000000000000060n,
          currency: bigintUSD,
          scale: 2n,
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 6000n,
          currency: bigintUSD,
          scale: 3n,
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 100n, currency: bigintEUR });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: 8n, currency: bigintMGA });
        const d2 = dinero({ amount: 3n, currency: bigintMGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 11n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: -8n, currency: bigintMGA });
        const d2 = dinero({ amount: -3n, currency: bigintMGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: -11n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 8n, currency: bigintMGA });
        const d2 = dinero({ amount: 10n, currency: bigintMGA, scale: 2n });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: 50n,
          currency: bigintMGA,
          scale: 2n,
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 8n, currency: bigintMRU });
        const d2 = dinero({ amount: 8n, currency: bigintMGA });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsMGA = castToBigjsCurrency(MGA);
    const bigjsMRU = castToBigjsCurrency(MRU);

    describe('decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(100), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big(600),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it('adds up positive Dinero objects with large integers', () => {
        const d1 = dinero({
          amount: new Big('1000000000000000050'),
          currency: bigjsUSD,
        });
        const d2 = dinero({ amount: new Big(10), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big('1000000000000000060'),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: new Big(-500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(-100), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big(-600),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it('adds up negative Dinero objects with large integers', () => {
        const d1 = dinero({
          amount: new Big('-1000000000000000050'),
          currency: bigjsUSD,
        });
        const d2 = dinero({ amount: new Big(-10), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big('-1000000000000000060'),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({
          amount: new Big(1000),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big(6000),
          currency: bigjsUSD,
          scale: new Big(3),
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(100), currency: bigjsEUR });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: new Big(8), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(3), currency: bigjsMGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big(11),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: new Big(-8), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(-3), currency: bigjsMGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big(-11),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: new Big(8), currency: bigjsMGA });
        const d2 = dinero({
          amount: new Big(10),
          currency: bigjsMGA,
          scale: new Big(2),
        });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new Big(50),
          currency: bigjsMGA,
          scale: new Big(2),
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: new Big(8), currency: bigjsMRU });
        const d2 = dinero({ amount: new Big(8), currency: bigjsMGA });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
  });

  describe('bn.js', () => {
    const dinero = createBnjsDinero;
    const bigjsUSD = castToBnjsCurrency(USD);
    const bigjsEUR = castToBnjsCurrency(EUR);
    const bigjsMGA = castToBnjsCurrency(MGA);
    const bigjsMRU = castToBnjsCurrency(MRU);

    describe('decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: new BN(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new BN(100), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN(600),
          currency: bigjsUSD,
          scale: new BN(2),
        });
      });
      it('adds up positive Dinero objects with large integers', () => {
        const d1 = dinero({
          amount: new BN('1000000000000000050'),
          currency: bigjsUSD,
        });
        const d2 = dinero({ amount: new BN(10), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN('1000000000000000060'),
          currency: bigjsUSD,
          scale: new BN(2),
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: new BN(-500), currency: bigjsUSD });
        const d2 = dinero({ amount: new BN(-100), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN(-600),
          currency: bigjsUSD,
          scale: new BN(2),
        });
      });
      it('adds up negative Dinero objects with large integers', () => {
        const d1 = dinero({
          amount: new BN('-1000000000000000050'),
          currency: bigjsUSD,
        });
        const d2 = dinero({ amount: new BN(-10), currency: bigjsUSD });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN('-1000000000000000060'),
          currency: bigjsUSD,
          scale: new BN(2),
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: new BN(500), currency: bigjsUSD });
        const d2 = dinero({
          amount: new BN(1000),
          currency: bigjsUSD,
          scale: new BN(3),
        });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN(6000),
          currency: bigjsUSD,
          scale: new BN(3),
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: new BN(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new BN(100), currency: bigjsEUR });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('adds up positive Dinero objects', () => {
        const d1 = dinero({ amount: new BN(8), currency: bigjsMGA });
        const d2 = dinero({ amount: new BN(3), currency: bigjsMGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN(11),
          currency: bigjsMGA,
          scale: new BN(1),
        });
      });
      it('adds up negative Dinero objects', () => {
        const d1 = dinero({ amount: new BN(-8), currency: bigjsMGA });
        const d2 = dinero({ amount: new BN(-3), currency: bigjsMGA });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN(-11),
          currency: bigjsMGA,
          scale: new BN(1),
        });
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: new BN(8), currency: bigjsMGA });
        const d2 = dinero({
          amount: new BN(10),
          currency: bigjsMGA,
          scale: new BN(2),
        });

        const snapshot = toSnapshot(add(d1, d2));

        expect(snapshot).toEqual({
          amount: new BN(50),
          currency: bigjsMGA,
          scale: new BN(2),
        });
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: new BN(8), currency: bigjsMRU });
        const d2 = dinero({ amount: new BN(8), currency: bigjsMGA });

        expect(() => {
          add(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
  });
});
