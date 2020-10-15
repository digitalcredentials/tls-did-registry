// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

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
        string name;
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

    function addAttribute(string calldata _name, string calldata _value)
        external
        onlyOwner
    {
        attributes.push(Attribute(_name, _value));
    }

    function getAttributes() external view returns (Attribute[] memory) {
        return attributes;
    }
}
