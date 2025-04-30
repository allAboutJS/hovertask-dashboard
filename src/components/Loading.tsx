export default function Loading({ fixed }: { fixed?: boolean; animationOnly?: boolean }) {
  return fixed ? (
    <div className="flex items-center justify-center fixed mt-0 inset-0 bg-white/80 z-[999999]">
      <img src="/images/loading.gif" alt="" />
    </div>
  ) : (
    <img src="/images/loading.gif" alt="" />
  );
}
