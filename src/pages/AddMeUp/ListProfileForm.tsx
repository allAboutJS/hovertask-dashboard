import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import ImageInput from "../../components/ImageInput";
import { Select, SelectItem } from "@heroui/react";
import Input from "../../components/Input";
import { useState } from "react";
import Loading from "../../components/Loading";
import AddMeUpAside from "../../components/AddMeUpAside";

export default function ListProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listingTypes = [
    { key: "earner", label: "Earn Money" },
    { key: "advertiser", label: "Advertise Products" },
    { key: "both", label: "Resell Products" }
  ];
  const listingDurations = [
    { key: "1_day", label: "24 Hours" },
    { key: "3_days", label: "3 Days" },
    { key: "7_days", label: "1 Week" },
    { key: "14_days", label: "2 Weeks" },
    { key: "30_days", label: "1 Month" },
    { key: "90_days", label: "3 Months" },
    { key: "180_days", label: "6 Months" }
  ];
  const genders = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "both", label: "Any gender" }
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 4000);
  }

  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-16 overflow-hidden min-h-full">
        <div className="flex gap-4 flex-1">
          <Link to="/add-me-up/list-profile">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">List Profile</h1>
            <p className="text-sm text-zinc-500">Manage Your Account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Listing Type"
            name="type"
            labelPlacement="outside"
            placeholder="Select listing type"
            className="[&_button]:border-1 [&_button]:bg-200/50 [&_button]:border-zinc-300 [&_button]:rounded-lg"
          >
            {listingTypes.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>

          <Input type="text" label="Display Name" placeholder="Enter display name" />

          <div className="space-y-2">
            <label htmlFor="whatsapp-number" className="text-sm">
              WhatsApp Number
            </label>
            <div className="flex items-center gap-2 border border-zinc-300 bg-zinc-200/50 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-sm">
              <button
                type="button"
                className="flex items-center gap-1 hover:bg-zinc-200 py-1 px-2 rounded-lg transition-all active:scale-95"
              >
                <img src="/images/nigerian-flag.png" width={15} alt="" />
                <ChevronDown size={12} />
              </button>
              <input
                type="tel"
                name="whatsapp_number"
                id="whatsapp-number"
                placeholder="Enter your WhatsApp number"
                className="flex-1 outline-none min-w-0 max-w-none bg-transparent"
              />
            </div>
          </div>

          <div className="pt-2">
            <Select
              label="How long do you want your profile listed"
              labelPlacement="outside"
              name="duration"
              placeholder="Select how long you want"
              className="[&_button]:border-1 [&_button]:bg-200/50 [&_button]:border-zinc-300 [&_button]:rounded-lg"
            >
              {listingDurations.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="pt-2">
            <Select
              label="Which genders do you want"
              labelPlacement="outside"
              placeholder="Select gender"
              name="gender"
              className="[&_button]:border-1 [&_button]:bg-200/50 [&_button]:border-zinc-300 [&_button]:rounded-lg"
            >
              {genders.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="max-w-sm space-y-2">
            <label htmlFor="image" className="text-sm">
              Display Image
            </label>
            <ImageInput id="image" name="image" required />
          </div>

          <button type="submit" className="px-4 py-3 rounded-2xl transition-all active:scale-95 bg-primary text-white">
            List Profile
          </button>
        </form>

        {isSubmitting && <Loading fixed />}
      </div>

      <AddMeUpAside />
    </div>
  );
}
