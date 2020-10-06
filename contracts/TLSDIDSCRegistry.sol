// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDIDSCRegistry {
    //TODO rename solve with events
    struct AddressContainer {
        address[] addresses;
        mapping(address => bool) contained;
    }

    // We map to an array because
    mapping(string => AddressContainer) private registry;

    /// @notice Store mapping from DID to SC address
    /// @dev The addresses are stored an array to make sure an existing mapping can not be overwriten.
    /// @param _did The DID that mapps to a smart contract
    /// @param _address The address of the smart contract
    function addTLSDIDContract(string calldata _did, address _address)
        external
    {
        AddressContainer storage container = registry[_did];
        if (!container.contained[_address]) {
            container.addresses.push(_address);
            container.contained[_address] = true;
        }
    }

    function getTSLDIDContracts(string calldata _did)
        external
        view
        returns (address[] memory)
    {
        return registry[_did].addresses;
    }
}
