const TLSDIDContract = artifacts.require('TLSDID');
const TLSDIDContractRegistry = artifacts.require('TLSDIDRegistry');

contract('TLSDIDContract', (accounts) => {
  let tlsdidContract = null;
  let tlsdidContractRegistry = null;
  before(async () => {
    tlsdidContract = await TLSDIDContract.deployed();
    tlsdidContractRegistry = await TLSDIDContractRegistry.deployed();
  });

  it('Should return empty response', async () => {
    _addresses = await tlsdidContractRegistry.getContracts(
      'did:tls:example.org'
    );

    assert.deepEqual(_addresses, [], 'Response was not empty');
  });

  it('Should add contract address to registry', async () => {
    address = await tlsdidContract.address;
    tlsdidContractRegistry.registerContract('did:tls:example.org', address);
    _addresses = await tlsdidContractRegistry.getContracts(
      'did:tls:example.org'
    );

    assert.deepEqual(
      _addresses,
      [address],
      'Address was not correctly added to contract'
    );
  });

  it('Should not add identicall did => address mappings', async () => {
    address = await tlsdidContract.address;
    tlsdidContractRegistry.registerContract('did:tls:example.org', address);
    _addresses = await tlsdidContractRegistry.getContracts(
      'did:tls:example.org'
    );

    assert.deepEqual(
      _addresses,
      [address],
      'Identical did => address mapping was added'
    );
  });

  it('Should add non identicall did => address mappings', async () => {
    address = await tlsdidContract.address;
    tlsdidContractRegistry.registerContract(
      'did:tls:example.org',
      '0xdc2c16ccc8291c43b83d24e37900a3bed3eed408'
    );
    _addresses = await tlsdidContractRegistry.getContracts(
      'did:tls:example.org'
    );

    //TODO strange behaviour on assetion of array and string
    assert.deepEqual(
      _addresses,
      [address, '0xdC2c16ccC8291c43B83D24E37900A3bed3EEd408'],
      'Identical did => address mapping was added'
    );
  });

  it('Should delete did => address mappings', async () => {
    address = await tlsdidContract.address;
    await tlsdidContract.setDomain('did:tls:example.org');
    await tlsdidContract.remove(tlsdidContractRegistry.address);

    _addresses = await tlsdidContractRegistry.getContracts(
      'did:tls:example.org'
    );
    console.log(_addresses);

    //TODO strange behaviour on assetion of array and string
    assert.deepEqual(
      _addresses,
      [
        '0x0000000000000000000000000000000000000000',
        '0xdC2c16ccC8291c43B83D24E37900A3bed3EEd408',
      ],
      'TLS DID Contract address was not correctly deleted'
    );
  });

  it('Should add did => address mapping after deletion', async () => {
    tlsdidContractRegistry.registerContract(
      'did:tls:example.org',
      '0xdc2c16Ccc8291C43B83d24e37900A3bED3eED555'
    );
    _addresses = await tlsdidContractRegistry.getContracts(
      'did:tls:example.org'
    );

    console.log(_addresses);

    //TODO strange behaviour on assetion of array and string
    assert.deepEqual(
      _addresses,
      [
        '0x0000000000000000000000000000000000000000',
        '0xdC2c16ccC8291c43B83D24E37900A3bed3EEd408',
        '0xdc2c16Ccc8291C43B83d24e37900A3bED3eED555',
      ],
      'Identical did => address mapping was added'
    );
  });
});
