import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/Components/BuyerNavbar';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { t } = useTranslation();
  // Assume cartItems from props: [{ id, name, price, qty, image }]

  const cartItems = [ // Example data
    { id: 1, name: 'Organic Fertilizer', price: 1500, qty: 2, image: '/placeholder.jpg' },
    { id: 2, name: 'Rice Seeds', price: 800, qty: 1, image: '/placeholder.jpg' },
  ];

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const updateQty = (id: number, delta: number) => {
    // Update via API or form
  };

  const removeItem = (id: number) => {
    // Remove via API
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">{t('Your Cart')}</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500 mb-6">{t('Your cart is empty')}</p>
              <Link href={route('buyers.dashboard')} className="bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold">
                {t('Continue Shopping')}
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-3xl shadow-lg p-6 flex items-center gap-6">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-800">{item.name}</h3>
                      <p className="text-gray-600">Rs. {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => updateQty(item.id, -1)} className="bg-gray-200 p-2 rounded-full"><Minus size={20} /></button>
                      <span className="text-2xl font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="bg-gray-200 p-2 rounded-full"><Plus size={20} /></button>
                      <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white p-2 rounded-full"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6 text-right">
                <p className="text-2xl font-bold text-green-800">{t('Total: Rs. {{total}}', { total: total.toLocaleString() })}</p>
                <button
                  onClick={handleCheckout}
                  className="mt-4 bg-green-600 text-white px-12 py-4 rounded-2xl text-xl font-bold hover:bg-green-700"
                >
                  {t('Proceed to Checkout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}