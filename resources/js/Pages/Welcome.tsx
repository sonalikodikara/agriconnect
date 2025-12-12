import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Head, Link } from "@inertiajs/react"; // Added Link for navigation
import { useState } from 'react';

export default function Welcome() {
    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile nav toggle

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
        { key: "seeds", img: "/images/seeds.png", products: ["Paddy", "Maize", "Vegetables"], route: "/list/seeds" },
        { key: "fertilizer", img: "/images/fertilizer.png", products: ["Urea", "Organic Compost", "NPK Mix"], route: "/list/fertilizer" },
        { key: "equipment", img: "/images/tools.png", products: ["Sprayers", "Harvest Tools", "Water Pumps"], route: "/list/equipment" },
        { key: "vehicles", img: "/images/tractors.png", products: ["Tractors", "Mini Trucks", "Transport Vans"], route: "/list/vehicles" },
        { key: "advisors", img: "/images/advisor.png", products: ["Farming Advisors", "Soil Experts", "Crop Doctors"], route: "/list/advisors" },
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
                {/* Mobile Toggle Button (Left Side, Constant on Mobile) */}
                <div className="flex items-center space-x-2">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                    <img src="/images/AgriLogo.png" alt="AgriConnect Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full" />
                    <span className="text-xl md:text-2xl font-bold">{t('agriconnect')}</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <a href="#home" className="hover:text-yellow-300">{t('home')}</a>
                    <a href="#services" className="hover:text-yellow-300">{t('services')}</a>
                    <a href="#resources" className="hover:text-yellow-300">{t('resources')}</a>
                    <a href="#about" className="hover:text-yellow-300">{t('about')}</a>
                    <a href="#contact" className="hover:text-yellow-300">{t('contact')}</a>
                </div>

                {/* Language Buttons (Desktop Only) */}
                <div className="hidden md:flex space-x-3">
                    <button onClick={() => changeLanguage('en')} className="text-base">English</button>
                    <button onClick={() => changeLanguage('si')} className="text-base">සිංහල</button>
                    <button onClick={() => changeLanguage('ta')} className="text-base">தமிழ்</button>
                </div>
            </nav>

            {/* Mobile Menu (Separate Mobile View, Includes Language Buttons) */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-green-700 text-white p-4 fixed top-16 left-0 w-full z-40 shadow-lg">
                    <a href="#home" className="block py-2 hover:text-yellow-300">{t('home')}</a>
                    <a href="#services" className="block py-2 hover:text-yellow-300">{t('services')}</a>
                    <a href="#resources" className="block py-2 hover:text-yellow-300">{t('resources')}</a>
                    <a href="#about" className="block py-2 hover:text-yellow-300">{t('about')}</a>
                    <a href="#contact" className="block py-2 hover:text-yellow-300">{t('contact')}</a>
                    <div className="mt-4 border-t border-white/30 pt-4">
                        <p className="text-sm mb-2">{t('language')}</p>
                        <div className="space-x-2">
                            <button onClick={() => changeLanguage('en')} className="text-sm">English</button>
                            <button onClick={() => changeLanguage('si')} className="text-sm">සිංහල</button>
                            <button onClick={() => changeLanguage('ta')} className="text-sm">தமிழ்</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <header id="home" className="relative w-full h-screen pt-16 md:pt-0"> {/* Added pt-16 for fixed nav */}
                <Slider {...sliderSettings} className="h-full">
                    {["/images/farming1.jpg", "/images/farm2.jpg", "/images/farming2.png"].map((img, idx) => (
                        <div key={idx} className="relative w-full h-screen">
                            <img src={img} alt={`Farm ${idx + 1}`} className="w-full h-screen object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                                <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg">{t('welcome')}</h1>
                                <p className="text-lg md:text-xl mb-6 drop-shadow-lg">{t('login_instruction')}</p>
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                    <a href="/login" className="px-4 md:px-6 py-2 md:py-3 bg-green-600 text-white rounded-lg text-base md:text-lg hover:bg-green-700 shadow-md">
                                        {t('Log in')}
                                    </a>
                                    <a href="/register" className="px-4 md:px-6 py-2 md:py-3 bg-yellow-500 text-white rounded-lg text-base md:text-lg hover:bg-yellow-600 shadow-md">
                                        {t('Register')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </header>

            {/* Search & Filters */}
            <section className="bg-white py-6 md:py-10 px-4 md:px-6 max-w-6xl mx-auto rounded-lg shadow-md -mt-10 relative z-10">
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">{t('find_products')}</h2>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex w-full md:w-2/3">
                        <input
                            type="text"
                            placeholder={t("search_placeholder")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-l-lg shadow text-base"
                        />
                        <button className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700">
                            {t('search')}
                        </button>
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full md:w-auto px-4 py-2 border rounded-lg shadow text-base"
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

            {/* Services Section */}
            <section id="services" className="py-8 md:py-12 px-4 max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center">{t('services')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center">
                    {filteredServices.map(service => (
                        <Link 
                            key={service.key} 
                            href={service.route} 
                            className="p-4 md:p-6 bg-white rounded-lg shadow hover:shadow-lg flex flex-col items-center cursor-pointer transition-shadow"
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-green-50 rounded-full mb-4 shadow-inner">
                                <img 
                                    src={service.img} 
                                    alt={service.key} 
                                    className="w-20 h-20 md:w-28 md:h-28 object-contain" 
                                />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2">{t(service.key)}</h3>
                            <ul className="text-gray-600 space-y-1 text-sm md:text-base">
                                {service.products.map((p, i) => (
                                    <li key={i}>{p}</li>
                                ))}
                            </ul>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Instructions Section (Enhanced Layout for User-Friendliness) */}
            <section className="bg-green-300 py-8 md:py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">{t('instructions')}</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-base md:text-lg whitespace-pre-line leading-relaxed">
                           {t('instructions_text')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-green-700 text-white py-8 md:py-10 mt-8 md:mt-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-4">{t('agriconnect')}</h3>
                        <p className="text-sm md:text-base">{t('Connecting farmers with markets and advisors across Sri Lanka.')}</p>
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-bold mb-4">{t('Quick Links')}</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li><a href="#home" className="hover:text-yellow-300">{t('Home')}</a></li>
                            <li><a href="#services" className="hover:text-yellow-300">{t('Services')}</a></li>
                            <li><a href="#resources" className="hover:text-yellow-300">{t('Resources')}</a></li>
                            <li><a href="#about" className="hover:text-yellow-300">{t('About')}</a></li>
                            <li><a href="#contact" className="hover:text-yellow-300">{t('Contact')}</a></li>
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
