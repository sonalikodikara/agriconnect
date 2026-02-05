import { Head, useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/components/BuyerNavbar';
import { ArrowLeft } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Checkout() {
  const { t } = useTranslation();
  const { props } = usePage<any>();
  const cartItems = props.cartItems || [];
  const total = props.total || 0;

  const { data, setData, post, processing, errors, reset } = useForm({
    payment_method: 'cash',
    card_holder_name: '',
    card_number: '',
    expiry: '',
    cvv: '',
    delivery_name: '',
    delivery_phone: '',
    delivery_address: '',
  });

  const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});

  const goBack = () => window.history.back();

  // CLIENT-SIDE VALIDATION
  const validate = () => {
    const e: { [k: string]: string } = {};

    if (!data.delivery_name?.trim()) e.delivery_name = t('Delivery name required');
    if (!data.delivery_phone?.trim()) e.delivery_phone = t('Delivery phone required');
    else if (!/^\d{7,15}$/.test(data.delivery_phone)) e.delivery_phone = t('Delivery phone invalid');
    if (!data.delivery_address?.trim()) e.delivery_address = t('Delivery address required');

    if (data.payment_method === 'card') {
      if (!data.card_holder_name?.trim()) e.card_holder_name = t('Card holder required');
      if (!/^\d{16}$/.test((data.card_number || '').replace(/\s+/g, ''))) e.card_number = t('Card number required');
      if (!/^\d{4}-\d{2}$/.test(data.expiry || '')) e.expiry = t('Card Expiry Invalid'); // YYYY-MM
      if (!/^\d{3}$/.test(data.cvv || '')) e.cvv = t('Card CVV Invalid');
    }

    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const valErrors = validate();
    if (Object.keys(valErrors).length > 0) {
      setClientErrors(valErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setClientErrors({});

    // Remove card data if cash and wait a tick to ensure state is flushed
    if (data.payment_method === 'cash') {
      setData({
        ...data,
        card_holder_name: undefined,
        card_number: undefined,
        expiry: undefined,
        cvv: undefined,
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    post(route('buyers.orders.store'));
  };

  const inputStyle = (field: string) =>
    `w-full p-4 border-2 rounded-2xl outline-none ${clientErrors[field] || (errors as any)[field] ? 'border-red-500' : 'border-gray-300 focus:border-green-500'}`;

  return (
    <>
      <Head title={t('Checkout')} />
      <BuyerNavbar cartCount={cartItems.length} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4">

          {/* BACK BUTTON */}
          <button
            onClick={goBack}
            className="flex items-center gap-2 mb-6 bg-white px-5 py-3 rounded-xl shadow-md border hover:bg-gray-50"
          >
            <ArrowLeft size={20} className="text-green-700" />
            <span className="font-semibold text-green-800">{t('Back')}</span>
          </button>

          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">{t('Checkout')}</h1>

          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-3xl shadow-lg p-8 space-y-8">

            {/* Order Summary */}
            <div className="border-b-2 border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('Order Summary')}</h2>
              <div className="space-y-4">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-lg">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
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

            {/* DELIVERY */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{t('Delivery Information')}</h2>

              <div>
                <label>{t('Full Name')}</label>
                <input value={data.delivery_name} onChange={e => setData('delivery_name', e.target.value)} className={inputStyle('delivery_name')} />
                {(clientErrors.delivery_name || errors.delivery_name) && <p className="text-red-500 text-sm">{clientErrors.delivery_name || errors.delivery_name}</p>}
              </div>

              <div>
                <label>{t('Phone')}</label>
                <input value={data.delivery_phone} onChange={e => setData('delivery_phone', e.target.value)} className={inputStyle('delivery_phone')} />
                {(clientErrors.delivery_phone || errors.delivery_phone) && <p className="text-red-500 text-sm">{clientErrors.delivery_phone || errors.delivery_phone}</p>}
              </div>

              <div>
                <label>{t('Address')}</label>
                <textarea value={data.delivery_address} onChange={e => setData('delivery_address', e.target.value)} className={inputStyle('delivery_address')} />
                {(clientErrors.delivery_address || errors.delivery_address) && <p className="text-red-500 text-sm">{clientErrors.delivery_address || errors.delivery_address}</p>}
              </div>
            </div>

            {/* PAYMENT */}
            <div>
              <h2 className="text-2xl font-bold">{t('Payment Method')}</h2>
              <label className="flex gap-3 mt-3">
                <input
                  type="radio"
                  name="payment_method"
                  value="cash"
                  checked={data.payment_method === 'cash'}
                  onChange={() => {
                    setData('payment_method', 'cash');
                    reset('card_holder_name', 'card_number', 'expiry', 'cvv');
                    setClientErrors({});
                  }}
                />
                {t('Cash on Delivery')}
              </label>
              <label className="flex gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  value="card"
                  checked={data.payment_method === 'card'}
                  onChange={() => {
                    setData('payment_method', 'card');
                    setClientErrors({});
                  }}
                />
                {t('Credit Card')}
              </label>
            </div>

            {/* CARD DETAILS */}
            {data.payment_method === 'card' && (
              <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <h2 className="text-2xl font-bold">{t('Card Details')}</h2>

                <div>
                  <label>{t('Card Holder Name')}</label>
                  <input value={data.card_holder_name} onChange={e => setData('card_holder_name', e.target.value)} className={inputStyle('card_holder_name')} />
                  {(clientErrors.card_holder_name || errors.card_holder_name) && <p className="text-red-500 text-sm">{clientErrors.card_holder_name || errors.card_holder_name}</p>}
                </div>

                <div>
                  <label>{t('Card Number')}</label>
                  <input value={data.card_number} placeholder="1234 5678 9012 3456" onChange={e => setData('card_number', e.target.value)} className={inputStyle('card_number')} />
                  {(clientErrors.card_number || errors.card_number) && <p className="text-red-500 text-sm">{clientErrors.card_number || errors.card_number}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>{t('Expiry')}</label>
                    <input type="month" value={data.expiry} onChange={e => setData('expiry', e.target.value)} className={inputStyle('expiry')} />
                    {(clientErrors.expiry || errors.expiry) && <p className="text-red-500 text-sm">{clientErrors.expiry || errors.expiry}</p>}
                  </div>
                  <div>
                    <label>{t('CVV')}</label>
                    <input value={data.cvv} placeholder="123" onChange={e => setData('cvv', e.target.value)} className={inputStyle('cvv')} />
                    {(clientErrors.cvv || errors.cvv) && <p className="text-red-500 text-sm">{clientErrors.cvv || errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            <button disabled={processing} className="bg-green-600 text-white px-10 py-4 rounded-2xl w-full">
              {processing ? t('Processing...') : t('Place Order')}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}