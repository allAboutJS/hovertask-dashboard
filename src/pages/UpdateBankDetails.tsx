import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function UpdateBankDetailsPage() {
  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-8 overflow-hidden min-h-full">
        <div className="flex gap-4 flex-1">
          <Link to="/">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Update Bank Details</h1>
            <p className="text-sm text-zinc-500">Add your bank details</p>
          </div>
        </div>
      </div>
    </div>
  );
}
