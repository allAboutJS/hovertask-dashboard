import { ArrowLeft, Image, Tag } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { AuthUserDAO } from "../../../types";
import { DragEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import cn from "../../utils/cn";
import { Select, SelectItem } from "@heroui/react";
import productCategories from "../../utils/productCategories";

export default function ListProductPage() {
  return (
    <div className="mobile:grid grid-cols-[1fr_214px] min-h-full">
      <div className="bg-white shadow p-4 space-y-8">
        <div className="flex gap-4 flex-1">
          <Link to="/marketplace">
            <ArrowLeft />
          </Link>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold">List a New Product</h1>
            <p className="text-sm text-zinc-500">
              Add a new product or service to the marketplace. Include details, set your price, and upload images to
              attract buyers
            </p>
          </div>
        </div>

        <hr className="border-dashed" />

        <SellerInformation />

        <hr />

        <ListingForm />
      </div>

      <div></div>
    </div>
  );
}

function SellerInformation() {
  const authUser = useSelector<any, AuthUserDAO>((state: any) => state.auth.value);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img src={authUser.avatar || undefined} width={50} height={50} className="rounded-full bg-zinc-200" alt="" />

        <div>
          <p className="capitalize font-medium">
            {authUser.fname} {authUser.lname}
          </p>
          <p className="text-xs">@{authUser.username}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <img src="/images/nigerian-flag.png" width={20} alt="" /> |{" "}
          <span className="relative">
            <span className="absolute h-1 w-1 rounded-full bg-success -left-0.5 top-0.5"></span> Online
          </span>
        </div>

        <div className="px-2 py-1 rounded-full bg-success/10 text-success text-xs w-fit">Verified ID</div>
      </div>

      {/* <p><span className="material-icons-outlined">location_on</span> {authUser.}</p> */}
    </div>
  );
}

function ListingForm() {
  const [draggedOver, setDraggedOver] = useState(false);
  const [imagesLength, setImagesLength] = useState<number>(0);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  useEffect(() => {
    if (imagesLength) {
      URL.revokeObjectURL(previewImageUrl);
      setPreviewImageUrl(URL.createObjectURL(imageInputRef.current?.files?.item(0)!));
    }
  }, [imagesLength, draggedOver]);

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDraggedOver(true);
  }

  function handleDragOut(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDraggedOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();

    try {
      const files = e.dataTransfer?.files;
      function verifyMimetype(file: File) {
        return /image\/.*/.test(file.type);
      }

      if (files && files.length) {
        const fileArr = Array.from(files);

        if (!fileArr.every(verifyMimetype)) return toast.warning("Only images are allowed.");
        if (files.length > 5) return toast.error("Only a maximum of 5 images is allowed");
        if (imageInputRef.current) (imageInputRef.current.files = files), setImagesLength(files.length);
      }
    } finally {
      setDraggedOver(false);
    }
  }

  return (
    <form className="space-y-6">
      <h3 className="text-sm text-center font-semibold">Images/Media Upload</h3>

      <div className="flex max-sm:flex-col max-sm:gap-6 sm:items-end">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-sm">
            <h4>Add Images/Photos</h4>
            <p className="text-zinc-700 text-xs">Add visuals for better engagement</p>
          </div>
          <div>
            <h4>Video Upload</h4>
            <p className="text-zinc-700 text-xs">Showcase your product with a 30-seconds video</p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <p className="text-xs text-center">Photos {imagesLength}/5 - You can add up to 5 photos.</p>
          <div
            onClick={() => imageInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragOut}
            className={cn("aspect-video bg-zinc-200 rounded-lg relative border border-zinc-400/80 text-sm", {
              "border-dashed border-4": draggedOver
            })}
          >
            <input
              ref={imageInputRef}
              onChange={(e) => {
                setImagesLength(e.target.files?.length!);
                setPreviewImageUrl((prev) => {
                  URL.revokeObjectURL(prev);
                  return URL.createObjectURL(e.target.files?.item(0)!);
                });
              }}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
            />

            <div
              className={cn("absolute inset-0 flex items-center justify-center flex-col gap-2 text-center", {
                "bg-white/50": !!imagesLength
              })}
            >
              {draggedOver ? (
                <p>Drop it like it's hot</p>
              ) : (
                <>
                  <Image />
                  Drag, Drop and Upload Your Photo
                </>
              )}
            </div>

            <img src={previewImageUrl} className="max-h-full max-w-full block mx-auto" alt="" />
          </div>
        </div>
      </div>

      <hr className="border-dashed" />

      <GradientHeader>Product/Service Details</GradientHeader>

      <div className="text-sm">
        <label htmlFor="name">Product/Service Name</label>
        <div>
          <Tag className="-scale-x-[1]" />
          <input type="text" placeholder="Product/Service Name" className="outline-none placeholder:text-xs" />
        </div>

        <Select
          label="Category"
          labelPlacement="outside"
          variant="bordered"
          className="[&_button]:border-1 [&_button]:border-black"
          placeholder="Select a category"
        >
          {productCategories.map((category) => (
            <SelectItem key={category.key}>{category.label}</SelectItem>
          ))}
        </Select>

        <div>
          <label htmlFor="description">
            <p>Product/Service Description</p>
            <p className="font-light text-zinc-600">
              Write the text or caption for your product or service to grab your customer's attention.
            </p>
          </label>
          <textarea
            name="description"
            id="description"
            className="outline-none border border-black rounded-2xl w-full min-h-44 text-sm p-4"
          ></textarea>
        </div>
      </div>
    </form>
  );
}

function GradientHeader({ children }: { children: string }) {
  return (
    <h3 className="px-4 py-2 bg-gradient-to-b from-white to-primary/25 text-center text-sm font-semibold">
      {children}
    </h3>
  );
}
