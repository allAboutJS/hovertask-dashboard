import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import MarketplaceSearchForm from "../../components/MarketplaceSearchForm";
import { useState } from "react";
import cn from "../../utils/cn";
import ProductCard from "../../components/ProductCard";
import { useSelector } from "react-redux";
import { Product } from "../../../types";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import useWindowDimensions from "../../hooks/useWindowDimesions";

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
  const products = useSelector<any, Product[] | null>((state: any) => state.products.value);
  const [currentlyViewedProduct, setCurrentlyViewedProduct] = useState<Product>();
  const modalProps = useDisclosure();

  document.title = "Earn By Reselling Products";

  return (
    <div className="grid min-[1000px]:grid-cols-[1fr_182px] min-h-full gap-4">
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
            {products?.map((product, i) => (
              <ProductCard
                responsive
                key={i}
                {...product}
                linkOverrideURL={`/earn/resell/${i}`}
                onButtonClickAction={() => (setCurrentlyViewedProduct(product), modalProps.onOpen())}
              />
            ))}
          </div>
        </div>

        <div>
          <img src="/images/Group 1000004391.png" alt="" />
        </div>
      </div>

      <div>
        <div className="p-4 bg-primary bg-opacity-20 max-[1000px]:hidden text-xs rounded-2xl mt-[552px] space-y-3">
          <img src="/images/Why_wait__Shop_the_latest_trends_and_essentials_on_-removebg-preview 2.png" alt="" />
          <p>
            Add a new product or service to the marketplace. Include details, set your price, and upload images to
            attract buyers.
          </p>
          <Link
            to="/marketplace/list-product"
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-primary text-white w-full justify-center"
          >
            <ShoppingBag size={12} /> List a New Product
          </Link>
        </div>
      </div>

      <ProductInfoModal {...modalProps} product={currentlyViewedProduct} />
    </div>
  );
}

function ProductInfoModal(props: ReturnType<typeof useDisclosure> & { product?: Product }) {
  const { innerWidth } = useWindowDimensions();
  // const {isOpen, onOpenChange, onOpen} = useDisclosure();
  // function ResellerLinkMod

  return (
    <Modal
      size="2xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      onClose={props.onClose}
      scrollBehavior={innerWidth > 640 ? "outside" : "inside"}
    >
      <ModalContent>
        {() => (
          <ModalBody className="space-y-4 pb-4">
            <div>
              <h3 className="text-xl font-semibold">{props.product?.name}</h3>
              <p>{props.product?.description}</p>
            </div>

            <hr />

            <div className="grid grid-cols-3 items-center gap-2">
              <div className="col-span-2 text-sm space-y-4">
                <p>
                  To start reselling this product, simply click the button below to generate your unique reseller link.
                  This personalized link will track all your sales for this specific product.
                </p>

                <p>
                  <span className="font-semibold">Commission Details:</span> <br />
                  You will earn a reseller commission of ₦10,000 every time someone purchases this product using your
                  unique link.
                </p>

                <p>
                  <span className="font-semibold">Take Action Now!</span> <br />
                  Click the button bellow and start earning today.
                </p>
              </div>
              <div>
                <img src={props.product?.images[0]} alt="" />
              </div>
            </div>

            <div className="gap-4 text-sm flex items-center">
              <button className="bg-primary p-2 rounded-xl text-white transition-transform active:scale-95">
                Generate Reseller Link
              </button>
              <Link
                className="bg-primary p-2 rounded-xl text-white transition-transform active:scale-95"
                to={`/earn/resell/buy-product/${props.product?.id}`}
              >
                Buy Product
              </Link>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
