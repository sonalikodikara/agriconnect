import { useTranslation } from 'react-i18next';
import { Head, Link } from "@inertiajs/react";

export default function Seeds() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const products = [
        { name: "Paddy Seeds", price: "Rs. 500/kg", img: "/images/paddy-seeds.jpg", description: t('paddy_desc') },
        { name: "Maize Seeds", price: "Rs. 300/kg", img: "/images/maize-seeds.jpg", description: t('maize_desc') },
        { name: "Vegetable Seeds", price: "Rs. 200/pack", img: "/images/veg-seeds.jpg", description: t('veg_desc') },
    ];

    return (
        <div className="min-h-screen bg-green-100 text-gray-800">
            <Head>
                <title>{t('seeds')} - AgriConnect</title>
            </Head>

            {/* Navbar (Simplified, or reuse from Welcome) */}
            <nav className="flex justify-between items-center p-4 bg-green-700 text-white">
                <Link href="/" className="text-xl font-bold">{t('agriconnect')}</Link>
                <div className="space-x-2">
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('si')}>සිංහල</button>
                    <button onClick={() => changeLanguage('