import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function PrivacyPolicyPage() {
  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-5 overflow-hidden min-h-full">
        <div className="flex gap-4 flex-1">
          <Link to="/transactions-history">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Privacy Policy</h1>
            <p className="text-sm text-zinc-500">
              Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your
              personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
