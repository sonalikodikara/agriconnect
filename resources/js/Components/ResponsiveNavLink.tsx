import { ReactNode } from 'react';

type ResponsiveNavLinkProps = {
    children: ReactNode;
    href: string;
    active?: boolean;
    method?: 'get' | 'post';
    as?: 'button' | 'a';
};

export default function ResponsiveNavLink({ children, href, active, method = 'get', as = 'a' }: ResponsiveNavLinkProps) {
    if (as === 'button') {
        return (
            <button
                onClick={() => {
                    if (method === 'post') {
                        fetch(href, { method: 'POST' });
                    }
                }}
                className={`block w-full px-4 py-2 text-left text-sm font-medium ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
                {children}
            </button>
        );
    }

    return (
        <a
            href={href}
            className={`block px-4 py-2 text-sm font-medium ${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
            {children}
        </a>
    );
}
