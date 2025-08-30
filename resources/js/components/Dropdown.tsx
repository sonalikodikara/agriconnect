import { ReactNode, useState } from 'react';

type DropdownProps = {
    children: ReactNode;
};

type DropdownTriggerProps = {
    children: ReactNode;
};

type DropdownContentProps = {
    children: ReactNode;
};

type DropdownLinkProps = {
    children: ReactNode;
    href: string;
    method?: 'get' | 'post';
    as?: 'button' | 'a';
};

export default function Dropdown({ children }: DropdownProps) {
    return <div className="relative">{children}</div>;
}

export const Trigger = ({ children }: DropdownTriggerProps) => {
    return <>{children}</>;
};

export const Content = ({ children }: DropdownContentProps) => {
    return (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">{children}</div>
        </div>
    );
};

export const Link = ({ children, href, method = 'get', as = 'a' }: DropdownLinkProps) => {
    if (as === 'button') {
        return (
            <button
                onClick={() => {
                    if (method === 'post') {
                        fetch(href, { method: 'POST' });
                    }
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
                {children}
            </button>
        );
    }

    return (
        <a href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {children}
        </a>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = Link;
