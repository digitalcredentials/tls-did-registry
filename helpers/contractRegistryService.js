const fs = require('fs');

exports.storeRegistryAddress = function storeRegistryAddress(address) {
  const readData = fs.readFileSync(
    `${__dirname}/contractRegistry.json`,
    'utf8'
  );
  console.log('readData', readData);

  let contractRegistry = JSON.parse(readData);

  contractRegistry.registryAddress = address;

  const writeData = JSON.stringify(contractRegistry);
  console.log('writeA', writeData);
  fs.writeFileSync(`${__dirname}/contractRegistry.json`, writeData);
};
