// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FrozenBatch {
    address public manufacturer;
    string public description;
    string public rawMaterial;
    uint public quantity;
    address public shipper;
    bool public picked;

    constructor(
        address _manufacturer,
        string memory _description,
        string memory _rawMaterial,
        uint _quantity,
        address _shipper
    ) {
        manufacturer = _manufacturer;
        description = _description;
        rawMaterial = _rawMaterial;
        quantity = _quantity;
        shipper = _shipper;
        picked = false;
    }

    function pickPackage(address transporter) public {
        require(!picked, "Batch already picked");
        require(transporter == shipper, "Only assigned shipper can pick");
        picked = true;
    }
}
