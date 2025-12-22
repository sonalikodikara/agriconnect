import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/components/BuyerNavbar';
import { CreditCard, Check } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Checkout() {
  const { t } = useTranslation();
  const { props } = usePage<{ cartItems: any[], total: number, errors?: any }>();
  const cartItems = props.cartItems || [];
  const total = props.total || 0;
  const errors = props.errors || {};

  const { data, setData, post, processing } = useForm({
    payment_method: 'cash',
    card_holder_name: '',
    card_number: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // If cash on delivery, clear card fields to avoid validation errors
    if (data.payment_method === 'cash') {
      setData({
        ...data,
        card_holder_name: '',
        card_number: '',
        expiry: '',
        cvv: '',
      });
    }

    post(route('buyers.orders.store'), {
      onSuccess: () => {
        // Optional: show success message or redirect handled by server
      },
      onError: () => {
        // Errors will be automatically populated in props.errors
      },
    });
  };

  return (
    <>
      <Head title={t('Checkout')} />
      <BuyerNavbar cartCount={0} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">{t('Checkout')}</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
            {/* Order Summary */}
            <div className="border-b-2 border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Order Summary')}</h2>
              <div className="space-y-4">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-lg">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>Rs. {((item.product.price || 0) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between text-lg">
                  <span>{t('Delivery')}</span>
                  <span>{t('Free')}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>{t('Total')}</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Payment Method')}</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer hover:border-green-400 transition
                  ${data.payment_method === 'card' ? 'border-green-600 bg-green-50' : 'border-gray-300'}">
                  <CreditCard size={24} className="text-green-600" />
                  <span className="text-lg">{t('Credit/Debit Card')}</span>
                  <input
                    type="radio"
                    name="payment_method"
                    value="card"
                    checked={data.payment_method === 'card'}
                    onChange={() => setData('payment_method', 'card')}
                    className="ml-auto h-5 w-5 text-green-600"
                  />
                </label>

                <label className="flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer hover:border-green-400 transition
                  ${data.payment_method === 'cash' ? 'border-green-600 bg-green-50' : 'border-gray-300'}">
                  <Check size={24} className="text-green-600" />
                  <span className="text-lg">{t('Cash on Delivery')}</span>
                  <input
                    type="radio"
                    name="payment_method"
                    value="cash"
                    checked={data.payment_method === 'cash'}
                    onChange={() => setData('payment_method', 'cash')}
                    className="ml-auto h-5 w-5 text-green-600"
                  />
                </label>
              </div>
            </div>

            {/* Card Details - Only show when Card is selected */}
            {data.payment_method === 'card' && (
              <div className="space-y-6 p-6 bg-gray-50 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Card Details')}</h2>

                {/* Card Holder Name */}
                <div>
                  <label className="block text-lg mb-2">{t('Card Holder Name')}</label>
                  <input
                    type="text"
                    value={data.card_holder_name}
                    onChange={(e) => setData('card_holder_name', e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-green-500 outline-none"
                    placeholder={t('John Doe')}
                    required
                  />
                  {errors.card_holder_name && <p className="text-red-600 mt-1">{errors.card_holder_name}</p>}
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-lg mb-2">{t('Card Number')}</label>
                  <input
                    type="text"
                    value={data.card_number}
                    onChange={(e) => setData('card_number', e.target.value.replace(/\D/g, '').slice(0, 16))}
                    className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-green-500 outline-none"
                    placeholder="1234567890123456"
                    maxLength={16}
                    required
                  />
                  {errors.card_number && <p className="text-red-600 mt-1">{errors.card_number}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry */}
                  <div>
                    <label className="block text-lg mb-2">{t('Expiry (MM/YY)')}</label>
                    <input
                      type="text"
                      value={data.expiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
                        setData('expiry', value);
                      }}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-green-500 outline-none"
                      placeholder="12/25"
                      maxLength={5}
                      required
                    />
                    {errors.expiry && <p className="text-red-600 mt-1">{errors.expiry}</p>}
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-lg mb-2">{t('CVV')}</label>
                    <input
                      type="text"
                      value={data.cvv}
                      onChange={(e) => setData('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                      className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:border-green-500 outline-none"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                    {errors.cvv && <p className="text-red-600 mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Place Order Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={processing}
                className="bg-green-600 text-white px-16 py-6 rounded-3xl text-2xl font-bold hover:bg-green-700 shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {processing ? t('Processing...') : t('Place Order')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}