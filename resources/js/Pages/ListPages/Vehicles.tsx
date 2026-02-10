import ProductListPage from './ProductListPage';

export default function Vehicles({ products }: { products: any }) {
  return <ProductListPage products={products} category_name="Vehicles" />;
}