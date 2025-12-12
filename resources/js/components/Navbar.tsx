import { Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-green-700 text-white fixed top-0 left-0 w-full z-50 shadow-lg">
            <div className="flex items-center space-x-2">
                {/* Mobile Menu Toggle Button */}
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                    </svg>
                </button>
                <img src="/images/AgriLogo.png" alt="AgriConnect Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                <span className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'Poppins' }}>AgriConnect</span>
            </div>

            {/* Desktop Navbar Items */}
            <div className="hidden md:flex space-x-3 items-center">
                {/* Home Button */}
                <Link
                    href="/"
                    className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg"
                >
                    {t('Home')}
                </Link>
                {/* Profile Button */}
                <Link
                    href={route('dashboard')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg"
                >
                    {t('Profile')}
                </Link>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg"
                >
                    {t('Logout')}
                </button>
                {/* Language Buttons */}
                <button onClick={() => changeLanguage('en')} className="hover:text-yellow-300">English</button>
                <button onClick={() => changeLanguage('si')} className="hover:text-yellow-300">සිංහල</button>
                <button onClick={() => changeLanguage('ta')} className="hover:text-yellow-300">தமிழ்</button>
            </div>
        </nav>
    );
}