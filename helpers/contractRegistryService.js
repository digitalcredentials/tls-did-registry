const fs = require('fs');

exports.storeRegistryAddress = function storeRegistryAddress(address) {
  const contractRegistry = { registryAddress: address };

  const writeData = JSON.stringify(contractRegistry);
  fs.writeFileSync(`${__dirname}/contractRegistry.json`, writeData);
};
