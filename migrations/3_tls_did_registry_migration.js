const TLSDIDRegistry = artifacts.require('TLSDIDRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDRegistry);
};
