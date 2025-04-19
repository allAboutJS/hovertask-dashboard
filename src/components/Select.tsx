import { Select, SelectItem, SelectProps } from "@heroui/react";

export default function CustomSelect(
  props: Omit<SelectProps, "className" | "children"> & { options: { key: string; label: string }[] }
) {
  const { options, ...rest } = props;

  return (
    <div>
      <Select
        {...rest}
        className="[&_button]:border-1 [&_button]:bg-200/50 [&_button]:border-zinc-300 [&_button]:rounded-lg"
      >
        {props.options?.map((type) => (
          <SelectItem key={type.key}>{type.label}</SelectItem>
        ))}
      </Select>
      {props.errorMessage && <small className="text-danger">{props.errorMessage as string}</small>}
    </div>
  );
}
