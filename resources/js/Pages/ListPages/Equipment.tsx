import ProductListPage from './ProductListPage';

export default function Equipment({ products }: { products: any }) {
  return <ProductListPage products={products} category_name="Equipment & Tools" />;
}