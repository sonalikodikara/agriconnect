import { ArrowLeft, Camera, Upload, Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { useLanguage } from "./LanguageContext";
import type { ProfileData, UserRole } from "./ProfilePage";

interface ProfileSetupProps {
  userRole: UserRole;
  onSave: (data: ProfileData) => void;
  onBack: () => void;
}

export function ProfileSetup({ userRole, onSave, onBack }: ProfileSetupProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    province: '',
    description: '',
    website: '',
    established: '',
    experience: '',
  });

  const [specialization, setSpecialization] = useState<string[]>([]);
  const [certification, setCertification] = useState<string[]>([]);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const districts = [
    'කොළඹ', 'ගම්පහ', 'කළුතර', 'මාතර', 'ගාල්ල', 'හම්බන්තොට',
    'කුරුණැගල', 'පුත්තලම', 'අනුරාධපුර', 'පොළොන්නරුව', 'මාතලේ',
    'කැන්ඩි', 'නුවරඑළිය', 'බදුල්ල', 'මොණරාගල', 'රත්නපුර',
    'කේගල්ල', 'අම්පාර', 'බත්තිකලෝව', 'ත්‍රිකුණාමලය', 'වව්නියාව',
    'මන්නාරම', 'යාපනය', 'කිලිනොච්චි', 'මුලතිව්'
  ];

  const provinces = [
    'බස්නාහිර', 'දකුණ', 'උතුර', 'නැගෙනහිර', 'වයඹ',
    'උතුරු මැද', 'මධ්‍යම', 'ඌව', 'සබරගමුව'
  ];

  const supplierSpecializations = [
    'ධාන්‍ය බීජ', 'එළවළු බීජ', 'පලතුරු සහන', 'කාබනික පොහොර',
    'රසායනික පොහොර', 'කෘමිනාශක', 'ගොවිතැන් මෙවලම්', 'වාරිමාර්ග උපකරණ',
    'ට්‍රැක්ටර්', 'කෘෂි යන්ත්‍රෝපකරණ', 'හරිතාගාර නිෂ්පාදන'
  ];

  const advisorSpecializations = [
    'ධාන්‍ය වගාව', 'එළවළු වගාව', 'පලතුරු වගාව', 'කාබනික ගොවිතැන',
    'වාරිමාර්ග කළමනාකරණය', 'පාංශු කළමනාකරණය', 'කෘමි පාලනය',
    'පශු සම්පත් කළමනාකරණය', 'මුදල් කළමනාකරණය', 'අන්තර් ගොවිතැන',
    'නවීන තාක්ෂණය', 'තිරසාර ගොවිතැන'
  ];

  const certifications = [
    'කාබනික සහතිකය', 'GAP සහතිකය', 'HACCP සහතිකය',
    'ISO 9001', 'ISO 14001', 'කෘෂි විද්‍යා උපාධිය',
    'ගොවිතැන් ඩිප්ලෝමාව', 'පළිබෝධ කළමනාකරණ සහතිකය',
    'බීජ නිෂ්පාදන සහතිකය', 'පශු වෛද්‍ය සහතිකය'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSpecialization = () => {
    if (newSpecialization.trim() && !specialization.includes(newSpecialization.trim())) {
      setSpecialization(prev => [...prev, newSpecialization.trim()]);
      setNewSpecialization('');
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !certification.includes(newCertification.trim())) {
      setCertification(prev => [...prev, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const handleRemoveSpecialization = (item: string) => {
    setSpecialization(prev => prev.filter(spec => spec !== item));
  };

  const handleRemoveCertification = (item: string) => {
    setCertification(prev => prev.filter(cert => cert !== item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profileData: ProfileData = {
      id: `${userRole}_${Date.now()}`,
      role: userRole,
      ...formData,
      specialization,
      certification,
      verified: false,
      rating: 0,
      reviewCount: 0
    };

    onSave(profileData);
  };

  const roleColor = userRole === 'supplier' ? 'agri-primary' : 'agri-secondary';
  const suggestionList = userRole === 'supplier' ? supplierSpecializations : advisorSpecializations;

  return (
    <div className="min-h-screen bg-agri-neutral-light">
      {/* Header */}
      <div className="bg-agri-neutral-white border-b border-agri-neutral-light shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={onBack}
                className={`border-${roleColor} text-${roleColor} hover:bg-${roleColor} hover:text-white`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('profile.backToDashboard')}
              </Button>
              <div>
                <h1 className={`text-2xl font-semibold text-${roleColor}`}>
                  {t('profile.title')} - {t(`profile.${userRole}`)}
                </h1>
                <p className="text-gray-600">{t('profile.businessInfo')}</p>
              </div>
            </div>
            <Badge className={`bg-${roleColor} text-white px-4 py-2`}>
              {t(`profile.${userRole}`)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Images */}
          <Card className="p-6 border-agri-neutral-light">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Picture */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </Label>
                <div className="flex items-center space-x-4">
                  <div className={`w-20 h-20 rounded-full bg-${roleColor}/10 flex items-center justify-center`}>
                    <Camera className={`w-8 h-8 text-${roleColor}`} />
                  </div>
                  <Button type="button" variant="outline" className={`border-${roleColor} text-${roleColor}`}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </Label>
                <div className={`h-20 border-2 border-dashed border-${roleColor}/30 rounded-lg flex items-center justify-center`}>
                  <Button type="button" variant="outline" className={`border-${roleColor} text-${roleColor}`}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Cover
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Business Information */}
          <Card className="p-6 border-agri-neutral-light">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('profile.businessInfo')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.businessName')} *
                </Label>
                <Input
                  required
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.contactPerson')} *
                </Label>
                <Input
                  required
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="Contact person name"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.email')} *
                </Label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.phone')} *
                </Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="+94 XX XXX XXXX"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.district')} *
                </Label>
                <Select onValueChange={(value) => handleInputChange('district', value)}>
                  <SelectTrigger className="border-agri-neutral-light focus:border-agri-primary">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.province')} *
                </Label>
                <Select onValueChange={(value) => handleInputChange('province', value)}>
                  <SelectTrigger className="border-agri-neutral-light focus:border-agri-primary">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.address')} *
              </Label>
              <Textarea
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="border-agri-neutral-light focus:border-agri-primary"
                placeholder="Complete address with postal code"
                rows={3}
              />
            </div>

            <div className="mt-6">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.description')} *
              </Label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="border-agri-neutral-light focus:border-agri-primary"
                placeholder={`Describe your ${userRole} business and services...`}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.website')}
                </Label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="https://your-website.com"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.established')}
                </Label>
                <Input
                  value={formData.established}
                  onChange={(e) => handleInputChange('established', e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="2020"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('profile.experience')} *
                </Label>
                <Input
                  required
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="5+ years"
                />
              </div>
            </div>
          </Card>

          {/* Specialization */}
          <Card className="p-6 border-agri-neutral-light">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('profile.specialization')}</h3>
            
            <div className="mb-4">
              <div className="flex space-x-3">
                <Input
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="Add specialization area"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialization())}
                />
                <Button
                  type="button"
                  onClick={handleAddSpecialization}
                  className={`bg-${roleColor} hover:bg-${roleColor}-dark text-white`}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Add Suggestions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {suggestionList.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!specialization.includes(suggestion)) {
                        setSpecialization(prev => [...prev, suggestion]);
                      }
                    }}
                    className={`text-xs border-${roleColor}/30 hover:border-${roleColor} hover:text-${roleColor}`}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Specializations */}
            {specialization.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Selected specializations:</p>
                <div className="flex flex-wrap gap-2">
                  {specialization.map((spec) => (
                    <Badge
                      key={spec}
                      className={`bg-${roleColor} text-white px-3 py-1 flex items-center space-x-2`}
                    >
                      <span>{spec}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecialization(spec)}
                        className="hover:bg-white/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Certifications */}
          <Card className="p-6 border-agri-neutral-light">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('profile.certification')}</h3>
            
            <div className="mb-4">
              <div className="flex space-x-3">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  className="border-agri-neutral-light focus:border-agri-primary"
                  placeholder="Add certification"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                />
                <Button
                  type="button"
                  onClick={handleAddCertification}
                  className={`bg-${roleColor} hover:bg-${roleColor}-dark text-white`}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Add Certifications */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Common certifications:</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <Button
                    key={cert}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!certification.includes(cert)) {
                        setCertification(prev => [...prev, cert]);
                      }
                    }}
                    className={`text-xs border-${roleColor}/30 hover:border-${roleColor} hover:text-${roleColor}`}
                  >
                    {cert}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Certifications */}
            {certification.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Your certifications:</p>
                <div className="flex flex-wrap gap-2">
                  {certification.map((cert) => (
                    <Badge
                      key={cert}
                      className={`bg-${roleColor} text-white px-3 py-1 flex items-center space-x-2`}
                    >
                      <span>{cert}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(cert)}
                        className="hover:bg-white/20 rounded-full p-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="border-gray-300 text-gray-600"
            >
              {t('profile.cancel')}
            </Button>
            <Button
              type="submit"
              className={`bg-${roleColor} hover:bg-${roleColor}-dark text-white px-8`}
            >
              {t('profile.save')} {t(`profile.${userRole}`)} Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}