export default function EmptyMapErr({
  description,
  onButtonClick,
  buttonInnerText
}: {
  description: string;
  buttonInnerText: string;
  onButtonClick?(): any;
}) {
  return (
    <div className="flex flex-col gap-1 items-center justify-center text-center">
      <img src="/images/iconoir_info-empty.png" width={60} alt="" />
      <p>{description}</p>
      <button
        onClick={onButtonClick || (() => window.location.reload())}
        className="bg-primary text-white px-4 py-2 text-sm rounded-lg transition-transform active:scale-95"
      >
        {buttonInnerText}
      </button>
    </div>
  );
}
