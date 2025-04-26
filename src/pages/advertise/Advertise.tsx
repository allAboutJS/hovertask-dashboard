import { ArrowLeft, Globe, History, MessageCircleIcon, ThumbsUpIcon, TwitterIcon } from "lucide-react";
import { Link } from "react-router";
import cn from "../../utils/cn";
import { useDisclosure } from "@heroui/react";
import { AuthUserDAO } from "../../../types";
import { useSelector } from "react-redux";
import InsufficientFundsModal from "../../components/InsufficientFundsModal";

export default function AdvertisePage() {
  const modalProps = useDisclosure();
  const authUser = useSelector<any, AuthUserDAO>((state: any) => state.auth.value);
  const advertFeatures = [
    {
      rotateClassName: "rotate-[3deg]",
      index: 1,
      title: "Massive Advert Views",
      description: "Get exposure with over 10 million monthly visits, driving faster sales.",
      icon: <Globe />
    },
    {
      rotateClassName: "rotate-[-3deg]",
      index: 2,
      title: "Social Media Boost",
      description: "Reach wider audiences on platforms like Facebook, Instagram, and Twitter.",
      icon: <TwitterIcon />
    },
    {
      rotateClassName: "rotate-[-3deg]",
      index: 3,
      title: "Direct Buyer Interaction",
      description: "Chat with buyers via in-app messages, WhatsApp, or calls.",
      icon: <MessageCircleIcon />
    },
    {
      rotateClassName: "rotate-[3deg]",
      index: 4,
      title: "Affordable Costs",
      description: "Reach wider audiences on platforms like Facebook, Instagram, and Twitter.",
      icon: <ThumbsUpIcon />
    }
  ];
  const adverts = [
    {
      platform: "WhatsApp",
      iconUrl: "/images/logos_whatsapp-icon.png",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      description:
        "Reach more audiences by having people post your adverts directly on their WhatsApp. Amplify your visibility and boost engagement effortlessly.",
      price: "₦100"
    },
    {
      platform: "Facebook",
      iconUrl: "/images/devicon_facebook.png",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      description:
        "Reach more audiences by having people post your adverts directly on their Facebook. Amplify your visibility and boost engagement effortlessly.",
      price: "₦150"
    },
    {
      platform: "Instagram",
      iconUrl: "/images/skill-icons_instagram.png",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-300",
      description:
        "Reach more audiences by having people post your adverts directly on their Instagram. Amplify your visibility and boost engagement effortlessly.",
      price: "₦150"
    },
    {
      platform: "X",
      iconUrl: "/images/hugeicons_new-twitter.png",
      bgColor: "bg-neutral-50",
      borderColor: "border-neutral-300",
      description:
        "Reach more audiences by having people post your adverts directly on their X. Amplify your visibility and boost engagement effortlessly.",
      price: "₦150"
    },
    {
      platform: "TikTok",
      iconUrl: "/images/logos_tiktok-icon.png",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      description:
        "Reach more audiences by having people post your adverts directly on their TikTok. Amplify your visibility and boost engagement effortlessly.",
      price: "₦150"
    }
  ];

  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-16 overflow-hidden min-h-full">
        <Hero />

        <div className="space-y-6">
          <p className="text-sm text-center">
            Advertise your products and services to thousands of active users on our website and mobile app every day.
            Her's why placing your adverts on Hovertask Market Place is the best decision for your business:
          </p>

          <div className="grid grid-cols-2 gap-4 gap-y-8">
            {advertFeatures.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="w-fit mx-auto flex items-center gap-2 py-2 px-4 rounded-full border-b border-zinc-400 -rotate-6">
            <History size={18} /> Advert Duration
          </div>

          <p className="bg-primary text-white p-4 rounded-2xl text-sm text-center">
            Your advert will stay visible on our platform for 1 month. After this period, you'll need to renew by
            placing another advert to maintain visibility.
          </p>

          <p className="text-sm text-center font-medium">
            Take advantage of Hovertask today and sell faster than ever!
          </p>

          <div className="flex items-center gap-4 justify-between py-2 px-6 border border-zinc-400 rounded-full max-w-sm mx-auto">
            <span className="text-xl font-medium">₦1,000</span>
            <button
              onClick={() => authUser.balance >= 1000 || modalProps.onOpen()}
              className="px-4 py-2 rounded-2xl text-sm text-white bg-primary active:scale-95 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>

        <InsufficientFundsModal {...modalProps} />

        <div className="space-y-6">
          <div className="max-w-sm mx-auto flex items-center gap-4 p-4 rounded-3xl border-b border-primary overflow-x-auto">
            <button className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl whitespace-nowrap text-sm active:scale-95 transition-all bg-primary text-white">
              Advert Tasks
            </button>
            <Link
              to="/advertise/engagement-tasks"
              className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl whitespace-nowrap text-sm active:scale-95 transition-all text-primary"
            >
              Engagement Tasks
            </Link>
          </div>

          <p className="text-sm text-center">
            Pay users to perform specific actions that increase the reach and visibility of your content. From likes to
            shares, get the engagement you need to grow your brand.
          </p>

          <div className="space-y-4">
            {adverts.map((ad, index) => (
              <AdvertCard key={index} {...ad} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-gradient-to-r from-white via-primary/30 to-white p-4 rounded-2xl">
      <div className="flex gap-6 max-mobile:gap-4">
        <Link to="/">
          <ArrowLeft />
        </Link>

        <div className="text-center">
          <h1 className="font-semibold text-xl text-primary">Advertise anything Faster on Hovertask Marketplace</h1>
          <p className="text-sm">
            Promote your products and services to thousands of daily users on our platform and reach a wider audience
            across social media. Boost your sales and grow your business today!
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <img src="/images/7_Places_To_Shop_Online_On_A_Budget-removebg-preview 2.png" width={250} alt="" />
      </div>
    </div>
  );
}

function FeatureCard({
  rotateClassName,
  index,
  icon,
  title,
  description
}: {
  rotateClassName: string;
  index: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative bg-primary/10 p-4 rounded-2xl text-sm text-center flex flex-col items-center justify-center gap-1",
        rotateClassName
      )}
    >
      <span className="absolute text-xs top-4 left-4">{index}.</span>
      <div className="text-primary">{icon}</div>
      <h4 className="text-base text-primary font-semibold">{title}</h4>
      <p className="text-center">{description}</p>
    </div>
  );
}

function AdvertCard({ platform, description, price, iconUrl, bgColor, borderColor }: any) {
  return (
    <div className={`flex items-center gap-4 p-4 max-sm:flex-col rounded-xl border ${borderColor} ${bgColor}`}>
      <img src={iconUrl} />
      <div className="flex-1">
        <h3 className="font-semibold text-sm sm:text-base">Get Your Adverts on {platform}</h3>
        <p className="text-xs sm:text-sm text-gray-700 mt-1">{description}</p>
        <p className="text-xs font-medium text-black mt-2">
          <span className="font-bold">Price:</span> {price} per Advert Post
        </p>
      </div>
      <Link
        to="post-advert"
        className="bg-primary text-white text-xs px-4 py-2 rounded-full hover:bg-primary/90 transition"
      >
        Create Advert
      </Link>
    </div>
  );
}
