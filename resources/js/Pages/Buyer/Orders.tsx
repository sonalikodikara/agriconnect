<<<<<<< HEAD
// resources/js/Pages/Buyer/Orders.tsx (updated with success message handling)
import { Head, Link } from '@inertiajs/react';
=======
// resources/js/Pages/Buyer/Orders.tsx (updated with real-time tracking and all statuses)
import { Head, Link, router, useForm } from '@inertiajs/react';
>>>>>>> AG-26
import { useTranslation } from 'react-i18next';
import BuyerNavbar from '@/components/BuyerNavbar';
import { 
  Clock, 
  CheckCircle, 
  Package, 
  Truck,
<<<<<<< HEAD
  CreditCard 
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
=======
  CreditCard,
  XCircle,
  RefreshCw,
  MessageCircle,
  Star
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
>>>>>>> AG-26

export default function Orders() {
  const { t } = useTranslation();
  const { props } = usePage<{ orders: any[], flash?: { status_key?: string } }>();
<<<<<<< HEAD
  const orders = props.orders || [];
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
=======
  const [orders, setOrders] = useState(props.orders || []);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const previousOrdersRef = useRef<any[]>(props.orders || []);
  const [showRatingForm, setShowRatingForm] = useState<{ [key: number]: boolean }>({});
  const [ratingForms, setRatingForms] = useState<{ [key: number]: { rating: number; review: string } }>({});

  // Real-time polling: Refresh orders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      router.reload({
        only: ['orders'],
        preserveScroll: true,
        onFinish: () => {
          setIsRefreshing(false);
          setLastUpdated(new Date());
        },
      });
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Update orders when props change
  useEffect(() => {
    if (props.orders) {
      // Check for status changes
      const hasStatusChanged = props.orders.some((newOrder: any, index: number) => {
        const oldOrder = previousOrdersRef.current[index];
        return oldOrder && oldOrder.status !== newOrder.status;
      });

      if (hasStatusChanged) {
        // Show notification for status change
        const changedOrder = props.orders.find((newOrder: any, index: number) => {
          const oldOrder = previousOrdersRef.current[index];
          return oldOrder && oldOrder.status !== newOrder.status;
        });
        if (changedOrder) {
          setSuccessMessage(t('Order status updated: {{status}}', { 
            status: getStatusLabel(changedOrder.status) 
          }));
          setTimeout(() => setSuccessMessage(null), 5000);
        }
      }

      setOrders(props.orders);
      previousOrdersRef.current = props.orders;
      setLastUpdated(new Date());
    }
  }, [props.orders, t]);
>>>>>>> AG-26

  useEffect(() => {
    if (props.flash?.status_key) {
      setSuccessMessage(t(props.flash.status_key));
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [props.flash, t]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={40} className="text-yellow-600" />;
<<<<<<< HEAD
=======
      case 'accepted':
        return <CreditCard size={40} className="text-blue-600" />;
      case 'packed':
        return <Package size={40} className="text-indigo-600" />;
      case 'dispatched':
        return <Truck size={40} className="text-purple-600" />;
      case 'out_for_delivery':
        return <Truck size={40} className="text-orange-600" />;
      case 'delivered':
        return <CheckCircle size={40} className="text-green-600" />;
      case 'cancelled':
        return <XCircle size={40} className="text-red-600" />;
      // Legacy statuses
>>>>>>> AG-26
      case 'confirmed':
        return <CreditCard size={40} className="text-blue-600" />;
      case 'shipping':
        return <Truck size={40} className="text-purple-600" />;
<<<<<<< HEAD
      case 'delivered':
        return <CheckCircle size={40} className="text-green-600" />;
=======
>>>>>>> AG-26
      default:
        return <Package size={40} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
<<<<<<< HEAD
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipping': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
=======
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'packed': return 'bg-indigo-100 text-indigo-800';
      case 'dispatched': return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      // Legacy statuses
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipping': return 'bg-purple-100 text-purple-800';
>>>>>>> AG-26
      default: return 'bg-gray-100 text-gray-800';
    }
  };

<<<<<<< HEAD
=======
  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'pending': t('Pending'),
      'accepted': t('Accepted'),
      'packed': t('Packed'),
      'dispatched': t('Dispatched'),
      'out_for_delivery': t('Out for Delivery'),
      'delivered': t('Delivered'),
      'cancelled': t('Cancelled'),
      'confirmed': t('Accepted'),
      'shipping': t('Dispatched'),
    };
    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getWhatsAppUrl = (order: any) => {
    if (!order.delivery_phone) return null;
    const phone = order.delivery_phone.replace(/[^0-9+]/g, '');
    const message = encodeURIComponent(
      `Hello! I have a question about my order #${order.id}. Status: ${getStatusLabel(order.status)}`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  const handleRatingSubmit = (orderId: number) => {
    const formData = ratingForms[orderId];
    if (!formData || !formData.rating) {
      alert(t('Please select a rating'));
      return;
    }

    router.post(route('buyers.orders.rating.store', orderId), {
      rating: formData.rating,
      review: formData.review || '',
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setShowRatingForm({ ...showRatingForm, [orderId]: false });
        setRatingForms({ ...ratingForms, [orderId]: { rating: 0, review: '' } });
        setSuccessMessage(t('rating.submitted_successfully'));
        setTimeout(() => setSuccessMessage(null), 5000);
      },
      onError: (errors: any) => {
        console.error('Rating submission error:', errors);
      },
    });
  };

  const renderStarRating = (orderId: number, currentRating: number = 0, interactive: boolean = true) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => {
              if (interactive) {
                setRatingForms({
                  ...ratingForms,
                  [orderId]: { ...ratingForms[orderId], rating: star, review: ratingForms[orderId]?.review || '' }
                });
              }
            }}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition' : 'cursor-default'}`}
            disabled={!interactive}
          >
            <Star
              size={24}
              className={star <= currentRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

>>>>>>> AG-26
  return (
    <>
      <Head title={t('My Orders')} />
      <BuyerNavbar cartCount={0} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-center py-4 px-8 rounded-xl shadow-lg z-50 flex items-center justify-center gap-2">
            {successMessage}
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
          <h1 className="text-5xl font-bold text-green-800 text-center mb-12">
            {t('My Orders')}
          </h1>
=======
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-5xl font-bold text-green-800">
              {t('My Orders')}
            </h1>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {isRefreshing && (
                <div className="flex items-center gap-2 text-gray-600">
                  <RefreshCw size={20} className="animate-spin" />
                  <span className="text-sm">{t('Refreshing...')}</span>
                </div>
              )}
              <button
                onClick={() => {
                  setIsRefreshing(true);
                  router.reload({
                    only: ['orders'],
                    preserveScroll: true,
                    onFinish: () => {
                      setIsRefreshing(false);
                      setLastUpdated(new Date());
                    },
                  });
                }}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
                disabled={isRefreshing}
              >
                <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                {t('Refresh')}
              </button>
            </div>
          </div>

          {lastUpdated && (
            <p className="text-sm text-gray-500 text-center mb-6">
              {t('Last updated')}: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
>>>>>>> AG-26

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

<<<<<<< HEAD
                      <div className="mt-4 md:mt-0">
                        <span className={`inline-block px-8 py-4 rounded-full text-xl font-bold shadow-md ${getStatusColor(order.status)}`}>
                          {order.status_label || t(order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                        </span>
=======
                      <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
                        <span className={`inline-block px-8 py-4 rounded-full text-xl font-bold shadow-md ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                        {order.updated_at && (
                          <p className="text-xs text-gray-500">
                            {t('Updated')}: {new Date(order.updated_at).toLocaleString()}
                          </p>
                        )}
>>>>>>> AG-26
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                      <div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">{t('Items')}</p>
                        <ul className="space-y-2">
                          {order.items.map((item: any) => (
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
<<<<<<< HEAD
                        <p className="text-4xl font-bold text-green-700">
                          Rs. {parseFloat(order.total_amount).toLocaleString()}
                        </p>
                      </div>
                    </div>
=======
                        <p className="text-4xl font-bold text-green-700 mb-4">
                          Rs. {parseFloat(order.total_amount).toLocaleString()}
                        </p>
                        {getWhatsAppUrl(order) && (
                          <a
                            href={getWhatsAppUrl(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-md mb-3"
                          >
                            <FaWhatsapp size={18} />
                            {t('Contact via WhatsApp')}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Rating Section - Only for delivered orders */}
                    {order.status === 'delivered' && (
                      <div className="mt-8 pt-8 border-t-2 border-green-200">
                        {order.has_rating ? (
                          <div className="bg-green-50 rounded-2xl p-6">
                            <p className="text-lg font-semibold text-green-800 mb-2">{t('You have rated this order')}</p>
                            {order.rating && (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-700">{t('Your rating')}:</span>
                                {renderStarRating(order.id, order.rating.rating, false)}
                                {order.rating.review && (
                                  <p className="text-gray-600 mt-2 italic">"{order.rating.review}"</p>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            {!showRatingForm[order.id] ? (
                              <button
                                onClick={() => setShowRatingForm({ ...showRatingForm, [order.id]: true })}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md flex items-center gap-2"
                              >
                                <Star size={20} />
                                {t('Rate this Order')}
                              </button>
                            ) : (
                              <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-300">
                                <h4 className="text-xl font-bold text-gray-800 mb-4">{t('Rate Your Experience')}</h4>
                                
                                <div className="mb-4">
                                  <label className="block text-gray-700 font-semibold mb-2">{t('Rating')} *</label>
                                  {renderStarRating(order.id, ratingForms[order.id]?.rating || 0, true)}
                                  {ratingForms[order.id]?.rating > 0 && (
                                    <p className="text-sm text-gray-600 mt-2">
                                      {t('Selected')}: {ratingForms[order.id].rating} {t('stars')}
                                    </p>
                                  )}
                                </div>

                                <div className="mb-4">
                                  <label htmlFor={`review-${order.id}`} className="block text-gray-700 font-semibold mb-2">
                                    {t('Review')} ({t('Optional')})
                                  </label>
                                  <textarea
                                    id={`review-${order.id}`}
                                    rows={3}
                                    value={ratingForms[order.id]?.review || ''}
                                    onChange={(e) => {
                                      setRatingForms({
                                        ...ratingForms,
                                        [order.id]: {
                                          rating: ratingForms[order.id]?.rating || 0,
                                          review: e.target.value
                                        }
                                      });
                                    }}
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder={t('Share your experience with this order...')}
                                  />
                                </div>

                                <div className="flex gap-3">
                                  <button
                                    onClick={() => handleRatingSubmit(order.id)}
                                    disabled={!ratingForms[order.id]?.rating}
                                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition"
                                  >
                                    {t('Submit Rating')}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowRatingForm({ ...showRatingForm, [order.id]: false });
                                      setRatingForms({ ...ratingForms, [order.id]: { rating: 0, review: '' } });
                                    }}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
                                  >
                                    {t('Cancel')}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
>>>>>>> AG-26
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