import express from 'express';

import { graphqlHTTP } from 'express-graphql';
import { Schema } from '../src/graphql/Schema';
import { retrieveAndCalculate, key } from '../src/graphql/Methods';
import { LRU } from '../src/cache/LRU';
import { T_Args, T_Result } from '../src/calculators/TotalAmount';

type Methods_T = {
  quote: (args: T_Args) => Promise<T_Result>;
}

export class Server extends LRU {
  constructor() {
    super(
      {
        capacity: process.env.CAPACITY,
      }
    );
  }

  root(): Methods_T {
    return {
      quote: async (args: T_Args) => {
        const cached = this.get(key(args));

        if (!cached) {
          const result = await retrieveAndCalculate(args);

          this.put(key(args), result);

          return result;
        }

        return cached;
      },
    };
  }

  async run(): Promise<void> {
    const app = express();
    const schema = new Schema;

    app.use('/quote',
      graphqlHTTP({
        schema: schema.quote(),
        rootValue: this.root(),
        graphiql: true,
        customFormatErrorFn: error => {
          return ({
            message: error.message,
          });
        }
      })
    ).listen(process.env.PORT);
  }
}

const server = new Server();
server.run();
