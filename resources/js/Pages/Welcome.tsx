import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Head } from "@inertiajs/react";
import { useState } from 'react';

export default function Welcome() {
    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
    };

    const services = [
        { key: "seeds", img: "/images/seeds.png", products: ["Paddy", "Maize", "Vegetables"] },
        { key: "fertilizer", img: "/images/fertilizer.png", products: ["Urea", "Organic Compost", "NPK Mix"] },
        { key: "equipment", img: "/images/tools.png", products: ["Sprayers", "Harvest Tools", "Water Pumps"] },
        { key: "vehicles", img: "/images/tractors.png", products: ["Tractors", "Mini Trucks", "Transport Vans"] },
        { key: "advisors", img: "/images/advisor.png", products: ["Farming Advisors", "Soil Experts", "Crop Doctors"] },
    ];

    const filteredServices = services.filter(service =>
        (filter === "all" || service.key === filter) &&
        (search === "" || service.products.some(p => p.toLowerCase().includes(search.toLowerCase())))
    );

    return (
        <div className="min-h-screen bg-green-100 text-gray-800">
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

                <div className="hidden md:flex space-x-6">
                    <a href="#home" className="hover:text-yellow-300">{t('home')}</a>
                    <a href="#services" className="hover:text-yellow-300">{t('services')}</a>
                    <a href="#resources" className="hover:text-yellow-300">{t('resources')}</a>
                    <a href="#about" className="hover:text-yellow-300">{t('about')}</a>
                    <a href="#contact" className="hover:text-yellow-300">{t('contact')}</a>
                </div>

                <div className="space-x-3">
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('si')}>සිංහල</button>
                    <button onClick={() => changeLanguage('ta')}>தமிழ்</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header id="home" className="relative w-full h-screen">
                <Slider {...sliderSettings} className="h-full">
                    {["/images/farming1.jpg", "/images/farm2.jpg", "/images/farming2.png"].map((img, idx) => (
                        <div key={idx} className="relative w-full h-screen">
                            <img src={img} alt={`Farm ${idx + 1}`} className="w-full h-screen object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                                <h1 className="text-7xl font-bold mb-4 drop-shadow-lg">{t('welcome')}</h1>
                                <p className="text-xl mb-6 drop-shadow-lg">{t('login_instruction')}</p>
                                <div className="space-x-4">
                                    <a href="/login" className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 shadow-md">
                                        {t('Log in')}
                                    </a>
                                    <a href="/register" className="px-6 py-3 bg-yellow-500 text-white rounded-lg text-lg hover:bg-yellow-600 shadow-md">
                                        {t('Register')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </header>

            {/* Search & Filters */}
            <section className="bg-white py-10 px-6 max-w-6xl mx-auto rounded-lg shadow-md -mt-10 relative z-10">
                <h2 className="text-2xl font-bold mb-4 text-center">{t('find_products')}</h2>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <input
                        type="text"
                        placeholder={t("search_placeholder")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-2/3 px-4 py-2 border rounded-lg shadow"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border rounded-lg shadow"
                    >
                        <option value="all">{t("all_categories")}</option>
                        <option value="seeds">{t("seeds")}</option>
                        <option value="fertilizer">{t("fertilizer")}</option>
                        <option value="equipment">{t("equipment")}</option>
                        <option value="vehicles">{t("vehicles")}</option>
                        <option value="advisors">{t("advisors")}</option>
                    </select>
                </div>
            </section>

            {/* Services Section with Bigger Icons */}
            <section id="services" className="py-12 px-4 max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold mb-8 text-center">{t('services')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {filteredServices.map(service => (
                        <div 
                            key={service.key} 
                            className="p-6 bg-white rounded-lg shadow hover:shadow-lg flex flex-col items-center"
                        >
                            <div className="w-32 h-32 flex items-center justify-center bg-green-50 rounded-full mb-4 shadow-inner">
                                <img 
                                    src={service.img} 
                                    alt={service.key} 
                                    className="w-30 h-90 object-contain" 
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t(service.key)}</h3>
                            <ul className="text-gray-600 space-y-1">
                                {service.products.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Instructions Section */}
            <section className="bg-green-300 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">{t('instructions')}</h2>
                <p className="max-w-xl mx-auto text-lg whitespace-pre-line">
                   {t('instructions_text')}
                </p>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-green-700 text-white py-10 mt-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                    <div>
                        <h3 className="text-xl font-bold mb-4">AgriConnect</h3>
                        <p>{t('Connecting farmers with markets and advisors across Sri Lanka.')}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">{t('Quick Links')}</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="hover:text-yellow-300">{t('Home')}</a></li>
                            <li><a href="#services" className="hover:text-yellow-300">{t('Services')}</a></li>
                            <li><a href="#resources" className="hover:text-yellow-300">{t('Resources')}</a></li>
                            <li><a href="#about" className="hover:text-yellow-300">{t('About')}</a></li>
                            <li><a href="#contact" className="hover:text-yellow-300">{t('Contact')}</a></li>
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
