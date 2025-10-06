# 🧊 Frozen Food Supply Chain Management (dApp)

A decentralized application (dApp) for tracking frozen food products from suppliers to retailers using **Ethereum smart contracts**. The app enables different roles—Owner, Supplier, Transporter, Manufacturer, Warehouse, and Distributor—to manage, transfer, and track food packages and batches transparently on the blockchain.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Smart Contract Deployment](#smart-contract-deployment)
- [Notes](#notes)
- [License](#license)

---

## Demo

![UI Screenshot](screenshot.png)  
*Optional: Add screenshots of the dApp UI or a GIF demonstrating workflow.*

---

## Features

- **Wallet Integration:** Connect MetaMask wallet.
- **Owner/Admin:** Register users and assign roles.
- **Supplier:** Create raw packages with details like description, farmer, location, lot code, quantity, shipper, and manufacturer.
- **Transporter:** Load consignments for shipments.
- **Manufacturer:** Receive raw packages and create frozen batches.
- **Warehouse:** Transfer frozen batches to distributors.
- **Distributor:** Transfer frozen batches to retailers.
- **Event Logs:** Track all operations on the frontend in real-time using smart contract events.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Blockchain:** Ethereum, Solidity  
- **Library:** Ethers.js v6  
- **Wallet:** MetaMask  

---

## Setup

1. Clone the repository:

git clone https://github.com/your-username/frozen-food-supply-chain.git
cd frozen-food-supply-chain
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [...]; // Paste your contract ABI here

Usage:

Connect Wallet: Click the Connect Wallet button to connect your MetaMask account.
Register Users (Owner only): Fill in user details and assign roles.
Create Raw Packages (Supplier): Fill in package details and submit.
Load Consignment (Transporter): Enter package ID and transport type.
Receive Raw Package (Manufacturer): Enter raw package ID.
Create Frozen Batch (Manufacturer): Enter batch details and submit.
Transfer to Distributor/Warehouse: Enter batch ID and addresses.
Event Logs: Track all blockchain events in real-time in the Event Logs section.


Folder Structure
frozen-food-supply-chain/
├── index.html           # Main HTML frontend
├── style.css            # Frontend styling
├── app.js               # Frontend logic & Ethers.js interactions
├── README.md            # Project documentation
└── screenshots/         # Optional: UI screenshots


Smart Contract Deployment:

Write and compile your contract in Remix or Hardhat.
Deploy it to your desired Ethereum network.
Copy the contract address and ABI.
Update app.js with the correct contract address and ABI.
⚠️ Make sure your MetaMask network matches the deployment network. Using a different network will cause transaction failures.

