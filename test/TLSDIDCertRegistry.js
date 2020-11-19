const TLSDIDCertRegistry = artifacts.require('TLSDIDCertRegistry');

contract('TLSDIDCertRegistry', (accounts) => {
  let tlsdidCertRegistry = null;
  before(async () => {
    tlsdidCertRegistry = await TLSDIDCertRegistry.deployed();
  });

  it('should return 0 as cert count', async () => {
    let certCount = await tlsdidCertRegistry.getCertCount('example.org');

    assert.equal(certCount.toNumber(), 0, 'Response was not zero');
  });

  it('should add certificate', async () => {
    let certA = 'CertA';
    await tlsdidCertRegistry.addCert('example.org', certA);

    let certCount = await tlsdidCertRegistry.getCertCount('example.org');
    assert.equal(certCount.toNumber(), 1, 'Cert count was not 1');

    let _certA = await tlsdidCertRegistry.getCert('example.org', 0);
    assert.equal(_certA, certA, 'Retriced cert was not equal to added cert');
  });

  it('should add additional certificate', async () => {
    let certA = 'CertA';
    let certB = 'CertB';
    await tlsdidCertRegistry.addCert('example.org', certB);

    let certCount = await tlsdidCertRegistry.getCertCount('example.org');
    assert.equal(certCount.toNumber(), 2, 'Cert count was not 2');

    let _certA = await tlsdidCertRegistry.getCert('example.org', 0);
    assert.equal(_certA, certA, 'Retriced cert was not equal to added cert');

    let _certB = await tlsdidCertRegistry.getCert('example.org', 1);
    assert.equal(_certB, certB, 'Retriced cert was not equal to added cert');
  });
});
