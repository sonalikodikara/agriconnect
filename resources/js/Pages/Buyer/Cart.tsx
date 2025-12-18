import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/components/BuyerNavbar';
import { Trash2, Plus, Minus, CheckCircle } from 'lucide-react'; // Added FaCheckCircle if needed, but use lucide if preferred
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Cart() {
  const { t } = useTranslation();
  const { props } = usePage<{ cartItems: any[], flash?: { status_key?: string } }>();
  const cartItems = props.cartItems || []; // Use props instead of example data
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle flash message
  useEffect(() => {
    if (props.flash?.status_key) {
      setSuccessMessage(t(props.flash.status_key));
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [props.flash, t]);

  const total = cartItems.reduce((sum, item) => sum + ((item.product?.price || 0) * item.quantity), 0);

  const updateQty = (id: number, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    router.patch(route('buyers.cart.update', id), { quantity: newQty }, { preserveScroll: true }); // Updated route
  };

  const removeItem = (id: number) => {
    router.delete(route('buyers.cart.remove', id), { preserveScroll: true }); // Updated route
  };

  const handleCheckout = () => {
    // Check delivery details
    const hasDelivery = true; // From props
    if (!hasDelivery) {
      router.visit(route('buyers.delivery.edit'));
      return;
    }
    router.visit(route('buyers.checkout'));
  };

  return (
    <>
      <Head title={t('Shopping Cart')} />
      <BuyerNavbar cartCount={cartItems.length} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        {/* Success Message Banner - Enhanced styles */}
        {successMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-center py-4 px-8 rounded-xl shadow-lg z-50 flex items-center justify-center gap-2 transition-opacity duration-300 opacity-100">
            <FaCheckCircle size={20} />
            {successMessage}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-md">
              <p className="text-2xl text-gray-500 mb-6">{t('Your cart is empty')}</p>
              <Link href={route('dashboard')} className="bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-green-700">
                {t('Continue Shopping')}
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl shadow-lg p-6 flex items-start gap-6 border border-gray-200 hover:shadow-2xl transition duration-300">
                  <img src={item.product?.primary_image_url || '/placeholder.jpg'} alt={item.product?.name || 'Product'} className="w-32 h-32 object-cover rounded-2xl shadow-md" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">{item.product?.name || 'Unknown Product'}</h3>
                    <p className="text-xl text-gray-700 mb-4">Rs. {(item.product?.price || 0).toLocaleString()} x {item.quantity}</p>
                    <p className="text-gray-600 line-clamp-2">{item.product?.description || 'No description'}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl">
                    <button onClick={() => updateQty(item.id, -1)} className="bg-white p-2 rounded-full shadow hover:bg-gray-200"><Minus size={20} /></button>
                    <span className="text-2xl font-bold px-4">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="bg-white p-2 rounded-full shadow hover:bg-gray-200"><Plus size={20} /></button>
                    <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-3xl shadow-lg p-6 text-right border border-gray-200">
                <p className="text-2xl font-bold text-green-800">{t('Total: Rs. {{total}}', { total: total.toLocaleString() })}</p>
                <button
                  onClick={handleCheckout}
                  className="mt-4 bg-green-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:bg-green-700 shadow-md"
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