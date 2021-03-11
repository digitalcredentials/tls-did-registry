// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

import "./TLSDIDRegistry.sol";

contract TLSDID {
    address payable private owner = msg.sender;
    string public domain;
    uint64 public expiry;
    string public signature;

    Attribute[] public attributes;

    string[] public chains;

    constructor() public {
        owner = msg.sender;
    }

    struct Attribute {
        string path;
        string value;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /// @notice Sets TLS DID domain
    /// @param _domain The TLS DID domain
    function setDomain(string calldata _domain) external onlyOwner {
        domain = _domain;
    }

    /// @notice Sets TLS DID Contract expiry
    /// @param _expiry The TLS DID Contract expiry
    function setExpiry(uint64 _expiry) external onlyOwner {
        expiry = _expiry;
    }

    /// @notice Sets TLS DID Contract signature
    /// @param _signature The TLS DID Contract signature
    function setSignature(string calldata _signature) external onlyOwner {
        signature = _signature;
    }

    /// @notice Adds attribute to DID Document
    /// @param _path The path to the attribute. Exp. parent/child or parent[]/child
    /// @param _value The value of the attribute
    function addAttribute(string calldata _path, string calldata _value)
        external
        onlyOwner
    {
        attributes.push(Attribute(_path, _value));
    }

    /// @notice Gets the count of attributes
    function getAttributeCount() external view returns (uint256) {
        return attributes.length;
    }

    /// @notice Gets attribute at index
    /// @param _index The index of the attribute
    function getAttribute(uint256 _index)
        external
        view
        returns (string memory, string memory)
    {
        string memory path = attributes[_index].path;
        string memory value = attributes[_index].value;
        return (path, value);
    }

    /// @notice Store certificate chain
    /// @dev The chains are stored in an array to allow access to old chains.
    /// @param _chain The certificate chain to be stored
    function addChain(string calldata _chain) external onlyOwner {
        chains.push(_chain);
    }

    /// @notice Returns the number of certificate chains stored
    function getChainCount() external view returns (uint256) {
        return chains.length;
    }

    /// @notice Gets the certificate chain at index
    /// @param _index The index of the certificate chain
    function getChain(uint256 _index) external view returns (string memory) {
        return chains[_index];
    }

    /// @notice Removes the reference to this contract from registry
    /// and deletes contract
    /// @param _RegistryAddress The address of the registry
    function remove(address _RegistryAddress) external onlyOwner {
        TLSDIDRegistry registry = TLSDIDRegistry(_RegistryAddress);
        registry.removeContract(domain);
        selfdestruct(owner);
    }
}
