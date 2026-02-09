import ProductListPage from './ProductListPage';

export default function Others({ products }: { products: any }) {
  return <ProductListPage products={products} category_name="Other Products" />;
}