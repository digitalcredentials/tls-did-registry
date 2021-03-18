// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.8.0;

contract TLSDIDRegistry {
    mapping(address => mapping(string => uint256)) public changeRegistry;

    mapping(string => address[]) public claimantsRegistry;

    event ExpiryChanged(address indexed owner, string domain, uint64 expiry, uint256 previousChange);

    event SignatureChanged(address indexed owner, string domain, string signature, uint256 previousChange);

    event AttributeChanged(address indexed owner, string domain, string path, string value, uint256 previousChange);

    event ChainChanged(address indexed owner, string domain, string chain, uint256 previousChange);

    /// @notice Sets claim of ownership over TLS-DID indentifier
    /// @param _domain The indentifier of the TLS-DID
    function registerOwnership(string calldata _domain) external {
        claimantsRegistry[_domain].push(msg.sender);
    }

    function getClaimantsCount(string calldata _domain) external view returns (uint256 entityCount) {
        return claimantsRegistry[_domain].length;
    }

    /// @notice Sets TLS DID Contract expiry
    /// @param _domain The indentifier of the TLS-DID
    /// @param _expiry The TLS DID Contract expiry
    function setExpiry(string calldata _domain, uint64 _expiry) external {
        emit ExpiryChanged(msg.sender, _domain, _expiry, changeRegistry[msg.sender][_domain]);
        changeRegistry[msg.sender][_domain] = block.number;
    }

    /// @notice Sets TLS DID Contract signature
    /// @param _domain The indentifier of the TLS-DID
    /// @param _signature The TLS DID Contract signature
    function setSignature(string calldata _domain, string calldata _signature) external {
        emit SignatureChanged(msg.sender, _domain, _signature, changeRegistry[msg.sender][_domain]);
        changeRegistry[msg.sender][_domain] = block.number;
    }

    /// @notice Adds attribute
    /// @param _domain The indentifier of the TLS-DID
    /// @param _path The path to the attribute. Exp. parent/child or parent[]/child
    /// @param _value The value of the attribute
    function addAttribute(
        string calldata _domain,
        string calldata _path,
        string calldata _value
    ) external {
        emit AttributeChanged(msg.sender, _domain, _path, _value, changeRegistry[msg.sender][_domain]);
        changeRegistry[msg.sender][_domain] = block.number;
    }

    /// @notice Add certificate chain
    /// @param _domain The indentifier of the TLS-DID
    /// @param _chain The certificate chain to be stored
    function addChain(string calldata _domain, string calldata _chain) external {
        emit ChainChanged(msg.sender, _domain, _chain, changeRegistry[msg.sender][_domain]);
        changeRegistry[msg.sender][_domain] = block.number;
    }

    /// @notice Resets the changed index to 0 for the domain of sender.
    /// @param _domain The indentifier of the TLS-DID
    function remove(string calldata _domain) external {
        changeRegistry[msg.sender][_domain] = 0;
    }
}
