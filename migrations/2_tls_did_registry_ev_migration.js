const registryAddressStore = require('../helpers/RegistryAddressStore');
const TLSDIDRegistry = artifacts.require('TLSDIDRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDRegistry).then(() => {
    registryAddressStore.storeRegistryAddress('registryAddress', TLSDIDRegistry.address);
  });
};
