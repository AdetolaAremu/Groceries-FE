import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  placeholder: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  value,
  onChange,
  name,
  placeholder,
}) => {
  return (
    <select
      className="py-2 px-3 w-64 rounded-xl"
      onChange={onChange}
      value={value}
      name={name}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
