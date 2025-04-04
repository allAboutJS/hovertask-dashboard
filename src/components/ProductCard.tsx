import { Heart, ShoppingBag, StarIcon } from "lucide-react";
import { Link } from "react-router";
import { ProductProps } from "../../types";
import cn from "../utils/cn";

const ProductCard = (props: ProductProps) => {
  return (
    <div
      className={cn("flex flex-col bg-white rounded-2xl p-4 space-y-2", {
        "flex-row items-center w-[320px]": props.horizontal,
        "w-[180px] min-w-[180px]": !props.horizontal && !props.responsive
      })}
    >
      <div className="bg-zinc-200 rounded-2xl overflow-hidden">
        <img
          className={cn("aspect-square block", {
            "w-[131px]": props.horizontal,
            "h-[97.7px]": !props.horizontal && !props.responsive
          })}
          src={props.featured_image_url}
          alt={props.name}
        />
      </div>
      <div className="space-y-2 flex flex-col justify-end flex-1">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-[11.28px] capitalize">{props.name}</h3>
            <button className="text-[#FF00FB]">
              <Heart size={14} />
            </button>
          </div>
          <div className="flex gap-6">
            <p className="text-[9.4px] text-[#77777A] line-through">₦{props.price}</p>
            <p className="text-[11.28px]">
              ₦{Number((props.price * (props.discount / 100)).toLocaleString()).toFixed(2)}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[9.4px] flex items-center">
              <StarIcon size={12} /> {props.rating}
            </p>
            <p className="text-[9.4px] text-primary">({props.reviews_count} Reviews)</p>
            <p className="text-[#77777A] text-[9.11px]">{props.available_units} Units</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            className={cn("flex gap-1 justify-center items-center rounded-full h-[27.75px] text-[9.64px] flex-1", {
              "border-primary border-1 text-primary bg-white": props.version === "bordered",
              "bg-primary text-white": props.version !== "bordered"
            })}
          >
            <ShoppingBag size={12} />
            {props.buttonText ?? "Buy Product"}
          </button>
          <Link
            to={`/marketplace/product/${Math.round(Math.random() * 10)}`}
            className={cn("flex items-center justify-center rounded-full min-h-[28.92px] min-w-[28.92px] border", {
              "border-primary text-primary": props.version !== "bordered"
            })}
          >
            <span style={{ fontSize: 16 }} className="material-icons-outlined">
              north_east
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
