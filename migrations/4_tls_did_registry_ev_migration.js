// const contractRegistryService = require('../helpers/contractRegistryService');
const TLSDIDEVRegistry = artifacts.require('TLSDIDEVRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDEVRegistry).then(() => {
    // contractRegistryService.storeRegistryAddress(
    //   'registryAddress',
    //   TLSDIDRegistry.address
    // );
  });
};
