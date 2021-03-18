const TLSDIDRegistry = artifacts.require('TLSDIDRegistry');
const truffleAssert = require('truffle-assertions');

const domain = 'tls-did.de';
let changedBlockBN;

contract('TLSDIDRegistry', (accounts) => {
  let tlsdidRegistry = null;
  before(async () => {
    tlsdidRegistry = await TLSDIDRegistry.deployed();
  });

  it('Should return 0 for number of claimants of domain', async () => {
    const numberClaimants = await tlsdidRegistry.getClaimantsCount(domain);

    assert.deepEqual(numberClaimants.toNumber(), 0, 'Claimants was not 0');
  });

  it('Should return 1 for number of claimants of domain', async () => {
    await tlsdidRegistry.registerOwnership(domain, {
      from: accounts[0],
    });

    const numberClaimants = await tlsdidRegistry.getClaimantsCount(domain);
    const claimant = await tlsdidRegistry.claimantsRegistry(domain, 0);

    assert.deepEqual(numberClaimants.toNumber(), 1, 'Claimants was not 1');
    assert.deepEqual(claimant, accounts[0], 'Claimants was not equal to account calling contract');
  });

  it('Should return 0 for last block containing event', async () => {
    changedBlockBN = await tlsdidRegistry.changeRegistry.call(accounts[0], domain);

    assert.deepEqual(changedBlockBN.toNumber(), 0, 'Changed block was not 0');
  });

  it('Should emit ExpiryChangedEvent and return > 0 for last block containing event', async () => {
    const expiryDate = Date.UTC(2024, 12, 31);
    const tx = await tlsdidRegistry.setExpiry(domain, expiryDate, {
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

    changedBlockBN = await tlsdidRegistry.changeRegistry.call(accounts[0], domain, {
      from: accounts[0],
    });
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });

  it('should add signature in contract', async () => {
    const signature = 'signature';
    const tx = await tlsdidRegistry.setSignature(domain, signature, { from: accounts[0] });

    truffleAssert.eventEmitted(tx, 'SignatureChanged', (ev) => {
      return (
        ev.owner === accounts[0],
        ev.domain === domain,
        ev.signature === signature,
        ev.previousChange.toNumber() == changedBlockBN
      );
    });

    changedBlockBN = await tlsdidRegistry.changeRegistry.call(accounts[0], domain);
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });

  it('should add attribute to contract', async () => {
    const path = 'parent/child';
    const value = 'value';
    const tx = await tlsdidRegistry.addAttribute(domain, path, value, { from: accounts[0] });

    truffleAssert.eventEmitted(tx, 'AttributeChanged', (ev) => {
      return (
        ev.owner === accounts[0],
        ev.domain === domain,
        ev.path === path,
        ev.value === value,
        ev.previousChange.toNumber() == changedBlockBN
      );
    });

    changedBlockBN = await tlsdidRegistry.changeRegistry.call(accounts[0], domain);
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });

  it('should add certificate', async () => {
    const chain = 'chain';
    const tx = await tlsdidRegistry.addChain(domain, chain, { from: accounts[0] });

    truffleAssert.eventEmitted(tx, 'ChainChanged', (ev) => {
      return (
        ev.owner === accounts[0],
        ev.domain === chain,
        ev.chain === 1738281600000,
        ev.previousChange.toNumber() == changedBlockBN
      );
    });

    changedBlockBN = await tlsdidRegistry.changeRegistry.call(accounts[0], domain);
    assert.deepEqual(changedBlockBN.toNumber() > 0, true, 'Changed block was not bigger than 0');
  });

  it('Delete: should set last change block index to 0', async () => {
    const tx = await tlsdidRegistry.remove(domain, { from: accounts[0] });

    changedBlockBN = await tlsdidRegistry.changeRegistry.call(accounts[0], domain);
    assert.deepEqual(changedBlockBN.toNumber() == 0, true, 'Changed block was not equal to 0');
  });

  console.log(accounts[0]);
});
