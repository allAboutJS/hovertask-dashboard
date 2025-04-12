import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import TaskCard from "../../components/TaskCard";
import { useSelector } from "react-redux";
import { Task } from "../../../types";
import LinkAccountsModal from "../../components/LinkAccountsModal";

export default function Adverts() {
  return (
    <div className="mobile:grid grid-cols-[1fr_200px] gap-4 min-h-full">
      <div className="bg-white shadow p-4 space-y-12 min-h-full">
        <div className="flex">
          <div className="flex gap-4 flex-1">
            <Link to="/earn">
              <ArrowLeft />
            </Link>

            <div className="space-y-2">
              <h1 className="text-xl font-semibold">Turn Your Social Media Into an Earning Platform</h1>
              <p className="text-sm text-zinc-500">
                Pick from a variety of tasks or start posting adverts for rewards.
              </p>
            </div>
          </div>

          <div className="max-sm:hidden">
            <img src="/images/0c3e01cf-a60e-4e42-8a1d-6ba21eb32eeb-removebg-preview 2.png" width={180} alt="" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 shadow bg-white rounded-3xl space-y-3">
            <div className="max-w-sm mx-auto flex items-center gap-4 p-4 bg-primary rounded-3xl border-b border-b-black overflow-x-auto">
              <Link
                to="/earn/tasks"
                className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl whitespace-nowrap text-sm active:scale-95 transition-all"
              >
                Perform Tasks
              </Link>
              <button className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl whitespace-nowrap text-sm active:scale-95 transition-all bg-white">
                Post Adverts to Earn Money
              </button>
            </div>

            <p className="text-center text-sm text-zinc-700">
              Get paid to post adverts for businesses and top brands. Share with your followers and earn effortlessly.
            </p>
          </div>
        </div>

        <div className="p-6 shadow bg-white rounded-3xl space-y-3 text-center">
          <h3 className="text-xl font-semibold">Link Your Social Media Accounts</h3>
          <p className="text-sm">
            You need to link your Facebook account to website before you can start earning with your social media
            account. Click the button below to link your account now.
          </p>
          <Link
            className="border-primary border rounded-xl text-sm text-primary text-center whitespace-nowrap h-fit p-3 -rotate-2 transition-all hover:rotate-0 hover:bg-primary/10 max-sm:flex-1 block w-fit mx-auto"
            to="/earn/link-accounts"
          >
            Link Your Account
          </Link>
        </div>

        <hr className="max-w-md mx-auto" />

        <div className="text-sm space-y-3">
          <h3 className="text-primary border-b border-b-primary px-4 py-1 rounded-full w-fit">Are You Eligible?</h3>

          <ul className="list-disc ml-4">
            <li>Minimum of 1,000 followers on your Facebook, Instagram, Twitter or TikTok accounts.</li>
            <li>Active and engaging account with regular posts.</li>
          </ul>
        </div>

        <AvailableJobs />

        <LinkAccountsModal />
      </div>
    </div>
  );
}

function AvailableJobs() {
  const tasks = useSelector<any, Task[] | null>((state: any) => state.tasks.value);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">New Available Jobs</h2>

      <div className="space-y-4">
        {tasks?.map((task) => (
          <TaskCard {...task} key={task.user_id} />
        ))}
      </div>
    </div>
  );
}
