import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import MarketplaceSearchForm from "../../components/MarketplaceSearchForm";
import { useState } from "react";
import cn from "../../utils/cn";
import { products } from "../Dashboard";
import ProductCard from "../../components/ProductCard";

export default function ResellPage() {
  const categories = [
    { key: "all", label: "all" },
    { key: "phones_and_tablets", label: "phones and tablets" },
    { key: "health_and_beauty", label: "health and beauty" },
    { key: "computing", label: "computing" },
    { key: "home_and_office", label: "home and office" },
    { key: "fashion", label: "fashion" },
    { key: "electronic", label: "electronic" },
    { key: "baby_products", label: "baby products" }
  ];
  const [currentCategory, setCurrentCategory] = useState<string>("all");

  document.title = "Earn By Reselling Products";

  return (
    <div className="grid min-[1000px]:grid-cols-[1fr_182px] min-h-full">
      <div className="shadow min-h-full bg-white p-4 space-y-12">
        <div
          style={{ backgroundImage: "url('/images/Rectangle 39253.png')" }}
          className="bg-cover p-4 space-y-24 rounded-3xl max-w-full"
        >
          <div className="flex gap-4 flex-1 text-white">
            <Link to="/earn">
              <ArrowLeft />
            </Link>

            <div className="space-y-2">
              <h1 className="text-xl font-semibold">Hot-selling Products to Maximize Your Earnings</h1>
              <p className="text-sm">
                Get access to high-demand products and services at discounted rates, resell, and earn profits instantly!
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <MarketplaceSearchForm />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold text-lg">All Categories</h2>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                onClick={() => setCurrentCategory(category.key)}
                className={cn("py-1 px-2 rounded-lg bg-zinc-200 border border-zinc-300 text-sm capitalize", {
                  "bg-primary text-white transition-all active:scale-95": category.key === currentCategory
                })}
                key={category.key}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <h2 className="font-semibold text-lg">Top Products to Buy or Resell</h2>

          <div className="grid max-[380px]:grid-cols-1 max-[640px]:grid-cols-2 sm:grid-cols-3 p-4 rounded-3xl bg-primary/20 gap-x-2 gap-y-4">
            {products.map((product, i) => (
              <ProductCard responsive key={i} {...product} linkOverrideURL={`/earn/resell/${i}`} />
            ))}
          </div>
        </div>

        <div>
          <img src="/images/Group 1000004391.png" alt="" />
        </div>
      </div>
    </div>
  );
}
