import { Star, MapPin, ShoppingCart, Heart, Truck, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";

interface ProductCardProps {
  product: {
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
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-agri-neutral-light hover:border-agri-primary/50 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={t(product.nameKey)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.badges?.map((badge, index) => (
            <Badge key={index} className="bg-agri-secondary text-white text-xs px-2 py-1">
              {badge}
            </Badge>
          ))}
          {discountPercentage > 0 && (
            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Heart Icon */}
        <Button
          size="sm"
          variant="outline"
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 border-none hover:bg-white"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </Button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full bg-agri-primary hover:bg-agri-primary-dark text-white">
            <ShoppingCart className="w-4 h-4 mr-2" />
            {t('products.addToCart')}
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Title and Description */}
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-agri-primary transition-colors">
          {t(product.nameKey)}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{t(product.descriptionKey)}</p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-agri-secondary fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-agri-primary">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">{t('products.by')}</span>
            <span className="text-sm font-medium text-agri-primary">{product.seller}</span>
            {product.verified && (
              <Shield className="w-4 h-4 text-agri-primary" />
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-3 h-3 mr-1" />
            {product.location}
          </div>
        </div>

        {/* Stock and Delivery Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? t('products.inStock') : t('products.outOfStock')}
            </span>
            {product.freeDelivery && (
              <div className="flex items-center text-agri-primary">
                <Truck className="w-3 h-3 mr-1" />
                {t('products.freeDelivery')}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}