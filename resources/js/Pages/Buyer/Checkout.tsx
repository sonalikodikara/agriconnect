import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/Components/BuyerNavbar';
import { CreditCard, Check } from 'lucide-react';

export default function Checkout() {
  const { t } = useTranslation();

  const handlePurchase = () => {
    // Simulate payment success
    router.visit(route('buyers.orders'));
  };

  return (
    <>
      <Head title={t('Checkout')} />
      <BuyerNavbar cartCount={0} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">{t('Checkout')}</h1>

          <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
            {/* Order Summary */}
            <div className="border-b-2 border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Order Summary')}</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>{t('Subtotal')}</span>
                  <span>Rs. 2300</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>{t('Delivery')}</span>
                  <span>{t('Free')}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>{t('Total')}</span>
                  <span>Rs. 2300</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Payment Method')}</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-2xl cursor-pointer hover:border-green-400">
                  <CreditCard size={24} className="text-green-600" />
                  <span className="text-lg">{t('Credit/Debit Card')}</span>
                  <input type="radio" name="payment" className="ml-auto" />
                </label>
                <label className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-2xl cursor-pointer hover:border-green-400">
                  <Check size={24} className="text-green-600" />
                  <span className="text-lg">{t('Cash on Delivery')}</span>
                  <input type="radio" name="payment" className="ml-auto" checked />
                </label>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="text-center">
              <button
                onClick={handlePurchase}
                className="bg-green-600 text-white px-16 py-6 rounded-3xl text-2xl font-bold hover:bg-green-700 shadow-2xl"
              >
                {t('Place Order')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}