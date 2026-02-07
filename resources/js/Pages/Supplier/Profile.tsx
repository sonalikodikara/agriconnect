// resources/js/Pages/Supplier/Profile.tsx

<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect, useRef } from "react";
>>>>>>> AG-26
import { Link, usePage, router } from "@inertiajs/react";
import { Edit, Plus, LogOut, Settings, Menu, X, ChevronDown } from "lucide-react";
import { FaHome } from "react-icons/fa";
import AddProduct from "../Supplier/AddProduct";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function Profile() {
  const { t } = useTranslation();
  const goHome = () => router.visit("/home");

  const { supplier, products, auth, flash, orders } = usePage<{
    supplier: any;
    products: any[];
    auth: { user: { name: string; email: string } };
<<<<<<< HEAD
    flash: { status_key?: string };
=======
    flash: { status_key?: string; whatsapp_url?: string };
>>>>>>> AG-26
    orders: any[];
  }>().props;

  const [activeTab, setActiveTab] = useState("overview");
<<<<<<< HEAD
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
=======
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const previousWhatsAppUrl = useRef<string | null>(null);

  // Automatically open WhatsApp link when status is updated
  useEffect(() => {
    if (flash?.whatsapp_url && flash.whatsapp_url !== previousWhatsAppUrl.current) {
      previousWhatsAppUrl.current = flash.whatsapp_url;
      // Open WhatsApp in a new window/tab
      window.open(flash.whatsapp_url, '_blank');
    }
  }, [flash?.whatsapp_url]);
>>>>>>> AG-26

  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl text-red-600 font-bold">{t("No supplier profile found.")}</p>
      </div>
    );
  }

  const specialization = Array.isArray(supplier.specialization) ? supplier.specialization : [];
  const certifications = Array.isArray(supplier.certifications) ? supplier.certifications : [];

  const handleLogout = () => {
    router.post(route("logout"));
  };

<<<<<<< HEAD
  // Languages available (use `code` for i18n)
  const languages = [
    { code: 'en', label: 'English', short: 'English' },
    { code: 'si', label: 'සිංහල', short: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்', short: 'தமிழ்' },
  ];

  // Helper to get short language label
  const getLangLabel = (langCode: string) => {
    const found = languages.find(l => l.code === langCode);
    return found ? found.short : langCode.toUpperCase();
  };

=======
  const successMessage = flash?.status_key ? t(flash.status_key) : null;
  
>>>>>>> AG-26
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
<<<<<<< HEAD
            {/* Home Button */}
=======
            {/* Left: Home Button */}
>>>>>>> AG-26
            <button
              onClick={goHome}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
            >
              <FaHome size={22} />
              <span className="hidden sm:inline">{t("Home")}</span>
            </button>

<<<<<<< HEAD
            {/* Center: Business Name (hidden on mobile) */}
=======
            {/* Center: Business Name (Mobile Hidden) */}
>>>>>>> AG-26
            <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-green-800 text-center">
              {supplier.business_name}
            </h1>

<<<<<<< HEAD
            {/* Desktop Right Section */}
=======
            {/* Right: Desktop Menu */}
>>>>>>> AG-26
            <div className="hidden md:flex items-center gap-6">
              <span className="bg-green-600 text-white px-5 py-2 rounded-full font-bold text-lg shadow">
                {t("Supplier")}
              </span>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl transition font-semibold text-gray-800"
                >
<<<<<<< HEAD
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
=======
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
>>>>>>> AG-26
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">{auth.user.name}</span>
                  <ChevronDown size={20} className={`transition ${profileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                    <Link
                      href={route("profile.edit")}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-green-50 transition text-lg"
                    >
                      <Settings size={22} />
                      {t("Account Settings")}
                    </Link>
                    <Link
                      href={route("suppliers.edit", supplier.id)}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-green-50 transition text-lg"
                    >
                      <Edit size={22} />
                      {t("Edit Supplier Profile")}
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition text-lg text-red-600 font-semibold"
                    >
                      <LogOut size={22} />
                      {t("Logout")}
                    </button>
                  </div>
                )}
              </div>

<<<<<<< HEAD
              {/* Language Switcher - Desktop */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`px-4 py-2 rounded-lg font-bold transition min-w-[60px] ${(i18n.language || '').startsWith(lang.code)
                        ? "bg-green-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {lang.short}
=======
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
>>>>>>> AG-26
                  </button>
                ))}
              </div>
            </div>

<<<<<<< HEAD
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-700 focus:outline-none"
=======
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-700"
>>>>>>> AG-26
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4">
                {auth.user.name.charAt(0).toUpperCase()}
              </div>
              <p className="text-xl font-bold text-gray-800">{auth.user.name}</p>
              <p className="text-green-700 font-semibold">{t("Supplier")}</p>
            </div>

            <div className="space-y-4">
              <Link
<<<<<<< HEAD
                href={route("profile.edit")}
                className="block text-center bg-gray-100 hover:bg-gray-200 py-4 rounded-xl font-bold text-lg"
                onClick={() => setMobileMenuOpen(false)}
=======
                href={route("profile.edit")} className="block text-center bg-gray-100 hover:bg-gray-200 py-4 rounded-xl font-bold text-lg"
>>>>>>> AG-26
              >
                {t("Account Settings")}
              </Link>
              <Link
                href={route("suppliers.edit", supplier.id)}
                className="block text-center bg-green-100 hover:bg-green-200 py-4 rounded-xl font-bold text-lg text-green-800"
<<<<<<< HEAD
                onClick={() => setMobileMenuOpen(false)}
=======
>>>>>>> AG-26
              >
                {t("Edit Supplier Profile")}
              </Link>
              <button
<<<<<<< HEAD
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
=======
                onClick={handleLogout}
>>>>>>> AG-26
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-4 rounded-xl font-bold text-lg"
              >
                {t("Logout")}
              </button>
            </div>

<<<<<<< HEAD
            {/* Language Switcher - Mobile */}
            <div className="flex justify-center gap-4 pt-4 border-t">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-6 py-3 rounded-lg font-bold text-lg min-w-[80px] ${(i18n.language || '').startsWith(lang.code)
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                  {lang.short}
=======
            <div className="flex justify-center gap-3 pt-4 border-t">
              {["en", "si", "ta"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-6 py-3 rounded-lg font-bold text-lg ${
                    i18n.language === lang ? "bg-green-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {lang.toUpperCase()}
>>>>>>> AG-26
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

<<<<<<< HEAD
      {/* Mobile-only Business Name */}
=======
      {/* Mobile Business Name */}
>>>>>>> AG-26
      <div className="md:hidden text-center py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <h1 className="text-3xl font-bold">{supplier.business_name}</h1>
      </div>

      {/* Tabs */}
<<<<<<< HEAD
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 md:mt-10">
        <div className="flex flex-wrap gap-3 sm:gap-6 border-b-4 border-gray-200 pb-4 overflow-x-auto">
          {[
            { key: "overview", label: t("Profile Overview") },
=======
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-4 sm:gap-8 border-b-4 border-gray-200 pb-4">
          {[
            { key: "overview", label: t("Overview") },
>>>>>>> AG-26
            { key: "products", label: t("My Products") },
            { key: "add_product", label: t("Add Product") },
            { key: "orders", label: t("Orders") },
            { key: "analytics", label: t("Analytics") },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
<<<<<<< HEAD
              className={`px-5 py-3 rounded-xl font-bold text-base sm:text-lg transition flex-shrink-0 ${activeTab === tab.key
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
=======
              className={`px-4 py-3 rounded-xl font-bold text-lg transition ${
                activeTab === tab.key
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
>>>>>>> AG-26
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
<<<<<<< HEAD
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <main className="space-y-10">
          {/* Profile Overview */}
          {activeTab === "overview" && (
            <div className="space-y-10">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden border-6 sm:border-8 border-white shadow-xl">
                  {supplier.profile_image_url ? (
                    <img
                      src={supplier.profile_image_url}
                      alt={supplier.business_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <span className="text-6xl sm:text-7xl font-bold text-green-700">
                        {supplier.business_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mt-5 sm:mt-6">{supplier.business_name}</h2>
                <p className="text-green-100 text-lg sm:text-xl mt-1">{supplier.contact_person || "-"}</p>
                <div className="mt-5 sm:mt-6 bg-white/20 backdrop-blur px-6 sm:px-8 py-3 sm:py-4 rounded-full inline-block">
                  <span className="text-xl sm:text-2xl font-bold">
                    {supplier.experience || "?"} {t("years experience")}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-4 border-green-100">
                <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-5 sm:mb-6">{t("Contact Information")}</h3>
                <div className="space-y-4 text-gray-700">
                  <p>📧 {supplier.email || t("Not provided")}</p>
                  <p>📞 {supplier.phone || t("Not provided")}</p>
                  <p>📍 {supplier.address || t("Not provided")}</p>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-4 border-green-100">
                <h3 className="text-2xl sm:text-4xl font-bold text-green-800 mb-5 sm:mb-6">
                  {t("About")} {supplier.business_name}
                </h3>
                <p className="text-gray-700 text-base sm:text-xl leading-relaxed">
=======
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-10">
        {/* Left Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-8 border-white shadow-xl">
              {supplier.profile_image_url ? (
                <img src={supplier.profile_image_url} alt={supplier.business_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <span className="text-7xl font-bold text-green-700">
                    {supplier.business_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold mt-6">{supplier.business_name}</h2>
            <p className="text-green-100 text-xl">{supplier.contact_person || "-"}</p>
            
            {/* Rating Display */}
            {supplier.rating > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-yellow-300 text-2xl">★</span>
                <span className="text-2xl font-bold text-white">
                  {parseFloat(supplier.rating).toFixed(1)}
                </span>
                <span className="text-green-100 text-lg">
                  ({supplier.review_count} {t('reviews')})
                </span>
              </div>
            )}
            
            <div className="mt-6 bg-white/20 backdrop-blur px-8 py-4 rounded-full inline-block">
              <span className="text-2xl font-bold">
                {supplier.experience || "?"} {t("years experience")}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-100">
            <h3 className="text-2xl font-bold text-green-800 mb-6">{t("Contact Information")}</h3>
            <div className="space-y-5 text-l">
              <p className="text-gray-700 text-sm">📧 {supplier.email}</p>
              <p className="text-gray-700 text-sm">📞 {supplier.phone}</p>
              <p className="text-gray-700 text-sm">📍 {supplier.address}</p>

            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-8 space-y-10">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-10">
              <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-green-100">
                <h3 className="text-4xl font-bold text-green-800 mb-6">
                  {t("About")} {supplier.business_name}
                </h3>
                <p className="text-gray-700 text-xl leading-relaxed">
>>>>>>> AG-26
                  {supplier.description || t("No description yet.")}
                </p>
              </div>

<<<<<<< HEAD
              {/* Specializations */}
              {specialization.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 sm:p-10 shadow-xl">
                  <h4 className="text-2xl sm:text-3xl font-bold text-green-800 mb-5 sm:mb-6">{t("Specializations")}</h4>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {specialization.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-green-600 text-white px-5 sm:px-8 py-2 sm:py-4 rounded-full text-base sm:text-xl font-bold shadow-lg"
                      >
=======
              {specialization.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl">
                  <h4 className="text-3xl font-bold text-green-800 mb-6">{t("Specializations")}</h4>
                  <div className="flex flex-wrap gap-4">
                    {specialization.map((spec, i) => (
                      <span key={i} className="bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg">
>>>>>>> AG-26
                        {t(spec)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

<<<<<<< HEAD
              {/* Certifications */}
              {certifications.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 sm:p-10 shadow-xl">
                  <h4 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-5 sm:mb-6">{t("Certifications")}</h4>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="bg-blue-600 text-white px-5 sm:px-8 py-2 sm:py-4 rounded-full text-base sm:text-xl font-bold shadow-lg"
                      >
=======
              {certifications.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl">
                  <h4 className="text-3xl font-bold text-blue-800 mb-6">{t("Certifications")}</h4>
                  <div className="flex flex-wrap gap-4">
                    {certifications.map((cert, i) => (
                      <span key={i} className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg">
>>>>>>> AG-26
                        {t(cert)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

<<<<<<< HEAD
          {/* My Products */}
          {activeTab === "products" && (
            <div className="space-y-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center">
                {t("My Products")}
              </h2>

              {products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                  {products.map((product) => {
                    const optionalImg = product.optional_images_urls?.[0] || null;
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-200 hover:shadow-3xl transition relative"
                      >
                        <div className="grid grid-cols-2 gap-3 p-4">
                          <div className="rounded-2xl overflow-hidden border-4 border-green-300">
                            <img
                              src={product.primary_image_url || "/placeholder.jpg"}
                              alt={product.name}
                              className="w-full h-48 sm:h-64 object-cover"
                            />
                          </div>
                          <div className="rounded-2xl overflow-hidden border-4 border-yellow-300">
                            {optionalImg ? (
                              <img
                                src={optionalImg}
                                alt="additional"
                                className="w-full h-48 sm:h-64 object-cover"
                              />
                            ) : (
                              <div className="bg-gray-100 h-48 sm:h-64 flex items-center justify-center text-gray-500 text-sm sm:text-xl">
=======
          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("My Products")}</h2>
              {products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {products.map((product) => {
                    const optionalImg = product.optional_images_urls?.[0] || null;
                    return (
                      <div key={product.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-200 hover:scale-105 transition">
                        <div className="grid grid-cols-2 gap-3 p-4">
                          <div className="rounded-2xl overflow-hidden border-4 border-green-300">
                            <img src={product.primary_image_url || "/placeholder.jpg"} alt={product.name} className="w-full h-64 object-cover" />
                          </div>
                          <div className="rounded-2xl overflow-hidden border-4 border-yellow-300">
                            {optionalImg ? (
                              <img src={optionalImg} alt="extra" className="w-full h-64 object-cover" />
                            ) : (
                              <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-400 text-xl">
>>>>>>> AG-26
                                {t("No Extra Image")}
                              </div>
                            )}
                          </div>
                        </div>
<<<<<<< HEAD

                        <div className="p-6 sm:p-8">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl sm:text-2xl font-bold text-green-800">
                              {product.name} {product.brand && `(${product.brand})`}
                            </h3>
                            <button
                              onClick={() => router.visit(route('suppliers.products.edit', product.id))}
                              className="bg-amber-100 hover:bg-amber-200 text-amber-800 p-3 rounded-full transition"
                              title={t("Edit Product")}
                            >
                              <Edit size={20} />
                            </button>
                          </div>

                          {/* Render description with HTML support */}
                          <div
                            className="text-gray-700 text-base sm:text-lg mb-6 prose prose-sm sm:prose max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: product.description || t("No description available."),
                            }}
                          />

                          <div className="grid grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
                            <div className="bg-green-50 p-4 sm:p-6 rounded-2xl text-center">
                              <p className="text-gray-600 text-sm sm:text-lg">{t("Price")}</p>
                              <p className="text-xl sm:text-2xl font-bold text-green-700">
                                Rs. {Number(product.price).toLocaleString()}
                              </p>
                            </div>
                            <div className="bg-yellow-50 p-4 sm:p-6 rounded-2xl text-center">
                              <p className="text-gray-600 text-sm sm:text-lg">{t("Available")}</p>
                              <p className="text-lg sm:text-xl font-bold text-yellow-700">
=======
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-green-800 mb-4">
                            {product.name} {product.brand && `(${product.brand})`}
                          </h3>
                          <p className="text-gray-700 text-xl mb-6">{product.description}</p>
                          <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-green-100 p-6 rounded-2xl text-center">
                              <p className="text-gray-600 text-lg">{t("Price")}</p>
                              <p className="text-2xl font-bold text-green-700">Rs. {Number(product.price).toLocaleString()}</p>
                            </div>
                            <div className="bg-yellow-100 p-6 rounded-2xl text-center">
                              <p className="text-gray-600 text-lg">{t("Available")}</p>
                              <p className="text-xl font-bold text-yellow-700">
>>>>>>> AG-26
                                {product.quantity || "?"} {t(product.quantity_unit || "units")}
                              </p>
                            </div>
                          </div>
<<<<<<< HEAD

                          {product.category && (
                            <span className="inline-block bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-xl font-bold">
=======
                          {product.category && (
                            <span className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full text-2xl font-bold">
>>>>>>> AG-26
                              {t(product.category)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
<<<<<<< HEAD
                <div className="text-center py-16 sm:py-20">
                  <p className="text-2xl sm:text-3xl text-gray-500 mb-6 sm:mb-8">
                    {t("No products yet.")}
                  </p>
                  <button
                    onClick={() => setActiveTab("add_product")}
                    className="bg-green-600 hover:bg-green-700 text-white text-xl sm:text-2xl font-bold px-10 sm:px-12 py-5 sm:py-6 rounded-full shadow-2xl transition"
=======
                <div className="text-center py-20">
                  <p className="text-3xl text-gray-500 mb-8">{t("No products yet.")}</p>
                  <button
                    onClick={() => setActiveTab("add_product")}
                    className="bg-green-600 hover:bg-green-700 text-white text-2xl font-bold px-12 py-6 rounded-full shadow-2xl"
>>>>>>> AG-26
                  >
                    {t("Add Your First Product")}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Add Product Tab */}
          {activeTab === "add_product" && (
<<<<<<< HEAD
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-4 sm:border-8 border-green-300">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-8 sm:mb-12">
                {t("Add New Product")}
              </h2>
=======
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-8 border-green-300">
              {/* Success Message at the very top */}
             <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("Add New Product")}</h2>
>>>>>>> AG-26
              <AddProduct />
            </div>
          )}

<<<<<<< HEAD
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-4 sm:border-8 border-green-300 space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-8 sm:mb-12">
                {t("Orders")}
              </h2>
              {orders?.length === 0 ? (
                <p className="text-center text-gray-500 text-lg sm:text-xl">
                  {t("No orders yet.")}
                </p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 sm:p-8 shadow-xl"
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                      {t("Order")} #{order.id} - {order.status_label}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                      {t("Placed on {{date}}", {
                        date: new Date(order.created_at).toLocaleDateString("en-GB"),
                      })}
                    </p>
                    <ul className="space-y-3 sm:space-y-4">
                      {order.items.map((item: any) => (
                        <li
                          key={item.id}
                          className="flex justify-between text-gray-700 text-base sm:text-xl"
                        >
                          <span>
                            {item.product.name} × {item.quantity}
                          </span>
                          <span>
                            Rs. {(item.price_at_purchase * item.quantity).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 sm:mt-6 text-right">
                      <p className="text-xl sm:text-2xl font-bold text-green-700">
                        Total: Rs. {order.total_amount.toLocaleString()}
                      </p>
=======
          {/* Orders Tab - Display supplier-specific orders */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-8 border-green-300 space-y-8">
              <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("Orders")}</h2>
              {orders.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">{t("No orders yet.")}</p>
              ) : (
                orders.map((order: any) => (
                  <div 
                    key={order.id} 
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">
                          {t('Order')} #{order.id}
                        </h3>
                        <p className="text-lg text-gray-600">
                          {t('Placed on {{date}}', { date: new Date(order.created_at).toLocaleDateString('en-GB') })}
                        </p>
                      </div>
                      <span className={`px-6 py-2 rounded-full text-lg font-bold ${order.status_color || 'bg-gray-100 text-gray-800'}`}>
                        {order.status_label || order.status}
                      </span>
                    </div>

                    {/* Buyer Information */}
                    <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-green-200">
                      <h4 className="text-xl font-bold text-green-800 mb-4">{t('Buyer Information')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">{t('Name')}</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {order.delivery_name || order.user?.name || t('N/A')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{t('Phone Number')}</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {order.delivery_phone || t('N/A')}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600">{t('Delivery Address')}</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {order.delivery_address || t('N/A')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">{t('Order Items')}</h4>
                      <ul className="space-y-3">
                        {order.items?.map((item: any) => (
                          <li key={item.id} className="flex justify-between text-gray-700 text-lg bg-white rounded-lg p-4">
                            <span>{item.product?.name || t('Product')} x {item.quantity}</span>
                            <span className="font-semibold">Rs. {(item.price_at_purchase * item.quantity).toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Total and Status Update */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t-2 border-green-200">
                      <div>
                        <p className="text-2xl font-bold text-green-700">
                          {t('Total')}: Rs. {order.total_amount?.toLocaleString() || '0'}
                        </p>
                      </div>
                      
                      {/* Status Update Dropdown */}
                      <div className="flex items-center gap-4">
                        <label htmlFor={`status-${order.id}`} className="text-lg font-semibold text-gray-700">
                          {t('Update Status')}:
                        </label>
                        <select
                          id={`status-${order.id}`}
                          value={order.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            const currentStatus = order.status;
                            
                            // Don't show confirmation if status hasn't changed
                            if (newStatus === currentStatus) {
                              return;
                            }
                            
                            // Get status labels for display
                            const statusLabels: { [key: string]: string } = {
                              'pending': 'Pending',
                              'accepted': 'Accepted',
                              'packed': 'Packed',
                              'dispatched': 'Dispatched',
                              'out_for_delivery': 'Out for Delivery',
                              'delivered': 'Delivered',
                              'cancelled': 'Cancelled',
                            };
                            
                            const currentLabel = statusLabels[currentStatus] || currentStatus;
                            const newLabel = statusLabels[newStatus] || newStatus;
                            
                            // Show confirmation alert
                            const confirmed = window.confirm(
                              `Are you sure you want to change the order status from "${currentLabel}" to "${newLabel}"?\n\nOrder ID: #${order.id}`
                            );
                            
                            if (confirmed) {
                              router.patch(route('orders.updateStatus', order.id), {
                                status: newStatus,
                              }, {
                                preserveScroll: true,
                                onError: () => {
                                  // Reset to original status on error
                                  const selectElement = document.getElementById(`status-${order.id}`) as HTMLSelectElement;
                                  if (selectElement) {
                                    selectElement.value = currentStatus;
                                  }
                                },
                              });
                            } else {
                              // Reset select to original value if user cancels
                              const selectElement = document.getElementById(`status-${order.id}`) as HTMLSelectElement;
                              if (selectElement) {
                                selectElement.value = currentStatus;
                              }
                            }
                          }}
                          className="px-4 py-2 rounded-lg border-2 border-green-300 bg-white text-gray-800 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="pending">{t('Pending')}</option>
                          <option value="accepted">{t('Accepted')}</option>
                          <option value="packed">{t('Packed')}</option>
                          <option value="dispatched">{t('Dispatched')}</option>
                          <option value="out_for_delivery">{t('Out for Delivery')}</option>
                          <option value="delivered">{t('Delivered')}</option>
                          <option value="cancelled">{t('Cancelled')}</option>
                        </select>
                      </div>
>>>>>>> AG-26
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

<<<<<<< HEAD
          {/* Analytics */}
          {activeTab === "analytics" && (
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-4 sm:border-8 border-green-300">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center mb-8 sm:mb-12">
                {t("Analytics")}
              </h2>
              <p className="text-center text-gray-500 text-lg sm:text-xl">
                {t("Analytics content goes here.")}
              </p>
            </div>
          )}
=======
          {/* Analytics tab */}
          {activeTab === "analytics" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-8 border-green-300">
              <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("Analytics")}</h2>
              <p className="text-center text-gray-500 text-xl">{t("Analytics content goes here.")}</p>
            </div>
          )}
           
>>>>>>> AG-26
        </main>
      </div>
    </div>
  );
}