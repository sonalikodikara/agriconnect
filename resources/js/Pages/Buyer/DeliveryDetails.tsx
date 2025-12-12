import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/Components/BuyerNavbar';
import { MapPin, Phone } from 'lucide-react';

export default function DeliveryDetails() {
  const { t } = useTranslation();
  const { data, setData, post, processing, errors } = useForm({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    province: '',
    pincode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('buyers.delivery.save'), {
      onSuccess: () => router.back(), // Back to checkout
    });
  };

  return (
    <>
      <Head title={t('Delivery Details')} />
      <BuyerNavbar cartCount={0} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">{t('Add Delivery Address')}</h1>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder={t('Full Name')}
                  value={data.full_name}
                  onChange={e => setData('full_name', e.target.value)}
                  className="p-4 border-2 border-green-300 rounded-xl text-xl"
                  required
                />
                <input
                  type="tel"
                  placeholder={t('Phone Number')}
                  value={data.phone}
                  onChange={e => setData('phone', e.target.value)}
                  className="p-4 border-2 border-green-300 rounded-xl text-xl"
                  required
                />
                <input
                  type="text"
                  placeholder={t('City')}
                  value={data.city}
                  onChange={e => setData('city', e.target.value)}
                  className="p-4 border-2 border-green-300 rounded-xl text-xl"
                />
                <input
                  type="text"
                  placeholder={t('District')}
                  value={data.district}
                  onChange={e => setData('district', e.target.value)}
                  className="p-4 border-2 border-green-300 rounded-xl text-xl"
                />
                <input
                  type="text"
                  placeholder={t('Province')}
                  value={data.province}
                  onChange={e => setData('province', e.target.value)}
                  className="p-4 border-2 border-green-300 rounded-xl text-xl"
                />
                <input
                  type="text"
                  placeholder={t('PIN Code')}
                  value={data.pincode}
                  onChange={e => setData('pincode', e.target.value)}
                  className="p-4 border-2 border-green-300 rounded-xl text-xl"
                />
                <textarea
                  placeholder={t('Full Address')}
                  value={data.address}
                  onChange={e => setData('address', e.target.value)}
                  className="col-span-full p-4 border-2 border-green-300 rounded-xl text-xl h-32"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-green-600 text-white px-16 py-6 rounded-3xl text-2xl font-bold hover:bg-green-700"
                >
                  {processing ? t('Saving...') : t('Save Address')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}