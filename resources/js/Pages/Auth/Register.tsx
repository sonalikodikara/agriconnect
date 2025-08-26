import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Register() {
    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'buyer',
    });

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
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
                {/* login button*/}
                <Link
                    href={route('login')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-4 py-2 rounded-lg"
                >
                    {t('Log in')}
                </Link>

                    {/* Translator Buttons */}
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('si')}>සිංහල</button>
                    <button onClick={() => changeLanguage('ta')}>தமிழ்</button>
                </div>
            </nav>

            {/* Registration Form */}
            <div className="max-w-lg mx-auto bg-green-100 from-white-100 to-white-400 p-8 rounded-xl shadow-lg mt-28">
                <h2 className="text-3xl font-bold mb-6 text-center text-black drop-shadow-lg">
                    {t('Register')}
                </h2>
                <form onSubmit={submit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <InputLabel htmlFor="name" value={t('Name')} className="text-black font-semibold" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full rounded-lg px-4 py-2 border border-green-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2 text-red-600" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value={t('Email')} className="text-black font-semibold" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg px-4 py-2 border border-green-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2 text-red-600" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value={t('Password')} className="text-black font-semibold" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg px-4 py-2 border border-green-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2 text-red-600" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel htmlFor="password_confirmation" value={t('Confirm Password')} className="text-black font-semibold" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full rounded-lg px-4 py-2 border border-green-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2 text-red-600" />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <InputLabel htmlFor="role" value={t('Select Role')} className="text-black font-semibold" />
                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className="mt-1 block w-full rounded-lg px-4 py-2 border border-green-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none bg-white text-green-900 font-medium"
                        >
                            <option value="buyer">{t('Buyer')}</option>
                            <option value="supplier">{t('Supplier')}</option>
                            <option value="advisor">{t('Advisor')}</option>
                        </select>
                        <InputError message={errors.role} className="mt-2 text-red-600" />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between">
                        <Link
                            href={route('login')}
                            className="text-sm text-black underline hover:text-yellow-200"
                        >
                            {t('Already registered?')}
                        </Link>

                        <PrimaryButton className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-6 py-2 rounded-lg" disabled={processing}>
                            {t('Register')}
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
                            <li><Link href="/" className="hover:text-yellow-300">{t('Home')}</Link></li>
                            <li><Link href="/services" className="hover:text-yellow-300">{t('Services')}</Link></li>
                            <li><Link href="/resources" className="hover:text-yellow-300">{t('Resources')}</Link></li>
                            <li><Link href="/about" className="hover:text-yellow-300">{t('About')}</Link></li>
                            <li><Link href="/contact" className="hover:text-yellow-300">{t('Contact')}</Link></li>
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

