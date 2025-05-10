import { ArrowLeft, ChevronDown, Church, Globe, Hash, LinkIcon, Speaker, User } from "lucide-react";
import { Link } from "react-router";
import Input from "../../components/Input";
import CustomSelect from "../../components/Select";
import genders from "../../utils/genders";
import states from "../../utils/states";
import { religions } from "../../utils/selectAndAutocompletOptions";
import ImageInput from "../../components/ImageInput";
import { useEffect, useState } from "react";
import cn from "../../utils/cn";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import InsufficientFundsModal from "../../components/InsufficientFundsModal";
import { type FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import apiEndpointBaseURL from "../../utils/apiEndpointBaseURL";

export default function PostAdvertPage() {
  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="space-y-16 overflow-hidden min-h-full rounded-2xl mt-4">
        <Hero />
        <div className="text-center max-w-lg mx-auto p-6">
          <h2 className="text-lg font-medium">Post a New Advert Request</h2>
          <p className="text-sm">
            Submit your advert request and receive multiple bids from bests workers ready to deliver.
          </p>
        </div>

        <AdvertRequestForm />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-gradient-to-r from-white via-primary/30 to-white px-4 pt-4 rounded-2xl">
      <div className="flex gap-6 max-mobile:gap-4">
        <Link to="/">
          <ArrowLeft />
        </Link>

        <div className="flex justify-center items-center">
          <div>
            <img
              src="/images/Premium_Photo___Composition_with_smartphone_used_for_digital_shopping_and_online_ordering-removebg-preview 2.png"
              width={250}
              alt=""
            />
          </div>
          <h1 className="text-2xl text-primary text-center">
            Advertise on <br /> Social Media
          </h1>
        </div>
      </div>
    </div>
  );
}

function AdvertRequestForm() {
  const isEngagementTask = new URLSearchParams(window.location.search).get("type") === "engagement";
  const {
    register,
    getValues,
    trigger,
    clearErrors,
    formState: { errors, isValid }
  } = useForm();
  const modalProps = useDisclosure();

  useEffect(() => {
    if (isValid) clearErrors();
  }, [isValid, clearErrors]);

  return (
    <>
      <form id="advert-form" className="p-6 space-y-6">
        <Input
          className="rounded-full bg-white"
          label={
            <div>
              <p className="font-medium">Title of advert</p>
              <p className="text-xs">Enter the title of your advert that will displayed to others.</p>
            </div>
          }
          icon={<Speaker size={16} />}
          placeholder="Enter the title of your advert"
          {...register("title", {
            required: "Enter the title of your advert",
            pattern: { value: /\w+(?:\s*.+)*/, message: "Enter a valid title." }
          })}
          errorMessage={errors.title?.message as string}
        />

        <CustomSelect
          options={[
            { key: "whatsapp", label: "WhatsApp" },
            { key: "facebook", label: "Facebook" },
            { key: "twitter", label: "Twitter" },
            { key: "tiktok", label: "TikTok" }
          ]}
          label={
            <div className="text-left">
              <p className="font-medium">Select Platform</p>
              <p className="text-xs">Choose the platform where you'd like to share or promote your content.</p>
            </div>
          }
          placeholder="Select platform"
          className="[&_button]:rounded-full max-w-[250px] [&_button]:bg-white"
          startContent={<Globe />}
          {...register("platforms", { required: "Select platform" })}
          errorMessage={errors.platforms?.message as string}
        />

        <Input
          className="max-w-[250px] rounded-full bg-white"
          label={
            <div>
              <p className="font-medium">Select Number of WhatsApp Status to Post</p>
              <p className="text-xs">Enter the number of WhatsApp status advert posts you'd like to request.</p>
            </div>
          }
          icon={<Hash size={16} />}
          placeholder="0"
          {...register("no_of_status_post", {
            required: "Enter the number of posts you want",
            pattern: { value: /^\d+$/, message: "Enter a number. No spacing required." }
          })}
          errorMessage={errors.no_of_status_post?.message as string}
        />

        <CustomSelect
          options={genders}
          label={
            <div className="text-left">
              <p className="font-medium">Select Gender</p>
              <p className="text-xs">
                Choose the target gender for your audience to ensure your advert reaches the most relevant individuals.
              </p>
            </div>
          }
          placeholder="Select gender"
          className="[&_button]:rounded-full max-w-[250px] [&_button]:bg-white"
          radius="full"
          startContent={<User />}
          {...register("gender", { required: "Select preferred gender." })}
          errorMessage={errors.gender?.message as string}
        />

        <CustomSelect
          options={states}
          label={
            <div className="text-left">
              <p className="font-medium">Select Location</p>
              <p className="text-xs">Choose the preferred location for your advert or service audience.</p>
            </div>
          }
          className="[&_button]:rounded-full [&_button]:bg-white"
          selectionMode="multiple"
          {...register("location", { required: "Select a location." })}
          errorMessage={errors.location?.message as string}
        />

        <CustomSelect
          options={religions}
          label={
            <div className="text-left">
              <p className="font-medium">Select Religion</p>
              <p className="text-xs">Choose the target religion for your audience or service.</p>
            </div>
          }
          className="[&_button]:rounded-full [&_button]:bg-white"
          selectionMode="multiple"
          placeholder="Select religion"
          startContent={<Church />}
          {...register("religion", { required: "Select preferred religion." })}
          errorMessage={errors.religion?.message as string}
        />

        {isEngagementTask && (
          <Input
            className="rounded-full bg-white"
            label={
              <div>
                <p className="font-medium">Your Social Media Post Link</p>
                <p className="text-xs">
                  Provide the link to your social media post to ensure accurate tracking and verification.
                </p>
              </div>
            }
            icon={<LinkIcon size={16} />}
            placeholder="Enter your post link"
            type="url"
            {...register("url", {
              required: "Enter the number of posts you want",
              pattern: {
                value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/gi,
                message: "Enter a valid url."
              }
            })}
            errorMessage={errors.url?.message as string}
          />
        )}

        <div className="space-y-1 text-sm">
          <label htmlFor="description" className="text-left">
            <p className="font-medium">Enter Advert Text or Caption</p>
            <p className="text-xs">Write the text or caption for your advert to grab your audience's attention.</p>
          </label>
          <textarea
            {...register("description", {
              required: "Enter task description.",
              pattern: { value: /\w+(?:\s*.+){20,}/, message: "Enter a valid description." },
              min: { value: 20, message: "Description is too short." }
            })}
            id="description"
            className="bg-white border border-zinc-300 rounded-2xl w-full h-40 focus:outline-primary p-4"
          />
          {errors.description && <small className="text-danger">{errors.description.message as string}</small>}
        </div>

        <div>
          <label htmlFor="images" className="text-left">
            <p className="font-medium text-sm">Choose Your Advert Media Upload Option</p>
            <p className="text-xs">
              Selecting the right media for your advert is essential to capturing attention and driving engagement.
              Below are the options available for uploading your media:
            </p>
          </label>

          <div className="flex gap-6 items-center">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm px-2 py-1 rounded-lg bg-primary/10 border border-primary text-primary transition-transform active:scale-95"
                htmlFor="images"
              >
                Upload video advert
              </label>
              <label
                className="text-sm px-2 py-1 rounded-lg bg-primary/10 border border-primary text-primary transition-transform active:scale-95"
                htmlFor="images"
              >
                Upload image advert
              </label>
            </div>
            <div className="max-w-[250px]">
              <ImageInput id="images" maxLength={3} required />
            </div>
          </div>
        </div>

        <SetPaymentMethod onAdvertPreviewOpen={modalProps.onOpen} isFormValid={isValid} triggerValidationFn={trigger} />

        {isValid && <AdvertSummaryModal modalProps={modalProps} getFormValue={getValues} />}
      </form>
    </>
  );
}

function SetPaymentMethod(props: {
  onAdvertPreviewOpen: () => any;
  isFormValid: boolean;
  triggerValidationFn: () => any;
}) {
  const modalProps = useDisclosure();
  const [selectedMethod, setSelectedMethod] = useState("");

  return (
    <div className="pb-12">
      <div className="flex bg-white p-4 rounded-2xl justify-between items-center">
        <PaymentMethodDropdown {...{ setSelectedMethod, selectedMethod }} />

        <div className="flex gap-6 items-center">
          <span className="font-semibold">₦1,000</span>
          <button
            type="button"
            onClick={() =>
              selectedMethod === "wallet"
                ? modalProps.onOpen()
                : props.isFormValid && selectedMethod
                ? props.onAdvertPreviewOpen()
                : !selectedMethod && props.isFormValid
                ? toast.info("Select payment method")
                : props.triggerValidationFn()
            }
            className="p-2 rounded-2xl bg-primary text-white transition-transform active:scale-95"
          >
            Continue
          </button>
        </div>

        <InsufficientFundsModal {...modalProps} />
      </div>
    </div>
  );
}

function PaymentMethodDropdown({
  selectedMethod,
  setSelectedMethod
}: {
  setSelectedMethod: React.Dispatch<React.SetStateAction<string>>;
  selectedMethod: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const paymentMethods = {
    wallet: "Pay With My Wallet",
    online: "Use Online Payment"
  };

  return (
    <div className="relative text-sm">
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0" onClick={() => setIsOpen(false)} onKeyPress={() => setIsOpen(false)} />}
      <input type="hidden" value={selectedMethod} name="payment_method" required />
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 transition-transform active:scale-95"
      >
        {selectedMethod ? paymentMethods[selectedMethod as keyof typeof paymentMethods] : "Select Payment Method"}{" "}
        <ChevronDown
          className={cn("transition-transform", {
            "rotate-180": isOpen
          })}
          size={12}
        />
      </button>
      <div
        className={cn(
          "absolute bg-white flex flex-col whitespace-nowrap transition transform [transform-origin:top_center] p-2 rounded-lg shadow text-sm space-y-1 scale-0",
          {
            "scale-1": isOpen
          }
        )}
      >
        <button
          type="button"
          className="hover:text-primary"
          onClick={() => {
            setIsOpen(false);
            setSelectedMethod("wallet");
          }}
        >
          Pay With My Wallet
        </button>
        <button
          type="button"
          className="hover:text-primary"
          onClick={() => {
            setIsOpen(false);
            setSelectedMethod("online");
          }}
        >
          Use Online Payment
        </button>
      </div>
    </div>
  );
}

function AdvertSummaryModal(props: { modalProps: ReturnType<typeof useDisclosure>; getFormValue: () => FieldValues }) {
  const { platform, title, location, no_of_status_post } = props.getFormValue();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id = useSelector<any, string>((state: any) => state.auth.value.id);
  const successModalProps = useDisclosure();

  async function simulateSubmit() {
    setIsSubmitting(true);
    try {
      const form = new FormData(document.forms["advert-form" as unknown as number]);
      form.append("user_id", id);
      const response = await fetch(apiEndpointBaseURL + "/advertise/create", {
        method: "post",
        body: form,
        headers: { authorization: `Bearer ${localStorage.getItem("auth_token")}` }
      });

      if (response.ok) successModalProps.onOpen();
    } catch {
      toast.error("Advert placement failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Modal {...props.modalProps} size="lg">
        <ModalContent>
          <ModalBody>
            <div className="text-sm p-2 flex items-end justify-between gap-4">
              <ul className="space-y-1 flex=1">
                <li>
                  <span className="font-medium">Estimated Task Cost:</span> N
                  {Number(no_of_status_post * 1000).toLocaleString()}
                </li>
                <li>
                  <span className="font-medium">Platform: </span>
                  <span className="capitalize">{platform}</span>
                </li>
                <li>
                  <span className="font-medium">Advert title: </span>
                  {title}
                </li>
                <li>
                  <span className="font-medium">Status posts needed: </span>
                  {no_of_status_post}
                </li>
                <li>
                  <span className="font-medium">Location: </span>
                  <span className="capitalize">{location?.replaceAll(",", ", ")}</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => {
                  props.modalProps.onClose();
                  simulateSubmit();
                }}
                className="bg-primary p-2 w-fit rounded-xl text-white"
              >
                Activate My Advert
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {isSubmitting && <Loading fixed />}
      <SuccessModal {...successModalProps} />
    </>
  );
}

function SuccessModal(props: ReturnType<typeof useDisclosure>) {
  return (
    <Modal {...props} size="lg">
      <ModalContent>
        <ModalBody>
          <img src="/images/animated-checkmark.gif" width={150} alt="" className="block mx-auto" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Task Submitted</h3>
            <p className="text-sm">
              Thank you for your payment! Your advert will be live within the next 10 minutes once approved by admin.
              Track its performance in your dashboard.
            </p>
          </div>
          <div className="flex justify-center items-center gap-4 pb-4">
            <Link to="/advertise/tasks-history" className="text-sm p-2 rounded-2xl bg-primary text-white" type="button">
              View Tasks History
            </Link>
            <button
              onClick={props.onClose}
              className="border border-primary text-primary rounded-2xl text-sm p-2"
              type="button"
            >
              Create Another Task
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
