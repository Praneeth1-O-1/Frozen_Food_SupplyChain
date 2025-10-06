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

```bash
git clone https://github.com/your-username/frozen-food-supply-chain.git
cd frozen-food-supply-chain
