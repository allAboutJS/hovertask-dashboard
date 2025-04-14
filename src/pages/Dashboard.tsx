import { useDispatch, useSelector } from "react-redux";
import type { AuthUserDAO, Task } from "../../types";
import { DollarSign, Wallet } from "lucide-react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import Carousel from "../components/Carousel";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { useState, useEffect } from "react";
import { setTasks } from "../redux/slices/tasks";
import getTasks from "../utils/getTasks";
import Loading from "../components/Loading";
import TaskCard from "../components/TaskCard";
import useProducts from "../hooks/useProducts";
import EmptyMapErr from "../components/EmptyMapErr";
import sendVerificationEmail from "../utils/sendVerificationEmail";

export default function Dashboard() {
  const authUser = useSelector<any, AuthUserDAO>((state) => state.auth.value);

  return (
    <div className="mobile:grid grid-cols-[1fr_200px] gap-4 min-h-full">
      <div className="px-4 py-6 space-y-10 bg-white shadow min-h-full max-w-full overflow-x-hidden">
        <Greeting lname={authUser.lname} how_you_want_to_use={authUser.how_you_want_to_use} />
        <BalanceBoard balance={authUser.balance} />
        <WelcomeMessage email_verified_at={authUser.email_verified_at} />
        <AvailableTasks />
        <Carousel>
          <img src="/images/Group 1000004390.png" alt="" />
          <img src="/images/Group 1000004393.png" alt="" />
          <img src="/images/Group 1000004395.png" alt="" />
        </Carousel>
        <AdBanner />
        <PopularProducts />
        <BecomeMemberModal />
      </div>
    </div>
  );
}

function HorizontalLine() {
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

        <HorizontalLine />

        <div className="space-y-3">
          <p className="font-medium">Pending</p>
          <p className="text-xl font-semibold">₦{balance?.toFixed(2).toLocaleString()}</p>
        </div>

        <HorizontalLine />

        <div className="space-y-3">
          <p className="font-medium">Spent</p>
          <p className="text-xl font-semibold">₦ {balance?.toFixed(2).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function WelcomeMessage({ email_verified_at }: { email_verified_at?: string | null }) {
  const email = useSelector<any, string>((state) => state.auth.value.email);

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
        onClick={() => sendVerificationEmail(email)}
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
  const [tasksFetchStatus, setTaskFetchStatus] = useState<"pending" | "done" | "failed">("pending");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        if (tasks === null) dispatch(setTasks(await getTasks()));
        setTaskFetchStatus("done");
      } catch {
        setTaskFetchStatus("failed");
      }
    })();
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">New Available Tasks</h2>

      {tasksFetchStatus === "pending" && <Loading />}
      {tasksFetchStatus === "done" && (
        <div className="space-y-4">
          {tasks?.length ? (
            tasks?.slice(4).map((task) => <TaskCard {...task} key={task.user_id} />)
          ) : (
            <div className="text-center flex flex-col items-center">
              <img src="/images/iconoir_info-empty.png" width={80} alt="" />
              <p>There are no tasks available at the moment</p>
            </div>
          )}
        </div>
      )}

      {tasks?.length ? (
        <Link
          to="/earn/tasks"
          className="block w-fit mx-auto px-4 py-2 rounded-full border border-primary text-sm text-primary transition-colors hover:bg-primary/20"
        >
          See all tasks
        </Link>
      ) : null}
    </div>
  );
}

function PopularProducts() {
  const { products, reload } = useProducts();

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Popular Products</h2>

      {products ? (
        products.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto bg-primary/30 p-4 rounded-3xl w-full">
            {products?.map((product) => (
              <ProductCard {...product} key={product.name} version="bordered" buttonText="Check Product" />
            ))}
          </div>
        ) : (
          <EmptyMapErr
            description="No products are available yet"
            buttonInnerText="Reload Products"
            onButtonClick={reload}
          />
        )
      ) : (
        <Loading />
      )}
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
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <ModalBody className="mb-4">
            <img
              width={150}
              src="/images/Media_Sosial_Pictures___Freepik-removebg-preview 2.png"
              className="block mx-auto"
              alt=""
            />
            <h3 className="font-semibold text-lg text-center">
              Get Paid For Posting Adverts and Engaging on Your Social Media
            </h3>
            <p className="text-sm text-zinc-700 text-center">
              Earn steady income by reselling products and posting adverts, performing social media engaging tasks for
              businesses and top brands on your social media account
            </p>
            <Link
              to="/become-a-member"
              className="p-2 rounded-xl text-sm transition-all bg-primary text-white active:scale-95 block w-fit mx-auto"
            >
              Become a Member
            </Link>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
