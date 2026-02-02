'use client';

import React from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  id: string;
  maxLength?: number;
  loading?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  maxLength,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  id,
  loading,
  onChange,
  ...rest
}) => {
  const sanitizeInput = (value: string) => {
    return value
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/<.*?>/g, '')
      .replace(/"/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = sanitizeInput(e.target.value);
    if (onChange) {
      e.target.value = cleanedValue;
      onChange(e);
    }
  };

  return (
    <div className={`input_container ${containerClassName} ${loading ? 'loading' : ''}`}>
      {label && (
        <label htmlFor={id} className={`flex items-center gap-1 ${labelClassName}`}>
          <p className="font-medium md:text-base text-sm text-siteColor">{label}</p>
        </label>
      )}
      <input
        id={id}
        type="text"
        autoComplete="new-password"
        maxLength={maxLength ?? undefined}
        className={`w-full border border-[#D0D5DD] rounded-lg px-2.5 sm:py-3 py-2.5 text-sm ${inputClassName}`}
        onChange={handleChange}
        {...rest}
      />
      {loading && <div className="zip_loader"></div>}
      {error ? (
        <div className="error laptop:text-xs laptop:whitespace-nowrap">{error}</div>
      ) : (
        <div className="error error-invisible laptop:text-xs laptop:whitespace-nowrap"></div>
      )}
    </div>
  );
};

export default InputField;
