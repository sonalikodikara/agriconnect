<<<<<<< HEAD
import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700') +
                className
            }
        >
            {children}
        </Link>
=======
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
>>>>>>> AG-26
    );
}
