import React from 'react';

interface InputFieldProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    unit?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, value, onChange, placeholder, unit }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    inputMode="decimal"
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {unit && (
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputField;
