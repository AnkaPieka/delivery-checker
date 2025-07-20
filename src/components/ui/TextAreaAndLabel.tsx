import React from "react";

interface TextAreaAndLabelProps {
  label?: string;
  value: string;
  onChange: (value: any) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  id?: string;
  disabled?: boolean;
}

const TextAreaAndLabel = ({
  label = "",
  value,
  onChange,
  error,
  placeholder = "[[1, 3], [2, 5]]...",
  rows = 4,
  className = "",
  id = "deliveries",
  disabled = false,
}: TextAreaAndLabelProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`w-full flex flex-col p-4 pb-2 ${className}`}>
      <label htmlFor={id} className="text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        className={`bg-[#f6f6f6] border-0 rounded-none p-2 focus:outline-none focus:ring-0 ${
          error ? "border-red-500" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        style={{ resize: "none" }}
        placeholder={placeholder}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span
          id={`${id}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default TextAreaAndLabel;
