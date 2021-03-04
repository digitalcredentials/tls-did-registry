# tls-did-registry

This repository contains the TLSDIDContract; a ethereum smart contract thats stores a TLS-DID's data and the TLSDIDRegistry; a smart contract that stores mappings between a TLS-DID and a TLSDIDContract.
# Development

## Installation

```
npm i
```

## Test

```
npm run test
```

## Deploy to Görli Testnet

```
MNEMONIC="your seed phrase" INFURA_API_KEY="api key" npx truffle migrate -f 3 --to 3 --network goerli
```

# Documentation

The documentation for the TLS-DID Method and it's libraries can be found in the [tls-did repository](https://github.com/digitalcredentials/tls-did/blob/master/README.md).