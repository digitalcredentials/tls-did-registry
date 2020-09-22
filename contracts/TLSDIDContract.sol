// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract TLSDIDContract {
    address private owner = msg.sender;
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

    function setSignature(string calldata _signature) external onlyOwner {
        signature = _signature;
    }

    function addAttribute(string calldata name, string calldata value)
        external
        onlyOwner
    {
        attributes.push(Attribute(name, value));
    }

    function getAttributes() external view returns (Attribute[] memory) {
        return attributes;
    }
}
