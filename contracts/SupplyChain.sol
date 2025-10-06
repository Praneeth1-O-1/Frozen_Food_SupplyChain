// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RawIngredient.sol";
import "./FrozenFood.sol";
import "./FrozenFoodW_D.sol";
import "./FrozenFoodD_P.sol";

/// @title Blockchain: Frozen Food Supply Chain
/// @notice Manages supplier, manufacturer, distributor, shipper, and retailer roles.
contract SupplyChain {
    address public Owner;

    constructor() {
        Owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "Only owner can call this function.");
        _;
    }

    enum roles {
        norole,
        supplier,
        transporter,
        manufacturer,
        warehouse,
        distributor,
        retailer,
        revoke
    }

    event UserRegister(address indexed EthAddress, string Name);
    event UserRoleRevoked(address indexed EthAddress, string Name, uint Role);
    event UserRoleReassigned(address indexed EthAddress, string Name, uint Role);

    struct UserInfo {
        string name;
        string location;
        address ethAddress;
        roles role;
    }

    mapping(address => UserInfo) UsersDetails;
    address[] users;

    /*** User Management ***/
    function registerUser(
        address EthAddress,
        string memory Name,
        string memory Location,
        uint Role
    ) public onlyOwner {
        require(UsersDetails[EthAddress].role == roles.norole, "User already registered");
        UsersDetails[EthAddress] = UserInfo(Name, Location, EthAddress, roles(Role));
        users.push(EthAddress);
        emit UserRegister(EthAddress, Name);
    }

    function revokeRole(address userAddress) public onlyOwner {
        require(UsersDetails[userAddress].role != roles.norole, "User not registered");
        emit UserRoleRevoked(userAddress, UsersDetails[userAddress].name, uint(UsersDetails[userAddress].role));
        UsersDetails[userAddress].role = roles.revoke;
    }

    function reassignRole(address userAddress, uint Role) public onlyOwner {
        require(UsersDetails[userAddress].role != roles.norole, "User not registered");
        UsersDetails[userAddress].role = roles(Role);
        emit UserRoleReassigned(userAddress, UsersDetails[userAddress].name, uint(UsersDetails[userAddress].role));
    }

    function getUserInfo(address User)
        public
        view
        returns (string memory name, string memory location, address ethAddress, roles role)
    {
        UserInfo memory u = UsersDetails[User];
        return (u.name, u.location, u.ethAddress, u.role);
    }

    function getUsersCount() public view returns (uint) {
        return users.length;
    }

    function getUserByIndex(uint index)
        public
        view
        returns (string memory name, string memory location, address ethAddress, roles role)
    {
        return getUserInfo(users[index]);
    }

    /*** Supplier Section ***/
    mapping(address => address[]) supplierRawProductInfo;
    event RawSupplyInit(address indexed ProductID, address indexed Supplier, address Shipper, address indexed Receiver);

    function createRawPackage(
        string memory description,
        string memory farmerName,
        string memory location,
        string memory lotCode,
        uint quantity,
        address shipper,
        address manufacturer,
        uint productTemperature
    ) public {
        require(UsersDetails[msg.sender].role == roles.supplier, "Only Supplier can call this function");

        RawMaterials rawData = new RawMaterials(
            msg.sender,
            description,
            farmerName,
            location,
            lotCode,
            quantity,
            shipper,
            manufacturer,
            productTemperature
        );

        supplierRawProductInfo[msg.sender].push(address(rawData));
        emit RawSupplyInit(address(rawData), msg.sender, shipper, manufacturer);
    }

    function getPackagesCountS() public view returns (uint) {
        require(UsersDetails[msg.sender].role == roles.supplier, "Only Supplier can call this function");
        return supplierRawProductInfo[msg.sender].length;
    }

    function getPackageIdByIndexS(uint index) public view returns (address) {
        require(UsersDetails[msg.sender].role == roles.supplier, "Only Supplier can call this function");
        return supplierRawProductInfo[msg.sender][index];
    }

    /*** Transporter Section ***/
    function loadConsignment(address pid, uint transportType, address cid) public {
        require(UsersDetails[msg.sender].role == roles.transporter, "Only Transporter can call this function");
        require(transportType > 0, "Transporter Type must be defined");

        if (transportType == 1) {
            RawMaterials(pid).pickPackage(msg.sender); // Supplier → Manufacturer
        } else if (transportType == 2) {
            FrozenBatch(pid).pickPackage(msg.sender); // Manufacturer → Warehouse
        } else if (transportType == 3) {
            FrozenFood_W_D(cid).pickFrozenLot(pid, msg.sender, 0, ""); // Warehouse → Distributor
        } else if (transportType == 4) {
            FrozenFood_D_R(cid).pickFrozenLot(pid, msg.sender, 0, ""); // Distributor → Retailer
        }
    }

    /*** Manufacturer Section ***/
    mapping(address => address[]) RawPackagesAtManufacturer;

    function rawPackageReceived(address pid) public {
        require(UsersDetails[msg.sender].role == roles.manufacturer, "Only Manufacturer can call this function");
        RawMaterials(pid).receivePackage(msg.sender, 0, "Good");
        RawPackagesAtManufacturer[msg.sender].push(pid);
    }

    function getPackagesCountM() public view returns (uint) {
        require(UsersDetails[msg.sender].role == roles.manufacturer, "Only Manufacturer can call this function");
        return RawPackagesAtManufacturer[msg.sender].length;
    }

    function getPackageIDByIndexM(uint index) public view returns (address) {
        require(UsersDetails[msg.sender].role == roles.manufacturer, "Only Manufacturer can call this function");
        return RawPackagesAtManufacturer[msg.sender][index];
    }

    /*** Manufacturer → Warehouse Section ***/
    mapping(address => address[]) ManufacturedFrozenBatches;
    event FrozenBatchCreated(address indexed BatchId, address indexed Manufacturer, address shipper, address indexed Receiver);

    function createFrozenBatch(
        string memory description,
        string memory rawMaterial,
        uint quantity,
        address shipper,
        address receiver
    ) public {
        require(UsersDetails[msg.sender].role == roles.manufacturer, "Only Manufacturer can call this function");

        FrozenBatch f = new FrozenBatch(msg.sender, description, rawMaterial, quantity, shipper);
        ManufacturedFrozenBatches[msg.sender].push(address(f));
        emit FrozenBatchCreated(address(f), msg.sender, shipper, receiver);
    }

    function getBatchesCountM() public view returns (uint) {
        require(UsersDetails[msg.sender].role == roles.manufacturer, "Only Manufacturer can call this function");
        return ManufacturedFrozenBatches[msg.sender].length;
    }

    function getBatchIdByIndexM(uint index) public view returns (address) {
        require(UsersDetails[msg.sender].role == roles.manufacturer, "Only Manufacturer can call this function");
        return ManufacturedFrozenBatches[msg.sender][index];
    }

    /*** Warehouse → Distributor Section ***/
    mapping(address => address[]) WarehouseToDistributor;
    mapping(address => address) WarehouseToDistributorContract;

    function transferToDistributor(address BatchID, address Shipper, address Receiver) public {
        require(UsersDetails[msg.sender].role == roles.warehouse, "Only Warehouse can call this function");

        FrozenFood_W_D wd = new FrozenFood_W_D(BatchID, msg.sender, Shipper, Receiver, "LOT001", 100);
        WarehouseToDistributor[msg.sender].push(address(wd));
        WarehouseToDistributorContract[BatchID] = address(wd);
    }

    /*** Distributor → Retailer Section ***/
    mapping(address => address[]) DistributorToRetailer;
    mapping(address => address) DistributorToRetailerContract;

    function transferToRetailer(address BatchID, address Shipper, address Receiver) public {
        require(UsersDetails[msg.sender].role == roles.distributor, "Only Distributor can call this function");

        FrozenFood_D_R dp = new FrozenFood_D_R(BatchID, msg.sender, Shipper, Receiver, "LOT001", 100);
        DistributorToRetailer[msg.sender].push(address(dp));
        DistributorToRetailerContract[BatchID] = address(dp);
    }
}
