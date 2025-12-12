import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/components/BuyerNavbar';
import { Truck, Package, Clock, CheckCircle } from 'lucide-react';

export default function Orders() {
  const { t } = useTranslation();

  const orders = [ // Example data
    { id: 123, items: 'Fertilizer Pack', total: 1500, status: 'delivered', date: '2025-12-10' },
    { id: 124, items: 'Rice Seeds', total: 800, status: 'shipped', date: '2025-12-11' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={32} className="text-yellow-600" />;
      case 'shipped': return <Truck size={32} className="text-blue-600" />;
      case 'delivered': return <CheckCircle size={32} className="text-green-600" />;
      default: return <Package size={32} className="text-gray-600" />;
    }
  };

  return (
    <>
      <Head title={t('Orders')} />
      <BuyerNavbar cartCount={0} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">{t('My Orders')}</h1>

          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-3xl shadow-lg p-8 border-l-8 border-green-500">
                <div className="flex items-center gap-6 mb-6">
                  <div className="p-4 bg-gray-100 rounded-2xl">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Order #{order.id}</h3>
                    <p className="text-gray-600">{t('Placed on {{date}}', { date: order.date })}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-lg font-semibold">{t('Items')}</p>
                    <p className="text-gray-600">{order.items}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{t('Total')}</p>
                    <p className="text-2xl font-bold text-green-800">Rs. {order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500 mb-6">{t('No orders yet')}</p>
              <Link href={route('buyers.dashboard')} className="bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold">
                {t('Start Shopping')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}