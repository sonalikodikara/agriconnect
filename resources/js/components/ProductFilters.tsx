import { Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { useLanguage } from "./LanguageContext";

interface ProductFiltersProps {
  activeCategory: string;
}

export function ProductFilters({ activeCategory }: ProductFiltersProps) {
  const { t } = useLanguage();

  const getCategoryFilters = (category: string) => {
    switch (category) {
      case "seeds":
        return [
          { 
            labelKey: "filters.seeds.cropType", 
            optionKeys: [
              "filters.seeds.wheat", 
              "filters.seeds.rice", 
              "filters.seeds.corn", 
              "filters.seeds.vegetables", 
              "filters.seeds.fruits"
            ] 
          },
          { 
            labelKey: "filters.seeds.variety", 
            optionKeys: [
              "filters.seeds.hybrid", 
              "filters.seeds.organic", 
              "filters.seeds.traditional", 
              "filters.seeds.gmo"
            ] 
          },
          { 
            labelKey: "filters.seeds.season", 
            optionKeys: [
              "filters.seeds.kharif", 
              "filters.seeds.rabi", 
              "filters.seeds.zaid"
            ] 
          }
        ];
      case "fertilizers":
        return [
          { 
            labelKey: "filters.fertilizers.type", 
            optionKeys: [
              "filters.fertilizers.organic", 
              "filters.fertilizers.chemical", 
              "filters.fertilizers.bio", 
              "filters.fertilizers.liquid"
            ] 
          },
          { 
            labelKey: "filters.fertilizers.npk", 
            optionKeys: ["10-26-26", "20-20-0", "12-32-16", "17-17-17"] 
          },
          { 
            labelKey: "filters.fertilizers.application", 
            optionKeys: [
              "filters.fertilizers.soil", 
              "filters.fertilizers.foliar", 
              "filters.fertilizers.drip", 
              "filters.fertilizers.broadcast"
            ] 
          }
        ];
      case "equipment":
        return [
          { labelKey: "Category", optionKeys: ["Hand Tools", "Power Tools", "Irrigation", "Harvesting"] },
          { labelKey: "Brand", optionKeys: ["Mahindra", "John Deere", "Swaraj", "Sonalika"] },
          { labelKey: "Condition", optionKeys: ["New", "Used", "Refurbished"] }
        ];
      case "vehicles":
        return [
          { labelKey: "Type", optionKeys: ["Tractor", "Harvester", "Truck", "Trailer"] },
          { labelKey: "Power (HP)", optionKeys: ["< 25 HP", "25-40 HP", "40-60 HP", "> 60 HP"] },
          { labelKey: "Fuel Type", optionKeys: ["Diesel", "Electric", "Hybrid"] }
        ];
      default:
        return [
          { labelKey: "Category", optionKeys: ["All Categories"] },
          { labelKey: "Rating", optionKeys: ["5 Stars", "4+ Stars", "3+ Stars"] },
          { labelKey: "Availability", optionKeys: ["In Stock", "Pre-order", "Coming Soon"] }
        ];
    }
  };

  const filters = getCategoryFilters(activeCategory);

  return (
    <Card className="bg-agri-neutral-white border-agri-neutral-light">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-agri-primary" />
            <h3 className="font-semibold text-agri-primary">{t('filters.title')}</h3>
          </div>
          <Button variant="outline" size="sm" className="text-agri-secondary border-agri-secondary">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {t('filters.advanced')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Dynamic Category Filters */}
          {filters.map((filter, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.labelKey.startsWith('filters.') ? t(filter.labelKey) : filter.labelKey}
              </label>
              <Select>
                <SelectTrigger className="w-full border-agri-neutral-light focus:border-agri-primary">
                  <SelectValue placeholder={`${t('filters.title')} ${(filter.labelKey.startsWith('filters.') ? t(filter.labelKey) : filter.labelKey).toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {filter.optionKeys.map((option, optionIndex) => (
                    <SelectItem key={optionIndex} value={option.toLowerCase()}>
                      {option.startsWith('filters.') ? t(option) : option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              {t('filters.location')}
            </label>
            <Select>
              <SelectTrigger className="w-full border-agri-neutral-light focus:border-agri-primary">
                <SelectValue placeholder={t('filters.location')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="near-me">{t('filters.nearMe')}</SelectItem>
                <SelectItem value="state">{t('filters.withinState')}</SelectItem>
                <SelectItem value="country">{t('filters.nationwide')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('filters.price')}
            </label>
            <div className="flex space-x-2">
              <Input 
                type="number" 
                placeholder={t('filters.min')} 
                className="w-full border-agri-neutral-light focus:border-agri-primary"
              />
              <Input 
                type="number" 
                placeholder={t('filters.max')} 
                className="w-full border-agri-neutral-light focus:border-agri-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-agri-neutral-light">
          <p className="text-sm text-gray-600">
            {t('filters.showing')} <span className="font-semibold text-agri-primary">{t(`nav.${activeCategory}`)}</span>
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-agri-neutral-light">
              {t('filters.clear')}
            </Button>
            <Button className="bg-agri-primary hover:bg-agri-primary-dark text-white px-6">
              {t('filters.apply')}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}