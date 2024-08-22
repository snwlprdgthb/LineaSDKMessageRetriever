# Linea SDK Message Retriever Example

## Overview

This project demonstrates how to use the Linea SDK to monitor and retrieve messages from the Linea network. The script listens for `MessageSent` events on the Ethereum mainnet, processes the transaction hash, and extracts relevant message details via LineaSDK.

## Prerequisites

- Node.js (version 16.10.0 or later recommended)
- npm (Node Package Manager)
- A valid Infura and Alchemy API key for Ethereum and Linea networks
  
## Installation

1. Clone the repository: `git clone https://github.com/snwlprdgthb/LineaSDKMessageRetriever.git` and navigate to the directory: `cd LineaSDKMessageRetriever`.
2. Install dependencies: `npm install`.

## Configuration

Create a .env file in the root directory of the project with the following content:

Create a `.env` file in the root directory with the following content:

  `INFURA_ETHEREUM_RPC_URL=https://your-infura-ethereum-rpc-url`
  
  `INFURA_LINEA_RPC_URL=https://your-infura-linea-rpc-url`
  
  `ALCHEMY_ETHEREUM_RPC_URL=https://your-alchemy-linea-rpc-url`
  
  `ETHEREUM_MAINNET_CONTRACT_ADDRESS=L1_Message_Service_contract_address`

## Usage

Run the script using `npm run start`. The script will listen for MessageSent events from the L1 Message Service contract. When an event is detected, it will display the relevant message details.

## Script Overview

The script consists of two main functions:

1. `startMessageSentEventMonitoring()`: This function sets up a provider for the Ethereum network and listens for MessageSent events emitted by the L1 Message Service contract. When an event is detected, it fetches and logs the associated message details.

2. `getMessagesByTransactionHash(hash)`: This asynchronous function uses the Linea SDK to retrieve messages from the Linea network based on a provided transaction hash. Using in startMessageSentEventMonitoring function.

