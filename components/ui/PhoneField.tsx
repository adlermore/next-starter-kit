'use client';

import { InputMask } from '@react-input/mask';

export interface PhoneFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneField: React.FC<PhoneFieldProps> = ({
  label = "Phone Number",
  error,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  id,
  onChange,
  ...rest
}) => {
  return (
    <div className={`input_container ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className={`flex items-center gap-1 ${labelClassName}`}>
          <p className="font-medium md:text-base text-sm text-siteColor">{label}</p>
        </label>
      )}
      <InputMask
        id={id}
        mask="(___) ___-____"
        replacement={{ _: /\d/ }}
        className={`w-full border border-[#D0D5DD] rounded-lg px-2.5 sm:py-3 py-2.5  text-sm ${inputClassName}`}
        placeholder="Enter your phone number"
        onChange={onChange}
        {...rest}
      />
      {error ?
        <div className="error laptop:text-xs laptop:whitespace-nowrap">{error}</div>
        :
        <div className="error error-invisible laptop:text-xs laptop:whitespace-nowrap"></div>
      }
    </div>
  );
};

export default PhoneField;