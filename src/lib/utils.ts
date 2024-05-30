import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import { KeyPair, connect, keyStores } from "near-api-js";

export function fromNearToYocto(amount: number): bigint | string {
  const yocto = parseNearAmount(amount.toString());
  return yocto?.toString() || "0";
}

export function fromYoctoToNear(amount: number | bigint): number {
  const near = formatNearAmount(BigInt(amount).toString());
  return parseFloat(near);
}

export function secondesToVideoDuration(seconds: number) {
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // Ensure two-digit formatting for minutes and seconds
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatDate(date: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

export async function setUpAdminNearConnection() {
  // "use server";
  // blockchain config for interacting from the server
  const adminKeyStore = new keyStores.InMemoryKeyStore();
  //
  const PRIVATE_KEY = process.env.NEAR_ADMIN_PRIVATE_KEY;
  // creates a public / private key pair using the provided private key
  const keyPair = KeyPair.fromString(PRIVATE_KEY as string);
  // adds the keyPair you created to keyStore
  await adminKeyStore.setKey(
    "testnet",
    process.env.NEXT_PUBLIC_NEAR_ADMIN_ACCOUNT_ID as string,
    keyPair
  );
  // connection config for interacting with the blockchain
  const connectionConfig = {
    networkId: "testnet",
    keyStore: adminKeyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
  };

  const nearConnection = await connect(connectionConfig);
  return nearConnection;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
