import { ArrowLeft, CheckCircle, Copy, List, Mail, Phone, Star, User, X } from "lucide-react";
import { Link } from "react-router";
import { AuthUserDAO } from "../../types";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import CustomSelect from "../components/Select";
import React, { useState } from "react";
import { toast } from "sonner";

export default function EditProfilePage() {
  const authUser = useSelector<any, AuthUserDAO>((state: any) => state.auth.value);

  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-12 overflow-hidden min-h-full">
        <div className="flex gap-4 flex-1">
          <Link to="/">
            <ArrowLeft />
          </Link>

          <h1 className="text-xl font-semibold">List Profile</h1>
        </div>

        <AccountInfoBoard authUser={authUser} />
        <AccountSettings />
        <ReferAndEarn username={authUser.username} />
        <SocialMediaAccounts />
      </div>
    </div>
  );
}

function AccountInfoBoard({ authUser }: { authUser: AuthUserDAO }) {
  return (
    <div>
      <div id="edit-profile-board" className="p-4 rounded-3xl text-white space-y-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <img src={authUser.avatar || "/images/default-user.png"} width={80} alt="" />
          <h3 className="text-3xl text-center">
            {authUser.fname} {authUser.lname}
          </h3>
          <p className="flex items-center gap-2">
            @{authUser.username} <span className="font-light">|</span>{" "}
            <span className="flex text-sm text-success items-center gap-2">
              <CheckCircle size={14} /> Online
            </span>
          </p>
        </div>

        <div className="flex gap-x-4 gap-y-1 items-center max-md:flex-wrap max-md:justify-center">
          <div className="text-xs flex gap-2 items-center scale-75 md:-translate-x-[12%] max-sm:flex-wrap">
            <div className="flex flex-col gap-0.5 bg-white text-black px-4 py-1 w-fit rounded-lg">
              <span className="font-semibold">3</span>
              <span>Referrals</span>
            </div>
            <div className="flex flex-col gap-0.5 bg-white text-black px-4 py-1 w-fit rounded-lg">
              <span className="font-semibold">13</span>
              <span>Followers</span>
            </div>
            <div className="flex flex-col gap-0.5 bg-white text-black px-4 py-1 w-fit rounded-lg">
              <span className="font-semibold">2</span>
              <span>Following</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Star size={12} /> <span className="font-bold">4.8</span> (120 Reviews)
          </div>
        </div>
      </div>

      <p className="w-fit mx-auto py-2 px-4 rounded-b-xl bg-primary/10 text-sm">
        KYC Status: <span className="font-medium">Pending</span>
      </p>
    </div>
  );
}

function AccountSettings() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">Account Settings</h2>
        <p className="font-light">Take control of your account</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg">Basic Account Information</h3>

        <div className="flex gap-4 items-center px-4 py-6 rounded-3xl border border-zinc-400">
          <User size={28} className="text-primary" />
          <p className="flex-1 line-clamp-1">Full name, Email Address, Gender, State, Religion</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-full text-sm transition-all active:scale-95 bg-primary text-white"
          >
            Edit Info
          </button>
        </div>

        {isEditing && <BasicAccountInfoForm setIsOpen={setIsEditing} />}
      </div>
    </div>
  );
}

function BasicAccountInfoForm(props: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const genders = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "both", label: "Any gender" }
  ];
  const currencies = [{ key: "ngn", label: "Naira (NGN)" }];

  return (
    <div className="shadow-md rounded-3xl p-6">
      <div className="flex justify-end">
        <button
          onClick={() => props.setIsOpen(false)}
          className="p-2 rounded-full hover:bg-zinc-100 active:scale-95 transition-transform"
        >
          <X size={18} />
        </button>
      </div>

      <form className="space-y-4">
        <Input label="Full Name" placeholder="Enter your full name" icon={<User size={14} />} />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Username" placeholder="Enter your username" icon={<User size={14} />} />
          <Input label="Phone Number" placeholder="Enter your phone number" icon={<Phone size={14} />} type="tel" />
        </div>

        <Input label="Email" type="email" placeholder="Enter your delivery email" icon={<Mail size={14} />} />

        <div className="grid grid-cols-2 gap-4">
          <div className="pt-2">
            <CustomSelect
              options={genders}
              placeholder="Select your gender"
              label="Gender"
              startContent={<List size={14} className="mr-2" />}
              labelPlacement="outside"
            />
          </div>
          <div className="pt-2">
            <CustomSelect
              options={currencies}
              placeholder="Select your currency"
              label="Base Currency"
              startContent={<List size={14} className="mr-2" />}
              labelPlacement="outside"
            />
          </div>
        </div>

        <button type="submit" className="px-4 py-3 rounded-2xl transition-all active:scale-95 bg-primary text-white">
          Save
        </button>
      </form>
    </div>
  );
}

function ReferAndEarn(props: { username: string }) {
  const refLink = `https://hovertask.com/ref/${props.username}`;

  async function copyRefLink() {
    try {
      await window.navigator.clipboard.writeText(refLink);
      toast.success("Copied!");
    } catch {
      toast.error("failed to copy!");
    }
  }

  return (
    <div className="p-6 rounded-3xl space-y-2 shadow-md">
      <div>
        <h2 className="text-xl font-medium">Refer and Earn Big</h2>
        <p className="font-light">
          Unlock exciting opportunities by inviting others to join our platform. Share your referral link and watch you
          rewards grow.
        </p>
      </div>

      <div className="flex gap-x-4 gap-y-1 max-sm:flex-wrap items-center">
        <span className="font-medium">My Referral Link:</span>
        <span className="bg-primary/20 p-2 rounded-full text-primary">{refLink}</span>
        <button
          onClick={copyRefLink}
          className="flex gap-2 items-center text-primary transition-all active:scale-95 hover:bg-primary/20 px-2 py-1 rounded-full"
        >
          <Copy size={12} /> Copy
        </button>
      </div>
    </div>
  );
}

function SocialMediaAccounts() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Social Media Accounts</h2>

      <div className="space-y-3">
        <h3 className="text-lg">Basic Account Information</h3>

        <div className="flex gap-4 items-center px-4 py-6 rounded-3xl border border-zinc-400">
          <User size={28} className="text-primary" />
          <p className="flex-1 line-clamp-1">Edit your social media accounts</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-full text-sm transition-all active:scale-95 bg-primary text-white"
          >
            Edit Info
          </button>
        </div>

        {isEditing && <EditSocialMediaForm setIsOpen={setIsEditing} />}
      </div>
    </div>
  );
}

function EditSocialMediaForm(props: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const socialMediaPlatforms = [
    { key: "facebook", label: "Facebook" },
    { key: "twitter", label: "Twitter" },
    { key: "instagram", label: "Instagram" },
    { key: "tiktok", label: "TikTok" }
  ];

  return (
    <div className="shadow-md rounded-3xl p-6">
      <div className="flex justify-end">
        <button
          onClick={() => props.setIsOpen(false)}
          className="p-2 rounded-full hover:bg-zinc-100 active:scale-95 transition-transform"
        >
          <X size={18} />
        </button>
      </div>

      <form className="space-y-4">
        <CustomSelect
          options={socialMediaPlatforms}
          placeholder="Select platform"
          label="Select Platform"
          startContent={<Mail size={14} className="mr-2" />}
          labelPlacement="outside"
        />

        <button type="submit" className="px-4 py-3 rounded-2xl transition-all active:scale-95 bg-primary text-white">
          Save
        </button>
      </form>
    </div>
  );
}
