const contractRegistryService = require('../helpers/contractRegistryService');
const TLSDIDRegistry = artifacts.require('TLSDIDRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDRegistry).then(() => {
    contractRegistryService.storeRegistryAddress(
      'registryAddress',
      TLSDIDRegistry.address
    );
  });
};
