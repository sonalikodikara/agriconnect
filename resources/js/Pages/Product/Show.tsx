import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Show() {
    const { t } = useTranslation();
    const { props } = usePage<any>();
    const product = props.product || {};
    const [qty, setQty] = useState(1);

    const goBack = () => window.history.back();

    const addToCart = () => {
        router.post(route('buyers.cart.add'), { product_id: product.id, quantity: qty }, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
            <Head title={product.name || t('Product Details')} />

            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="flex items-center gap-4 p-4 border-b">
                    <button onClick={goBack} className="flex items-center gap-2 text-green-700">
                        <ArrowLeft />
                        <span className="font-semibold">{t('Back')}</span>
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-green-800 ml-4">{product.name}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Images */}
                    <div>
                        {product.primary_image_url ? (
                            <img src={product.primary_image_url} alt={product.name} className="w-full h-80 object-cover rounded-2xl" />
                        ) : (
                            <div className="w-full h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">{t('No image')}</div>
                        )}

                        {product.optional_images_urls && product.optional_images_urls.length > 0 && (
                            <div className="mt-4 grid grid-cols-4 gap-2">
                                {product.optional_images_urls.map((url: string | undefined, i: Key | null | undefined) => (
                                    <img key={i} src={url} alt={`${product.name}-${i}`} className="w-full h-20 object-cover rounded-lg" />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-3xl font-bold text-green-800">Rs. {product.price?.toLocaleString()}</div>
                                <div className="text-sm text-gray-600 mt-1">{product.category}</div>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                                <div>{product.quantity ? `${product.quantity} ${product.quantity_unit || ''}` : t('Quantity not specified')}</div>
                                {product.minimum_order && <div>{t('Minimum')} {product.minimum_order}</div>}
                            </div>
                        </div>

                        <div className="mt-6 text-gray-700 flex-grow">
                            <h3 className="font-semibold text-lg mb-2">{t('Description')}</h3>
                            <p className="whitespace-pre-line">{product.description}</p>

                            {product.npk && (
                                <div className="mt-4">
                                    <h4 className="font-semibold">{t('NPK')}</h4>
                                    <div className="flex gap-4 mt-2 text-sm text-gray-700">
                                        <div>N: {product.npk.nitrogen || '-'}</div>
                                        <div>P: {product.npk.phosphorous || '-'}</div>
                                        <div>K: {product.npk.potassium || '-'}</div>
                                    </div>
                                </div>
                            )}

                            {product.ingredients && product.ingredients.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold">{t('Ingredients')}</h4>
                                    <ul className="list-disc ml-5 mt-2 text-sm">
                                        {product.ingredients.map((ing: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined, i: Key | null | undefined) => <li key={i}>{ing}</li>)}
                                    </ul>
                                </div>
                            )}

                            {product.certificates_urls && product.certificates_urls.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold">{t('Certificates')}</h4>
                                    <div className="flex gap-3 mt-2">
                                        {product.certificates_urls.map((c: string | undefined, i: Key | null | undefined) => (
                                            <a key={i} href={c} target="_blank" rel="noreferrer" className="text-sm text-green-700 underline">{t('View Certificate')}</a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 bg-gray-100 rounded">-</button>
                                <div className="px-4 py-2 border rounded">{qty}</div>
                                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 bg-gray-100 rounded">+</button>

                                <button onClick={addToCart} className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl">{t('Add to Cart')}</button>
                            </div>

                            <div className="mt-4 text-sm text-gray-600">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
