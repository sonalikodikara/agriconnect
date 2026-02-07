import { Plus, Edit, Trash2, Package, Eye, Upload, Camera, X, FileText, Award } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./LanguageContext";
import type { UserRole, ProfileData } from "./ProfilePage";

interface Ingredient {
  name: string;
  percentage: number;
}

interface NutritionalInfo {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
  ph: number;
  micronutrients: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  quality: string;
  images: string[];
  availability: 'inStock' | 'outOfStock' | 'lowStock';
  harvestDate?: string;
  expiryDate?: string;
  storageConditions?: string;
  minimumOrder: number;
  deliveryOptions: string[];
  created: string;
  // Enhanced fields
  brandName?: string;
  manufacturerInfo?: string;
  batchNumber?: string;
  manufactureDate?: string;
  registrationNumber?: string;
  safetyInstructions?: string;
  ingredients: Ingredient[];
  nutritionalInfo: NutritionalInfo;
  applicationRate?: string;
  applicationMethod?: string;
  soilType?: string;
  cropSuitability: string[];
  packagingSize?: string;
  certificates: string[];
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  deliveryMethod: string;
  availability: string;
  images: string[];
  created: string;
}

interface ProductServiceManagerProps {
  userRole: UserRole;
  profileData: ProfileData;
}

export function ProductServiceManager({ userRole, profileData }: ProductServiceManagerProps) {
  const { t } = useLanguage();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | Service | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    ingredients: [],
    nutritionalInfo: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      organicMatter: 0,
      moisture: 0,
      ph: 7,
      micronutrients: []
    },
    cropSuitability: [],
    certificates: []
  });

  // Mock data with enhanced products
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "කාබනික NPK පොහොර 10-26-26",
      category: "fertilizers",
      description: "සියලුම භෝග සඳහා සම්පූර්ණ පෝෂණය ලබා දෙන කාබනික NPK පොහොර. මූල වර්ධනය වැඩි දියුණු කර පාංශු සෞඛ්‍යය වැඩි දියුණු කරයි.",
      price: 1800,
      quantity: 500,
      unit: "කිලෝග්‍රෑම්",
      quality: "organic",
      images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop"],
      availability: "inStock",
      storageConditions: "වියළි, හුලං කළ ස්ථානයක",
      minimumOrder: 25,
      deliveryOptions: ["freeDelivery", "selfPickup"],
      created: "2025-01-20",
      brandName: "GreenGrow Organic",
      manufacturerInfo: "සුරිය කෘෂි සමාගම",
      batchNumber: "NPK-2025-001",
      manufactureDate: "2025-01-15",
      registrationNumber: "REG-NPK-001",
      safetyInstructions: "දරුවන්ගෙන් away ලෙස තබන්න. වියළි ස්ථානයක ගබඩා කරන්න.",
      ingredients: [
        { name: "නයිට්‍රජන්", percentage: 10 },
        { name: "පොස්පරස්", percentage: 26 },
        { name: "පොටෑසියම්", percentage: 26 },
        { name: "කාබනික ද්‍රව්‍ය", percentage: 15 },
        { name: "අනෙකුත්", percentage: 23 }
      ],
      nutritionalInfo: {
        nitrogen: 10,
        phosphorus: 26,
        potassium: 26,
        organicMatter: 15,
        moisture: 8,
        ph: 6.8,
        micronutrients: ["සීන්", "තඹ", "බෝරෝන්", "මැංගනීස්"]
      },
      applicationRate: "අක්කර 25kg",
      applicationMethod: "පස මිශ්‍ර කිරීම",
      soilType: "සියලුම පස් වර්ග",
      cropSuitability: ["සහල්", "එළවළු", "පලතුරු", "කුකුල්මස්"],
      packagingSize: "25kg, 50kg",
      certificates: ["කාබනික සහතිකය", "ගුණාත්මක සහතිකය"]
    },
    {
      id: "2",
      name: "දෙමුහුන් තක්කාලි බීජ - ආර්ක රක්ෂක්",
      category: "vegetables",
      description: "ඉහළ අස්වැන්න ලබා ගැනීමේ හැකියාව සහිත රෝග ප්‍රතිරෝධී දෙමුහුන් තක්කාලි ප්‍රභේදය",
      price: 450,
      quantity: 200,
      unit: "ග්‍රෑම්",
      quality: "hybrid",
      images: ["https://images.unsplash.com/photo-1592841200221-4e2f8a2dc785?w=400&h=400&fit=crop"],
      availability: "inStock",
      harvestDate: "2025-01-10",
      expiryDate: "2026-01-10",
      storageConditions: "සිසිල්, වියළි ස්ථානයක",
      minimumOrder: 10,
      deliveryOptions: ["freeDelivery", "selfPickup"],
      created: "2025-01-18",
      brandName: "Lanka Seeds",
      manufacturerInfo: "ජාතික බීජ සංස්ථාව",
      batchNumber: "ARS-2025-002",
      manufactureDate: "2025-01-05",
      registrationNumber: "REG-VEG-002",
      ingredients: [],
      nutritionalInfo: {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        organicMatter: 0,
        moisture: 8,
        ph: 6.5,
        micronutrients: []
      },
      cropSuitability: ["හරිතාගාර", "විවෘත ක්ෂේත්‍රය"],
      packagingSize: "10g, 25g, 100g",
      certificates: ["බීජ සහතිකය", "ගුණාත්මක සහතිකය"]
    }
  ];

  const mockServices: Service[] = [
    {
      id: "1",
      name: "ගොවිපල සැලසුම් කිරීම",
      category: "planning",
      description: "ඔබගේ ගොවිපල සඳහා විද්‍යාත්මක සැලසුම් සහ නිර්දේශ",
      price: 5000,
      duration: "2-3 දින",
      deliveryMethod: "on-site",
      availability: "ලබා ගත හැක",
      images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop"],
      created: "2025-01-15"
    }
  ];

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [services, setServices] = useState<Service[]>(mockServices);

  const roleColor = userRole === 'supplier' ? 'agri-primary' : 'agri-secondary';
  const isSupplier = userRole === 'supplier';

  const categories = isSupplier ? [
    { value: 'seeds', label: 'බීජ' },
    { value: 'vegetables', label: 'එළවළු' },
    { value: 'fruits', label: 'පලතුරු' },
    { value: 'fertilizers', label: 'පොහොර' },
    { value: 'pesticides', label: 'කෘමිනාශක' },
    { value: 'tools', label: 'මෙවලම්' },
    { value: 'machinery', label: 'යන්ත්‍රෝපකරණ' }
  ] : [
    { value: 'planning', label: 'සැලසුම් කිරීම' },
    { value: 'testing', label: 'පරීක්ෂණ' },
    { value: 'consultation', label: 'උපදේශන' },
    { value: 'training', label: 'පුහුණුව' },
    { value: 'pest-control', label: 'පළිබෝධ පාලනය' },
    { value: 'soil-management', label: 'පාංශු කළමනාකරණය' }
  ];

  const qualityGrades = [
    { value: 'organic', label: t('profile.organic') },
    { value: 'premium', label: t('profile.premium') },
    { value: 'standard', label: t('profile.standard') },
    { value: 'conventional', label: t('profile.conventional') },
    { value: 'hybrid', label: 'දෙමුහුන්' }
  ];

  const units = [
    'ග්‍රෑම්', 'කිලෝග්‍රෑම්', 'ලීටර්', 'මිලි ලීටර්', 
    'ඒකක', 'පැකේජ්', 'බෝර්ඩ්', 'බඟ'
  ];

  const soilTypes = [
    'සියලුම පස් වර්ග', 'මඩ පස', 'වැලි පස', 'හුණුගල් පස', 'කාබනික පස'
  ];

  const micronutrients = [
    'සීන්', 'තඹ', 'බෝරෝන්', 'මැංගනීස්', 'මොලිබ්ඩනම්', 'කොබෝල්ට්'
  ];

  const cropOptions = [
    'සහල්', 'එළවළු', 'පලතුරු', 'කුකුල්මස්', 'ශර්කරා', 'තේ', 'හරිතාගාර වගාව'
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'inStock':
        return 'bg-green-100 text-green-800';
      case 'lowStock':
        return 'bg-yellow-100 text-yellow-800';
      case 'outOfStock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddIngredient = () => {
    const newIngredient = { name: '', percentage: 0 };
    setFormData(prev => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), newIngredient]
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients?.filter((_, i) => i !== index) || []
    }));
  };

  const handleIngredientChange = (index: number, field: 'name' | 'percentage', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients?.map((ing, i) => 
        i === index ? { ...ing, [field]: value } : ing
      ) || []
    }));
  };

  const EnhancedProductDialog = () => (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogTrigger asChild>
        <Button className={`bg-${roleColor} hover:bg-${roleColor}-dark text-white`}>
          <Plus className="w-4 h-4 mr-2" />
          {isSupplier ? t('profile.addProduct') : t('profile.addService')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isSupplier ? t('profile.addProduct') : t('profile.addService')}
          </DialogTitle>
        </DialogHeader>
        
        {isSupplier ? (
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="nutritional">Nutritional Info</TabsTrigger>
              <TabsTrigger value="images">Images & Docs</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.productName')} *
                  </Label>
                  <Input
                    placeholder="Enter product name"
                    className="border-agri-neutral-light focus:border-agri-primary"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.brandName')}
                  </Label>
                  <Input
                    placeholder="Brand name"
                    className="border-agri-neutral-light focus:border-agri-primary"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.category')} *
                  </Label>
                  <Select>
                    <SelectTrigger className="border-agri-neutral-light focus:border-agri-primary">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.qualityGrade')} *
                  </Label>
                  <Select>
                    <SelectTrigger className="border-agri-neutral-light focus:border-agri-primary">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualityGrades.map((quality) => (
                        <SelectItem key={quality.value} value={quality.value}>
                          {quality.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.price')} (LKR) *
                  </Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="border-agri-neutral-light focus:border-agri-primary"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.quantity')} *
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-agri-neutral-light focus:border-agri-primary flex-1"
                    />
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.description')} *
                </Label>
                <Textarea
                  placeholder="Describe your product..."
                  className="border-agri-neutral-light focus:border-agri-primary"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.minimumOrder')}
                  </Label>
                  <Input
                    type="number"
                    placeholder="1"
                    className="border-agri-neutral-light focus:border-agri-primary"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.packagingSize')}
                  </Label>
                  <Input
                    placeholder="e.g., 25kg, 50kg"
                    className="border-agri-neutral-light focus:border-agri-primary"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Nutritional Information Tab */}
            <TabsContent value="nutritional" className="space-y-6">
              {/* NPK Levels */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{t('profile.npkRatio')}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.nitrogen')} (%)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.phosphorus')} (%)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.potassium')} (%)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                </div>
              </Card>

              {/* Other Nutritional Values */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Other Nutritional Values</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.organicMatter')} (%)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.moisture')} (%)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.ph')}
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="7.0"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                </div>
              </Card>

              {/* Ingredients Section */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{t('profile.ingredients')}</h4>
                  <Button
                    type="button"
                    onClick={handleAddIngredient}
                    className={`bg-${roleColor} hover:bg-${roleColor}-dark text-white`}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {t('profile.addIngredient')}
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {formData.ingredients?.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Input
                        placeholder={t('profile.ingredientName')}
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className="flex-1 border-agri-neutral-light focus:border-agri-primary"
                      />
                      <Input
                        type="number"
                        placeholder="0"
                        value={ingredient.percentage}
                        onChange={(e) => handleIngredientChange(index, 'percentage', Number(e.target.value))}
                        className="w-24 border-agri-neutral-light focus:border-agri-primary"
                      />
                      <span className="text-sm text-gray-600">%</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveIngredient(index)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Micronutrients */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{t('profile.micronutrients')}</h4>
                <div className="flex flex-wrap gap-2">
                  {micronutrients.map((nutrient) => (
                    <Button
                      key={nutrient}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={`text-xs border-${roleColor}/30 hover:border-${roleColor} hover:text-${roleColor}`}
                    >
                      {nutrient}
                    </Button>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Images & Documents Tab */}
            <TabsContent value="images" className="space-y-6">
              {/* Product Images */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{t('profile.productImages')}</h4>
                
                {/* Primary Image */}
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.primaryImage')} *
                  </Label>
                  <div className="border-2 border-dashed border-agri-neutral-light rounded-lg p-6">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <Button type="button" variant="outline" className={`border-${roleColor} text-${roleColor}`}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Primary Image
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        JPG, PNG (max 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Images */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.additionalImages')} (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-agri-neutral-light rounded-lg p-6">
                    <div className="text-center">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <Button type="button" variant="outline" className={`border-${roleColor} text-${roleColor}`}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Additional Images
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Upload up to 4 additional images
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Certificates & Documents */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{t('profile.productCertificates')}</h4>
                
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.qualityCertificate')}
                    </Label>
                    <div className="border-2 border-dashed border-agri-neutral-light rounded-lg p-4">
                      <div className="flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-400 mr-2" />
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Certificate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.testReports')}
                    </Label>
                    <div className="border-2 border-dashed border-agri-neutral-light rounded-lg p-4">
                      <div className="flex items-center justify-center">
                        <Award className="w-8 h-8 text-gray-400 mr-2" />
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Test Reports
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6">
              {/* Application Information */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Application Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.applicationRate')}
                    </Label>
                    <Input
                      placeholder="e.g., 25kg per acre"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.applicationMethod')}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="broadcast">විකිර්ණය</SelectItem>
                        <SelectItem value="soil-mix">පස මිශ්‍ර කිරීම</SelectItem>
                        <SelectItem value="foliar">කොළ මත ඉසීම</SelectItem>
                        <SelectItem value="drip">බිංදු ජලයට</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Suitability Information */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Suitability Information</h4>
                
                <div className="mb-6">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.soilType')}
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil} value={soil}>
                          {soil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.cropSuitability')}
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cropOptions.map((crop) => (
                      <Button
                        key={crop}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={`text-xs border-${roleColor}/30 hover:border-${roleColor} hover:text-${roleColor}`}
                      >
                        {crop}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Safety & Storage */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Safety & Storage</h4>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.storageConditions')}
                    </Label>
                    <Textarea
                      placeholder="Storage instructions..."
                      className="border-agri-neutral-light focus:border-agri-primary"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.safetyInstructions')}
                    </Label>
                    <Textarea
                      placeholder="Safety precautions and instructions..."
                      className="border-agri-neutral-light focus:border-agri-primary"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              {/* Manufacturing Details */}
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Manufacturing Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.manufacturerInfo')}
                    </Label>
                    <Input
                      placeholder="Manufacturer name"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.batchNumber')}
                    </Label>
                    <Input
                      placeholder="Batch number"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.manufactureDate')}
                    </Label>
                    <Input
                      type="date"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('profile.registrationNumber')}
                    </Label>
                    <Input
                      placeholder="Registration number"
                      className="border-agri-neutral-light focus:border-agri-primary"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Service form for advisors
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.serviceName')} *
                </Label>
                <Input
                  placeholder="Enter service name"
                  className="border-agri-neutral-light focus:border-agri-primary"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.category')} *
                </Label>
                <Select>
                  <SelectTrigger className="border-agri-neutral-light focus:border-agri-primary">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Add more service-specific fields here */}
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAddDialog(false)}
          >
            {t('profile.cancel')}
          </Button>
          <Button
            type="submit"
            className={`bg-${roleColor} hover:bg-${roleColor}-dark text-white`}
            onClick={() => setShowAddDialog(false)}
          >
            {isSupplier ? 'Add Product' : 'Add Service'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const currentItems = isSupplier ? products : services;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isSupplier ? t('profile.productListings') : t('profile.myServices')}
          </h3>
          <p className="text-gray-600">
            {currentItems.length} {isSupplier ? 'products' : 'services'} • 
            {isSupplier ? products.filter(p => p.availability === 'inStock').length : services.length} active
          </p>
        </div>
        <EnhancedProductDialog />
      </div>

      {/* Enhanced Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentItems.map((item) => (
          <Card key={item.id} className="overflow-hidden border-agri-neutral-light hover:shadow-lg transition-shadow duration-300">
            <div className="flex">
              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0 relative">
                <ImageWithFallback
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getAvailabilityColor(
                    isSupplier ? (item as Product).availability : 'inStock'
                  )}>
                    {isSupplier ? t(`profile.${(item as Product).availability}`) : 'Available'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                    {item.name}
                  </h4>
                  <div className="flex space-x-1 ml-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-${roleColor} text-${roleColor} hover:bg-${roleColor} hover:text-white p-1 h-7 w-7`}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-${roleColor} text-${roleColor} hover:bg-${roleColor} hover:text-white p-1 h-7 w-7`}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Enhanced Product Info */}
                {isSupplier && (
                  <div className="space-y-2 mb-3">
                    {/* NPK Info for fertilizers */}
                    {(item as Product).category === 'fertilizers' && (item as Product).nutritionalInfo && (
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-xs text-green-800 font-medium">
                          NPK: {(item as Product).nutritionalInfo.nitrogen}-{(item as Product).nutritionalInfo.phosphorus}-{(item as Product).nutritionalInfo.potassium}
                        </div>
                        {(item as Product).nutritionalInfo.organicMatter > 0 && (
                          <div className="text-xs text-green-600">
                            Organic Matter: {(item as Product).nutritionalInfo.organicMatter}%
                          </div>
                        )}
                      </div>
                    )}

                    {/* Ingredients */}
                    {(item as Product).ingredients && (item as Product).ingredients.length > 0 && (
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Ingredients: </span>
                        {(item as Product).ingredients.slice(0, 3).map(ing => ing.name).join(', ')}
                        {(item as Product).ingredients.length > 3 && '...'}
                      </div>
                    )}

                    {/* Certificates */}
                    {(item as Product).certificates && (item as Product).certificates.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {(item as Product).certificates.slice(0, 2).map((cert, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                            ✓ {cert}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Price and Quantity */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-agri-primary">
                      LKR {item.price.toLocaleString()}
                    </span>
                    {isSupplier && (
                      <div className="text-xs text-gray-600">
                        {(item as Product).quantity} {(item as Product).unit} available
                      </div>
                    )}
                  </div>
                  {isSupplier && (
                    <Badge className={`bg-${roleColor}/10 text-${roleColor} text-xs`}>
                      {t(`profile.${(item as Product).quality}`)}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {currentItems.length === 0 && (
        <Card className="p-12 text-center border-agri-neutral-light">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {isSupplier ? 'products' : 'services'} yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by adding your first {isSupplier ? 'product' : 'service'} to attract customers.
          </p>
          <EnhancedProductDialog />
        </Card>
      )}
    </div>
  );
}