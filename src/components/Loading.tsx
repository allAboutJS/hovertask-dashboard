import cn from "../utils/cn";

export default function Loading({ fixed, animationOnly }: { fixed?: boolean; animationOnly?: boolean }) {
  return animationOnly ? (
    <img src="/images/loading.gif" alt="" />
  ) : (
    <div
      className={cn("flex items-center justify-center", {
        "fixed inset-0 bg-white/80 z-[999999]": fixed
      })}
    >
      <img src="/images/loading.gif" alt="" />
    </div>
  );
}
