```base
curl 'http://localhost:4000/quote?' \
  -H 'Content-Type: application/json' \
  --data-binary '{"query":"query {result(quote_currency: \"USD\"base_currency: \"EUR\"base_amount: 1000){exchange_rate quote_amount}}"}'
```
