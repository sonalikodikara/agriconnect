import { ArrowLeft, User, Store, HelpCircle, Plus, BarChart3, Package, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "./LanguageContext";
import { ProfileSetup } from "./ProfileSetup";
import { ProductServiceManager } from "./ProductServiceManager";
import { ProfileDashboard } from "./ProfileDashboard";

interface ProfilePageProps {
  onBackToDashboard: () => void;
}

export type UserRole = 'supplier' | 'advisor' | null;

export interface ProfileData {
  id: string;
  role: UserRole;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  province: string;
  description: string;
  website?: string;
  established?: string;
  specialization: string[];
  certification: string[];
  experience: string;
  profileImage?: string;
  coverImage?: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
}

export function ProfilePage({ onBackToDashboard }: ProfilePageProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'selectRole' | 'setup' | 'dashboard'>('selectRole');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentStep('setup');
  };

  const handleProfileSave = (data: ProfileData) => {
    setProfileData(data);
    setCurrentStep('dashboard');
  };

  const handleBackToSetup = () => {
    setCurrentStep('setup');
  };

  if (currentStep === 'selectRole') {
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
                  {t('profile.backToDashboard')}
                </Button>
                <div>
                  <h1 className="text-2xl font-semibold text-agri-primary">{t('profile.title')}</h1>
                  <p className="text-gray-600">{t('profile.subtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              {t('profile.selectRole')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your role to customize your AgriConnect experience. You can always change this later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Supplier Card */}
            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 hover:border-agri-primary group"
              onClick={() => handleRoleSelect('supplier')}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-agri-primary/10 rounded-full flex items-center justify-center group-hover:bg-agri-primary group-hover:text-white transition-colors duration-300">
                  <Store className="w-10 h-10 text-agri-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t('profile.supplier')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('profile.supplierDesc')}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Package className="w-4 h-4 text-agri-primary" />
                    <span>Manage product inventory</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-agri-primary" />
                    <span>Track sales analytics</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-agri-primary" />
                    <span>Build customer reviews</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Advisor Card */}
            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 hover:border-agri-secondary group"
              onClick={() => handleRoleSelect('advisor')}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-agri-secondary/10 rounded-full flex items-center justify-center group-hover:bg-agri-secondary group-hover:text-white transition-colors duration-300">
                  <HelpCircle className="w-10 h-10 text-agri-secondary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t('profile.advisor')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('profile.advisorDesc')}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <User className="w-4 h-4 text-agri-secondary" />
                    <span>Offer consultation services</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-agri-secondary" />
                    <span>Share expertise & knowledge</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-agri-secondary" />
                    <span>Build professional reputation</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'setup') {
    return (
      <ProfileSetup
        userRole={userRole!}
        onSave={handleProfileSave}
        onBack={onBackToDashboard}
      />
    );
  }

  if (currentStep === 'dashboard' && profileData) {
    return (
      <ProfileDashboard
        profileData={profileData}
        onBackToDashboard={onBackToDashboard}
        onEditProfile={handleBackToSetup}
      />
    );
  }

  return null;
}