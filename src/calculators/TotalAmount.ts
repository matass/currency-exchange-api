export type T_Payload = {
  rates?: { [key: number]: string };
  base?: string;
  date?: string;
  error?: string;
}

export type T_Args = {
  quote_currency: string;
  base_currency: string;
  base_amount: number;
}

export type T_Result = {
  exchange_rate: number;
  quote_amount: number;
}

export class TotalAmount {
  private payload: T_Payload;
  private args: T_Args;

  constructor(payload: T_Payload, args: T_Args) {
    this.payload = payload;
    this.args = args;
  }

  calculate(): T_Result {
    if (this.payload.error) {
      return null;
    }

    const exchange_rate: number = this.payload.rates[this.args.quote_currency];
    const quote_amount: number = Math.round(
      exchange_rate * this.args.base_amount
    );

    return { exchange_rate, quote_amount };
  }
}
