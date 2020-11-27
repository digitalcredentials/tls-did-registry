const contractRegistryService = require('../helpers/contractRegistryService');
const TLSDIDCertRegistry = artifacts.require('TLSDIDCertRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDCertRegistry).then(() => {
    contractRegistryService.storeRegistryAddress(
      'certRegistryAddress',
      TLSDIDCertRegistry.address
    );
  });
};
