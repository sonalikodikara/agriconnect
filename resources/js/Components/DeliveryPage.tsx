import { ArrowLeft, Package, Truck, MapPin, Phone, Clock, User, Car, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useLanguage } from "./LanguageContext";
import { ManualTracker } from "./ManualTracker";
import { DeliveryCard } from "./DeliveryCard";

interface DeliveryPageProps {
  onBackToDashboard: () => void;
}

export interface DeliveryItem {
  id: string;
  orderNumber: string;
  trackingId: string;
  productName: string;
  productImage: string;
  status: 'orderPlaced' | 'processing' | 'shipped' | 'outForDelivery' | 'delivered' | 'cancelled';
  currentLocation: string;
  estimatedDelivery: string;
  estimatedTime: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  specialInstructions?: string;
  progressPercentage: number;
  timeline: {
    status: string;
    location: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export function DeliveryPage({ onBackToDashboard }: DeliveryPageProps) {
  const { t } = useLanguage();

  // Mock delivery data
  const activeDeliveries: DeliveryItem[] = [
    {
      id: "1",
      orderNumber: "AGR-2025-001",
      trackingId: "TRK001234567",
      productName: "වගා තිරිඟු බීජ - HD-2967",
      productImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop",
      status: "outForDelivery",
      currentLocation: "කොළඹ - නුගේගොඩ",
      estimatedDelivery: "අද",
      estimatedTime: "සවස 3:00 - 5:00",
      driverName: "සුනිල් පේරේරා",
      driverPhone: "+94 77 123 4567",
      vehicleNumber: "CAB-1234",
      specialInstructions: "දොර ළඟට ගෙන එන්න",
      progressPercentage: 85,
      timeline: [
        { status: t('delivery.orderPlaced'), location: "කොළඹ", timestamp: "2025-01-29 09:00", completed: true },
        { status: t('delivery.processing'), location: "කොළඹ", timestamp: "2025-01-29 10:30", completed: true },
        { status: t('delivery.shipped'), location: "කොළඹ", timestamp: "2025-01-29 14:00", completed: true },
        { status: t('delivery.outForDelivery'), location: "නුගේගොඩ", timestamp: "2025-01-30 08:00", completed: true },
        { status: t('delivery.delivered'), location: "නුගේගොඩ", timestamp: "අපේක්ෂිත", completed: false }
      ]
    },
    {
      id: "2",
      orderNumber: "AGR-2025-002",
      trackingId: "TRK001234568",
      productName: "කාබනික NPK පොහොර 10-26-26",
      productImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop",
      status: "shipped",
      currentLocation: "ගම්පහ - කිරිබත්ගොඩ",
      estimatedDelivery: "හෙට",
      estimatedTime: "උදේ 9:00 - 12:00",
      progressPercentage: 60,
      timeline: [
        { status: t('delivery.orderPlaced'), location: "කොළඹ", timestamp: "2025-01-28 15:00", completed: true },
        { status: t('delivery.processing'), location: "කොළඹ", timestamp: "2025-01-29 09:00", completed: true },
        { status: t('delivery.shipped'), location: "ගම්පහ", timestamp: "2025-01-30 07:00", completed: true },
        { status: t('delivery.outForDelivery'), location: "කිරිබත්ගොඩ", timestamp: "අපේක්ෂිත", completed: false },
        { status: t('delivery.delivered'), location: "කිරිබත්ගොඩ", timestamp: "අපේක්ෂිත", completed: false }
      ]
    },
    {
      id: "3",
      orderNumber: "AGR-2025-003",
      trackingId: "TRK001234569",
      productName: "බහු-භෝග කුඩු යන්ත්‍රය",
      productImage: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=100&h=100&fit=crop",
      status: "processing",
      currentLocation: "කොළඹ - ගම්පහ",
      estimatedDelivery: "5 දින",
      estimatedTime: "උදේ 8:00 - සවස 6:00",
      progressPercentage: 25,
      timeline: [
        { status: t('delivery.orderPlaced'), location: "කොළඹ", timestamp: "2025-01-27 11:00", completed: true },
        { status: t('delivery.processing'), location: "කොළඹ", timestamp: "2025-01-30 09:00", completed: true },
        { status: t('delivery.shipped'), location: "කොළඹ", timestamp: "අපේක්ෂිත", completed: false },
        { status: t('delivery.outForDelivery'), location: "ගම්පහ", timestamp: "අපේක්ෂිත", completed: false },
        { status: t('delivery.delivered'), location: "ගම්පහ", timestamp: "අපේක්ෂිත", completed: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-agri-neutral-light">
      {/* Header */}
      <div className="bg-agri-neutral-white border-b border-agri-neutral-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={onBackToDashboard}
                className="border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('delivery.backToDashboard')}
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-agri-primary">{t('delivery.title')}</h1>
                <p className="text-gray-600">{t('delivery.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-agri-primary/10 px-4 py-2 rounded-lg">
              <Package className="w-5 h-5 text-agri-primary" />
              <span className="text-agri-primary font-medium">
                {activeDeliveries.length} {t('delivery.activeDeliveries')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Manual Tracking */}
            <ManualTracker />

            {/* Active Deliveries */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {t('delivery.activeDeliveries')} ({activeDeliveries.length})
              </h2>
              <div className="space-y-6">
                {activeDeliveries.map((delivery) => (
                  <DeliveryCard key={delivery.id} delivery={delivery} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6 border-agri-neutral-light">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-agri-primary" />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  <span className="font-medium text-agri-primary">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Delivered</span>
                  </div>
                  <span className="font-medium text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-agri-secondary" />
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <span className="font-medium text-agri-secondary">1</span>
                </div>
              </div>
            </Card>

            {/* Support Card */}
            <Card className="p-6 border-agri-neutral-light bg-gradient-to-br from-agri-primary/5 to-agri-secondary/5">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-agri-primary mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our support team for delivery assistance
                </p>
                <Button className="w-full bg-agri-primary hover:bg-agri-primary-dark">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </Card>

            {/* Delivery Tips */}
            <Card className="p-6 border-agri-neutral-light">
              <h3 className="font-semibold text-gray-900 mb-4">Delivery Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-agri-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Keep your phone available for delivery updates</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-agri-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Ensure someone is available at the delivery address</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-agri-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Check products upon delivery for any damage</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-agri-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Rate your delivery experience to help us improve</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}