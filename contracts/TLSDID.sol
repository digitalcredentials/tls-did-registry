// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDID {
    address private owner = msg.sender;
    string public domain;
    uint64 public expiry;
    string public signature;

    Attribute[] public attributes;

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

    function setDomain(string calldata _domain) external onlyOwner {
        domain = _domain;
    }

    function setExpiry(uint64 _expiry) external onlyOwner {
        expiry = _expiry;
    }

    function setSignature(string calldata _signature) external onlyOwner {
        signature = _signature;
    }

    function addAttribute(string calldata _path, string calldata _value)
        external
        onlyOwner
    {
        attributes.push(Attribute(_path, _value));
    }

    function getAttributeCount() external view returns (uint256) {
        return attributes.length;
    }

    function getAttribute(uint256 index)
        external
        view
        returns (string memory, string memory)
    {
        string memory path = attributes[index].path;
        string memory value = attributes[index].value;
        return (path, value);
    }
}
