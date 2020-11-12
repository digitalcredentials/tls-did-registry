const TLSDIDContract = artifacts.require('TLSDID');

contract('TLSDIDContract', (accounts) => {
  let tlsdidContract = null;
  before(async () => {
    tlsdidContract = await TLSDIDContract.deployed();
  });

  it('should add expiry to contract', async () => {
    const expiryDate = Date.UTC(2024, 12, 31);
    txnReceipt = await tlsdidContract.setExpiry(expiryDate, {
      from: accounts[0],
    });
    const expiry = await tlsdidContract.expiry.call();
    assert.equal(expiry, expiryDate, 'Signature was not added to contract');
  });

  it('should add domain to contract', async () => {
    txnReceipt = await tlsdidContract.setDomain('domain', {
      from: accounts[0],
    });
    const domain = await tlsdidContract.domain.call();
    assert.equal(domain, 'domain', 'Domain was not added to contract');
  });

  it('should add signature to contract', async () => {
    txnReceipt = await tlsdidContract.setSignature('signature', {
      from: accounts[0],
    });
    signature = await tlsdidContract.signature.call();
    assert.equal(signature, 'signature', 'Signature was not added to contract');
  });

  it('should update signature in contract', async () => {
    await tlsdidContract.setSignature('signatureUpdate', { from: accounts[0] });
    signature = await tlsdidContract.signature.call();
    assert.equal(
      signature,
      'signatureUpdate',
      'Signature was not added to contract'
    );
  });

  it('should add attribute to contract', async () => {
    await tlsdidContract.addAttribute('parent/child', 'value');
    const attributeCount = await tlsdidContract.getAttributeCount();

    let attributes = [];
    for (i = 0; i < attributeCount; i++) {
      const attribute = await tlsdidContract.getAttribute(i);
      const path = attribute['0'];
      const value = attribute['1'];
      attributes.push({ path, value });
    }

    assert.equal(
      attributes[0].path,
      'parent/child',
      'Attribute path was not added to contract'
    );
    assert.equal(
      attributes[0].value,
      'value',
      'Attribute value was not added to contract'
    );
  });
});
