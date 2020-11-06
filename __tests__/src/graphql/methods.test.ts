import { retrieveAndCalculate, key } from '../../../src/graphql/Methods';

describe('Methods', () => {
  const date = new Date();
  const month = date.getMonth().toString();
  const day = date.getDay().toString();

  let args = {
    quote_currency: 'EUR',
    base_currency: 'USD',
    base_amount: 100
  }

  it('should generate key', () => {
    expect(key(args)).toBe(month.concat(day).concat('USDEUR100'));
  });

  it('should calculate and return final result', async () => {
    const response = await retrieveAndCalculate(args);

    expect(response).toMatchObject({
      exchange_rate: expect.any(Number),
      quote_amount: expect.any(Number)
    });
  });

  it('should return null when args are not valid', async () => {
    args.quote_currency = 'BTC';

    const response = await retrieveAndCalculate(args);

    expect(response).toBe(null);
  });

  it('should return null when no args were passed to method', async () => {
    const response = await retrieveAndCalculate();

    expect(response).toBe(null);
  });
});
