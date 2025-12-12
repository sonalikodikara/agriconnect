// resources/js/Pages/ListPages/ProductListPage.tsx

import { Head, Link, usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaHome, FaShoppingCart, FaPhone, FaMapMarkerAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';

export default function ProductListPage({ products, category_name }) {
  const { t } = useTranslation();
  const { auth } = usePage<{ auth: { user?: any } }>().props; // Check if logged in
  const [quantities, setQuantities] = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {}));
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const addToCart = (productId) => {
    if (!auth.user) {
      setSelectedProductId(productId);
      setShowLoginModal(true);
      return;
    }

    router.post(route('cart.add'), {
      product_id: productId,
      quantity: quantities[productId],
    });
  };

  const updateQty = (productId, delta) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(1, prev[productId] + delta) }));
  };

  // Add this to the component
    const { flash } = usePage().props;
    const successMessage = flash?.status_key ? t(flash.status_key) : null;

    // In return, add success toast/message
    {successMessage && (
    <div className="fixed top-20 right-4 bg-green-100 p-4 rounded-xl border-2 border-green-300 text-green-800 font-bold">
        {successMessage}
    </div>
    )}

  return (
    <>
      <Head title={t(category_name)} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Same Navbar */}
        <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md">
                <FaHome size={22} />
                <span className="hidden sm:inline">{t("Home")}</span>
              </Link>

              <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-green-800 text-center">
                AgriConnect
              </h1>

              <div className="hidden md:flex items-center gap-6">
                <Link href="/login" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700">
                  {t('Login')}
                </Link>
                <Link href="/register" className="bg-yellow-500 text-green-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-600">
                  {t('Register')}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t(category_name)}</h1>
          <p className="text-xl md:text-2xl">{t('Find the best {{category}} for your farm', { category: t(category_name) })}</p>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-3xl text-gray-600 mb-8">{t('No products found in this category yet.')}</p>
              <Link href="/" className="bg-green-600 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-green-700">
                {t('Back to Home')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-100 hover:shadow-3xl transition transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="h-64 bg-gray-200 border-b-4 border-green-400">
                    {product.primary_image_url ? (
                      <img src={product.primary_image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-200 to-emerald-300 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">{product.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">{product.name}</h3>
                    {product.brand && <p className="text-lg text-gray-600 mb-2">{product.brand}</p>}
                    <p className="text-3xl font-bold text-green-700 mb-4">
                      Rs. {Number(product.price).toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <FaMapMarkerAlt className="text-green-600" />
                      <span>{product.supplier?.district || 'Unknown'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                      <FaPhone className="text-green-600" />
                      <span>{product.supplier?.phone || 'N/A'}</span>
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="flex items-center gap-4 mb-4">
                      <button onClick={() => updateQty(product.id, -1)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                        <FaMinus size={20} />
                      </button>
                      <span className="text-2xl font-bold">{quantities[product.id]}</span>
                      <button onClick={() => updateQty(product.id, 1)} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
                        <FaPlus size={20} />
                      </button>
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-4 rounded-2xl transition"
                    >
                      {t('Add to Cart')}
                    </button>

                    <Link
                      href={`/supplier/${product.supplier_id}`}
                      className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-2xl transition mt-4"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-green-200">
              <h3 className="text-3xl font-bold text-green-800 mb-6">{t('Login Required')}</h3>
              <p className="text-xl text-gray-600 mb-8">{t('Please login to add items to your cart.')}</p>
              <div className="space-x-4">
                <button onClick={() => setShowLoginModal(false)} className="bg-gray-300 text-gray-800 px-8 py-4 rounded-2xl text-xl font-bold hover:bg-gray-400">
                  {t('Cancel')}
                </button>
                <Link href="/login" className="bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-green-700">
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