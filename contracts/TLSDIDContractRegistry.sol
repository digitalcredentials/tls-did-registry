// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDIDContractRegistry {
    mapping(string => address) public registry;

    function addTLSDIDContract(string calldata did, address _address) external {
        registry[did] = _address;
    }
}
