// resources/js/Pages/ListPages/ProductListPage.tsx

import { Head, Link, usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
  FaHome,
  FaShoppingCart,
  FaPhone,
  FaMapMarkerAlt,
  FaPlus,
  FaMinus,
  FaCheckCircle,
  FaChevronDown,
  FaEye,
} from 'react-icons/fa';
import { X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProductListPage({ products, category_name }) {
  const { t } = useTranslation();
  const { props } = usePage<{ auth: { user?: any }, flash?: { status_key?: string } }>();
  const [quantities, setQuantities] = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {}));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Flash message handling
  useEffect(() => {
    if (props.flash?.status_key) {
      setSuccessMessage(t(props.flash.status_key));
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [props.flash, t]);

  const userName = props.auth.user?.name || t('Guest');

  const getDashboardRoute = () => {
    switch (props.auth.user?.role) {
      case 'supplier':
        return route('suppliers.profile.show');
      case 'farmer':
        return route('farmer.dashboard');
      case 'advisor':
        return route('advisors.profile.show');
      case 'admin':
        return route('admin.dashboard');
      default:
        return route('dashboard');
    }
  };

  const addToCart = (productId) => {
    if (!props.auth.user) {
      setShowLoginModal(true);
      setSelectedProductId(productId);
      return;
    }

    router.post(route('buyers.cart.add'), {
      product_id: productId,
      quantity: quantities[productId],
    }, {
      preserveScroll: true,
    });
  };

  const increaseQuantity = (productId) => {
    setQuantities((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, prev[productId] - 1) }));
  };

  return (
    <>
      <Head title={t(category_name)} />

      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Home Button */}
            <Link
              href="/home"
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
            >
              <FaHome size={22} />
              <span className="hidden sm:inline">{t('Home')}</span>
            </Link>

            {/* Center: App Name */}
            <h1 className="hidden md:block text-2xl font-bold text-green-800">AgriConnect</h1>

            {/* Right: Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {/* Dashboard Button */}
              <Link
                href={getDashboardRoute()}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-md"
              >
                {t('Dashboard')}
              </Link>

              {/* Profile Dropdown (if logged in) */}
              {props.auth.user && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-800">{userName}</span>
                </div>
              )}

              {/* Login/Register if not logged in */}
              {!props.auth.user && (
                <div className="flex gap-4">
                  <Link href="/login" className="text-green-800 hover:text-green-600 font-bold">
                    {t('Login')}
                  </Link>
                  <Link
                    href="/register"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md"
                  >
                    {t('Register')}
                  </Link>
                </div>
              )}
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
              <h2 className="text-2xl font-bold text-green-800 mb-4">AgriConnect</h2>
              {props.auth.user ? (
                <p className="text-lg font-semibold text-gray-800">{userName}</p>
              ) : (
                <div className="space-y-3">
                  <Link href="/login" className="block text-green-800 font-bold text-lg">
                    {t('Login')}
                  </Link>
                  <Link
                    href="/register"
                    className="block bg-green-600 text-white py-3 rounded-xl font-bold text-lg"
                  >
                    {t('Register')}
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Link
                href="/home"
                className="block text-center bg-blue-600 text-white py-4 rounded-xl font-bold text-xl"
              >
                {t('Home')}
              </Link>
              <Link
                href={getDashboardRoute()}
                className="block text-center bg-green-600 text-white py-4 rounded-xl font-bold text-xl"
              >
                {t('Dashboard')}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-8 pb-16">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-center py-4 px-8 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-pulse">
            <FaCheckCircle size={24} />
            <span className="font-bold text-lg">{successMessage}</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-12 mt-8">
            {t(category_name)}
          </h1>

          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-2xl">
              <p className="text-3xl text-gray-500 mb-8">{t('No products available in this category.')}</p>
              <Link
                href="/home"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-lg transition"
              >
                {t('Explore Other Categories')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={product.primary_image_url || '/placeholder.jpg'}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Rs. {product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-green-800 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{product.description}</p>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center gap-3 mb-6 bg-gray-100 p-3 rounded-xl">
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
                      >
                        <FaMinus size={16} />
                      </button>
                      <span className="text-xl font-bold w-12 text-center">{quantities[product.id]}</span>
                      <button
                        onClick={() => increaseQuantity(product.id)}
                        className="bg-white p-3 rounded-full shadow hover:bg-gray-200 transition"
                      >
                        <FaPlus size={16} />
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols gap-3 mt-auto">
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition shadow-md"
                      >
                        <FaShoppingCart />
                        {t('Add to Cart')}
                      </button>

                      <Link
                        href={`/product/${product.id}`} // New: Product detail page
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition shadow-md text-center"
                      >
                        <FaEye />
                        {t('View Details')}
                      </Link>
                    </div>

                    {/* Supplier Info */}
                    <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
                      <p className="flex items-center gap-2 mb-1">
                        <FaPhone /> {product.supplier?.phone || 'N/A'}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt /> {product.supplier?.district || 'N/A'}
                      </p>
                    </div>

                    <Link
                      href={`/supplier/${product.supplier?.id}`}
                      className="block text-center bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-2xl mt-4 transition"
                    >
                      {t('View Supplier')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-green-300">
              <h3 className="text-3xl font-bold text-green-800 mb-6">{t('Login Required')}</h3>
              <p className="text-xl text-gray-600 mb-8">{t('Please login to add items to your cart.')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-4 rounded-2xl text-xl font-bold transition"
                >
                  {t('Cancel')}
                </button>
                <Link
                  href="/login"
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold transition shadow-lg"
                >
                  {t('Login')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}