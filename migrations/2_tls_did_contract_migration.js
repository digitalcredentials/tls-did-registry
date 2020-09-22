const TLSDIDContract = artifacts.require('TLSDIDContract');

module.exports = function (deployer) {
  deployer.deploy(TLSDIDContract);
};
