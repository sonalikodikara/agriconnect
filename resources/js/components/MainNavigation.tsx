import { Sprout, Droplets, Truck, Tractor, HelpCircle, Star } from "lucide-react";
import { Card } from "./ui/card";
import { useLanguage } from "./LanguageContext";

interface NavigationItem {
  id: string;
  labelKey: string;
  icon: React.ComponentType<any>;
  descriptionKey: string;
  count: number;
}

const navigationItems: NavigationItem[] = [
  {
    id: "seeds",
    labelKey: "nav.seeds",
    icon: Sprout,
    descriptionKey: "nav.seeds.desc",
    count: 1250
  },
  {
    id: "fertilizers",
    labelKey: "nav.fertilizers",
    icon: Droplets,
    descriptionKey: "nav.fertilizers.desc",
    count: 850
  },
  {
    id: "equipment",
    labelKey: "nav.equipment",
    icon: Truck,
    descriptionKey: "nav.equipment.desc",
    count: 620
  },
  {
    id: "vehicles",
    labelKey: "nav.vehicles",
    icon: Tractor,
    descriptionKey: "nav.vehicles.desc",
    count: 340
  },
  {
    id: "advisory",
    labelKey: "nav.advisory",
    icon: HelpCircle,
    descriptionKey: "nav.advisory.desc",
    count: 45
  },
  {
    id: "reviews",
    labelKey: "nav.reviews",
    icon: Star,
    descriptionKey: "nav.reviews.desc",
    count: 2100
  }
];

interface MainNavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MainNavigation({ activeCategory, onCategoryChange }: MainNavigationProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-agri-neutral-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-agri-primary mb-2">{t('nav.title')}</h2>
          <p className="text-gray-600">{t('nav.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeCategory === item.id;
            
            return (
              <Card 
                key={item.id}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                  isActive 
                    ? 'border-agri-primary bg-agri-primary/5' 
                    : 'border-agri-neutral-light hover:border-agri-primary/50'
                }`}
                onClick={() => onCategoryChange(item.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-agri-primary' : 'bg-agri-neutral-light'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      isActive ? 'text-white' : 'text-agri-primary'
                    }`} />
                  </div>
                  <h3 className={`font-semibold mb-1 ${
                    isActive ? 'text-agri-primary' : 'text-gray-900'
                  }`}>
                    {t(item.labelKey)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{t(item.descriptionKey)}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isActive 
                      ? 'bg-agri-primary text-white' 
                      : 'bg-agri-secondary text-white'
                  }`}>
                    {item.count.toLocaleString()} {t('nav.items')}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}