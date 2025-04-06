import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import cn from "../../utils/cn";
import TaskCard from "../../components/TaskCard";
import { useSelector } from "react-redux";
import { Task } from "../../../types";

export default function Adverts() {
  return (
    <div className="bg-white shadow p-4 space-y-12 min-h-full">
      <div className="flex">
        <div className="flex gap-4 flex-1">
          <Link to="/earn">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Turn Your Social Media Into an Earning Platform</h1>
            <p className="text-sm text-zinc-500">Pick from a variety of tasks or start posting adverts for rewards.</p>
          </div>
        </div>

        <div className="max-sm:hidden">
          <img src="/images/0c3e01cf-a60e-4e42-8a1d-6ba21eb32eeb-removebg-preview 2.png" width={180} alt="" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 shadow bg-white rounded-3xl space-y-3">
          <div className="max-w-sm mx-auto flex items-center gap-4 p-4 bg-primary rounded-3xl border-b border-b-black">
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

        <TasksTab />
      </div>
    </div>
  );
}

function TasksTab() {
  const categories = [
    { key: "social_media", label: "Social Media Tasks" },
    { key: "video_marketting", label: "Video Marketting" },
    { key: "micro_influence", label: "Micro-Influence Tasks" },
    { key: "promotion", label: "Promotion Tasks" },
    { key: "telegram", label: "Telegram Tasks" }
  ];
  const [currentCategory, setCurrentCategory] = useState<
    "social_media" | "video_marketting" | "micro_influence" | "promotion" | "telegram"
  >("social_media");

  return (
    <div className="space-y-6">
      <p className="text-sm text-center">
        Earn steady income by promoting businesses and top brands on your social media platforms. To qualify for posting
        adverts on Facebook, Instagram, Twitter or TikTok, your account must have a minimum if 1,000 followers.
      </p>

      <div className="flex gap-2 max-w-full overflow-x-auto items-center w-fit mx-auto border border-zinc-300 p-2 rounded-2xl">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setCurrentCategory(category.key as typeof currentCategory)}
            className={cn("p-1.5 rounded-lg text-sm whitespace-nowrap", {
              "bg-primary text-white transition-all active:scale-x-90": currentCategory === category.key,
              "bg-black/15 border border-zinc-400": currentCategory !== category.key
            })}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Link to="/earn/tasks-history" className="text-primary text-sm hover:bg-primary/20 p-2 rounded-full">
          Check task history
        </Link>
      </div>

      <div>
        <img src="/images/Group 1000004395.png" alt="" />
      </div>

      <AvailableTasks />
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
    </div>
  );
}
