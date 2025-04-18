import { BellDot, ChevronDown, Menu, Moon, Search, ShoppingCart, X } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import type { AuthUserDAO, MenuDropdownProps } from "../../types";
import menu from "../utils/menu";
import cn from "../utils/cn";
import { SetStateAction, useEffect, useState } from "react";
import useActiveLink from "../hooks/useActiveLink";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const authUser = useSelector<any, AuthUserDAO>((state) => state.auth.value);
  const cartItemsLength = useSelector<any, number>((state) => state.cart.value.length);
  const requiredMenuItems = ["Dashboard", "Earn", "Advertise", "Marketplace", "Buy Followers"];
  const activeLink = useActiveLink();

  return (
    <header className="bg-gradient-to-b from-[#4B70F559] to-[#9D9D9D1A] p-4">
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <button onClick={() => setIsMobileNavOpen(true)} title="Menu" className="mobile:hidden p-2">
              <Menu size={14} />
            </button>
            <Link to="/">
              <img src="/images/logo.png" width={100} alt="Logo" />
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div>
              <BellDot size={14} />
            </div>
            <div>
              <Moon size={14} />
            </div>
            <Link
              className="inline-flex gap-1 items-center px-2 py-1 bg-white rounded-2xl relative"
              to="/marketplace/cart"
            >
              <ShoppingCart size={14} /> Cart{" "}
              {cartItemsLength ? (
                <span className="absolute h-6 w-6 rounded-full bg-primary text-white text-xs flex items-center justify-center -top-2 -right-2">
                  {cartItemsLength}
                </span>
              ) : null}
            </Link>
            <div className="flex gap-1 items-center px-2 py-1 bg-white rounded-2xl">
              <img src="/images/nigerian-flag.png" width={25} alt="Nigerian flag" /> {authUser.currency.toUpperCase()}
            </div>
            <div className="max-[500px]:hidden mobile:hidden">
              <div>
                {authUser.fname} {authUser.lname}
              </div>
              <div className="flex items-center gap-1">
                @{authUser.username} <ChevronDown size={12} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm gap-4">
          <div className="flex items-center gap-3 max-mobile:hidden">
            <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden">
              <img src={authUser.avatar ?? "/images/default-avatar"} alt="Logged in user avatar" />
            </div>
            <div>
              <div>
                {authUser.fname} {authUser.lname}
              </div>
              <div className="flex items-center gap-1">
                @{authUser.username} <ChevronDown size={12} />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <nav
              role="navigation"
              className="flex items-center justify-between px-3 py-1 rounded-full border-zinc-800 border-b-1 max-[633px]:hidden"
            >
              {menu.map((menuItem) =>
                requiredMenuItems.includes(menuItem.label) ? (
                  menuItem.options ? (
                    <MenuOptionDropdown {...menuItem} setIsMenuOpen={setIsMobileNavOpen} key={menuItem.label} />
                  ) : (
                    <Link
                      key={menuItem.label}
                      className={cn("flex items-center gap-3 px-3 py-1.5 rounded-xl", {
                        "bg-primary text-white": activeLink === menuItem.path
                      })}
                      to={menuItem.path}
                    >
                      {menuItem.icon} {menuItem.label}
                    </Link>
                  )
                ) : null
              )}
            </nav>

            <div>
              <form className="bg-white py-2 px-8 rounded-full shadow-sm md:max-w-sm flex items-center gap-4">
                <input className="flex-1 min-w-0 max-w-none outline-none" type="text" />
                <button title="Search">
                  <Search size={12} />
                </button>
                <button type="button" title="Filter" className="text-primary">
                  <span style={{ fontSize: 14 }} className="material-icons-outlined">
                    tune
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <MobileNav setIsOpen={setIsMobileNavOpen} isOpen={isMobileNavOpen} />
    </header>
  );
}

function MobileNav({ setIsOpen, isOpen }: { setIsOpen: React.Dispatch<SetStateAction<boolean>>; isOpen: boolean }) {
  const activeLink = useActiveLink();

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        data-show={isOpen || undefined}
        className={cn("fixed inset-0 backdrop-blur-sm bg-black/20 z-40 hidden", {
          block: isOpen
        })}
      ></div>
      <nav
        data-open={isOpen || undefined}
        className={cn(
          "fixed top-0 left-0 bottom-0 z-[100] mobile:hidden bg-white pt-3 pb-6 space-y-2 shadow-lg -translate-x-full transition-transform",
          {
            "translate-x-0": isOpen
          }
        )}
      >
        <button className="float-right px-4" onClick={() => setIsOpen(false)} title="Close">
          <X size={16} />
        </button>
        <div className="clear-right"></div>
        <div className="space-y-2 px-6">
          {menu.map((menuItem) =>
            menuItem.options ? (
              <MenuOptionDropdown {...menuItem} setIsMenuOpen={setIsOpen} />
            ) : (
              <Link
                key={menuItem.label}
                onClick={() => setTimeout(() => setIsOpen(false), 600)}
                className={cn("flex items-center gap-3 px-3 py-1.5 rounded-xl", {
                  "bg-primary text-white": activeLink === menuItem.path
                })}
                to={menuItem.path}
              >
                {menuItem.icon} {menuItem.label}
              </Link>
            )
          )}
        </div>
      </nav>
    </>
  );
}

function MenuOptionDropdown(props: MenuDropdownProps & { setIsMenuOpen?: React.Dispatch<SetStateAction<boolean>> }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const activeLink = useActiveLink();

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div aria-haspopup="menu" className="relative">
      <div
        className={cn("flex items-center w-fit rounded-xl", {
          "bg-primary text-white": activeLink === props.basePath
        })}
      >
        <Link
          onClick={() => props.setIsMenuOpen && props.setIsMenuOpen(false)}
          to={props.basePath}
          className="flex items-center gap-2 px-3 py-1.5"
        >
          {props.icon} {props.label}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn("flex items-center transition-all active:scale-90 px-2", {
            "rotate-180": isOpen
          })}
        >
          <ChevronDown size={13} />
        </button>
      </div>

      {isOpen && <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>}

      <div
        aria-live="polite"
        className={cn(
          "absolute [top:calc(100%+2px)] p-2 rounded-xl bg-white shadow-lg text-black text-xs transition-all [transform-origin:_top]",
          {
            "opacity-0 overflow-hidden scale-0": !isOpen
          }
        )}
      >
        {props.options.map((option) => (
          <Link
            key={option.label}
            onClick={() => (setIsOpen(false), props.setIsMenuOpen && props.setIsMenuOpen(false))}
            className={cn("flex items-center gap-3 px-3 py-1.5 rounded-xl whitespace-nowrap", {
              "bg-primary text-white": option.path == pathname,
              "hover:text-primary": option.path != pathname
            })}
            to={option.path}
          >
            {option.icon} {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
