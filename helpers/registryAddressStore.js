const fs = require('fs');

exports.storeRegistryAddress = function storeAddress(key, address) {
  let contractRegistry = {};

  try {
    const readData = fs.readFileSync(`${__dirname}/contractRegistry.json`);
    contractRegistry = JSON.parse(readData);
  } catch (err) {
    console.log('[tls-did-registry] no contract registry, writing new. \n');
  }

  contractRegistry[key] = address;

  const writeData = JSON.stringify(contractRegistry);
  fs.writeFileSync(`${__dirname}/contractRegistry.json`, writeData);
};
