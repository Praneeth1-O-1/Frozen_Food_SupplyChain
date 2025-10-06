// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Migrations
/// @notice Tracks migration/deployment versions of the FrozenFood blockchain project.
/// @dev Required by Truffle/Hardhat for deployment sequencing.
contract Migrations {
    address public owner;
    uint256 public lastCompletedMigration;

    /// @notice Sets contract deployer as owner
    constructor() {
        owner = msg.sender;
    }

    /// @dev Restricts function access to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    /// @notice Marks a migration as completed
    /// @param completed Migration step number
    function setCompleted(uint256 completed) external onlyOwner {
        lastCompletedMigration = completed;
    }

    /// @notice Transfers migration state to a new contract address (e.g., during upgrade)
    /// @param newAddress Address of new Migrations contract
    function upgrade(address newAddress) external onlyOwner {
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(lastCompletedMigration);
    }
}
