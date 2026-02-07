import { ProductCard } from "./ProductCard";
import { useLanguage } from "./LanguageContext";

interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  seller: string;
  location: string;
  inStock: boolean;
  freeDelivery: boolean;
  verified: boolean;
  category: string;
  badges?: string[];
}

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
}

export function ProductGrid({ products, activeCategory }: ProductGridProps) {
  const { t } = useLanguage();

  // Mock data for demonstration with Sinhala content
  const mockProducts: Product[] = [
    {
      id: "1",
      nameKey: "product.wheat.name",
      descriptionKey: "product.wheat.desc",
      price: 2500,
      originalPrice: 3000,
      rating: 4.8,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
      seller: "AgriSeeds Co.",
      location: "පන්ජාබ්",
      inStock: true,
      freeDelivery: true,
      verified: true,
      category: "seeds",
      badges: ["Bestseller", "Organic"]
    },
    {
      id: "2",
      nameKey: "product.fertilizer.name",
      descriptionKey: "product.fertilizer.desc",
      price: 1800,
      rating: 4.6,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      seller: "FertilCare Ltd.",
      location: "ගුජරාත්",
      inStock: true,
      freeDelivery: false,
      verified: true,
      category: "fertilizers",
      badges: ["Eco-friendly"]
    },
    {
      id: "3",
      nameKey: "product.thresher.name",
      descriptionKey: "product.thresher.desc",
      price: 85000,
      originalPrice: 95000,
      rating: 4.7,
      reviewCount: 34,
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=400&fit=crop",
      seller: "AgriTech Solutions",
      location: "හරියානා",
      inStock: true,
      freeDelivery: true,
      verified: true,
      category: "equipment",
      badges: ["Popular"]
    },
    {
      id: "4",
      nameKey: "product.tractor.name",
      descriptionKey: "product.tractor.desc",
      price: 750000,
      rating: 4.9,
      reviewCount: 67,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
      seller: "Mahindra Tractors",
      location: "මහාරාෂ්ට්‍රා",
      inStock: true,
      freeDelivery: true,
      verified: true,
      category: "vehicles",
      badges: ["Warranty", "New"]
    },
    {
      id: "5",
      nameKey: "product.tomato.name",
      descriptionKey: "product.tomato.desc",
      price: 450,
      originalPrice: 550,
      rating: 4.5,
      reviewCount: 203,
      image: "https://images.unsplash.com/photo-1592841200221-4e2f8a2dc785?w=400&h=400&fit=crop",
      seller: "VegSeeds Pro",
      location: "කර්ණාටක",
      inStock: true,
      freeDelivery: true,
      verified: true,
      category: "seeds",
      badges: ["Hybrid", "High Yield"]
    },
    {
      id: "6",
      nameKey: "product.compost.name",
      descriptionKey: "product.compost.desc",
      price: 800,
      rating: 4.4,
      reviewCount: 145,
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=400&fit=crop",
      seller: "Green Earth Organic",
      location: "තමිල් නාඩු",
      inStock: true,
      freeDelivery: false,
      verified: true,
      category: "fertilizers",
      badges: ["100% Organic"]
    }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === "all" 
    ? mockProducts 
    : mockProducts.filter(product => product.category === activeCategory);

  return (
    <div className="bg-agri-neutral-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredProducts.length} {t('products.found')}
            </h2>
            <p className="text-gray-600">
              {t('products.showing')} "{activeCategory === "all" ? "all categories" : t(`nav.${activeCategory}`)}"
            </p>
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{t('products.sortBy')}</span>
            <select className="border border-agri-neutral-light rounded-lg px-3 py-2 bg-white focus:border-agri-primary focus:outline-none">
              <option value="relevance">{t('products.relevance')}</option>
              <option value="price-low">{t('products.priceLow')}</option>
              <option value="price-high">{t('products.priceHigh')}</option>
              <option value="rating">{t('products.rating')}</option>
              <option value="newest">{t('products.newest')}</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.469-.5-6-1.291M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V3a2 2 0 10-4 0v2.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('products.noFound')}</h3>
            <p className="text-gray-600">{t('products.noFoundDesc')}</p>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-agri-primary hover:bg-agri-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors">
              {t('products.loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}