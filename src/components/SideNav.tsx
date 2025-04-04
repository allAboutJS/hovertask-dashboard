import { Link, useLocation } from "react-router";
import menu from "../utils/menu";
import cn from "../utils/cn";

export default function SideNav() {
  const { pathname } = useLocation();

  return (
    <div className="max-w-[243px] space-y-8 text-sm">
      <div className="bg-primary py-20 pl-6 rounded-3xl text-white">
        <div className="border-1 border-[#FFFFFF33] pl-4 pr-2 py-10 rounded-2xl space-y-3">
          {menu.map((menuItem) => {
            return (
              <Link
                className={cn("flex items-center gap-3 px-3 py-1.5 rounded-xl w-fit", {
                  "bg-white text-primary":
                    (pathname === "/" && menuItem.label === "Dashboard") ||
                    (menuItem.label !== "Dashboard" && pathname.includes(menuItem.path))
                })}
                key={menuItem.label}
                to={menuItem.path}
              >
                {menuItem.icon} {menuItem.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <Link className="border-1 border-zinc-400 rounded-2xl p-4 block" to="/marketplace">
          <img
            src="/images/Online_Shopping_Concept__Mobile_Phone_or_Smartphone_with_Cart_an_Stock_Illustration_-_Illustration_of_price__internet__60305985-removebg-preview 1.png"
            alt=""
          />
          <h5 className="font-semibold">Explore Our Marketplace</h5>
          <p className="text-xs">
            Buy and sell products and services effortlessly. Connect with trusted sellers and buyers to meet your needs
            today!
          </p>
        </Link>
        <Link className="border-1 border-zinc-400 rounded-2xl p-4 block" to="/earn/resell">
          <img
            src="/images/Illustration_of_Nigerian_naira_notes_inside_mobile_phone_isolated_on_transparent_background-removebg-preview 1.png"
            alt=""
          />
          <h5 className="font-semibold">Earn By Reselling Products</h5>
          <p className="text-xs">Choose high-demand products and enjoy attractive commissions</p>
        </Link>
      </div>
    </div>
  );
}
