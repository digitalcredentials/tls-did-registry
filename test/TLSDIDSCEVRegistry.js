const TLSDIDEVRegistry = artifacts.require('TLSDIDEVRegistry');
const truffleAssert = require('truffle-assertions');

const domain = 'tls-did.de';
let changedBlockBN;

contract('TLSDIDContract', (accounts) => {
  let tlsDidEVRegistry = null;
  before(async () => {
    tlsdidContractRegistry = await TLSDIDEVRegistry.deployed();
  });

  it('Should return 0 for last block containing event', async () => {
    changedBlockBN = await tlsdidContractRegistry.owned.call(accounts[0], domain);

    assert.deepEqual(changedBlockBN.toNumber(), 0, 'Changed block was not 0');
  });

  it('Should emit ExpiryChangedEvent and return > 0 for last block containing event', async () => {
    const expiryDate = Date.UTC(2024, 12, 31);
    const tx = await tlsdidContractRegistry.setExpiry(domain, expiryDate, {
      from: accounts[0],
    });

    truffleAssert.eventEmitted(tx, 'ExpiryChanged', (ev) => {
      return (
        ev.owner === accounts[0],
        ev.domain === domain,
        ev.expiry.toNumber() === 1738281600000,
        ev.previousChange.toNumber() == changedBlockBN
      );
    });

    changedBlockBN = await tlsdidContractRegistry.owned.call(accounts[0], domain, {
      from: accounts[0],
    });
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });

  it('should add signature in contract', async () => {
    const signature = 'signature';
    const tx = await tlsdidContractRegistry.setSignature(domain, signature, { from: accounts[0] });

    truffleAssert.eventEmitted(tx, 'SignatureChanged', (ev) => {
      return (
        ev.owner === accounts[0],
        ev.domain === domain,
        ev.signature === signature,
        ev.previousChange.toNumber() == changedBlockBN
      );
    });

    changedBlockBN = await tlsdidContractRegistry.owned.call(accounts[0], domain);
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });

  it('should add attribute to contract', async () => {
    const path = 'parent/child';
    const value = 'value';
    const tx = await tlsdidContractRegistry.addAttribute(domain, path, value, { from: accounts[0] });

    truffleAssert.eventEmitted(tx, 'AttributeChanged', (ev) => {
      return (
        ev.owner === accounts[0],
        ev.domain === domain,
        ev.path === path,
        ev.value === value,
        ev.previousChange.toNumber() == changedBlockBN
      );
    });

    changedBlockBN = await tlsdidContractRegistry.owned.call(accounts[0], domain);
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });

  it('should add certificate', async () => {
    const chain = 'chain';
    const tx = await tlsdidContractRegistry.addChain(domain, chain, { from: accounts[0] });

    truffleAssert.eventEmitted(tx, 'ChainChanged', (ev) => {
      return (
        ev.owner === accounts[0],
        ev.domain === chain,
        ev.chain === 1738281600000,
        ev.previousChange.toNumber() == changedBlockBN
      );
    });

    changedBlockBN = await tlsdidContractRegistry.owned.call(accounts[0], domain);
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });
});
