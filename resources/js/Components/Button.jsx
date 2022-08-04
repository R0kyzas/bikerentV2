import React from 'react';

export default function Button({ type = 'submit', className = '', onClick , processing, children }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-main-color font-semibold text-xs text-white uppercase tracking-widest active: transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
