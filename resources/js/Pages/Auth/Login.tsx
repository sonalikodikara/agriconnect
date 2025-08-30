import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
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
    const [search, setSearch] = useState("");

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
                    <img src="/images/AgriLogo.png" alt="AgriConnect Logo" className="h-12 w-12 rounded-full" />
                    <span className="text-2xl font-bold">AgriConnect</span>
                </div>

                <div className="space-x-3 flex items-center">
                {/* Home Button */}
                <Link
                    href="/"
                    className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg"
                >
                    {t('Home')}
                </Link>
                {/*Register button*/}
                <Link
                    href={route('register')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg"
                >
                    {t('Register')}
                </Link>

                    {/* Language Switcher */}
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('si')}>සිංහල</button>
                    <button onClick={() => changeLanguage('ta')}>தமிழ்</button>
                </div>
            </nav>

            {/* Login Form */}
            <div className="max-w-md mx-auto  bg-green-100 from-yellow-200 via-yellow-300 to-orange-200 p-8 rounded-2xl shadow-xl mt-28">
                <h2 className="text-3xl font-bold mb-6 text-center text-orange-800 drop-shadow-md">
                    {t('Log in')}
                </h2>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
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
                    <div className="flex items-center justify-between">
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
            <footer className="bg-green-700 text-white py-10 mt-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    <div>
                        <h3 className="text-xl font-bold mb-4">AgriConnect</h3>
                        <p>{t('Connecting farmers with markets and advisors across Sri Lanka.')}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('Quick Links')}</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-yellow-200">{t('Home')}</Link></li>
                            <li><Link href="/services" className="hover:text-yellow-200">{t('Services')}</Link></li>
                            <li><Link href="/resources" className="hover:text-yellow-200">{t('Resources')}</Link></li>
                            <li><Link href="/about" className="hover:text-yellow-200">{t('About')}</Link></li>
                            <li><Link href="/contact" className="hover:text-yellow-200">{t('Contact')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('Contact Us')}</h3>
                        <p>Email: info@agriconnect.lk</p>
                        <p>Phone: +94 71 234 5678</p>
                        <p>Address: Colombo, Sri Lanka</p>
                    </div>
                </div>
                <div className="text-center mt-8 border-t border-white/30 pt-4">
                    &copy; {new Date().getFullYear()} AgriConnect. {t('all_rights')}
                </div>
            </footer>
        </div>
    );
}
