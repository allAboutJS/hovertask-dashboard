import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import useWindowDimensions from "../../hooks/useWindowDimesions";

export default function Earn() {
  const earningOptions = [
    {
      title: "Perform Tasks or Post Adverts",
      description: "Earn by completing simple taks like social media engagement, video marketting and more",
      imageUrl:
        "/images/Premium_Vector___Digital_marketing_3d_render_illustration_Social_Media_Marketing_Promotion_and_Internet_advertising_concept_3d_vector_illustration-removebg-preview 1.png",
      linkText: "Explore tasks and adverts",
      linkUrl: "/earn/tasks",
      number: 1
    },
    {
      title: "Resell Products For Commision",
      description: "Sell products to your network and earn big commisions on every sale",
      imageUrl:
        "/images/Premium_Vector___Digital_marketing_3d_render_illustration_Social_Media_Marketing_Promotion_and_Internet_advertising_concept_3d_vector_illustration-removebg-preview 2.png",
      linkText: "Start Earning by Reselling",
      linkUrl: "/earn/resell",
      number: 2
    }
  ];
  return (
    <div className="bg-white shadow p-4 pt-12 space-y-12 min-h-full">
      <div className="bg-primary/20 p-6 rounded-3xl relative">
        <div className="flex gap-4 max-w-xs">
          <Link to="/">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Choose Your Earning Path</h1>
            <p className="text-sm text-zinc-500">Select how want to earn and start making money today</p>
          </div>
        </div>

        <div className="max-w-md flex justify-center">
          <img
            width={150}
            src="/images/3D_rendering_of_new_1000_Nigerian_naira_notes_flying_in_different_angles_and_orientations_isolated_on_transparent_background-removebg-preview 1.png"
            alt=""
          />
        </div>

        <div className="absolute max-mobile:hidden right-4 -top-16">
          <img src="/images/Social_Media_-_Sandrin_Design_-_11_-_sandrin__-removebg-preview 1.png" width={280} alt="" />
        </div>
      </div>

      <div className="space-y-4 bg-primary/5 rounded-3xl p-2">
        {earningOptions.map((option) => (
          <EarningOption key={option.title} {...option} />
        ))}
      </div>

      <div className="sm:grid grid-cols-2 p-4 space-x-4 space-y-8 shadow rounded-3xl">
        <BenefitOfPerformingTasks />
        <OverviewOfCommissionsFromReselling />
      </div>

      <EarnByResellingModal />
    </div>
  );
}

function EarningOption(props: {
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkUrl: string;
  number: number;
}) {
  return (
    <div className="flex max-sm:flex-wrap justify-between gap-4 shadow-inner border border-zinc-300 p-6 rounded-3xl bg-white items-center">
      <span className="bg-primary px-8 py-2 rounded-[60%] text-white h-fit font-bold">{props.number}</span>
      <div className="text-center">
        <p className="font-semibold">{props.title}</p>
        <p className="text-sm text-zinc-800">{props.description}</p>
      </div>
      <img className="max-sm:w-full" src={props.imageUrl} width={100} alt="" />
      <Link
        className="border-primary border rounded-xl text-sm text-primary text-center whitespace-nowrap h-fit px-4 py-2 -rotate-2 transition-all hover:rotate-0 hover:bg-primary/10 max-sm:flex-1"
        to={props.linkUrl}
      >
        {props.linkText}
      </Link>
    </div>
  );
}

function BenefitOfPerformingTasks() {
  return (
    <div>
      <h3 className="font-medium px-8 py-3 rounded-[60%] text-primary border border-primary text-center text-sm mb-2">
        Benefits of Performing Tasks
      </h3>

      <div className="text-sm">
        <p>Quick and Easy Earnings:</p>
        <ul className="list-disc ml-4">
          <li>Tasks are easy to complete and require minimal effort.</li>
          <li>Suitable for all skill levels, from beginner to experienced users.</li>
        </ul>
        <p>Flexible Schedule:</p>
        <ul className="list-disc ml-4">
          <li>Complete tasks at your own pace and on your on time.</li>
          <li>No fixed working hours, providing total freedom.</li>
        </ul>
        <p>Instant Rewards</p>
        <ul className="list-disc ml-4">
          <li>Get paid as soon as tasks are verified.</li>
          <li>Enjoy immediate feedback on your efforts.</li>
        </ul>
        <p>Accessible Opportunities</p>
        <ul className="list-disc ml-4">
          <li>Available to anyone with a smartphone or computer, and internet connection.</li>
          <li>No special equipment or training required.</li>
        </ul>
      </div>
    </div>
  );
}

function OverviewOfCommissionsFromReselling() {
  return (
    <div>
      <h3 className="font-medium px-8 py-3 rounded-[60%] text-primary border border-primary text-center text-sm mb-2">
        Overview of Commisins from Reslling
      </h3>

      <div className="text-sm">
        <p>High Commission Rates:</p>
        <ul className="list-disc ml-4">
          <li>
            Earn competitive commissions on each productsold, with rates ranging from 10% to 50% depending on the
            product.
          </li>
        </ul>
        <p>Wide Product Selection:</p>
        <ul className="list-disc ml-4">
          <li>
            Access a diverse catalog of high-demanding products across categories such as fashion, electronics, and home
            essentials.
          </li>
        </ul>
        <p>Flexible Earning Potential:</p>
        <ul className="list-disc ml-4">
          <li>The more you sell, the more you earn - no earning caps!</li>
          <li>Leverage your network to maximize income.</li>
        </ul>
        <p>Simple Reselling Process:</p>
        <ul className="list-disc ml-4">
          <li>Share a unique affiliate link to promote products.</li>
          <li>No need to manage inventory or handle logistics.</li>
        </ul>
      </div>
    </div>
  );
}

function EarnByResellingModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { innerWidth } = useWindowDimensions();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior={innerWidth < 640 ? "inside" : "outside"}
    >
      <ModalContent>
        {() => (
          <ModalBody className="space-y-3 pb-4">
            <div>
              <img
                src="/images/7_Places_To_Shop_Online_On_A_Budget-removebg-preview 1.png"
                alt=""
                className="block mx-auto"
                width={200}
              />
              <h4 className="font-semibold text-lg text-center">Resell Products for High Commissions</h4>
              <p className="text-sm text-zinc-700 text-center">
                Leverage our wide-ranging catalog of high-demand products to earn big commissions. Start reselling today
                and watch your income grow effortlessly!
              </p>
            </div>

            <div className="bg-zinc-50 space-y-2 rounded-3xl p-2">
              <p className="font-semibold text-center">Getting Started is Easy</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-black rotate-12 text-center">
                    1.
                  </div>
                  <p className="font-medium">Browse the Product Catalog:</p>
                  <ul className="list-disc ml-4 text-sm">
                    <li>
                      Explore our curated collection of trending products and services. Choose items with the highest
                      earning potential.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-black rotate-12 text-center">
                    2.
                  </div>
                  <p className="font-medium">Share Your Unique Affiliate Link:</p>
                  <ul className="list-disc ml-4 text-sm">
                    <li>
                      Use our easy-to-generate reseller links to share products on your social media platforms,
                      WhatsApp, or personal networks.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-black rotate-12 text-center">
                    3.
                  </div>
                  <p className="font-medium">Earn Commissions on Sales:</p>
                  <ul className="list-disc ml-4 text-sm">
                    <li>Receive instant earnings every time a customer makes a purchase using your link.</li>
                  </ul>
                </div>
              </div>
            </div>
            <Link
              to="/earn/resell"
              className="p-2 rounded-xl text-sm transition-all bg-primary text-white active:scale-95 block w-fit mx-auto"
            >
              Start Reselling Now
            </Link>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
