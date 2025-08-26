import { Bell, User, Truck, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageContext";

interface DashboardHeaderProps {
  onDeliveryClick?: () => void;
  onProfileClick?: () => void;
}

export function DashboardHeader({ onDeliveryClick, onProfileClick }: DashboardHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="bg-agri-neutral-white border-b border-agri-neutral-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-agri-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">AC</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-agri-primary">{t('header.brand')}</h1>
                <p className="text-sm text-gray-600">{t('header.subtitle')}</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('header.search')}
                className="pl-10 pr-4 py-3 w-full border-agri-neutral-light focus:border-agri-primary focus:ring-agri-primary text-base"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Delivery Tracking */}
            <Button 
              variant="outline" 
              size="lg"
              onClick={onDeliveryClick}
              className="border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white px-6 py-3 relative cursor-pointer"
            >
              <Truck className="w-6 h-6 mr-2" />
              <span className="hidden sm:inline">{t('header.delivery')}</span>
              <Badge className="absolute -top-2 -right-2 bg-agri-secondary text-white w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* Notifications */}
            <Button 
              variant="outline" 
              size="lg"
              className="border-agri-secondary text-agri-secondary hover:bg-agri-secondary hover:text-white px-6 py-3 relative"
            >
              <Bell className="w-6 h-6 mr-2" />
              <span className="hidden sm:inline">{t('header.alerts')}</span>
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                5
              </Badge>
            </Button>

            {/* Profile */}
            <Button 
              variant="outline" 
              size="lg"
              onClick={onProfileClick}
              className="border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white px-6 py-3 cursor-pointer"
            >
              <User className="w-6 h-6 mr-2" />
              <span className="hidden sm:inline">{t('header.profile')}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}