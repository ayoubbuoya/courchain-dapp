import { useWalletStore } from "@/stores/wallet";
import { signOut } from "next-auth/react";

export default function Logout() {
  const { wallet, signedAccountId } = useWalletStore();

  const handleLogout = async () => {
    if (wallet && signedAccountId) {
      await wallet.signOut();
    }

    await signOut();
  };
  return (
    <button
      className="w-full flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleLogout}
    >
      <span className="ms-1">Logout</span>
    </button>
  );
}
