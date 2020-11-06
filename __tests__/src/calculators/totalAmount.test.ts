import { TotalAmount as calculator } from '../../../src/calculators/TotalAmount';

describe('TotalAmount', () => {
  let instance: calculator;

  const invalidPayload = {
    error: "Base 'XRP' is not supported."
  }

  const validPayload = {
    rates: {
      USD: 1.1702,
    },
    base: 'EUR',
    date: '2020-11-03'
  }

  const args = {
    base_currency: 'EUR',
    quote_currency: 'USD',
    base_amount: 100
  };

  it('should return null when got 400 response from ratesApi', () => {
    instance = new calculator(invalidPayload, args);

    expect(instance.calculate()).toBe(null);
  });

  it('should calculate and return correct result', () => {
    instance = new calculator(validPayload, args);

    expect(instance.calculate()).toMatchObject(
      {
        exchange_rate: 1.1702,
        quote_amount: 117
      }
    );
  });
});
