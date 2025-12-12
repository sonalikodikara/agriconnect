// resources/js/Pages/Supplier/EditProfileDetails.tsx

import React, { useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { FaHome, FaUserCircle, FaEdit, FaSignOutAlt, FaTimes, FaPlus, FaCamera } from 'react-icons/fa';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

interface Props {
  supplier: any;
  districts: { key: string; label: string }[];
  provinces: { key: string; label: string }[];
  auth: { user: { name: string } };
  flash?: { status_key?: string };
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
  const [profilePreview, setProfilePreview] = useState<string | null>(supplier?.profile_image ? `/storage/${supplier.profile_image}` : null);
  const [coverPreview, setCoverPreview] = useState<string | null>(supplier?.cover_image ? `/storage/${supplier.cover_image}` : null);

  // Success message from flash
  const { flash } = usePage().props as { flash?: { status_key?: string } };
  const successMessage = flash?.status_key ? t(flash.status_key) : null;

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('profile_image', file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('cover_image', file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item, i) => formData.append(`${key}[${i}]`, item));
        } else {
          formData.append(key, value);
        }
      }
    });

    router.post(route('suppliers.update', supplier.id), formData, {
      forceFormData: true,
      onSuccess: () => {
        // Success handled via flash message
      },
    });
  };

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <>
      <Head title={t("Edit Supplier Profile")} />

      {/* Navbar */}
      <nav className="bg-white shadow-xl border-b-4 border-green-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Home */}
            <button
              onClick={() => router.visit('/')}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition"
            >
              <FaHome size={22} />
              <span className="hidden sm:inline">{t("Home")}</span>
            </button>

            {/* Center: Page Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-green-800">
              {t("Edit Supplier Profile")}
            </h1>

            {/* Right: Profile Icon */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition"
              >
                <FaUserCircle size={36} />
                <span className="hidden md:block">{auth.user.name}</span>
                <ChevronDown size={20} className={`transition ${profileDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                  <button
                    onClick={() => router.visit('/supplier/profile')}
                    className="w-full text-left px-6 py-4 hover:bg-green-50 transition flex items-center gap-4 text-lg"
                  >
                    <FaUserCircle size={22} />
                    {t("View Profile")}
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-6 py-4 hover:bg-red-50 transition flex items-center gap-4 text-lg text-red-600 font-bold"
                  >
                    <FaSignOutAlt size={22} />
                    {t("Logout")}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-green-800"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-green-50 border-t-4 border-green-600 py-6 px-8">
            <button
              onClick={() => router.visit('/supplier/profile')}
              className="w-full text-left py-4 text-xl font-bold text-green-800 hover:bg-green-100 rounded-lg px-4"
            >
              {t("View Profile")}
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left py-4 text-xl font-bold text-red-600 hover:bg-red-100 rounded-lg px-4 mt-2"
            >
              {t("Logout")}
            </button>
          </div>
        )}
      </nav>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
        <div className="max-w-5xl mx-auto px-6">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-10 p-8 bg-green-100 border-4 border-green-500 rounded-3xl text-center shadow-2xl animate-pulse">
              <p className="text-3xl font-bold text-green-800">{successMessage}</p>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-8 border-green-200">
            <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
              {t("Edit Your Business Profile")}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Images Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Profile Image */}
                <div className="text-center">
                  <label className="block text-2xl font-bold text-gray-800 mb-4">{t("Profile Picture")}</label>
                  <div className="relative inline-block">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-green-400 shadow-2xl">
                      {profilePreview ? (
                        <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                          <FaCamera className="text-white text-6xl" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImage}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="mt-4 text-lg font-medium text-gray-600">
                      {t("Click to change photo")}
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="text-center">
                  <label className="block text-2xl font-bold text-gray-800 mb-4">{t("Cover Photo")}</label>
                  <div className="relative inline-block">
                    <div className="w-full h-96 rounded-2xl overflow-hidden border-8 border-yellow-400 shadow-2xl bg-gray-200">
                      {coverPreview ? (
                        <img src={coverPreview} alt="Cover" className="w-full h-64 object-cover" />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-r from-yellow-300 to-orange-400 flex items-center justify-center">
                          <FaCamera className="text-white text-6xl" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImage}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="mt-4 text-lg font-medium text-gray-600">
                      {t("Click to change cover")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Info */}
              <div className="bg-green-50 rounded-3xl p-10 border-4 border-green-300">
                <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">{t("Business Information")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    placeholder={t("Business Name")}
                    value={data.business_name}
                    onChange={e => setData('business_name', e.target.value)}
                    className="p-4 border-2 border-green-300 rounded-xl text-xl"
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("Contact Person")}
                    value={data.contact_person}
                    onChange={e => setData('contact_person', e.target.value)}
                    className="p-4 border-2 border-green-300 rounded-xl text-xl"
                  />
                  <input
                    type="email"
                    placeholder={t("Email")}
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className="p-4 border-2 border-green-300 rounded-xl text-xl"
                  />
                  <input
                    type="tel"
                    placeholder={t("Phone")}
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                    className="p-4 border-2 border-green-300 rounded-xl text-xl"
                  />
                  <select
                    value={data.district}
                    onChange={e => setData('district', e.target.value)}
                    className="p-4 border-2 border-green-300 rounded-xl text-xl"
                  >
                    <option value="">{t("Select District")}</option>
                    {districts.map(d => (
                      <option key={d.key} value={d.key}>{d.label}</option>
                    ))}
                  </select>
                  <select
                    value={data.province}
                    onChange={e => setData('province', e.target.value)}
                    className="p-4 border-2 border-green-300 rounded-xl text-xl"
                  >
                    <option value="">{t("Select Province")}</option>
                    {provinces.map(p => (
                      <option key={p.key} value={p.key}>{p.label}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder={t("Address")}
                    value={data.address}
                    onChange={e => setData('address', e.target.value)}
                    className="col-span-1 md:col-span-2 p-4 border-2 border-green-300 rounded-xl text-xl h-32"
                  />
                  <textarea
                    placeholder={t("Business Description")}
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className="col-span-1 md:col-span-2 p-4 border-2 border-green-300 rounded-xl text-xl h-40"
                  />
                </div>
              </div>

              {/* Specializations */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-10 border-4 border-green-300">
                <h3 className="text-3xl font-bold text-green-800 mb-6">{t("Specializations")}</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  {data.specialization.map((item, i) => (
                    <span key={i} className="bg-green-600 text-white px-6 py-3 rounded-full text-xl font-bold flex items-center gap-3 shadow-lg">
                      {item}
                      <button
                        type="button"
                        onClick={() => setData('specialization', data.specialization.filter((_, idx) => idx !== i))}
                        className="hover:bg-red-600 rounded-full p-1"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder={t("Add specialization")}
                    value={newSpecialization}
                    onChange={e => setNewSpecialization(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newSpecialization.trim()) {
                          setData('specialization', [...data.specialization, newSpecialization.trim()]);
                          setNewSpecialization('');
                        }
                      }
                    }}
                    className="flex-1 p-4 border-2 border-green-400 rounded-xl text-xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSpecialization.trim()) {
                        setData('specialization', [...data.specialization, newSpecialization.trim()]);
                        setNewSpecialization('');
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg"
                  >
                    <FaPlus /> {t("Add")}
                  </button>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-10 border-4 border-blue-300">
                <h3 className="text-3xl font-bold text-blue-800 mb-6">{t("Certifications")}</h3>
                <div className="flex flex-wrap gap-4 mb-6">
                  {data.certifications.map((item, i) => (
                    <span key={i} className="bg-blue-600 text-white px-6 py-3 rounded-full text-xl font-bold flex items-center gap-3 shadow-lg">
                      {item}
                      <button
                        type="button"
                        onClick={() => setData('certifications', data.certifications.filter((_, idx) => idx !== i))}
                        className="hover:bg-red-600 rounded-full p-1"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder={t("Add certification")}
                    value={newCertification}
                    onChange={e => setNewCertification(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newCertification.trim()) {
                          setData('certifications', [...data.certifications, newCertification.trim()]);
                          setNewCertification('');
                        }
                      }
                    }}
                    className="flex-1 p-4 border-2 border-blue-400 rounded-xl text-xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCertification.trim()) {
                        setData('certifications', [...data.certifications, newCertification.trim()]);
                        setNewCertification('');
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-xl shadow-lg"
                  >
                    <FaPlus /> {t("Add")}
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="text-center space-y-6 pt-10">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 to-emerald-700 text-white font-bold text-2xl px-16 py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition disabled:opacity-70"
                >
                  {processing ? t("Saving...") : t("Save Changes")}
                </button>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => router.visit('/supplier/profile')}
                    className="text-xl text-gray-600 hover:text-gray-800 underline"
                  >
                    {t("Back to Profile")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}