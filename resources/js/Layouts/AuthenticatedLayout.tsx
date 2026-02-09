import { useState, PropsWithChildren, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { User, Settings, LogOut, Menu, X } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { LanguageSwitcher } from '@/Components/LanguageSwitcher';
import { Toaster } from "@/Components/ui/toaster";

interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthPageProps {
    auth: {
        user: AuthUser;
    };
    [key: string]: any;
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { t } = useTranslation();
    const { auth } = usePage<AuthPageProps>().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col">
            {/* Navbar */}
            <nav className="bg-green-700 border-b border-green-600 shadow-lg sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left section - Logo + Brand */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <Link href="/" className="flex-shrink-0">
                                <img
                                    src="/images/AgriLogo.png"
                                    alt="AgriConnect Logo"
                                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full border-2 border-white/30 shadow-sm"
                                />
                            </Link>

                            <div className="hidden sm:block">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-white hover:text-green-100 text-xl md:text-2xl font-bold tracking-tight"
                                >
                                    {t('AgriConnect')}
                                </NavLink>
                            </div>
                        </div>

                        {/* Desktop Navigation + User Menu */}
                        <div className="hidden sm:flex sm:items-center sm:gap-5">
                            <LanguageSwitcher />

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-150">
                                        <User className="w-5 h-5" />
                                        <span className="font-medium">{user?.name}</span>
                                        <svg
                                            className="h-4 w-4 opacity-70"
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
                                        <Settings className="w-4 h-4 mr-2 text-blue-500" />
                                        {t('Profile')}
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <LogOut className="w-4 h-4 mr-2 text-red-500" />
                                        {t('Log Out')}
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile menu button */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                                aria-label="Toggle menu"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-7 w-7" />
                                ) : (
                                    <Menu className="h-7 w-7" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div
                    className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                        showingNavigationDropdown ? 'max-h-screen' : 'max-h-0'
                    }`}
                >
                    <div className="px-4 pt-2 pb-4 space-y-3 bg-green-800 border-t border-green-600">
                        {/* Brand in mobile menu */}
                        <div className="pb-2 border-b border-green-600/50">
                            <div className="block text-lg font-bold text-white px-3 py-2">
                                <ResponsiveNavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    {t('AgriConnect')}
                                </ResponsiveNavLink>
                            </div>
                        </div>

                        <div className="py-2">
                            <LanguageSwitcher />
                        </div>

                        <div className="px-3 py-3 bg-green-900/40 rounded-lg">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="font-medium">{user?.name}</div>
                                    <div className="text-sm text-green-200">{user?.email}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 pt-2">
                            <div className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-green-600 rounded-md transition-colors">
                                <ResponsiveNavLink href={route('profile.edit')}>
                                    <Settings className="w-5 h-5 text-blue-300" />
                                    {t('Profile')}
                                </ResponsiveNavLink>
                            </div>

                            <div className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-red-600/80 rounded-md transition-colors w-full text-left">
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                >
                                    <LogOut className="w-5 h-5 text-red-300" />
                                    {t('Log Out')}
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header */}
            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            <Toaster />
        </div>
    );
}