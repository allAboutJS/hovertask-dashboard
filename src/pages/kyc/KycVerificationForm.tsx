import { ArrowLeft, BookUser, CheckCheck, Sun, User } from "lucide-react";
import { Link } from "react-router";
import SellerInfoAside from "../../components/SellerInfoAside";
import { useSelector } from "react-redux";
import type { AuthUserDAO } from "../../../types";
import { useEffect, useState } from "react";
import cn from "../../utils/cn";
import Input from "../../components/Input";
import CustomSelect from "../../components/Select";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

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
          <FinalKycStep {...{ formStep, setFormStep }} />
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
  const [imagesUrl, setImages] = useState<[string, string]>(["", ""]);
  const {
    register,
    trigger,
    formState: { isValid, errors }
  } = useForm({ mode: "onBlur" });

  return (
    <div className={cn("space-y-6", { hidden: formStep !== 1 })}>
      <div className="text-center">
        <h2 className="text-xl font-semibold">Complete Your KYC</h2>
        <p className="text-primary text-sm">Provide your KYC to list products and build trust in the marketplace</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CustomSelect
          {...register("country", { required: "Select your country" })}
          placeholder="Your Country"
          options={[{ key: "nigeria", label: "Nigeria" }]}
          errorMessage={errors.country?.message as string}
        />
        <CustomSelect
          {...register("document_type", { required: "Select your document type" })}
          placeholder="Document Type"
          options={[
            { key: "drivers_license", label: "Driver's License" },
            { key: "passport", label: "Passport" },
            { key: "national_id_card", label: "National ID Card" }
          ]}
          errorMessage={errors.document_type?.message as string}
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
            <input
              required
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  if (e.target.files[0].type.startsWith("image"))
                    setImages((prev) => {
                      // biome-ignore lint/style/noNonNullAssertion:
                      const newUrl = URL.createObjectURL(e.target.files![0]);

                      URL.revokeObjectURL(prev[0]);
                      return [newUrl, prev[1]];
                    });
                  else
                    setImages((prev) => {
                      URL.revokeObjectURL(prev[0]);
                      return ["/images/pdf-thumbnail.webp", prev[1]];
                    });
                } else setImages((prev) => [prev[0], ""]);
              }}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              name="front_cover"
              id="input-1"
              className="invisible"
            />
          </div>
          <img src={imagesUrl[0]} alt="" id="doc-front-side" className="max-h-full max-w-full mx-auto" />
        </div>

        <div className="relative aspect-video rounded-md bg-zinc-200/40 border border-dashed">
          <div className="absolute text-center p-4 inset-0 space-y-2">
            <BookUser className="h-8 w-8 mx-auto" />
            <p>Back side of your document</p>
            <p className="text-xs">Upload the front side of your document. We support JPG, PNG, and PDF</p>
            <label className="text-sm text-primary hover:underline cursor-pointer" htmlFor="input-2">
              Choose a file
            </label>
            <input
              required
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  if (e.target.files[0].type.startsWith("image"))
                    setImages((prev) => {
                      // biome-ignore lint/style/noNonNullAssertion:
                      const newUrl = URL.createObjectURL(e.target.files![0]);

                      URL.revokeObjectURL(prev[1]);
                      return [prev[0], newUrl];
                    });
                  else
                    setImages((prev) => {
                      URL.revokeObjectURL(prev[1]);
                      return [prev[0], "/images/pdf-thumbnail.webp"];
                    });
                } else setImages((prev) => ["", prev[1]]);
              }}
              type="file"
              name="back_cover"
              accept=".png,.jpg,.jpeg,.pdf"
              id="input-2"
              className="invisible"
            />
          </div>
          <img src={imagesUrl[1]} alt="" id="doc-back-side" className="max-h-full max-w-full mx-auto" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <input type="checkbox" id="consent" {...register("consent", { required: "This field is required" })} />
          <label htmlFor="consent" className="text-sm">
            I confirm that I uploaded valid government-issued phot ID. This ID include my picture, signature, date of
            birth, and address.
          </label>
        </div>
        <small className="text-danger">{errors.consent?.message as string}</small>
      </div>

      <hr className="border-dashed" />

      <div className="grid grid-cols-2 gap-6">
        <Input
          id="name"
          label="Full name"
          placeholder="Your fullname"
          {...register("name", { required: "Enter your full name" })}
          errorMessage={errors.name?.message as string}
        />
        <Input
          id="dob"
          label="Date of birth"
          placeholder="Your date of birth"
          {...register("dob", { required: "Enter your date of birth" })}
          errorMessage={errors.dob?.message as string}
          type="date"
        />
        <Input
          id="nid"
          label="National ID No."
          placeholder="DD/MM/YY"
          {...register("national_id_number", { required: "Enter your national ID number" })}
          errorMessage={errors.national_id_number?.message as string}
        />
        <Input
          id="nid-expiry"
          label="Expiration Date"
          placeholder="DD/MM/YY"
          {...register("expiry_date", { required: "Enter your national ID expiry date" })}
          errorMessage={errors.expiry_date?.message as string}
          type="date"
        />
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
          onClick={async () => {
            await trigger();
            if (!imagesUrl[0]) return toast.error("Select document front.");
            if (!imagesUrl[1]) return toast.error("Select document back.");
            if (isValid) setFormStep(2);
          }}
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
            id="selfie"
            className="w-auto max-w-lg h-auto max-h-96 rounded-3xl border border-dashed bg-zinc-100 block mx-auto"
          />
        )}
        {capturing && (
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
          <>
            <button
              onClick={() => setCapturing(true)}
              type="button"
              className="px-4 py-1.5 w-full border border-primary text-primary text-sm max-w-lg mx-auto block rounded-full"
            >
              Retake Selfie
            </button>

            <button
              onClick={() => setFormStep(3)}
              type="button"
              className="px-4 py-1.5 w-full bg-primary text-white text-sm max-w-lg mx-auto block rounded-full"
            >
              Continue
            </button>
          </>
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

function FinalKycStep({
  setFormStep,
  formStep
}: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
}) {
  useEffect(() => {
    formStep;

    const docFrontImgSrc = (document.getElementById("doc-front-side") as HTMLImageElement).src as string;
    const docBackImgSrc = (document.getElementById("doc-back-side") as HTMLImageElement).src as string;
    const selfieImgSrc = (document.getElementById("selfie") as HTMLImageElement)?.src as string;
    const docFrontPreview = document.getElementById("doc-front-side-preview") as HTMLImageElement;
    const docBackPreview = document.getElementById("doc-back-side-preview") as HTMLImageElement;
    const selfiePreview = document.getElementById("selfie-preview") as HTMLImageElement;

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const dobInput = document.getElementById("dob") as HTMLInputElement;
    const nidInput = document.getElementById("nid") as HTMLInputElement;
    const nidExpiryInput = document.getElementById("nid-expiry") as HTMLInputElement;
    const nameElement = document.getElementById("name-preview") as HTMLElement;
    const nidElement = document.getElementById("dob-preview") as HTMLElement;
    const dobElement = document.getElementById("nid-preview") as HTMLElement;
    const expiryElement = document.getElementById("nid-expiry-preview") as HTMLElement;

    if (nameInput && nameElement) nameElement.textContent = nameInput.value;
    if (dobInput && dobElement) dobElement.textContent = dobInput.value;
    if (nidInput && nidElement) nidElement.textContent = nidInput.value;
    if (nidExpiryInput && expiryElement) expiryElement.textContent = nidExpiryInput.value;
    if (docFrontPreview) docFrontPreview.src = docFrontImgSrc;
    if (docBackPreview) docBackPreview.src = docBackImgSrc;
    if (selfiePreview) selfiePreview.src = selfieImgSrc;
  }, [formStep]);

  return (
    <div className={cn("space-y-6", { hidden: formStep !== 3 })}>
      <h2 className="text-center text-xl font-semibold">Review & Submit</h2>

      <div className="space-y-2">
        <div className="flex justify-center gap-4 max-w-lg mx-auto">
          <div className="relative aspect-square rounded-md bg-zinc-200/40 border border-dashed flex-1">
            <div className="absolute text-center p-4 inset-0 space-y-2 flex flex-col items-center justify-center">
              <CheckCheck className="h-8 w-8 mx-auto text-success" />
              <p>Front side of your document</p>
              <p className="text-xs">Upload the front side of your document. We support JPG, PNG, and PDF</p>
            </div>
            <img src="" alt="" id="doc-front-side-preview" className="max-h-full max-w-full mx-auto" />
          </div>
          <div className="relative aspect-square rounded-md bg-zinc-200/40 border border-dashed flex-1">
            <div className="absolute text-center p-4 inset-0 space-y-2 flex flex-col items-center justify-center">
              <CheckCheck className="h-8 w-8 mx-auto text-success" />
              <p>Back side of your document</p>
              <p className="text-xs">Upload the front side of your document. We support JPG, PNG, and PDF</p>
            </div>
            <img src="" alt="" id="doc-back-side-preview" className="max-h-full max-w-full mx-auto" />
          </div>
        </div>

        <button
          onClick={() => setFormStep(1)}
          type="button"
          className="text-primary text-sm block mx-auto hover:underline"
        >
          Reupload Images
        </button>
      </div>

      <div className="text-sm space-y-2 p-4 max-w-sm rounded-2xl shadow-md bg-white mx-auto">
        <div className="flex items-center gap-4">
          <img src="" id="selfie-preview" alt="" className="aspect-square rounded-xl max-w-56" />
          <button
            onClick={() => setFormStep(2)}
            type="button"
            className="text-primary text-sm hover:underline text-left"
          >
            Reupload selfie image
          </button>
        </div>

        <div>
          <p>
            Fullname: <span className="font-medium" id="name-preview" />
          </p>
          <p>
            National ID Number: <span className="font-medium" id="nid-preview" />
          </p>
          <p>
            Date of Birth: <span className="font-medium" id="dob-preview" />
          </p>
          <p>
            License Expiry Date: <span className="font-medium" id="nid-expiry-preview" />
          </p>
        </div>
      </div>

      <p className="text-center text-sm">
        Once submitted, your details cannot be changed until the verification process is complete
      </p>

      <button
        className="px-4 py-1.5 w-full bg-primary text-white text-sm max-w-lg mx-auto block rounded-full"
        type="submit"
      >
        Submit for Verification
      </button>

      <p className="text-center text-sm">
        <Link to="/support" className="text-primary underline">
          Need help? Contact Support
        </Link>
      </p>
    </div>
  );
}
