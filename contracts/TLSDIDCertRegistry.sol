// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDIDCertRegistry {
    // Maps domain to aggregated certificate chain
    mapping(string => string[]) private registry;

    /// @notice Store mapping from domain to aggregated certificate chain
    /// @dev The addresses are stored in an array to make sure an existing mapping can not be overwriten.
    /// @param _domain The domain mapping to the certificates
    /// @param _chain The aggregated certificate chain to be stored
    function addChain(string calldata _domain, string calldata _chain)
        external
    {
        registry[_domain].push(_chain);
    }

    /// @notice Returns the number of aggregated certificate chains stored for the domain
    /// @param _domain The domain mapping to the certificates
    function getChainCount(string calldata _domain)
        external
        view
        returns (uint256)
    {
        return registry[_domain].length;
    }

    /// @notice Gets the aggregated certificates at index
    /// @param _domain The domain mapping to the certificates
    /// @param _index The index of the aggregated certificates
    function getChain(string calldata _domain, uint256 _index)
        external
        view
        returns (string memory)
    {
        string[] memory chains = registry[_domain];
        return chains[_index];
    }
}
