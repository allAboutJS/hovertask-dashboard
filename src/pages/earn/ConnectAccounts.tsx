import { ArrowLeft, Check } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import { Link } from "react-router";
import { ActivationState } from "../../../types";
import cn from "../../utils/cn";
import useDebounced from "../../hooks/useDebounced";

export default function ConnectAccountsPage() {
  const initialFormState = {
    facebook: {
      username: "",
      profileLink: ""
    },
    twitter: {
      username: "",
      profileLink: ""
    },
    instagram: {
      username: "",
      profileLink: ""
    },
    tikTok: {
      username: "",
      profileLink: ""
    }
  };
  const resetGroupActivationState = useDebounced(
    (groupName: keyof ActivationState) => setActivationState({ ...activationState, [groupName]: false }),
    600
  );
  const [form, setForm] = useState(initialFormState);
  const [activationState, setActivationState] = useState<ActivationState>({
    facebook: false,
    twitter: false,
    instagram: false,
    tikTok: false
  });
  function validateFormGroup(group: keyof ActivationState) {
    let isValid = false;
    switch (group) {
      case "facebook":
        if (!/^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9.]{5,}$/.test(form[group].username))
          setActivationState({ ...activationState, facebook: "Error - Invalid username" });
        else if (
          !/^(https?:\/\/)?((web|www)\.)?facebook\.com\/(?!pages\/|groups\/|events\/)([a-zA-Z0-9.]{5,}|profile\.php\?id=\d+)(\/)?$/.test(
            form[group].profileLink
          )
        )
          setActivationState({ ...activationState, facebook: "Error - Invalid profile link" });
        else isValid = true;
        break;

      case "instagram":
        if (!/^(?!.*\.\.)(?!\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}$/.test(form[group].username))
          setActivationState({ ...activationState, instagram: "Error - Invalid username" });
        else if (
          !/^(https?:\/\/)?((web|www)\.)?instagram\.com\/([a-zA-Z0-9._]{1,30})(\/)?$/.test(form[group].profileLink)
        )
          setActivationState({ ...activationState, instagram: "Error - Invalid profile link" });
        else isValid = true;

        break;

      case "tikTok":
        if (!/^(?!.*\.\.)(?!\.)(?!.*\.$)[a-zA-Z0-9._]{2,24}$/.test(form[group].username))
          setActivationState({ ...activationState, tikTok: "Error - Invalid username" });
        else if (
          !/^(https?:\/\/)?((web|www)\.)?tiktok\.com\/@([a-zA-Z0-9._]{2,24})(\/)?$/.test(form[group].profileLink)
        )
          setActivationState({ ...activationState, tikTok: "Error - Invalid profile link" });
        else isValid = true;

        break;

      case "twitter":
        if (!/^[A-Za-z0-9_]{1,15}$/.test(form[group].username))
          setActivationState({ ...activationState, twitter: "Error - Invalid username" });
        else if (!/^(https?:\/\/)?((web|www)\.)?twitter\.com\/([A-Za-z0-9_]{1,15})(\/)?$/.test(form[group].profileLink))
          setActivationState({ ...activationState, twitter: "Error - Invalid profile link" });
        else isValid = true;
        break;
    }

    return isValid;
  }

  document.title = "Connect Social Media Account";

  return (
    <div className="bg-white shadow p-4 space-y-12 min-h-full">
      <div className="flex">
        <div className="flex gap-4 flex-1">
          <Link to="/earn">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Connect Your Social Media Accounts</h1>
            <p className="text-sm text-zinc-500">
              Provide your social media usernames and profile links to verify your eligibility to post adverts.
            </p>
          </div>
        </div>

        <div className="max-sm:hidden">
          <img src="/images/0c3e01cf-a60e-4e42-8a1d-6ba21eb32eeb-removebg-preview 3.png" width={180} alt="" />
        </div>
      </div>

      <form className="space-y-12 p-4 rounded-3xl border border-zinc-300">
        <div className="space-y-4">
          <div className="text-sm flex items-center font-medium gap-4 pl-4">
            <span className="bg-primary px-5 py-1 rounded-[60%] text-white h-fit">1</span> Facebook
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-2 max-w-md">
              <Input
                onChange={(e) => (
                  setForm({ ...form, facebook: { ...form.facebook, username: e.target.value } }),
                  resetGroupActivationState("facebook")
                )}
                type="text"
                value={form.facebook.username}
              />
              <Input
                onChange={(e) => (
                  setForm({ ...form, facebook: { ...form.facebook, profileLink: e.target.value } }),
                  resetGroupActivationState("facebook")
                )}
                type="url"
                value={form.facebook.profileLink}
              />
            </div>
            {activationState.facebook === false ? (
              <button
                onClick={(e) => validateFormGroup(e.currentTarget.dataset?.media! as keyof ActivationState)}
                disabled={!form.facebook.profileLink && !form.facebook.profileLink ? true : false}
                data-media="facebook"
                className={cn(
                  "whitespace-nowrap text-sm p-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-all disabled:transform-none active:scale-95 disabled:cursor-not-allowed",
                  {
                    "hover:bg-primary/20 text-primary": form.facebook.profileLink && form.facebook.username
                  }
                )}
                type="button"
              >
                Link Account
              </button>
            ) : activationState.facebook === true ? (
              <Check />
            ) : typeof activationState.facebook === "string" ? (
              <span className="text-sm text-danger">{activationState.facebook}</span>
            ) : (
              <span>Pending review</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm flex items-center font-medium gap-4 pl-4">
            <span className="bg-primary px-5 py-1 rounded-[60%] text-white h-fit">2</span> Instagram
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-2 max-w-md">
              <Input
                onChange={(e) => (
                  setForm({ ...form, instagram: { ...form.instagram, username: e.target.value } }),
                  resetGroupActivationState("instagram")
                )}
                type="text"
                value={form.instagram.username}
              />
              <Input
                onChange={(e) => (
                  setForm({ ...form, instagram: { ...form.instagram, profileLink: e.target.value } }),
                  resetGroupActivationState("instagram")
                )}
                type="url"
                value={form.instagram.profileLink}
              />
            </div>
            {activationState.instagram === false ? (
              <button
                onClick={(e) => validateFormGroup(e.currentTarget.dataset?.media! as keyof ActivationState)}
                disabled={!form.instagram.profileLink && !form.instagram.profileLink ? true : false}
                data-media="instagram"
                className={cn(
                  "whitespace-nowrap text-sm p-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-all disabled:transform-none active:scale-95 disabled:cursor-not-allowed",
                  {
                    "hover:bg-primary/20 text-primary": form.instagram.profileLink && form.instagram.username
                  }
                )}
                type="button"
              >
                Link Account
              </button>
            ) : activationState.instagram === true ? (
              <Check />
            ) : typeof activationState.instagram === "string" ? (
              <span className="text-sm text-danger">{activationState.instagram}</span>
            ) : (
              <span>Pending review</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm flex items-center font-medium gap-4 pl-4">
            <span className="bg-primary px-5 py-1 rounded-[60%] text-white h-fit">3</span> Twitter
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-2 max-w-md">
              <Input
                onChange={(e) => (
                  setForm({ ...form, twitter: { ...form.twitter, username: e.target.value } }),
                  resetGroupActivationState("twitter")
                )}
                type="text"
                value={form.twitter.username}
              />
              <Input
                onChange={(e) => (
                  setForm({ ...form, twitter: { ...form.twitter, profileLink: e.target.value } }),
                  resetGroupActivationState("twitter")
                )}
                type="url"
                value={form.twitter.profileLink}
              />
            </div>
            {activationState.twitter === false ? (
              <button
                onClick={(e) => validateFormGroup(e.currentTarget.dataset?.media! as keyof ActivationState)}
                disabled={!form.twitter.profileLink && !form.twitter.profileLink ? true : false}
                data-media="twitter"
                className={cn(
                  "whitespace-nowrap text-sm p-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-all disabled:transform-none active:scale-95 disabled:cursor-not-allowed",
                  {
                    "hover:bg-primary/20 text-primary": form.twitter.profileLink && form.twitter.username
                  }
                )}
                type="button"
              >
                Link Account
              </button>
            ) : activationState.twitter === true ? (
              <Check />
            ) : typeof activationState.twitter === "string" ? (
              <span className="text-sm text-danger">{activationState.twitter}</span>
            ) : (
              <span>Pending review</span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm flex items-center font-medium gap-4 pl-4">
            <span className="bg-primary px-5 py-1 rounded-[60%] text-white h-fit">4</span> TikTok
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-2 max-w-md">
              <Input
                onChange={(e) => (
                  setForm({ ...form, tikTok: { ...form.tikTok, username: e.target.value } }),
                  resetGroupActivationState("tikTok")
                )}
                type="text"
                value={form.tikTok.username}
              />
              <Input
                onChange={(e) => (
                  setForm({ ...form, tikTok: { ...form.tikTok, profileLink: e.target.value } }),
                  resetGroupActivationState("tikTok")
                )}
                type="url"
                value={form.tikTok.profileLink}
              />
            </div>
            {activationState.tikTok === false ? (
              <button
                onClick={(e) => validateFormGroup(e.currentTarget.dataset?.media! as keyof ActivationState)}
                disabled={!form.tikTok.profileLink && !form.tikTok.profileLink ? true : false}
                data-media="tikTok"
                className={cn(
                  "whitespace-nowrap text-sm p-2 rounded-full text-zinc-500 hover:bg-zinc-100 transition-all disabled:transform-none active:scale-95 disabled:cursor-not-allowed",
                  {
                    "hover:bg-primary/20 text-primary": form.tikTok.profileLink && form.tikTok.username
                  }
                )}
                type="button"
              >
                Link Account
              </button>
            ) : activationState.tikTok === true ? (
              <Check />
            ) : typeof activationState.tikTok === "string" ? (
              <span className="text-sm text-danger">{activationState.tikTok}</span>
            ) : (
              <span>Pending review</span>
            )}
          </div>
        </div>

        <p className="text-sm">
          Need help finding your profile link?{" "}
          <Link to="#" className="text-primary">
            Click here
          </Link>
        </p>

        <div className="space-x-4">
          <button
            className="p-2 rounded-2xl text-sm transition-all bg-primary text-white active:scale-95"
            type="submit"
          >
            Submit Details
          </button>
          <button
            className="p-2 rounded-2xl text-sm transition-all bg-primary text-white active:scale-95"
            onClick={() => setForm(initialFormState)}
            type="reset"
          >
            Clear All Fields
          </button>
        </div>
      </form>
    </div>
  );
}

function Input(props: Omit<InputHTMLAttributes<HTMLInputElement>, "className">) {
  return (
    <input
      {...props}
      className="p-3 rounded-xl min-w-0 w-full bg-zinc-200 border border-zinc-300 focus:border-primary outline-none"
    />
  );
}
