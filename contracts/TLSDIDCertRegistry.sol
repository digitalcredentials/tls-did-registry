// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDIDCertRegistry {
    // Maps domain to stored certs
    mapping(string => string[]) private registry;

    /// @notice Store mapping from DID to SC address
    /// @dev The addresses are stored in an array to make sure an existing mapping can not be overwriten.
    /// @param _domain The domain for which a certificate is stored
    /// @param _cert The certificate to be stored
    function addCert(string calldata _domain, string calldata _cert) external {
        registry[_domain].push(_cert);
    }

    /// @notice Returns the number of certificates stored for the domain
    /// @param _domain The domain mapping to the certificates
    function getCertCount(string calldata _domain)
        external
        view
        returns (uint256)
    {
        return registry[_domain].length;
    }

    /// @notice Gets certificate at index
    /// @param _domain The domain mapping to the certificates
    /// @param _index The index of the certificate
    function getCert(string calldata _domain, uint256 _index)
        external
        view
        returns (string memory)
    {
        string[] memory certs = registry[_domain];
        return certs[_index];
    }
}
