# Bitcoin Cash Point of Sale

BCH Point of Sale (pos.cash) is a non-custodial web-based point of sale client.
It requires no backend services to run other than simple web/http(s) hosting.

### Startup a Python web server

```
python3 -m http.server 9000 --bind 127.0.0.1
```

User configurations are stored client-side via localstorage.

The web application uses bitcoin.com, blockchain.info, and bitcoinverde.org for
payment alerts.
