import { useDispatch, useSelector } from "react-redux";
import type { AuthUserDAO, Product, Task } from "../../types";
import { DollarSign, Wallet } from "lucide-react";
import { setAuthUserFields } from "../redux/slices/auth";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import { Modal, ModalBody, ModalContent } from "@heroui/react";

export default function Dashboard() {
  const authUser = useSelector<any, AuthUserDAO | null>((state) => state.auth.value);

  return (
    <div className="px-4 py-6 space-y-10 bg-white shadow min-h-full">
      <Greeting lname={authUser?.lname} how_you_want_to_use={authUser?.how_you_want_to_use} />
      <BalanceBoard balance={authUser?.balance} />
      <WelcomeMessage email_verified_at={authUser?.email_verified_at} />
      <AvailableTasks />
      <Carousel>
        <img src="/images/Group 1000004390.png" alt="" />
        <img src="/images/Group 1000004393.png" alt="" />
        <img src="/images/Group 1000004395.png" alt="" />
      </Carousel>
      <AdBanner />
      <PopularProducts />
    </div>
  );
}

export const products: Product[] = [
  {
    name: "Wireless Noise Cancelling Headphones",
    price: 199.99,
    discount: 20,
    reviews_count: 1245,
    rating: 4.6,
    available_units: 35,
    featured_image_url: "https://example.com/images/headphones.jpg"
  },
  {
    name: "Smart LED Desk Lamp",
    price: 49.99,
    discount: 10,
    reviews_count: 328,
    rating: 4.3,
    available_units: 87,
    featured_image_url: "https://example.com/images/desk-lamp.jpg"
  },
  {
    name: "Ergonomic Office Chair",
    price: 299.99,
    discount: 25,
    reviews_count: 892,
    rating: 4.8,
    available_units: 12,
    featured_image_url: "https://example.com/images/office-chair.jpg"
  },
  {
    name: "Gaming Mechanical Keyboard",
    price: 89.99,
    discount: 15,
    reviews_count: 645,
    rating: 4.5,
    available_units: 56,
    featured_image_url: "https://example.com/images/mechanical-keyboard.jpg"
  },
  {
    name: "Ultra HD 4K Monitor - 27 inch",
    price: 399.99,
    discount: 30,
    reviews_count: 1023,
    rating: 4.7,
    available_units: 22,
    featured_image_url: "https://example.com/images/4k-monitor.jpg"
  }
];

function HorizintalLine() {
  return <div className="self-stretch border-r border-1 border-zinc-300"></div>;
}

function Greeting({ lname, how_you_want_to_use }: { lname?: string; how_you_want_to_use?: string }) {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl">
        Welcome back, <br />
        <span className="capitalize font-semibold">{lname}</span>
      </h1>
      <button className="bg-[#10AF88] text-white py-1.5 px-3 rounded-lg inline-flex items-center gap-2 text-sm h-fit">
        <DollarSign size={14} /> <span className="capitalize">{how_you_want_to_use}</span>{" "}
        <span style={{ fontSize: 16 }} className="material-icons-outlined">
          arrow_drop_down
        </span>
      </button>
    </div>
  );
}

function BalanceBoard({ balance }: { balance?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">Total Balance</span>
        <button className="flex items-center gap-1 px-3 py-1 border-b rounded-full border-gray-600 text-xs">
          This Week
          <span style={{ fontSize: 16 }} className="material-icons-outlined">
            arrow_drop_down
          </span>
        </button>
      </div>

      <div className="flex items-center gap-12 flex-wrap">
        <div className="text-2xl font-bold">₦{balance?.toFixed(2).toLocaleString()}</div>
        <div className="flex gap-2 text-sm flex-wrap">
          <Link
            to="/fund-wallet"
            className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-full hover:bg-primary/80 transition-colors"
          >
            <Wallet size={16} /> Fund
          </Link>
          <Link
            to="/withdraw"
            className="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-full transition-colors hover:bg-primary/10"
          >
            <Wallet size={16} /> Withdraw
          </Link>
        </div>
      </div>

      <div className="flex max-sm:flex-col justify-between sm:items-center gap-4 bg-gradient-to-b from-white to-primary/10 p-8 py-12 rounded-2xl shadow">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">Earned</span>
            <button className="flex items-center gap-1 px-3 py-1 border-b rounded-full border-gray-600 text-xs">
              This Week
              <span style={{ fontSize: 16 }} className="material-icons-outlined">
                arrow_drop_down
              </span>
            </button>
          </div>
          <p className="text-xl font-semibold">₦{balance?.toFixed(2).toLocaleString()}</p>
        </div>

        <HorizintalLine />

        <div className="space-y-3">
          <p className="font-medium">Pending</p>
          <p className="text-xl font-semibold">₦{balance?.toFixed(2).toLocaleString()}</p>
        </div>

        <HorizintalLine />

        <div className="space-y-3">
          <p className="font-medium">Spent</p>
          <p className="text-xl font-semibold">₦ {balance?.toFixed(2).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function WelcomeMessage({ email_verified_at }: { email_verified_at?: string | null }) {
  const dispatch = useDispatch();

  return email_verified_at ? (
    <div className="text-center text-sm space-y-2">
      <h2 className="text-xl font-semibold text-success">Welcome To The Website</h2>
      <p>
        Your membership has been successfully activated. Start earning daily by posting adverts and completing tasks on
        your social media accounts.
      </p>
    </div>
  ) : (
    <div className="text-center text-sm space-y-2">
      <h2 className="text-lg font-semibold">Welcome To The Website</h2>
      <p>
        Earn by completing simple social media tasks or advertise your products to the right audience. Kindly verify
        your account
      </p>
      <button
        onClick={() => dispatch(setAuthUserFields({ email_verified_at: new Date().toUTCString() }))}
        className="text-danger underline hover:bg-danger/20 px-4 py-1.5 rounded-full block w-fit mx-auto"
      >
        Kindly Verify Your Account
      </button>
      <p>
        Get access to all the services with just ₦1,000 <span className="font-semibold">ONLY</span> verify your account
        now!
      </p>
    </div>
  );
}

function AvailableTasks() {
  const tasks = useSelector<any, Task[] | null>((state: any) => state.tasks.value);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">New Available Tasks</h2>

      <div className="space-y-4">
        {tasks?.map((task) => (
          <TaskCard {...task} key={task.user_id} />
        ))}
      </div>

      <Link
        to="/earn/tasks"
        className="block w-fit mx-auto px-4 py-2 rounded-full border border-primary text-sm text-primary transition-colors hover:bg-primary/20"
      >
        See all tasks
      </Link>
    </div>
  );
}

function PopularProducts() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Popular Products</h2>

      <div className="flex gap-4 overflow-x-auto bg-primary/30 p-4 rounded-3xl w-full">
        {products.map((product) => (
          <ProductCard {...product} key={product.name} version="bordered" buttonText="Check Product" />
        ))}
      </div>
    </div>
  );
}

function AdBanner() {
  return (
    <div className="relative">
      <img src="/images/buy-sell-bg.png" alt="" />
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-white text-center">
        Buy & Sell With Ease
      </p>
    </div>
  );
}

function BecomeMemberModal() {
  return (
    <Modal>
      <ModalContent>
        {() => (
          <ModalBody>
            <img src="/images/Media_Sosial_Pictures___Freepik-removebg-preview 2.png" alt="" />
            <h3>Get Paid For Posting Adverts and Engaging on Your Social Media</h3>
            <p>
              Earn steady income by reselling products and posting adverts, performing social media engaging tasks for
              businesses and top brands on your social media account
            </p>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
