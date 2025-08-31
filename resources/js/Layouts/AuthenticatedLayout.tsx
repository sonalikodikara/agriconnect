import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { User, Settings, LogOut } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/components/NavLink';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Toaster } from "@/components/ui/toaster"; 

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { t } = useTranslation();
    const user = { name: 'John Doe', email: 'john@example.com' }; // replace with Inertia usePage().props.auth.user

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-green-100">
             
            {/* Navbar */}
            <nav className="border-b border-gray-100 bg-green-700 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <img
                                    src="/images/AgriLogo.png"
                                    alt="AgriConnect Logo"
                                    className="block h-12 w-auto rounded-full"
                                />
                            </Link>
                            <div className="hidden space-x-8 sm:flex font-semibold ms-10">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-white text-2xl font-bold"
                                >
                                    {t('AgriConnect')}
                                </NavLink>
                            </div>
                        </div>

                        {/* Desktop Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                        <User className="w-5 h-5 text-green-600 me-2" />
                                        {user.name}
                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        <Settings className="w-4 h-4 me-2 text-blue-600 inline" />
                                        {t('Profile')}
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <LogOut className="w-4 h-4 me-2 text-red-600 inline" />
                                        {t('Log Out')}
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            {t('AgriConnect')}
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="flex items-center gap-2 text-base font-medium text-gray-800">
                                <User className="w-5 h-5 text-green-600" /> {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                <Settings className="w-4 h-4 me-2 text-blue-600 inline" />
                                {t('Profile')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                <LogOut className="w-4 h-4 me-2 text-red-600 inline" />
                                {t('Log Out')}
                            </ResponsiveNavLink>
                        </div>
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            {/* Language Switcher for Desktop */}
            <div className="sm:flex justify-end mx-6 mt-2 hidden">
                <LanguageSwitcher />
            </div>

            <main>{children}</main> 

            {/* Toast Notifications */}
            <Toaster position="top-right" />
        </div>
    );
}
