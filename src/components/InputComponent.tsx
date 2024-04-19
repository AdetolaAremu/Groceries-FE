import React from "react";

interface TextInputProps {
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  error?: string | number;
  icon?: React.ReactNode;
  inputWidth?: string;
  inputPadding?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  name,
  placeholder = "",
  error = "",
  icon = null,
  inputWidth = "w-full",
  inputPadding = "",
}) => {
  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="mb-3">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          className={`block ${inputWidth} ${inputPadding} p-3 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
          focus:ring-buttonGreen focus:border-buttonGreen focus:outline-none`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default TextInput;
