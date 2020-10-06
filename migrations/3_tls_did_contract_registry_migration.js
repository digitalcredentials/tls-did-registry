const TLSDIDSCRegistry = artifacts.require('TLSDIDSCRegistry');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDSCRegistry);
};
