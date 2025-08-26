import { ReactNode } from 'react';

type NavLinkProps = {
    children: ReactNode;
    href: string;
    active?: boolean;
    className?: string;
};

export default function NavLink({ children, href, active, className }: NavLinkProps) {
    return (
        <a
            href={href}
            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                active
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-300 hover:border-white hover:text-white'
            } ${className}`}
        >
            {children}
        </a>
    );
}
