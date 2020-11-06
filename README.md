# currency-exchange-api

All basic tools included and configured:

- TypeScript 4.0
- ESLint with some initial rules recommendation
- Jest for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- Prettier to enforce consistent code style
- YARN for common operations
– GraphQl query language

Implemented an LRU Cache algorithm.

## Getting Started

This project is intended to be used with the latest Active LTS release of Node.js.

Try it live: https://currency-exchange-api-v1.herokuapp.com/quote ([GraphQl request](#graphql-request))
### Clone repository

To clone the repository use the following commands:

```sh
git clone git@github.com:matass/currency-exchange-api.git
```

## Configuration

Default configuration file – `.env`

```env
API_URL=api.exchangeratesapi.io
PORT=4000
CAPACITY=2
CURRENCIES=USD,EUR,GBP,ILS
```

## Server

This project is dockerised. Edit `.env` file and run `docker-compose up --build`. It will run application in development mode.

Running app with Yarn:

```sh
yarn install
yarn build
yarn server 
```

Visit `http://0.0.0.0:4000/quote` to enter GraphiQL interface

## Available Scripts

- `server` - run server
- `clean` - remove coverage data, Jest cache and transpiled files,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

### GraphQl request

```grapqhl
{
  quote(
    quote_currency: "USD"
    base_currency: "EUR"
    base_amount: 1500
  ){
    exchange_rate
    quote_amount
  }
}
```

### cURL request
```sh
curl 'http://localhost:4000/quote?' \
  -X GET \
  -H 'Content-Type: application/json' \
  --data-binary '{"query":"{ quote ( quote_currency: \"USD\" base_currency: \"EUR\" base_amount: 1){exchange_rate quote_amount}}"}'
```

### Writing tests

Writing unit tests in TypeScript can sometimes be troublesome and confusing. Especially when mocking dependencies and using spies.

This is **optional**, but if you want to learn how to write JavaScript tests for TypeScript modules.

### Todo
- API Versioning

## License

Licensed under the MIT.
