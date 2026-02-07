import { MapPin, Phone, Clock, User, Car, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";
import type { DeliveryItem } from "./DeliveryPage";

interface DeliveryCardProps {
  delivery: DeliveryItem;
}

export function DeliveryCard({ delivery }: DeliveryCardProps) {
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'orderPlaced':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'outForDelivery':
        return 'bg-agri-secondary text-white';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'orderPlaced':
        return '📋';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '📦';
      case 'outForDelivery':
        return '🚚';
      case 'delivered':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  return (
    <Card className="overflow-hidden border-agri-neutral-light hover:shadow-lg transition-shadow duration-300">
      {/* Main Card Content */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <ImageWithFallback
              src={delivery.productImage}
              alt={delivery.productName}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                  {delivery.productName}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span>{t('delivery.orderNumber')}: {delivery.orderNumber}</span>
                  <span>{t('delivery.trackingId')}: {delivery.trackingId}</span>
                </div>
              </div>
              <Badge className={`${getStatusColor(delivery.status)} whitespace-nowrap`}>
                {getStatusIcon(delivery.status)} {t(`delivery.${delivery.status}`)}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-agri-primary">{delivery.progressPercentage}%</span>
              </div>
              <Progress 
                value={delivery.progressPercentage} 
                className="h-2 bg-agri-neutral-light"
              />
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-agri-primary" />
                <div>
                  <p className="text-xs text-gray-500">{t('delivery.currentLocation')}</p>
                  <p className="text-sm font-medium">{delivery.currentLocation}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-agri-secondary" />
                <div>
                  <p className="text-xs text-gray-500">{t('delivery.estimatedDelivery')}</p>
                  <p className="text-sm font-medium">{delivery.estimatedDelivery}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-agri-primary" />
                <div>
                  <p className="text-xs text-gray-service">{t('delivery.estimatedTime')}</p>
                  <p className="text-sm font-medium">{delivery.estimatedTime}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t('delivery.viewDetails')}
                  {showDetails ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </Button>
                {delivery.driverPhone && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-agri-secondary text-agri-secondary hover:bg-agri-secondary hover:text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('delivery.contactDriver')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-agri-neutral-light">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Delivery Timeline</h4>
                <div className="space-y-4">
                  {delivery.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.completed 
                          ? 'bg-agri-primary text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {item.completed ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          item.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {item.status}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{item.location}</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                {delivery.driverName && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('delivery.driverInfo')}</h4>
                    <div className="bg-agri-neutral-light rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-8 h-8 text-agri-primary" />
                        <div>
                          <p className="font-medium">{delivery.driverName}</p>
                          <p className="text-sm text-gray-600">{delivery.driverPhone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {delivery.vehicleNumber && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('delivery.vehicleInfo')}</h4>
                    <div className="bg-agri-neutral-light rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Car className="w-8 h-8 text-agri-primary" />
                        <div>
                          <p className="font-medium">Vehicle: {delivery.vehicleNumber}</p>
                          <p className="text-sm text-gray-600">Delivery Truck</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {delivery.specialInstructions && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('delivery.specialInstructions')}</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">{delivery.specialInstructions}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}