import { buildSchema, GraphQLSchema } from 'graphql';

export class Schema {
  quote(): GraphQLSchema {
    return buildSchema(`
      type Result {
        exchange_rate: Float
        quote_amount: Int
      }

      type Query {
        quote(
          quote_currency: String!
          base_currency: String!
          base_amount: Int!
        ): Result
      }
    `);
  }
}
