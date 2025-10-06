let provider;
let signer;
let contract;

// Replace with your deployed contract address
const contractAddress = "0xC65Cf45990f1EF39d7a1ED47E1082A51977bBc8C";

// Replace with your contract ABI
const abi = 
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "BatchId",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Manufacturer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "shipper",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Receiver",
				"type": "address"
			}
		],
		"name": "FrozenBatchCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "ProductID",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Supplier",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "Shipper",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "Receiver",
				"type": "address"
			}
		],
		"name": "RawSupplyInit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "EthAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "Name",
				"type": "string"
			}
		],
		"name": "UserRegister",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "EthAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "Name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Role",
				"type": "uint256"
			}
		],
		"name": "UserRoleReassigned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "EthAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "Name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Role",
				"type": "uint256"
			}
		],
		"name": "UserRoleRevoked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "Owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "rawMaterial",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "shipper",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "createFrozenBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "farmerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lotCode",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "shipper",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "manufacturer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "productTemperature",
				"type": "uint256"
			}
		],
		"name": "createRawPackage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getBatchIdByIndexM",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBatchesCountM",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getPackageIDByIndexM",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getPackageIdByIndexS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPackagesCountM",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPackagesCountS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getUserByIndex",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "ethAddress",
				"type": "address"
			},
			{
				"internalType": "enum SupplyChain.roles",
				"name": "role",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "User",
				"type": "address"
			}
		],
		"name": "getUserInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "ethAddress",
				"type": "address"
			},
			{
				"internalType": "enum SupplyChain.roles",
				"name": "role",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUsersCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pid",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "transportType",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "cid",
				"type": "address"
			}
		],
		"name": "loadConsignment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pid",
				"type": "address"
			}
		],
		"name": "rawPackageReceived",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Role",
				"type": "uint256"
			}
		],
		"name": "reassignRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "EthAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "Name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "Role",
				"type": "uint256"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "BatchID",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Shipper",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Receiver",
				"type": "address"
			}
		],
		"name": "transferToDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "BatchID",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Shipper",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Receiver",
				"type": "address"
			}
		],
		"name": "transferToRetailer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// Connect wallet function
async function connectWallet() {
    try {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, abi, signer);
            
            const address = await signer.getAddress();
            document.getElementById('walletAddress').innerText = `Connected: ${address.substring(0, 6)}...${address.substring(38)}`;
            document.getElementById('connectBtn').innerText = 'Wallet Connected';
            document.getElementById('connectBtn').disabled = true;
            
            setupEventListeners();
            logEvent("Wallet connected successfully!");
        } else {
            alert("Please install MetaMask!");
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting wallet: " + err.message);
    }
}

// Setup contract event listeners
function setupEventListeners() {
    contract.on("UserRegister", (ethAddress, name) => {
        logEvent(`👤 User Registered: ${name} (${ethAddress.substring(0, 6)}...${ethAddress.substring(38)})`);
    });

    contract.on("RawSupplyInit", (pid, supplier, shipper, manufacturer) => {
        logEvent(`🌾 Raw Package Created: ${pid}`);
    });

    contract.on("ShippingUpdate", (pid, shipper, transportType, receiver) => {
        logEvent(`🚛 Shipping Update: Package ${pid} loaded by ${shipper}`);
    });

    contract.on("FrozenBatchCreated", (batchId, manufacturer, rawMaterial, quantity) => {
        logEvent(`🏭 Frozen Batch Created: ${batchId} (Qty: ${quantity})`);
    });
}

// Log events to UI
function logEvent(message) {
    const logsDiv = document.getElementById('eventLogs');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
    logsDiv.insertBefore(logEntry, logsDiv.firstChild);
}

// Supplier: Create Raw Package
async function createRawPackage() {
    const description = document.getElementById("description").value;
    const farmer = document.getElementById("farmer").value;
    const location = document.getElementById("location").value;
    const lotCode = document.getElementById("lotCode").value;
    const quantity = Number(document.getElementById("quantity").value);
    const shipper = document.getElementById("shipper").value;
    const manufacturer = document.getElementById("manufacturer").value;
    const temp = Number(document.getElementById("temperature").value);

    if (!description || !farmer || !location || !lotCode || !quantity || !shipper || !manufacturer) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        logEvent("Creating raw package...");
        const tx = await contract.createRawPackage(
            description, 
            farmer, 
            location, 
            lotCode, 
            quantity, 
            shipper, 
            manufacturer, 
            temp
        );
        await tx.wait();
        alert("Raw package created successfully!");
        logEvent("✅ Raw package created!");
        clearForm(['description', 'farmer', 'location', 'lotCode', 'quantity', 'shipper', 'manufacturer', 'temperature']);
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
        logEvent("❌ Error creating raw package");
    }
}

// Transporter: Load Consignment
async function loadConsignment() {
    const pid = document.getElementById("pid").value;
    const transportType = Number(document.getElementById("transportType").value);

    if (!pid || transportType === '') {
        alert("Please fill in all fields!");
        return;
    }

    try {
        logEvent("Loading consignment...");
        const tx = await contract.loadConsignment(
            pid, 
            transportType, 
            "0x0000000000000000000000000000000000000000"
        );
        await tx.wait();
        alert("Consignment loaded successfully!");
        logEvent("✅ Consignment loaded!");
        clearForm(['pid', 'transportType']);
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
        logEvent("❌ Error loading consignment");
    }
}

// Manufacturer: Receive Raw Package
async function rawPackageReceived() {
    const pid = document.getElementById("rawPackageId").value;

    if (!pid) {
        alert("Please enter Package ID!");
        return;
    }

    try {
        logEvent("Receiving raw package...");
        const tx = await contract.rawPackageReceived(pid);
        await tx.wait();
        alert("Raw package received successfully!");
        logEvent("✅ Raw package received!");
        clearForm(['rawPackageId']);
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
        logEvent("❌ Error receiving raw package");
    }
}

// Manufacturer: Create Frozen Batch
async function createFrozenBatch() {
    const description = document.getElementById("batchDescription").value;
    const rawMaterial = document.getElementById("rawMaterial").value;
    const quantity = Number(document.getElementById("batchQuantity").value);
    const shipper = document.getElementById("batchShipper").value;
    const receiver = document.getElementById("batchReceiver").value;

    if (!description || !rawMaterial || !quantity || !shipper || !receiver) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        logEvent("Creating frozen batch...");
        const tx = await contract.createFrozenBatch(
            description, 
            rawMaterial, 
            quantity, 
            shipper, 
            receiver
        );
        await tx.wait();
        alert("Frozen batch created successfully!");
        logEvent("✅ Frozen batch created!");
        clearForm(['batchDescription', 'rawMaterial', 'batchQuantity', 'batchShipper', 'batchReceiver']);
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
        logEvent("❌ Error creating frozen batch");
    }
}

// Warehouse: Transfer to Distributor
async function transferToDistributor() {
    const batchId = document.getElementById("warehouseBatchId").value;
    const shipper = document.getElementById("warehouseShipper").value;
    const receiver = document.getElementById("distributor").value;

    if (!batchId || !shipper || !receiver) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        logEvent("Transferring to distributor...");
        const tx = await contract.transferToDistributor(batchId, shipper, receiver);
        await tx.wait();
        alert("Transferred to distributor successfully!");
        logEvent("✅ Transferred to distributor!");
        clearForm(['warehouseBatchId', 'warehouseShipper', 'distributor']);
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
        logEvent("❌ Error transferring to distributor");
    }
}

// Distributor: Transfer to Retailer
async function transferToRetailer() {
    const batchId = document.getElementById("distBatchId").value;
    const shipper = document.getElementById("distShipper").value;
    const receiver = document.getElementById("retailer").value;

    if (!batchId || !shipper || !receiver) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        logEvent("Transferring to retailer...");
        const tx = await contract.transferToRetailer(batchId, shipper, receiver);
        await tx.wait();
        alert("Transferred to retailer successfully!");
        logEvent("✅ Transferred to retailer!");
        clearForm(['distBatchId', 'distShipper', 'retailer']);
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
        logEvent("❌ Error transferring to retailer");
    }
}

// Helper function to clear form fields
function clearForm(fieldIds) {
    fieldIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
}

// Owner: Register User
async function registerUser() {
    const ethAddress = document.getElementById("userAddress").value;
    const name = document.getElementById("userName").value;
    const location = document.getElementById("userLocation").value;
    const role = Number(document.getElementById("userRole").value);

    if (!ethAddress || !name || !location || role === '') {
        alert("Please fill in all fields!");
        return;
    }

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
        alert("Invalid Ethereum address format!");
        return;
    }

    try {
        logEvent("Registering user...");
        const tx = await contract.registerUser(ethAddress, name, location, role);
        await tx.wait();
        alert(`User ${name} registered successfully!`);
        logEvent(`✅ User ${name} registered with role ${role}!`);
        clearForm(['userAddress', 'userName', 'userLocation', 'userRole']);
    } catch (err) {
        console.error(err);
        alert("Error: " + err.message);
        logEvent("❌ Error registering user");
    }
}

// Helper function to clear form fields
function clearForm(fieldIds) {
    fieldIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
}

// Handle account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
    });

    window.ethereum.on('chainChanged', function (chainId) {
        window.location.reload();
    });
}