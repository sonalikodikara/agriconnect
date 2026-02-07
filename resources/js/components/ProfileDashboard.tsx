import { ArrowLeft, Edit, Package, Star, BarChart3, Plus, Eye, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";
import { ProductServiceManager } from "./ProductServiceManager";
import type { ProfileData } from "./ProfilePage";

interface ProfileDashboardProps {
  profileData: ProfileData;
  onBackToDashboard: () => void;
  onEditProfile: () => void;
}

export function ProfileDashboard({ profileData, onBackToDashboard, onEditProfile }: ProfileDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const roleColor = profileData.role === 'supplier' ? 'agri-primary' : 'agri-secondary';

  // Mock statistics
  const stats = {
    totalProducts: profileData.role === 'supplier' ? 24 : 0,
    totalServices: profileData.role === 'advisor' ? 8 : 3,
    totalOrders: 156,
    rating: 4.7,
    reviews: 89,
    activeListings: profileData.role === 'supplier' ? 21 : 8
  };

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
                className={`border-${roleColor} text-${roleColor} hover:bg-${roleColor} hover:text-white`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('profile.backToDashboard')}
              </Button>
              <div>
                <h1 className={`text-2xl font-semibold text-${roleColor}`}>
                  {profileData.businessName}
                </h1>
                <p className="text-gray-600">{t(`profile.${profileData.role}`)} Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={`bg-${roleColor} text-white px-4 py-2`}>
                {t(`profile.${profileData.role}`)}
              </Badge>
              <Button
                onClick={onEditProfile}
                variant="outline"
                className={`border-${roleColor} text-${roleColor} hover:bg-${roleColor} hover:text-white`}
              >
                <Edit className="w-4 h-4 mr-2" />
                {t('profile.edit')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="p-6 border-agri-neutral-light">
              <div className="text-center">
                {/* Profile Image */}
                <div className={`w-24 h-24 rounded-full bg-${roleColor}/10 flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-2xl font-bold text-${roleColor}`}>
                    {profileData.businessName.charAt(0)}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{profileData.businessName}</h3>
                <p className="text-sm text-gray-600 mb-3">{profileData.contactPerson}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(stats.rating)
                            ? 'text-agri-secondary fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {stats.rating} ({stats.reviews})
                  </span>
                </div>

                {/* Badges */}
                <div className="space-y-2">
                  {profileData.verified && (
                    <Badge className="bg-green-100 text-green-800 w-full">
                      ✓ Verified Business
                    </Badge>
                  )}
                  <Badge className={`bg-${roleColor}/10 text-${roleColor} w-full`}>
                    {profileData.experience} Experience
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 border-agri-neutral-light">
              <h4 className="font-semibold text-gray-900 mb-4">{t('profile.statistics')}</h4>
              <div className="space-y-4">
                {profileData.role === 'supplier' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className={`w-4 h-4 text-${roleColor}`} />
                      <span className="text-sm text-gray-600">{t('profile.totalProducts')}</span>
                    </div>
                    <span className={`font-medium text-${roleColor}`}>{stats.totalProducts}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className={`w-4 h-4 text-${roleColor}`} />
                    <span className="text-sm text-gray-600">{t('profile.totalServices')}</span>
                  </div>
                  <span className={`font-medium text-${roleColor}`}>{stats.totalServices}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className={`w-4 h-4 text-${roleColor}`} />
                    <span className="text-sm text-gray-600">{t('profile.totalOrders')}</span>
                  </div>
                  <span className={`font-medium text-${roleColor}`}>{stats.totalOrders}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className={`w-4 h-4 text-${roleColor}`} />
                    <span className="text-sm text-gray-600">Active Listings</span>
                  </div>
                  <span className={`font-medium text-${roleColor}`}>{stats.activeListings}</span>
                </div>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6 border-agri-neutral-light">
              <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{profileData.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium">{profileData.phone}</p>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-medium">{profileData.district}, {profileData.province}</p>
                </div>
                {profileData.website && (
                  <div>
                    <span className="text-gray-600">Website:</span>
                    <p className="font-medium text-blue-600">{profileData.website}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-agri-neutral-light">
                <TabsTrigger value="overview" className="data-[state=active]:bg-agri-neutral-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="products" className="data-[state=active]:bg-agri-neutral-white">
                  {profileData.role === 'supplier' ? t('profile.myProducts') : t('profile.myServices')}
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-agri-neutral-white">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-agri-neutral-white">
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Business Description */}
                <Card className="p-6 border-agri-neutral-light">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About {profileData.businessName}</h3>
                  <p className="text-gray-600 mb-6">{profileData.description}</p>
                  
                  {/* Specializations */}
                  {profileData.specialization.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">{t('profile.specialization')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.specialization.map((spec) => (
                          <Badge key={spec} className={`bg-${roleColor}/10 text-${roleColor}`}>
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {profileData.certification.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">{t('profile.certification')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.certification.map((cert) => (
                          <Badge key={cert} className="bg-green-100 text-green-800">
                            ✓ {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>

                {/* Recent Activity */}
                <Card className="p-6 border-agri-neutral-light">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.recentActivity')}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className={`w-2 h-2 rounded-full bg-${roleColor}`}></div>
                      <span className="text-gray-600">Added new product: "කාබනික තක්කාලි බීජ"</span>
                      <span className="text-gray-400 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Received 5-star review from customer</span>
                      <span className="text-gray-400 ml-auto">1 day ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className={`w-2 h-2 rounded-full bg-${roleColor}`}></div>
                      <span className="text-gray-600">Updated inventory for 3 products</span>
                      <span className="text-gray-400 ml-auto">3 days ago</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Products/Services Tab */}
              <TabsContent value="products">
                <ProductServiceManager 
                  userRole={profileData.role!}
                  profileData={profileData}
                />
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <Card className="p-6 border-agri-neutral-light">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.orderHistory')}</h3>
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Order management coming soon...</p>
                  </div>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <Card className="p-6 border-agri-neutral-light">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Analytics</h3>
                  <div className="text-center py-12 text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Analytics dashboard coming soon...</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}