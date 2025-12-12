// resources/js/Components/BuyerNavbar.tsx

import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { 
  FaHome, 
  FaShoppingCart, 
  FaSignOutAlt, 
  FaCog, 
  FaEdit, 
  FaBars,   
  FaChevronDown,
  FaTimes
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface BuyerNavbarProps {
  cartCount?: number;
}

export default function BuyerNavbar({ cartCount = 0 }: BuyerNavbarProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { auth } = usePage<{ auth: { user: { name: string; email: string } } }>().props;

  const handleLogout = () => {
    router.post(route("logout"));
  };

  const goHome = () => router.visit("/");

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Home Button */}
            <button
              onClick={goHome}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
            >
              <FaHome size={22} />
              <span className="hidden sm:inline">{t("Home")}</span>
            </button>

            {/* Center: Page Title (hidden on mobile) */}
            <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-green-800 text-center">
              AgriConnect
            </h1>

            {/* Right: Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {/* Cart Icon */}
              <Link href={route("buyers.cart")} className="relative">
                <FaShoppingCart size={28} className="text-green-800 hover:text-green-600 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 text-sm font-bold flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Orders Link */}
              <Link
                href={route("buyers.orders")}
                className="text-xl font-semibold text-green-800 hover:text-green-600 transition"
              >
                {t("Orders")}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl transition font-semibold text-gray-800 shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">{auth.user.name}</span>
                  <FaChevronDown 
                    size={20} 
                    className={`transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`} 
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                    <Link
                      href={route("profile.edit")}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-green-50 transition text-lg"
                    >
                      <FaCog size={22} />
                      {t("Account Settings")}
                    </Link>
                    <Link
                      href={route("buyers.profile.edit")}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-green-50 transition text-lg"
                    >
                      <FaEdit size={22} />
                      {t("Edit Profile")}
                    </Link>
                    <hr className="my-2 border-gray-200 mx-4" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition text-lg text-red-600 font-semibold text-left"
                    >
                      <FaSignOutAlt size={22} />
                      {t("Logout")}
                    </button>
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                {["en", "si", "ta"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => i18n.changeLanguage(lang)}
                    className={`px-5 py-2 rounded-lg font-bold transition ${
                      i18n.language === lang
                        ? "bg-green-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lang === "en" ? "English" : lang === "si" ? "සිංහල" : "தமிழ்"}
                  </button>
                ))}
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-700"
            >
              {mobileMenuOpen ? <FaTimes size={32} /> : <FaBars size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 space-y-6">
            {/* Profile Card */}
            <div className="text-center">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl mb-4">
                {auth.user.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-2xl font-bold text-gray-800">{auth.user.name}</p>
              <p className="text-green-700 font-semibold text-lg">{t("Buyer")}</p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <Link
                href={route("buyers.cart")}
                className="flex items-center justify-center gap-3 bg-green-100 hover:bg-green-200 py-4 rounded-xl font-bold text-xl text-green-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaShoppingCart size={24} />
                {t("Cart")} {cartCount > 0 && `(${cartCount})`}
              </Link>

              <Link
                href={route("buyers.orders")}
                className="block text-center bg-gray-100 hover:bg-gray-200 py-4 rounded-xl font-bold text-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Orders")}
              </Link>

              <Link
                href={route("profile.edit")}
                className="block text-center bg-gray-100 hover:bg-gray-200 py-4 rounded-xl font-bold text-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Account Settings")}
              </Link>

              <Link
                href={route("buyers.profile.edit")}
                className="block text-center bg-green-100 hover:bg-green-200 py-4 rounded-xl font-bold text-xl text-green-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Edit Profile")}
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-4 rounded-xl font-bold text-xl"
              >
                {t("Logout")}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex justify-center gap-4 pt-6 border-t border-gray-300">
              {["en", "si", "ta"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-8 py-4 rounded-xl font-bold text-xl shadow-lg transition ${
                    i18n.language === lang
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {lang === "en" ? "English" : lang === "si" ? "සිංහල" : "தமிழ்"}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Title Bar */}
      <div className="md:hidden text-center py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <h1 className="text-3xl font-bold">AgriConnect</h1>
        <p className="text-lg mt-2">{t("Welcome")}, {auth.user.name}</p>
      </div>
    </>
  );
}