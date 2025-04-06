import cn from "../utils/cn";

export default function Loading({ fixed }: { fixed?: boolean }) {
  return (
    <div
      className={cn("flex items-center justify-center bg-white/80", {
        "fixed inset-0 -top-8": fixed,
        "h-screen": !fixed
      })}
    >
      <img src="/images/loading.gif" alt="" />
    </div>
  );
}
