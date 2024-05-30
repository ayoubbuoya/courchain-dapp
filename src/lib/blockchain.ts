"use server";

import { connect, keyStores, KeyPair } from "near-api-js";

const ADMIN_ACCOUNT_ID = process.env.ADMIN_ACCOUNT_ID || "";
const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY || "";

const myKeyStore = new keyStores.InMemoryKeyStore();

// creates a public / private key pair using the provided private key
const keyPair = KeyPair.fromString(PRIVATE_KEY);

export default async function initAdminBlockchainConnection() {
  // adds the keyPair you created to keyStore
  await myKeyStore.setKey("testnet", ADMIN_ACCOUNT_ID, keyPair);

  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
  };

  const near = await connect(connectionConfig);
  const account = await near.account(ADMIN_ACCOUNT_ID);
  return account;
}
