const { LineaSDK } = require("@consensys/linea-sdk");
const { ethers } = require("ethers");
require("dotenv").config();

// Asynchronous function to get message using Linea SDK by transaction hash on Ethereum mainnet
async function getMessagesByTransactionHash(hash) {
  // Create an instance of the Linea SDK with connection settings
  const sdk = new LineaSDK({
    l1RpcUrl: process.env.INFURA_ETHEREUM_RPC_URL,
    l2RpcUrl: process.env.INFURA_LINEA_RPC_URL,
    l2SignerPrivateKey: "",
    l1SignerPrivateKey: "",
    network: "linea-mainnet",
    mode: "read-only",
  });
  //  get the L1 contract wrapper instance (L1 Message Service) by contract address
  const l1Contract = sdk.getL1Contract(
    process.env.ETHEREUM_MAINNET_CONTRACT_ADDRESS
  );

  // Get message using the provided transaction hash
  const message = await l1Contract.getMessagesByTransactionHash(hash);
  return message;
}

// Main function to start monitoring MessageSent events from L1 Message Service contract and getting transaction hash
async function startMessageSentEventMonitoring() {
  // Create a provider to connect to the Ethereum network
  const provider = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_ETHEREUM_RPC_URL
  );

  // ABI of the contract function we are listening to
  const contractABI = [
    "event MessageSent(	address indexed _from, address indexed _to,  uint256 _fee, uint256 _value, uint256 _salt, bytes _calldata, bytes32 _messageHash)",
  ];
  // Create an instance of the contract
  const contract = new ethers.Contract(
    process.env.ETHEREUM_MAINNET_CONTRACT_ADDRESS,
    contractABI,
    provider
  );

  // Listen for 'MessageSent' events emitted by the L1 Message Service contract and get the current transaction hash
  contract.on("MessageSent", async (...args) => {
    console.log(
      "_____________________________________________________________"
    );
    console.log(
      "New event 'MessageSent' detected on Linea contract: L1 Message Service:"
    );
    // Extract the event payload from the arguments
    const eventPayload = args[7];
    // Get the transaction hash from the event payload
    const transactionHash = eventPayload.log.transactionHash;
    // Call a function to retrieve and process messages based on the transaction hash
    const message = await getMessagesByTransactionHash(transactionHash);
    // Print result
    console.log(`TransactionHash: ${transactionHash}`);
    console.log(`Message Sender    : ${message[0].messageSender}`);
    console.log(`Destination       : ${message[0].destination}`);
    console.log(`Fee               : ${message[0].fee.toString()}`);
    console.log(`Value             : ${message[0].value.toString()}`);
    console.log(`Message Nonce     : ${message[0].messageNonce.toString()}`);
    console.log(`Calldata          : ${message[0].calldata}`);
    console.log(`Message Hash      : ${message[0].messageHash}`);
  });
}

startMessageSentEventMonitoring();
