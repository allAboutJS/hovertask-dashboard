import { Autocomplete, AutocompleteItem, AutocompleteProps, Select, SelectItem, SelectProps } from "@heroui/react";

export default function CustomSelect(
  props: Omit<SelectProps & AutocompleteProps, "className" | "children"> & {
    options: { key: string; label: string }[];
    isAutoComplete?: boolean;
  }
) {
  const { isAutoComplete, options, ...rest } = props;

  return (
    <div>
      {isAutoComplete ? (
        <Autocomplete
          labelPlacement="outside"
          {...rest}
          className="[&_div[data-slot='main-wrapper']]:border-1 [&_div[data-slot='main-wrapper']]:bg-zinc-200/50 [&_div[data-slot='main-wrapper']]:border-zinc-300 [&_div[data-slot='main-wrapper']]:rounded-lg"
        >
          {props.options.map((type) => (
            <AutocompleteItem key={type.key}>{type.label}</AutocompleteItem>
          ))}
        </Autocomplete>
      ) : (
        <Select
          labelPlacement="outside"
          {...rest}
          className="[&_button]:border-1 [&_button]:bg-200/50 [&_button]:border-zinc-300 [&_button]:rounded-lg"
        >
          {props.options.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
      )}
      {props.errorMessage && <small className="text-danger">{props.errorMessage as string}</small>}
    </div>
  );
}
