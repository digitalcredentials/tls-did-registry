const TLSDID = artifacts.require('TLSDID');

module.exports = function (deployer) {
  deployer.deploy(TLSDID);
};
