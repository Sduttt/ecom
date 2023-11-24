
import React, { useId, forwardRef } from 'react';

const Input = ({ label, type="text", placeholder, value, className, ...props }, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black ${className}`}
                ref={ref}
                {...props}  
            />
        </div>
    );
};

export default forwardRef(Input);
