import { ArrowLeft, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { AuthUserDAO } from "../../types";

export default function FundWalletPage() {
  const authUser = useSelector<any, AuthUserDAO | null>((state) => state.auth.value);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/">
          <ArrowLeft />
        </Link>

        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Fund Your Wallet</h1>
          <p className="text-sm text-zinc-500">Easily add funds to your wallet to shop, pay, or resell effortlessly</p>
        </div>
      </div>

      <div className="bg-white shadow flex items-center justify-between gap-2 p-6 rounded-2xl max-w-sm">
        <span className="text-xs">Membership Fee</span>
        <span className="font-bold text-xl">₦{authUser?.balance.toLocaleString()}</span>
        <button
          onClick={() => null}
          className="border border-primary text-primary px-4 py-2.5 rounded-full text-sm flex items-center gap-2 hover:bg-primary/20 transition-colors"
        >
          <Wallet size={12} /> Withdraw
        </button>
      </div>
    </div>
  );
}
