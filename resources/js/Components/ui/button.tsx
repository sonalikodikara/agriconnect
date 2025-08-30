import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button
            {...props}
            className={`px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold ${className}`}
        >
            {children}
        </button>
    );
};
