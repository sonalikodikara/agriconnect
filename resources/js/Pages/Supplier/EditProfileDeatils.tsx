import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { FaHome, FaUserCircle, FaSignOutAlt, FaTimes, FaPlus, FaCamera } from 'react-icons/fa';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  supplier: any;
  districts: { key: string; label: string }[];
  provinces: { key: string; label: string }[];
  auth: { user: { name: string } };
}

export default function EditProfileDetails({ supplier, districts, provinces, auth }: Props) {
  const { t } = useTranslation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { data, setData, put, processing, errors } = useForm({
    business_name: supplier?.business_name || '',
    contact_person: supplier?.contact_person || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
    district: supplier?.district || '',
    province: supplier?.province || '',
    address: supplier?.address || '',
    description: supplier?.description || '',
    website: supplier?.website || '',
    established: supplier?.established || '',
    experience: supplier?.experience || '',
    specialization: Array.isArray(supplier?.specialization) ? supplier.specialization : [],
    certifications: Array.isArray(supplier?.certifications) ? supplier.certifications : [],
    profile_image: null as File | null,
    cover_image: null as File | null,
  });

  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const [profilePreview, setProfilePreview] = useState<string | null>(
    supplier?.profile_image_url || null
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    supplier?.cover_image_url || null
  );

  // Flash message
  const { flash } = usePage().props as { flash?: { status_key?: string } };
  const successMessage = flash?.status_key ? t(flash.status_key) : null;

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('profile_image', file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('cover_image', file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleAddSpecialization = () => {
    if (newSpecialization.trim()) {
      setData('specialization', [...data.specialization, newSpecialization.trim()]);
      setNewSpecialization('');
    }
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setData('certifications', [...data.certifications, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all fields
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === '') return;

      if (key === 'profile_image' || key === 'cover_image') {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, String(value));
      }
    });

    put(route('suppliers.update', supplier.id), {
      data: formData,
      forceFormData: true,
      preserveScroll: true,
    });
  };

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <>
      <Head title={t("Edit Supplier Profile")} />

      {/* Navbar */}
      <nav className="bg-white shadow border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.visit('/')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <FaHome />
              {t("Home")}
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-green-800">
              {t("Edit Supplier Profile")}
            </h1>

            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg"
              >
                <FaUserCircle size={28} className="text-green-700" />
                <span className="hidden md:inline">{auth.user.name}</span>
                <ChevronDown size={18} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border z-50">
                  <button
                    onClick={() => router.visit(route('suppliers.profile.show'))}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <FaUserCircle />
                    {t("View Profile")}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-700 flex items-center gap-3"
                  >
                    <FaSignOutAlt />
                    {t("Logout")}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-6 space-y-4">
            <button
              onClick={() => {
                router.visit(route('suppliers.profile.show'));
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg"
            >
              {t("View Profile")}
            </button>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-3 px-4 text-red-700 hover:bg-red-50 rounded-lg"
            >
              {t("Logout")}
            </button>
          </div>
        )}
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {successMessage && (
          <div className="mb-8 p-4 bg-green-100 border-l-4 border-green-600 rounded-lg text-green-800">
            {successMessage}
          </div>
        )}

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">
          <h1 className="text-3xl font-bold text-green-800 mb-10 text-center">
            {t("Edit Your Business Profile")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Profile Image */}
              <div className="text-center">
                <label className="block text-xl font-semibold mb-4">{t("Profile Picture")}</label>
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-green-400 shadow-lg">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaCamera size={40} className="text-gray-500" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="text-center">
                <label className="block text-xl font-semibold mb-4">{t("Cover Photo")}</label>
                <div className="relative w-full h-56 rounded-xl overflow-hidden border-4 border-green-400 shadow-lg">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaCamera size={50} className="text-gray-500" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">{t("Business Name")}</label>
                  <input
                    type="text"
                    value={data.business_name}
                    onChange={e => setData('business_name', e.target.value)}
                    className={`w-full p-3 border rounded-lg ${errors.business_name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.business_name && <p className="text-red-600 text-sm mt-1">{errors.business_name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("Contact Person")}</label>
                  <input
                    type="text"
                    value={data.contact_person}
                    onChange={e => setData('contact_person', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("Email")}</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("Phone")}</label>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("District")}</label>
                  <select
                    value={data.district}
                    onChange={e => setData('district', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">{t("Select District")}</option>
                    {districts.map(d => (
                      <option key={d.key} value={d.key}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("Province")}</label>
                  <select
                    value={data.province}
                    onChange={e => setData('province', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">{t("Select Province")}</option>
                    {provinces.map(p => (
                      <option key={p.key} value={p.key}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("Address")}</label>
                <textarea
                  value={data.address}
                  onChange={e => setData('address', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg h-28"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t("Description")}</label>
                <textarea
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg h-36"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">{t("Website")}</label>
                  <input
                    type="url"
                    value={data.website}
                    onChange={e => setData('website', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("Established Year")}</label>
                  <input
                    type="number"
                    value={data.established}
                    onChange={e => setData('established', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="YYYY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("Experience (years)")}</label>
                  <input
                    type="number"
                    value={data.experience}
                    onChange={e => setData('experience', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-lg font-semibold mb-3">{t("Specializations")}</label>
              <div className="flex flex-wrap gap-3 mb-4">
                {data.specialization.map((spec: string, i: number) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    {spec}
                    <button
                      type="button"
                      onClick={() => setData('specialization', data.specialization.filter((_: any, idx: number) => idx !== i))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={e => setNewSpecialization(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialization())}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                  placeholder={t("Add specialization...")}
                />
                <button
                  type="button"
                  onClick={handleAddSpecialization}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-lg font-semibold mb-3">{t("Certifications")}</label>
              <div className="flex flex-wrap gap-3 mb-4">
                {data.certifications.map((cert: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => setData('certifications', data.certifications.filter((_: any, idx: number) => idx !== i))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newCertification}
                  onChange={e => setNewCertification(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                  placeholder={t("Add certification...")}
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                type="submit"
                disabled={processing}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-12 py-4 rounded-xl disabled:opacity-60 transition"
              >
                {processing ? t("Saving...") : t("Save Changes")}
              </button>

              <button
                type="button"
                onClick={() => router.visit(route('suppliers.profile.show'))}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-12 py-4 rounded-xl transition"
              >
                {t("Cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}