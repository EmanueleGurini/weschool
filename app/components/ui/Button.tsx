import React from 'react';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', className = '', onClick, children }) => {
    return (
        <button
            type={type}
            className={`inline-block border rounded-lg bg-contrast py-3 px-6 font-sans text-xs font-bold uppercase text-color100 shadow-md transition-all hover:bg-contrastHover focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 text-left ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
