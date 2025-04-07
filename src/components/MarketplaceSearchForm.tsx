import { Search } from "lucide-react";

export default function MarketplaceSearchForm() {
  return (
    <form className="p-2 px-4 bg-white/90 rounded-3xl flex w-full max-w-md gap-4">
      <div className="border p-2 rounded-full bg-white flex-1 flex items-center gap-2">
        <input type="text" className="min-w-0 max-w-none flex-1 w-full" />
        <button>
          <Search size={12} />
        </button>
        <button type="button">
          <span style={{ fontSize: 12 }} className="material-icons-outlined text-primary">
            tune
          </span>
        </button>
      </div>

      <div className="text-xs flex items-center gap-4">
        <span>Location:</span>
        <button type="button" className="flex items-center gap-1">
          Nigeria{" "}
          <span style={{ fontSize: 12 }} className="material-icons-outlined">
            arrow_drop_down
          </span>
        </button>
      </div>
    </form>
  );
}
