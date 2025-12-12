import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react'; // Added usePage
import { FormEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { t, i18n } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile nav toggle
    const { props } = usePage(); // Access page props for status_key

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    // Determine the message to display: translate if status_key is present, else use raw status
    const displayMessage = props.status_key ? t(props.status_key) : status;

    return (
        <div className="min-h-screen text-gray-800">
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Noto+Sans+Sinhala:wght@400;600&family=Noto+Sans+Tamil:wght@400;600&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    body { font-family: 'Poppins', 'Noto Sans Sinhala', 'Noto Sans Tamil', sans-serif; }
                `}</style>
            </Head>

            {/* Navbar */}
            <nav className="flex justify-between items-center p-4 bg-green-700 text-white fixed top-0 left-0 w-full z-50 shadow-lg">
                <div className="flex items-center space-x-2">
                    {/* Mobile Menu Toggle Button */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                    <img src="/images/AgriLogo.png" alt="AgriConnect Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                    <span className="text-xl md:text-2xl font-bold">AgriConnect</span>
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
                    {/* Register Button */}
                    <Link
                        href={route('register')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg"
                    >
                        {t('Register')}
                    </Link>
                    {/* Language Buttons */}
                    <button onClick={() => changeLanguage('en')} className="hover:text-yellow-300">English</button>
                    <button onClick={() => changeLanguage('si')} className="hover:text-yellow-300">සිංහල</button>
                    <button onClick={() => changeLanguage('ta')} className="hover:text-yellow-300">தமிழ்</button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-green-700 text-white p-4 fixed top-16 left-0 w-full z-40 shadow-lg">
                    <Link
                        href="/"
                        className="block py-2 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg mb-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t('Home')}
                    </Link>
                    <Link
                        href={route('register')}
                        className="block py-2 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg mb-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t('Register')}
                    </Link>
                    <div className="mt-4 border-t border-white/30 pt-4">
                        <p className="text-sm mb-2">{t('Language')}</p>
                        <div className="space-x-2">
                            <button onClick={() => changeLanguage('en')} className="hover:text-yellow-300">English</button>
                            <button onClick={() => changeLanguage('si')} className="hover:text-yellow-300">සිංහල</button>
                            <button onClick={() => changeLanguage('ta')} className="hover:text-yellow-300">தமிழ்</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Form */}
            <div className="max-w-md mx-auto bg-green-100 from-yellow-200 via-yellow-300 to-orange-200 p-6 md:p-8 rounded-2xl shadow-xl mt-24 md:mt-28">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-orange-800 drop-shadow-md">
                    {t('Log in')}
                </h2>

                {displayMessage && (
                    // Add green text for status messages and transparent background with border
                    <div className="mb-4 font-medium text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg p-3">
                        {displayMessage}
                    </div>
                    
                )}

                <form onSubmit={submit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value={t('Email')} className="text-orange-800 font-semibold" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg px-4 py-2 border border-orange-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2 text-red-600" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value={t('Password')} className="text-orange-800 font-semibold" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg px-4 py-2 border border-orange-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2 text-red-600" />
                    </div>

                    {/* Remember Me */}
                    <div className="mt-4 flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-orange-800">
                            {t('Remember me')}
                        </span>
                    </div>

                    {/* Submit & Forgot Password */}
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-orange-800 underline hover:text-yellow-700"
                            >
                                {t('Forgot your password?')}
                            </Link>
                        )}

                        <PrimaryButton
                            className="bg-yellow-500 hover:bg-yellow-600 text-orange-900 font-bold px-6 py-2 rounded-lg"
                            disabled={processing}
                        >
                            {t('Log in')}
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <footer className="bg-green-700 text-white py-8 md:py-10 mt-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-4">AgriConnect</h3>
                        <p className="text-sm md:text-base">{t('Connecting farmers with markets and advisors across Sri Lanka.')}</p>
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-4">{t('Quick Links')}</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li><Link href="/" className="hover:text-yellow-200">{t('Home')}</Link></li>
                            <li><Link href="/services" className="hover:text-yellow-200">{t('Services')}</Link></li>
                            <li><Link href="/resources" className="hover:text-yellow-200">{t('Resources')}</Link></li>
                            <li><Link href="/about" className="hover:text-yellow-200">{t('About')}</Link></li>
                            <li><Link href="/contact" className="hover:text-yellow-200">{t('Contact')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-4">{t('Contact Us')}</h3>
                        <p className="text-sm md:text-base">Email: info@agriconnect.lk</p>
                        <p className="text-sm md:text-base">Phone: +94 71 234 5678</p>
                        <p className="text-sm md:text-base">Address: Colombo, Sri Lanka</p>
                    </div>
                </div>
                <div className="text-center mt-6 md:mt-8 border-t border-white/30 pt-4 text-sm md:text-base">
                    &copy; {new Date().getFullYear()} AgriConnect. {t('all_rights')}
                </div>
            </footer>
        </div>
    );
}