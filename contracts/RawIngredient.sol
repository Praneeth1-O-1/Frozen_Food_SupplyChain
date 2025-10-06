// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RawMaterials {
    address public supplier;
    string public description;
    string public farmerName;
    string public location;
    string public lotCode;
    uint public quantity;
    address public shipper;
    address public manufacturer;
    uint public productTemperature;
    bool public picked;
    bool public received;

    /// @notice Initialize a raw material package
    constructor(
        address _supplier,
        string memory _description,
        string memory _farmerName,
        string memory _location,
        string memory _lotCode,
        uint _quantity,
        address _shipper,
        address _manufacturer,
        uint _productTemperature
    ) {
        supplier = _supplier;
        description = _description;
        farmerName = _farmerName;
        location = _location;
        lotCode = _lotCode;
        quantity = _quantity;
        shipper = _shipper;
        manufacturer = _manufacturer;
        productTemperature = _productTemperature;
        picked = false;
        received = false;
    }

    /// @notice Pick the package for transport
    /// @param transporter Address of the transporter
    function pickPackage(address transporter) public {
        require(!picked, "Package already picked");
        require(transporter == shipper, "Only assigned shipper can pick this package");
        picked = true;
    }


   function receivePackage(address /*receiver*/, uint /*statusCode*/, string memory /*remarks*/) public {
    require(picked, "Package not yet picked");
    received = true;
}


}
