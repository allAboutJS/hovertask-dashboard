import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import ImageInput from "../../components/ImageInput";
import { Select, SelectItem } from "@heroui/react";
import Input from "../../components/Input";

export default function ListProfileForm() {
  const listingTypes = [
    { key: "earner", label: "Earn Money" },
    { key: "advertiser", label: "Advertise Products" },
    { key: "both", label: "Resell Products" }
  ];
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

        <form>
          <Select>
            {listingTypes.map((type) => (
              <SelectItem key={type.key}>{type.label}</SelectItem>
            ))}
          </Select>
          <Input type="text" label="Display Name" placeholder="Enter display name" />
          <Input />
          <Input />
          <Input />
          <ImageInput />
        </form>
      </div>
    </div>
  );
}
