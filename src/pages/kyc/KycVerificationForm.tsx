import { ArrowLeft, BookUser, Sun, User } from "lucide-react";
import { Link } from "react-router";
import SellerInfoAside from "../../components/SellerInfoAside";
import { useSelector } from "react-redux";
import type { AuthUserDAO } from "../../../types";
import { useEffect, useState } from "react";
import cn from "../../utils/cn";
import Input from "../../components/Input";
import CustomSelect from "../../components/Select";
import { toast } from "sonner";

export default function KycVerificationForm() {
  const authUser = useSelector<any, AuthUserDAO>((state: any) => state.auth.value);
  const [formStep, setFormStep] = useState(1);

  return (
    <div className="mobile:grid grid-cols-[1fr_214px] gap-4 min-h-full">
      <div className="bg-white shadow-md px-4 py-8 space-y-12 overflow-hidden min-h-full">
        <div className="flex gap-4 flex-1">
          <Link to="/">
            <ArrowLeft />
          </Link>

          <h1 className="text-xl font-semibold">KYC Verification</h1>
        </div>

        <div>
          <div className="flex items-center gap-1 text-sm max-w-xl mx-auto">
            <div className="relative text-center">
              <span className="h-6 w-6 rounded-full bg-primary text-white inline-flex items-center justify-center">
                1
              </span>
              <span className="text-primary absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap">Step 1</span>
            </div>
            <span className={cn("flex-1 h-[2px] bg-zinc-600", { "bg-primary": formStep > 1 })} />
            <div className="relative text-center">
              <span
                className={cn("h-6 w-6 rounded-full bg-zinc-600 text-white inline-flex items-center justify-center", {
                  "bg-primary": formStep > 2
                })}
              >
                2
              </span>
              <span
                className={cn("text-zinc-600 absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap", {
                  "text-primary": formStep > 2
                })}
              >
                Step 2
              </span>
            </div>
            <span className={cn("flex-1 h-[2px] bg-zinc-600", { "bg-primary": formStep === 3 })} />
            <div className="relative text-center">
              <span
                className={cn("h-6 w-6 rounded-full bg-zinc-600 text-white inline-flex items-center justify-center", {
                  "bg-primary": formStep === 3
                })}
              >
                3
              </span>
              <span
                className={cn("text-zinc-600 absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap", {
                  "text-primary": formStep === 3
                })}
              >
                Step 3
              </span>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <KycForm {...{ formStep, setFormStep }} />
          <FaceVerificationForm {...{ formStep, setFormStep }} />
        </form>
      </div>

      <SellerInfoAside {...{ ...authUser, hideChatBtn: true }} />
    </div>
  );
}

function KycForm({
  setFormStep,
  formStep
}: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
}) {
  return (
    <div className={cn("space-y-6", { hidden: formStep !== 1 })}>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Complete Your KYC</h2>
        <p className="text-primary text-sm">Provide your KYC to list products and build trust in the marketplace</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CustomSelect placeholder="Your Country" options={[{ key: "nigeria", label: "Nigeria" }]} />
        <CustomSelect
          placeholder="Document Type"
          options={[
            { key: "drivers_license", label: "Driver's License" },
            { key: "passport", label: "Passport" },
            { key: "national_id_card", label: "National ID Card" }
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-video rounded-md bg-zinc-200/40 border border-dashed">
          <div className="absolute text-center p-4 inset-0 space-y-2">
            <BookUser className="h-8 w-8 mx-auto" />
            <p>Front side of your document</p>
            <p className="text-xs">Upload the front side of your document. We support JPG, PNG, and PDF</p>
            <label className="text-sm text-primary hover:underline cursor-pointer" htmlFor="input-1">
              Choose a file
            </label>
            <input type="file" name="front_cover" id="input-1" className="invisible" />
          </div>
        </div>
        <div className="relative aspect-video rounded-md bg-zinc-200/40 border border-dashed">
          <div className="absolute text-center p-4 inset-0 space-y-2">
            <BookUser className="h-8 w-8 mx-auto" />
            <p>Front side of your document</p>
            <p className="text-xs">Upload the front side of your document. We support JPG, PNG, and PDF</p>
            <label className="text-sm text-primary hover:underline cursor-pointer" htmlFor="input-2">
              Choose a file
            </label>
            <input type="file" name="back_cover" id="input-2" className="invisible" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input type="checkbox" name="consent" id="consent" />
        <label htmlFor="consent" className="text-sm">
          I confirm that I uploaded valid government-issued phot ID. This ID include my picture, signature, date of
          birth, and address.
        </label>
      </div>

      <hr className="border-dashed" />

      <div className="grid grid-cols-2 gap-6">
        <Input label="Full name" name="name" placeholder="Your fullname" />
        <Input label="Date of birth" name="dob" placeholder="Your date of birth" />
        <Input label="National ID No." name="national_id_number" placeholder="DD/MM/YY" />
        <Input label="Expiration Date" name="expiry_date" placeholder="DD/MM/YY" />
      </div>

      <p className="text-center">OR</p>

      <div className="max-w-xl mx-auto border border-zinc-400 rounded-3xl p-6 flex gap-x-8">
        <img src="/images/qr-code.png" alt="" />
        <div className="flex flex-col justify-between max-w-40">
          <h3>Scan the QR Code</h3>
          <p className="text-xs">Open the camera app and scan the QR code on the screen.</p>
          <Link to="#" className="text-primary hover:underline text-xs">
            How to scan QR code
          </Link>
        </div>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => setFormStep(2)}
          className="py-1.5 px-6 rounded-xl text-sm bg-primary text-white"
          type="button"
        >
          Continue
        </button>
        <Link to="/kyc" className="py-1.5 px-6 rounded-xl text-sm border border-primary text-primary" type="button">
          Cancel
        </Link>
      </div>
    </div>
  );
}

function FaceVerificationForm({
  setFormStep,
  formStep
}: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
}) {
  const [capturing, setCapturing] = useState(false);
  const [capturedImgUrl, setCapturedImgUrl] = useState("");

  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    const startCameraBtn = document.getElementById("start-camera") as HTMLButtonElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const snapBtn = document.getElementById("snap-btn") as HTMLButtonElement;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        setCapturing(true);
        // biome-ignore lint/suspicious/noExplicitAny:
      } catch (err: any) {
        toast.error("Failed to start camera.");
      }
    }

    function stopCamera() {
      const stream = video.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        for (const track of tracks) track.stop(); // Stops camera/mic
        video.srcObject = null;
      }
    }

    function takeSnapShot() {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      // biome-ignore lint/style/noNonNullAssertion:
      context!.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImgUrl(dataUrl);
      stopCamera();
      setCapturing(false);
    }

    if (capturing) snapBtn?.addEventListener("click", takeSnapShot);
    if (!capturing) startCameraBtn?.addEventListener("click", startCamera);

    () => {
      startCameraBtn?.removeEventListener("click", startCamera);
      snapBtn?.addEventListener("click", takeSnapShot);
    };
  }, [capturing]);

  return (
    <div className={cn("space-y-6", { hidden: formStep !== 2 })}>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Live Face Detection</h2>
        <p className="text-primary text-sm">Scan your face to verify your ID.</p>
      </div>

      <div>
        {!capturing && capturedImgUrl && (
          <img
            src={capturedImgUrl}
            alt=""
            className="w-full max-w-lg rounded-3xl border border-dashed aspect-video bg-zinc-100 block mx-auto"
          />
        )}
        {!capturedImgUrl && (
          <>
            {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
            <video
              src=""
              className="max-w-lg rounded-3xl border border-dashed aspect-video bg-zinc-200/40 mx-auto w-full"
              id="video"
              autoPlay
            />
            <canvas id="canvas" className="h-0 w-0" />
            <div className="flex justify-between items-center text-xs text-primary max-w-lg mx-auto">
              <span className="flex items-center gap-1 p-4">
                <User size={12} /> Uncover face
              </span>
              <span className="flex items-center gap-1 p-4">
                <Sun size={12} /> Good lighting
              </span>
            </div>
          </>
        )}
      </div>

      <div className="text-sm text-center space-y-4">
        {capturing && (
          <button
            id="snap-btn"
            type="button"
            className="px-4 py-1.5 w-full bg-primary text-white text-sm max-w-lg mx-auto block rounded-full"
          >
            Take a snapshot
          </button>
        )}

        {!capturing && capturedImgUrl && (
          <button
            onClick={() => setFormStep(3)}
            type="button"
            className="px-4 py-1.5 w-full bg-primary text-white text-sm max-w-lg mx-auto block rounded-full"
          >
            Continue
          </button>
        )}

        {!capturedImgUrl && !capturing && (
          <button
            id="start-camera"
            type="button"
            className="px-4 py-1.5 w-full bg-primary text-white text-sm max-w-lg mx-auto block rounded-full"
          >
            Start the Test
          </button>
        )}
        <p>We will automatically detect your face</p>
        <Link to="#" className="text-primary text-sm block hover:underline">
          Continue on phone
        </Link>
      </div>
    </div>
  );
}
