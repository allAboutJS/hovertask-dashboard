export default function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const { label, ...rest } = props;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={rest.id}>{label}</label>
      <input
        {...rest}
        className="border border-zinc-300 bg-zinc-200/50 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-all text-sm"
      />
    </div>
  );
}
