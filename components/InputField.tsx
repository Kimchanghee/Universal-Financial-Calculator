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
        <div className="mb-5 group">
            <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-red-600">
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
                    className="w-full px-4 py-3.5 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl shadow-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/10 hover:border-slate-300 placeholder:text-slate-400"
                />
                {unit && (
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-semibold text-slate-500 pointer-events-none">
                        {unit}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputField;
