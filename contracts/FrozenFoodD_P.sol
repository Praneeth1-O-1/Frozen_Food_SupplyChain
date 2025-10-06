// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FrozenFood.sol";

contract FrozenFood_D_R {
    enum PackageStatus { AtDistributor, PickedForDelivery, Delivered }

    address public batchId;
    address public distributor;
    address public shipper;
    address public retailer;
    PackageStatus public status;
    string public lotCode;
    uint public quantity;
    uint public productTemperature;
    uint public timestamp;
    string public currentLocation;

    event ShipmentUpdate(
        address indexed BatchID,
        address indexed Shipper,
        address indexed Receiver,
        uint Temperature,
        uint Quantity,
        uint Status,
        uint Time
    );

    constructor(
        address _batchId,
        address _distributor,
        address _shipper,
        address _retailer,
        string memory _lotCode,
        uint _quantity
    ) {
        batchId = _batchId;
        distributor = _distributor;
        shipper = _shipper;
        retailer = _retailer;
        lotCode = _lotCode;
        quantity = _quantity;
        status = PackageStatus.AtDistributor;
    }

    function pickFrozenLot(
        address _batchId,
        address _shipper,
        uint _temperature,
        string memory _location
    ) public {
        require(_shipper == shipper, "Only the assigned shipper can pick");
        status = PackageStatus.PickedForDelivery;
        productTemperature = _temperature;
        timestamp = block.timestamp;
        currentLocation = _location;
        emit ShipmentUpdate(_batchId, _shipper, retailer, _temperature, quantity, uint(status), block.timestamp);
    }

    function receiveFrozenLot(
        address _batchId,
        address _receiver,
        uint _temperature,
        string memory _location
    ) public {
        require(_receiver == retailer, "Only the assigned retailer can receive");
        status = PackageStatus.Delivered;
        productTemperature = _temperature;
        timestamp = block.timestamp;
        currentLocation = _location;
        emit ShipmentUpdate(_batchId, shipper, _receiver, _temperature, quantity, uint(status), block.timestamp);
    }
}
