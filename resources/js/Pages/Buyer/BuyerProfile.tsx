// resources/js/Pages/Buyer/Dashboard.tsx

import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { 
  FaHome, 
  FaShoppingCart, 
  FaTruck, 
  FaMapPin, 
  FaTimes, 
  FaChevronDown 
} from "react-icons/fa";
import { Settings, Edit, LogOut, X, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function BuyerDashboard() {
  const { t } = useTranslation();
  const goHome = () => router.visit("/home");

  const { auth, orders = [], cartCount = 0 } = usePage<{
    auth: { user?: { name?: string; email?: string } }; // Make user optional
    orders: Array<{
      id: number;
      items: string;
      total: number;
      status: 'pending' | 'processing' | 'shipped' | 'delivered';
      created_at: string;
    }>;
    cartCount?: number;
  }>().props;

  // Critical: Guard against auth.user being undefined
  if (!auth?.user) {
    // Optional: Show loading or redirect
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-6"></div>
          <p className="text-2xl text-gray-700">{t('Loading...')}</p>
        </div>
      </div>
    );
  }

  const userName = auth.user.name || t('Buyer'); // Fallback name

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    router.post(route("logout"));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return t(status.charAt(0).toUpperCase() + status.slice(1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Home Button */}
            <button
              onClick={goHome}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md"
            >
              <FaHome size={22} />
              <span className="hidden sm:inline">{t("Home")}</span>
            </button>

            {/* Center: App Name */}
            <h1 className="hidden md:block text-xl lg:text-2xl font-bold text-green-800 text-center">
              AgriConnect
            </h1>

            {/* Right: Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {/* Cart */}
              <Link href={route('buyers.cart')} className="relative">
                <FaShoppingCart size={28} className="text-green-800 hover:text-green-600 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 text-sm font-bold flex items-center justify-center shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Orders */}
              <Link
                href={route('buyers.orders')}
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
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">{userName}</span>
                  <FaChevronDown size={20} className={`transition ${profileDropdownOpen ? "rotate-180" : ""}`} />
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
                      href={route("buyers.profile.edit")}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-green-50 transition text-lg"
                    >
                      <Edit size={22} />
                      {t("Edit Profile")}
                    </Link>
                    <hr className="my-2 border-gray-200 mx-4" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition text-lg text-red-600 font-semibold"
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl mb-4">
                {userName.charAt(0).toUpperCase()}
              </div>
              <p className="text-xl font-bold text-gray-800">{userName}</p>
              <p className="text-green-700 font-semibold">{t("Buyer")}</p>
            </div>

            <div className="space-y-4">
              <Link
                href={route("buyers.cart")}
                className="flex items-center justify-center gap-3 bg-green-100 hover:bg-green-200 py-4 rounded-xl font-bold text-xl text-green-800"
              >
                <FaShoppingCart size={24} />
                {t("My Cart")} {cartCount > 0 && `(${cartCount})`}
              </Link>
              <Link
                href={route("buyers.orders")}
                className="block text-center bg-gray-100 hover:bg-gray-200 py-4 rounded-xl font-bold text-xl"
              >
                {t("My Orders")}
              </Link>
              <Link
                href={route("profile.edit")}
                className="block text-center bg-gray-100 hover:bg-gray-200 py-4 rounded-xl font-bold text-xl"
              >
                {t("Account Settings")}
              </Link>
              <Link
                href={route("buyers.profile.edit")}
                className="block text-center bg-green-100 hover:bg-green-200 py-4 rounded-xl font-bold text-xl text-green-800"
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

            <div className="flex justify-center gap-3 pt-4 border-t">
              {["en", "si", "ta"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-6 py-3 rounded-lg font-bold text-lg ${
                    i18n.language === lang ? "bg-green-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {lang === "en" ? "English" : lang === "si" ? "සිංහල" : "தமிழ்"}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Title */}
      <div className="md:hidden text-center py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <h1 className="text-3xl font-bold">AgriConnect</h1>
        <p className="text-xl mt-2">{t("Welcome")}, {userName}</p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            {t('Welcome back, {{name}}!', { name: userName })}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t('Browse fresh products, manage your cart, and track deliveries easily.')}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link
            href={route('buyers.cart')}
            className="group bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition transform hover:-translate-y-3"
          >
            <FaShoppingCart size={70} className="mx-auto mb-6 text-green-600 group-hover:scale-110 transition" />
            <h3 className="text-3xl font-bold text-green-800 mb-3">{t('My Cart')}</h3>
            <p className="text-lg text-gray-600">{t('View and manage items')}</p>
          </Link>

          <Link
            href={route('buyers.orders')}
            className="group bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition transform hover:-translate-y-3"
          >
            <FaTruck size={70} className="mx-auto mb-6 text-yellow-600 group-hover:scale-110 transition" />
            <h3 className="text-3xl font-bold text-yellow-800 mb-3">{t('Track Orders')}</h3>
            <p className="text-lg text-gray-600">{t('Check delivery status')}</p>
          </Link>

          <button
            onClick={() => router.visit(route('buyers.delivery.edit'))}
            className="group bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition transform hover:-translate-y-3"
          >
            <FaMapPin size={70} className="mx-auto mb-6 text-blue-600 group-hover:scale-110 transition" />
            <h3 className="text-3xl font-bold text-blue-800 mb-3">{t('Delivery Address')}</h3>
            <p className="text-lg text-gray-600">{t('Update shipping info')}</p>
          </button>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border-8 border-green-200">
          <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">{t('Recent Orders')}</h2>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-500 mb-6">{t('No orders yet')}</p>
              <Link
                href={route('buyers.cart')}
                className="bg-green-600 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-green-700"
              >
                {t('Start Shopping')}
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-8 border-green-600 shadow-lg hover:shadow-xl transition"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">
                        {t('Order')} #{order.id}
                      </h4>
                      <p className="text-lg text-gray-600 mt-1">{order.items}</p>
                      <p className="text-lg text-gray-500 mt-2">
                        {t('Placed on')} {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-700">
                        Rs. {order.total.toLocaleString()}
                      </p>
                      <span className={`mt-3 inline-block px-8 py-3 rounded-full text-xl font-bold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}