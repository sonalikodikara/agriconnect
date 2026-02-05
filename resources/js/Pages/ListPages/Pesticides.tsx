import ProductListPage from './ProductListPage';
import { usePage } from '@inertiajs/react';

export default function Pesticides() {
    const { props } = usePage<any>();

    return (
        <ProductListPage
            products={props.products || []}
            category_name={props.category_name || 'Pesticides'}
        />
    );
}
