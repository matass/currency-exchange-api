import { RatesApi } from '../../src/api/RatesApi';

import {
  TotalAmount as Calculator,
  T_Args, T_Payload, T_Result } from '../../src/calculators/TotalAmount';

function validateCurrencies(args: T_Args): boolean {
  const availableCurrencies = process.env.CURRENCIES.split(',');
  const currencies = [args.base_currency, args.quote_currency];

  return currencies.every(i => availableCurrencies.includes(i));
}

async function fetchData(base: string): Promise<T_Payload> {
  const api = new RatesApi();
  const response: any = await api.get('/latest?base='.concat(base));

  return JSON.parse(response.toString('utf-8'));
}

function key(args: T_Args): string {
  const date = new Date();
  const month = date.getMonth().toString();
  const day = date.getDay().toString();

  return month
    .concat(day)
    .concat(args.base_currency
      .concat(args.quote_currency)
      .concat(args.base_amount.toString())
    );
}

async function retrieveAndCalculate(args?: T_Args): Promise<T_Result> {
  if(!args) { return null; }

  const validCurrencies = validateCurrencies(args);

  console.log(validCurrencies)

  if(!validCurrencies) { return null; }

  const response = await fetchData(args.base_currency);
  const calculator = new Calculator(response, args);
  const result = calculator.calculate();

  return result;
}

export { retrieveAndCalculate, key }
