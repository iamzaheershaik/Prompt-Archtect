import React from 'react';
import { CinematicOption } from '../types';
import Tooltip from './Tooltip';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: CinematicOption[];
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, options, disabled = false }) => {
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
        <span>{label}</span>
        {selectedOption && <Tooltip text={selectedOption.description} />}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;