import { Image } from "lucide-react";
import { DragEvent, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import cn from "../utils/cn";

export default function ImageInput(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "accept" | "onChange" | "className"> & {
    maxLength?: number;
  }
) {
  let { maxLength, ...rest } = props;
  const [draggedOver, setDraggedOver] = useState(false);
  const [imagesLength, setImagesLength] = useState<number>(0);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  if (!maxLength) maxLength = Number.POSITIVE_INFINITY;

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > maxLength!) {
      e.target.files = null;
      return toast.error("Only a maximum of 5 images is allowed");
    }

    if (!e.target.files || !e.target.files?.length) return toast.warning("Please select an image");

    setImagesLength(e.target.files?.length!);
    setPreviewImageUrl((prev) => {
      URL.revokeObjectURL(prev);
      return URL.createObjectURL(e.target.files?.item(0)!);
    });
  }

  return (
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
        onChange={handleChange}
        type="file"
        accept="image/*"
        className="opacity-0"
        {...rest}
        multiple={maxLength ? maxLength > 1 : false}
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
  );
}
