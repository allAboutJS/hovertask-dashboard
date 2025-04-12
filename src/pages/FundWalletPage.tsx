import { ArrowLeft, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { AuthUserDAO } from "../../types";
import { useState } from "react";
import initiateTransaction from "../utils/initiateTransaction";
import { toast } from "sonner";
import verifyTransaction from "../utils/verifiyTrassanction";

export default function FundWalletPage() {
  const authUser = useSelector<any, AuthUserDAO>((state) => state.auth.value);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFundWallet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.promise(
      () =>
        new Promise(async (resolve, reject) => {
          try {
            setIsSubmitting(true);
            const response = await initiateTransaction({ email: authUser.email, amount: Number(amount) });

            if (!response.status) reject();
            else {
              const newWindow = window.open(response.data.authorization_url, "_blank");

              if (!newWindow) reject("Please allow popups for this website");
              else resolve(undefined), verifyTransaction(response.data.reference);
            }
          } catch (error: any) {
            reject(error.message || "An error occurred. Please try again later.");
          } finally {
            setIsSubmitting(false);
          }
        }),
      {
        loading: "Initializing transaction...",
        error: (e: string) => e,
        success: "Transaction initialized successfully!"
      }
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex gap-4">
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
        <span className="font-bold text-xl">₦{authUser.balance.toLocaleString()}</span>
        <button
          onClick={() => null}
          className="border border-primary text-primary px-4 py-2.5 rounded-full text-sm flex items-center gap-2 hover:bg-primary/20 transition-colors"
        >
          <Wallet size={12} /> Withdraw
        </button>
      </div>

      <div className="p-4 rounded-3xl bg-primary/20 max-w-lg text-sm space-y-3">
        <p>Please input the amount you wish to add to your wallet</p>

        <form className="flex items-center gap-2.5" onSubmit={handleFundWallet}>
          <div className="flex flex-1 gap-4 items-center bg-white py-2 px-4 rounded-full border border-zinc-300">
            <span className="text-xl font-semibold text-zinc-500">₦</span>
            <input
              type="number"
              name=""
              className="flex-1 outline-none"
              placeholder="Amount"
              required
              min={1000}
              id=""
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button
            disabled={isSubmitting}
            className="bg-primary p-2 rounded-xl text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none"
          >
            Fund Wallet
          </button>
        </form>
      </div>
    </div>
  );
}
