// resources/js/Pages/Supplier/Profile.tsx

import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Edit, Plus, LogOut, Settings, Menu, X, ChevronDown } from "lucide-react";
import { FaHome } from "react-icons/fa";
import AddProduct from "../Supplier/AddProduct";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function Profile() {
  const { t } = useTranslation();
  const goHome = () => router.visit("/");

  const { supplier, products, auth, flash } = usePage<{
    supplier: any;
    products: any[];
    auth: { user: { name: string; email: string } };
    flash: { status_key?: string };
  }>().props;

  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

  const successMessage = flash?.status_key ? t(flash.status_key) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
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

            {/* Center: Business Name (Mobile Hidden) */}
            <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-green-800 text-center">
              {supplier.business_name}
            </h1>

            {/* Right: Desktop Menu */}
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
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
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
                href={route("profile.edit")} className="block text-center bg-gray-100 hover:bg-gray-200 py-4 rounded-xl font-bold text-lg"
              >
                {t("Account Settings")}
              </Link>
              <Link
                href={route("suppliers.edit", supplier.id)}
                className="block text-center bg-green-100 hover:bg-green-200 py-4 rounded-xl font-bold text-lg text-green-800"
              >
                {t("Edit Supplier Profile")}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-4 rounded-xl font-bold text-lg"
              >
                {t("Logout")}
              </button>
            </div>

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
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Business Name */}
      <div className="md:hidden text-center py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <h1 className="text-3xl font-bold">{supplier.business_name}</h1>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-4 sm:gap-8 border-b-4 border-gray-200 pb-4">
          {[
            { key: "overview", label: t("Overview") },
            { key: "products", label: t("My Products") },
            { key: "add_product", label: t("Add Product") },
            { key: "orders", label: t("Orders") },
            { key: "analytics", label: t("Analytics") },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 rounded-xl font-bold text-lg transition ${
                activeTab === tab.key
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
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
                  {supplier.description || t("No description yet.")}
                </p>
              </div>

              {specialization.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl">
                  <h4 className="text-3xl font-bold text-green-800 mb-6">{t("Specializations")}</h4>
                  <div className="flex flex-wrap gap-4">
                    {specialization.map((spec, i) => (
                      <span key={i} className="bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg">
                        {t(spec)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {certifications.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-10 shadow-xl">
                  <h4 className="text-3xl font-bold text-blue-800 mb-6">{t("Certifications")}</h4>
                  <div className="flex flex-wrap gap-4">
                    {certifications.map((cert, i) => (
                      <span key={i} className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg">
                        {t(cert)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
                                {t("No Extra Image")}
                              </div>
                            )}
                          </div>
                        </div>
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
                                {product.quantity || "?"} {t(product.quantity_unit || "units")}
                              </p>
                            </div>
                          </div>
                          {product.category && (
                            <span className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full text-2xl font-bold">
                              {t(product.category)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-3xl text-gray-500 mb-8">{t("No products yet.")}</p>
                  <button
                    onClick={() => setActiveTab("add_product")}
                    className="bg-green-600 hover:bg-green-700 text-white text-3xl font-bold px-12 py-6 rounded-full shadow-2xl"
                  >
                    {t("Add Your First Product")}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Add Product Tab */}
          {activeTab === "add_product" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-8 border-green-300">
              {/* Success Message at the very top */}
              {successMessage && (
                <div className="mb-10 p-6 bg-green-100 border-4 border-green-400 rounded-2xl text-center animate-pulse">
                  <p className="text-3xl font-bold text-green-800">{successMessage}</p>
                </div>
              )}

              <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("Add New Product")}</h2>
              <AddProduct />
            </div>
          )}

          {/* Order tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-8 border-green-300">
              <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("Orders")}</h2>
              <p className="text-center text-gray-500 text-xl">{t("Orders content goes here.")}</p>
            </div>
          )}

          {/* Analytics tab */}
          {activeTab === "analytics" && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 border-8 border-green-300">
              <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("Analytics")}</h2>
              <p className="text-center text-gray-500 text-xl">{t("Analytics content goes here.")}</p>
            </div>
          )}
           
        </main>
      </div>
    </div>
  );
}