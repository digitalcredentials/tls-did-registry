const TLSDIDCertRegistry = artifacts.require('TLSDIDCertRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDCertRegistry);
};
