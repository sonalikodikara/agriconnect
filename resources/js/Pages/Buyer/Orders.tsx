import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/components/BuyerNavbar';
import { 
  Clock, 
  CheckCircle, 
  Package, 
  Truck,
  CreditCard 
} from 'lucide-react';

export default function Orders({ orders }) {
  const { t } = useTranslation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={40} className="text-yellow-600" />;
      case 'confirmed':
        return <CreditCard size={40} className="text-blue-600" />;
      case 'shipping':
        return <Truck size={40} className="text-purple-600" />;
      case 'delivered':
        return <CheckCircle size={40} className="text-green-600" />;
      default:
        return <Package size={40} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipping': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head title={t('My Orders')} />
      <BuyerNavbar cartCount={0} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-green-800 text-center mb-12">
            {t('My Orders')}
          </h1>

          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
              <Package size={80} className="mx-auto text-gray-400 mb-6" />
              <p className="text-2xl text-gray-500 mb-8">{t('No orders yet')}</p>
              <Link 
                href={route('buyers.dashboard')} 
                className="bg-green-600 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-green-700 shadow-lg"
              >
                {t('Start Shopping')}
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border-l-8 border-green-600 hover:shadow-3xl transition duration-300"
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-gray-800">
                            {t('Order')} #{order.id}
                          </h3>
                          <p className="text-lg text-gray-600">
                            {t('Placed on {{date}}', { 
                              date: new Date(order.created_at).toLocaleDateString('en-GB')
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0">
                        <span className={`inline-block px-8 py-4 rounded-full text-xl font-bold shadow-md ${getStatusColor(order.status)}`}>
                          {order.status_label || t(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                      <div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">{t('Items')}</p>
                        <ul className="space-y-2">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between text-gray-600">
                              <span>{item.product.name} × {item.quantity}</span>
                              <span>Rs. {(item.price_at_purchase * item.quantity).toLocaleString()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">{t('Delivery Address')}</p>
                        <p className="text-gray-600">
                          {order.delivery_name}<br />
                          {order.delivery_phone}<br />
                          {order.delivery_address}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-700 mb-2">{t('Total Amount')}</p>
                        <p className="text-4xl font-bold text-green-700">
                          Rs. {parseFloat(order.total_amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}