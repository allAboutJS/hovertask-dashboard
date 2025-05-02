import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import SellerInfoAside from "../../components/SellerInfoAside";
import { useSelector } from "react-redux";
import type { AuthUserDAO } from "../../../types";

export default function KycVerification() {
  const authUser = useSelector<any, AuthUserDAO>((state: any) => state.auth.value);

  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-6 overflow-hidden min-h-full">
        <div className="flex gap-4 flex-1">
          <Link to="/">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">KYC Verification</h1>
            <p className="text-sm text-zinc-900">
              Verifying your KYC (Know Your Customer) is quick and easy! Follow these three simple steps to unlock full
              access to sell products and services securely on Hovertask Marketplace.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-primary/10 rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-4 text-black">How to get verified</h2>

            <div className="space-y-3">
              <button
                type="button"
                className="flex justify-between items-center gap-4 p-2 text-sm w-fit border border-primary text-primary rounded-md hover:bg-primary/20 transition"
              >
                <span>Step 1: Submit Your Personal Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button
                type="button"
                className="flex justify-between items-center gap-4 p-2 text-sm w-fit border border-primary text-primary rounded-md hover:bg-primary/20 transition"
              >
                <span>Step 2: Upload a Valid ID Document</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button
                type="button"
                className="flex justify-between items-center gap-4 p-2 text-sm w-fit border border-primary text-primary rounded-md hover:bg-primary/20 transition"
              >
                <span>Step 3: Take a Live Selfie for Identity Verification</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-800 space-y-2">
          <p>
            <span>✅</span>
            <span className="font-medium">What's Next?</span>
          </p>
          <ul className="space-y-1 list-none">
            <li className="flex items-start">
              <span className="text-primary">🔷</span>
              <span>Your KYC verification will be reviewed within 24–48 hours.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">🔷</span>
              <span>Once approved, you'll receive a confirmation notification.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-primary">🔷</span>
              <span>
                After verification, you can list products, withdraw funds, and enjoy full marketplace features!
              </span>
            </li>
          </ul>
          <p>
            Need help? Contact{" "}
            <Link to="/support" className="text-primary underline hover:text-primary/80">
              Hovertask Support
            </Link>{" "}
            for assistance. 🚀
          </p>
        </div>

        <div className="flex space-x-4">
          <Link
            to="/kyc/start"
            className="bg-primary text-white px-6 py-1.5 text-sm rounded-full hover:bg-primary/80 transition"
          >
            Continue
          </Link>
          <button
            type="button"
            className="border border-primary text-primary px-6 py-1.5 text-sm rounded-full hover:bg-primary/20 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <SellerInfoAside {...{ ...authUser, hideChatBtn: true }} />
    </div>
  );
}
