// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDIDRegistry {
    /// contained is slightly hacky. We store the existance of an SC address
    /// and the index of the SC address in AddressContainer.contained[SC address]
    /// if it equals 0 no address is stored, if > an address is stored
    /// and its index is i - 1
    struct AddressContainer {
        address[] addresses;
        mapping(address => uint256) contained;
    }

    mapping(string => AddressContainer) private registry;

    /// @notice Store mapping from DID to SC address
    /// @dev The addresses are stored in an array to make sure an existing mapping can not be overwriten.
    /// @param _id The TLS DID Method specific id for which a contract is stored
    /// @param _address The address of the SC
    function registerContract(string calldata _id, address _address) external {
        AddressContainer storage container = registry[_id];
        if (container.contained[_address] == 0) {
            container.addresses.push(_address);
            container.contained[_address] = container.addresses.length;
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

    /// @notice Removes the SC addresses stored for a DID
    /// @dev This is hacky. We store the existance of an SC address
    /// and the index of the SC address in container.contained[SC address]
    /// if it equals 0 no address is stored, if > an address is stored
    /// and its index is i - 1
    /// @param _id The TLS DID Method specific id
    function removeContract(string calldata _id) external {
        AddressContainer storage container = registry[_id];
        if (container.contained[msg.sender] > 0) {
            delete container.addresses[container.contained[msg.sender] - 1];
            container.contained[msg.sender] = 0;
        }
    }
}
