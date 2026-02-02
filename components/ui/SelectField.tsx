'use client';

import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';
import { GroupBase, StylesConfig, Props as SelectProps, components } from 'react-select';

export interface OptionType {
  label: string | number | undefined;
  value: string | number | undefined;
  short_name?: string | null | undefined;
}

const Select = dynamic<SelectProps<OptionType, boolean>>(
  () => import('react-select'),
  {
    ssr: false,
    loading: () => (
      <Skeleton height={42} borderRadius={10} style={{ width: '100%' }} />
    ),
  }
);

export const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (base) => ({
    ...base,
    outline: 'none',
    boxShadow: 'none',
    borderColor: '#D5D7DA',
    backgroundColor: 'white',
    padding: '4px 4px',
    cursor: 'pointer',
    borderRadius: '8px',
    '&:hover': {
      borderColor: '#D5D7DA',
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#E0E7FF'
      : state.isFocused
        ? '#F1F5F9'
        : 'white',
    color: '#0F172A',
    padding: '10px 15px',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#0F172A',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#0F172A',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '9px',
    borderRadius: '6px',
    backgroundColor: '#f1eeee',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform  duration-200 ${props.selectProps.menuIsOpen ? 'rotate-180' : 'rotate-0'
          }`}
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="#606060"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

type onChangeType = (
  newValue: OptionType | OptionType[] | null | undefined,
  actionMeta: { action: string; name?: string }
) => void;

export type CustomSelectProps = {
  value: OptionType | OptionType[] | null;
  onChange?: onChangeType;
  options: OptionType[];
  placeholder?: string;
  isClearable?: boolean;
  name?: string;
  isMulti?: boolean;
};

export default function SelectField({
  name,
  value,
  onChange,
  options,
  placeholder = 'Select...',
  isClearable = false,
  isMulti = false,
}: CustomSelectProps) {
  return (
    <Select
      name={name}
      value={value}
      onChange={
        onChange
          ? (newValue, actionMeta) =>
            onChange(newValue as OptionType | OptionType[] | null, actionMeta)
          : undefined
      }
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      isMulti={isMulti}
      isClearable={isClearable}
      components={{ DropdownIndicator }}
    />
  );
}
