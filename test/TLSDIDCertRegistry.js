const TLSDIDCertRegistry = artifacts.require('TLSDIDCertRegistry');

contract('TLSDIDCertRegistry', (accounts) => {
  let tlsdidCertRegistry = null;
  before(async () => {
    tlsdidCertRegistry = await TLSDIDCertRegistry.deployed();
  });

  it('should return 0 as cert count', async () => {
    let certCount = await tlsdidCertRegistry.getChainCount('example.org');

    assert.equal(certCount.toNumber(), 0, 'Response was not zero');
  });

  it('should add certificate', async () => {
    let ChainA = 'ChainA';
    await tlsdidCertRegistry.addChain('example.org', ChainA);

    let certCount = await tlsdidCertRegistry.getChainCount('example.org');
    assert.equal(certCount.toNumber(), 1, 'Cert count was not 1');

    let _ChainA = await tlsdidCertRegistry.getChain('example.org', 0);
    assert.equal(_ChainA, ChainA, 'Retriced cert was not equal to added cert');
  });

  it('should add additional certificate', async () => {
    let ChainA = 'ChainA';
    let ChainB = 'ChainB';
    await tlsdidCertRegistry.addChain('example.org', ChainB);

    let certCount = await tlsdidCertRegistry.getChainCount('example.org');
    assert.equal(certCount.toNumber(), 2, 'Cert count was not 2');

    let _ChainA = await tlsdidCertRegistry.getChain('example.org', 0);
    assert.equal(_ChainA, ChainA, 'Retriced cert was not equal to added cert');

    let _ChainB = await tlsdidCertRegistry.getChain('example.org', 1);
    assert.equal(_ChainB, ChainB, 'Retriced cert was not equal to added cert');
  });
});
