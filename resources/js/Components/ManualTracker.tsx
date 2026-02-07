import { Search, Package, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageContext";

export function ManualTracker() {
  const { t } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    
    setIsTracking(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking result
      if (trackingNumber === "TRK001234567") {
        setTrackingResult({
          found: true,
          orderNumber: "AGR-2025-001",
          productName: "වගා තිරිඟු බීජ - HD-2967",
          status: "outForDelivery",
          currentLocation: "කොළඹ - නුගේගොඩ",
          estimatedDelivery: "අද සවස 3:00 - 5:00",
          driverName: "සුනිල් පේරේරා",
          driverPhone: "+94 77 123 4567"
        });
      } else {
        setTrackingResult({
          found: false,
          message: "Tracking number not found. Please check and try again."
        });
      }
      setIsTracking(false);
    }, 2000);
  };

  return (
    <Card className="p-6 border-agri-neutral-light">
      <div className="flex items-center space-x-2 mb-4">
        <Search className="w-6 h-6 text-agri-primary" />
        <h2 className="text-xl font-semibold text-gray-900">{t('delivery.manualTrack')}</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Enter your tracking number to get real-time updates on your delivery
      </p>

      <div className="flex space-x-3 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={t('delivery.enterTracking')}
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="border-agri-neutral-light focus:border-agri-primary focus:ring-agri-primary"
            onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
          />
        </div>
        <Button
          onClick={handleTrack}
          disabled={!trackingNumber.trim() || isTracking}
          className="bg-agri-primary hover:bg-agri-primary-dark text-white px-6"
        >
          {isTracking ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Tracking...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              {t('delivery.trackButton')}
            </>
          )}
        </Button>
      </div>

      {/* Sample Tracking Numbers */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Try these sample tracking numbers:</p>
        <div className="flex flex-wrap gap-2">
          {["TRK001234567", "TRK001234568", "TRK001234569"].map((sample) => (
            <Button
              key={sample}
              variant="outline"
              size="sm"
              onClick={() => setTrackingNumber(sample)}
              className="text-xs border-agri-neutral-light hover:border-agri-primary hover:text-agri-primary"
            >
              {sample}
            </Button>
          ))}
        </div>
      </div>

      {/* Tracking Result */}
      {trackingResult && (
        <div className="border-t border-agri-neutral-light pt-6">
          {trackingResult.found ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Package className="w-6 h-6 text-green-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 mb-2">Package Found!</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('delivery.orderNumber')}:</span>
                      <span className="font-medium">{trackingResult.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium">{trackingResult.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('delivery.status')}:</span>
                      <Badge className="bg-agri-secondary text-white">
                        {t(`delivery.${trackingResult.status}`)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('delivery.currentLocation')}:</span>
                      <span className="font-medium">{trackingResult.currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('delivery.estimatedDelivery')}:</span>
                      <span className="font-medium">{trackingResult.estimatedDelivery}</span>
                    </div>
                    {trackingResult.driverName && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Driver:</span>
                        <span className="font-medium">{trackingResult.driverName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <Button size="sm" className="bg-agri-primary hover:bg-agri-primary-dark">
                      {t('delivery.viewDetails')}
                    </Button>
                    {trackingResult.driverPhone && (
                      <Button variant="outline" size="sm" className="border-agri-primary text-agri-primary">
                        {t('delivery.contactDriver')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Tracking Number Not Found</h3>
                  <p className="text-sm text-red-700">{trackingResult.message}</p>
                  <p className="text-sm text-red-700 mt-2">
                    Please verify the tracking number or contact our support team for assistance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}