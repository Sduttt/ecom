
import React from 'react';

const Button = ({ children, type="button", bgColour="bg-blue-500 hover:bg-blue-700", textColour="text-white", className, ...props }) => {
  return (
    <button
      className={` ${bgColour} ${textColour} font-bold py-2 px-4 rounded ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
