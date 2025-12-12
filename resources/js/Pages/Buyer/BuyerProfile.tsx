import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/Components/BuyerNavbar';
import { Truck, ShoppingCart, User, MapPin } from 'lucide-react';

export default function BuyerProfile() {
  const { t } = useTranslation();
  const { auth } = usePage().props;

  return (
    <>
      <Head title={t('Buyer Dashboard')} />
      <BuyerNavbar cartCount={2} /> {/* Example cart count */}

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
              {t('Welcome back, {{name}}!', { name: auth.user.name })}
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              {t('Browse fresh products, manage your cart, and track deliveries easily.')}
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Cart Button */}
            <Link href={route('buyers.cart')} className="group bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
              <ShoppingCart size={64} className="mx-auto mb-4 text-green-600 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">{t('My Cart')}</h3>
              <p className="text-gray-600">{t('View and edit your shopping cart')}</p>
            </Link>

            {/* Orders Button */}
            <Link href={route('buyers.orders')} className="group bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2">
              <Truck size={64} className="mx-auto mb-4 text-yellow-600 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-bold text-yellow-800 mb-2">{t('Track Orders')}</h3>
              <p className="text-gray-600">{t('See delivery progress and status')}</p>
            </Link>

            {/* Delivery Details */}
            <div className="group bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer" onClick={() => router.visit(route('buyers.delivery.edit'))}>
              <MapPin size={64} className="mx-auto mb-4 text-blue-600 group-hover:scale-110 transition" />
              <h3 className="text-2xl font-bold text-blue-800 mb-2">{t('Delivery Address')}</h3>
              <p className="text-gray-600">{t('Update your shipping details')}</p>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6">{t('Recent Orders')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Order Cards */}
              <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-green-400 transition">
                <h4 className="font-bold text-xl text-gray-800 mb-2">{t('Order #123')}</h4>
                <p className="text-gray-600 mb-4">{t('Fertilizer Pack - Rs. 1500')}</p>
                <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
                  {t('Shipped')}
                </span>
              </div>
              {/* Add more cards as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}