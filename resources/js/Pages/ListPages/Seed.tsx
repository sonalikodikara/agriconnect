import { Head } from '@inertiajs/react';
import ProductListPage from './ProductListPage';

export default function Seed({ products }) {
  return <ProductListPage products={products} category_name="Seeds" />;
}