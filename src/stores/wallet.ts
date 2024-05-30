"use cleint";

import { create as createStore } from "zustand";
import { Wallet } from "@/wallets/near-wallet";

// store to share  wallet and signedAccountId
export const useWalletStore = createStore<{
  wallet: any;
  signedAccountId: string;
  setWallet: (wallet: Wallet) => void;
  setSignedAccountId: (signedAccountId: string) => void;
}>((set) => ({
  wallet: undefined,
  signedAccountId: "",
  setWallet: (wallet) => set({ wallet }),
  setSignedAccountId: (signedAccountId) => set({ signedAccountId }),
}));
