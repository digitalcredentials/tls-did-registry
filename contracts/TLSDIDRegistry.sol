// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDIDRegistry {
    //TODO rename | evaluate if we solve this with events
    struct AddressContainer {
        address[] addresses;
        mapping(address => bool) contained;
    }

    mapping(string => AddressContainer) private registry;

    /// @notice Store mapping from DID to SC address
    /// @dev The addresses are stored in an array to make sure an existing mapping can not be overwriten.
    /// @param _id The TLS DID Method specific id for which a contract is stored
    /// @param _address The address of the SC
    function registerContract(string calldata _id, address _address) external {
        AddressContainer storage container = registry[_id];
        if (!container.contained[_address]) {
            container.addresses.push(_address);
            container.contained[_address] = true;
        }
    }

    /// @notice Returns the SC addresses stored for a DID
    /// @dev If no mapping is found returns empty array
    /// @param _id The TLS DID Method specific id for which the contract addresses are requested
    function getContracts(string calldata _id)
        external
        view
        returns (address[] memory)
    {
        return registry[_id].addresses;
    }
}
