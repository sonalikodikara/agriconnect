import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/components/BuyerNavbar';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Cart() {
  const { t } = useTranslation();
  const { props } = usePage<{ cartItems: any[], flash?: { status_key?: string } }>();
  const cartItems = props.cartItems || [];
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (props.flash?.status_key) {
      setSuccessMessage(t(props.flash.status_key));
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [props.flash, t]);

  const total = cartItems.reduce(
    (sum, item) => sum + ((item.product?.price || 0) * item.quantity),
    0
  );

  const updateQty = (id: number, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    router.patch(route('buyers.cart.update', id), { quantity: newQty }, { preserveScroll: true });
  };

  const removeItem = (id: number) => {
    router.delete(route('buyers.cart.remove', id), { preserveScroll: true });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const hasDelivery = true;
    if (!hasDelivery) {
      router.visit(route('buyers.delivery.edit'));
      return;
    }
    router.visit(route('buyers.checkout'));
  };

  const goBack = () => {
    router.back(); // ✅ Proper Inertia back navigation
  };

  return (
    <>
      <Head title={t('Shopping Cart')} />
      <BuyerNavbar cartCount={cartItems.length} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-6 sm:py-8">

        {/* SUCCESS TOAST */}
        {successMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-xl shadow-lg z-50">
            {successMessage}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-3 sm:px-6">

          {/* 🔙 BACK BUTTON */}
          <button
            onClick={goBack}
            className="flex items-center gap-2 mb-6 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 active:scale-95 transition"
          >
            <ArrowLeft size={20} className="text-green-700" />
            <span className="font-semibold text-green-800">{t('Back')}</span>
          </button>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-md">
              <p className="text-xl sm:text-2xl text-gray-500 mb-6">
                {t('Your cart is empty')}
              </p>
              <Link
                href={route('dashboard')}
                className="bg-green-600 text-white px-8 py-4 rounded-2xl text-lg sm:text-xl font-bold hover:bg-green-700"
              >
                {t('Continue Shopping')}
              </Link>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">

              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition">
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5">

                    {/* Image */}
                    <img
                      src={item.product?.primary_image_url || '/placeholder.jpg'}
                      alt={item.product?.name || 'Product'}
                      className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-2xl shadow-md"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                        {item.product?.name || 'Unknown Product'}
                      </h3>

                      <div className="text-lg sm:text-xl text-gray-700 mb-3">
                        Rs. {(item.product?.price || 0).toLocaleString()} x {item.quantity}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">

                      <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">
                        <button onClick={() => updateQty(item.id, -1)} className="bg-white p-2 rounded-full shadow active:scale-95">
                          <Minus size={18} />
                        </button>

                        <span className="text-xl font-bold w-8 text-center">{item.quantity}</span>

                        <button onClick={() => updateQty(item.id, 1)} className="bg-white p-2 rounded-full shadow active:scale-95">
                          <Plus size={18} />
                        </button>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 active:scale-95">
                        <Trash2 size={20} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 text-center sm:text-right">
                <p className="text-2xl sm:text-3xl font-bold text-green-800">
                  {t('Total: Rs. {{total}}', { total: total.toLocaleString() })}
                </p>

                <button
                  onClick={handleCheckout}
                  className="w-full sm:w-auto mt-4 bg-green-600 text-white px-10 py-4 rounded-2xl text-lg sm:text-xl font-bold hover:bg-green-700 shadow-md active:scale-95"
                >
                  {t('Proceed to Checkout')}
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}