const TLSDIDContractRegistry = artifacts.require('TLSDIDContractRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDContractRegistry);
};
