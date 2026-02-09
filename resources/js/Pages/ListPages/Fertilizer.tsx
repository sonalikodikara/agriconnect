import ProductListPage from './ProductListPage';

export default function Fertilizer({ products }: { products: any }) {
  return <ProductListPage products={products} category_name="Fertilizer" />;
}