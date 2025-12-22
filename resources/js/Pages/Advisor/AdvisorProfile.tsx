// resources/js/Pages/Advisor/AdvisorProfile.tsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Head, router } from "@inertiajs/react";
import { FaCamera, FaHome, FaTimes, FaPlus } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";

export default function AdvisorProfile() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [website, setWebsite] = useState("");
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [errors, setErrors] = useState<any>({});

  const provinces = [
    { key: "Western", label: t("Western Province") },
    { key: "Central", label: t("Central Province") },
    { key: "Southern", label: t("Southern Province") },
    { key: "Northern", label: t("Northern Province") },
    { key: "Eastern", label: t("Eastern Province") },
    { key: "North Western", label: t("North Western Province") },
    { key: "North Central", label: t("North Central Province") },
    { key: "Uva", label: t("Uva Province") },
    { key: "Sabaragamuwa", label: t("Sabaragamuwa Province") },
  ];

  const districts = [
    { key: 'Colombo', label: t('Colombo') },
    { key: 'Gampaha', label: t('Gampaha') },
    { key: 'Kalutara', label: t('Kalutara') },
    { key: 'Kandy', label: t('Kandy') },
    { key: 'Matale', label: t('Matale') },
    { key: 'Nuwara Eliya', label: t('Nuwara Eliya') },
    { key: 'Galle', label: t('Galle') },
    { key: 'Matara', label: t('Matara') },
    { key: 'Hambantota', label: t('Hambantota') },
    { key: 'Jaffna', label: t('Jaffna') },
    { key: 'Kilinochchi', label: t('Kilinochchi') },
    { key: 'Mannar', label: t('Mannar') },
    { key: 'Vavuniya', label: t('Vavuniya') },
    { key: 'Mullaitivu', label: t('Mullaitivu') },
    { key: 'Batticaloa', label: t('Batticaloa') },
    { key: 'Ampara', label: t('Ampara') },
    { key: 'Trincomalee', label: t('Trincomalee') },
    { key: 'Kurunegala', label: t('Kurunegala') },
    { key: 'Puttalam', label: t('Puttalam') },
    { key: 'Anuradhapura', label: t('Anuradhapura') },
    { key: 'Polonnaruwa', label: t('Polonnaruwa') },
    { key: 'Badulla', label: t('Badulla') },
    { key: 'Monaragala', label: t('Monaragala') },
    { key: 'Ratnapura', label: t('Ratnapura') },
    { key: 'Kegalle', label: t('Kegalle') },
  ];

  const handleSpecializationAdd = (value: string) => {
    if (value.trim() && !specialization.includes(value.trim())) {
      setSpecialization([...specialization, value.trim()]);
      setNewSpecialization("");
    }
  };

  const handleCertificationAdd = (value: string) => {
    if (value.trim() && !certifications.includes(value.trim())) {
      setCertifications([...certifications, value.trim()]);
      setNewCertification("");
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!name.trim()) newErrors.name = t("Name is required");
    if (!email.trim()) newErrors.email = t("Email is required");
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      newErrors.email = t("Invalid email format");

    if (!phone.trim()) newErrors.phone = t("Phone is required");
    else if (!/^0[7-9][0-9]{8}$/.test(phone.replace(/\s/g, '')))
      newErrors.phone = t("Invalid Sri Lankan mobile (e.g., 0712345678) or landline (10 digits starting with 0)");

    if (!district) newErrors.district = t("District is required");
    if (!province) newErrors.province = t("Province is required");
    if (!address.trim()) newErrors.address = t("Address is required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('district', district);
    formData.append('province', province);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('qualifications', qualifications);
    formData.append('experience', experience);
    formData.append('website', website);

    specialization.forEach((spec, i) => formData.append(`specialization[${i}]`, spec));
    certifications.forEach((cert, i) => formData.append(`certifications[${i}]`, cert));

    if (profileImage) formData.append('profile_image', profileImage);
    if (coverImage) formData.append('cover_image', coverImage);

    router.post(route('advisors.store'), formData, {
      onSuccess: () => {
        toast({ title: t('Success'), description: t('Advisor profile created successfully!') });
        router.visit(route('advisors.profile.show'));
      },
      onError: (err) => {
        setErrors(err);
        toast({ title: t('Error'), description: t('Please fix the errors below') });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <Head title={t("Create Advisor Profile")} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">{t("Create Your Advisor Profile")}</h1>
            <button
              onClick={() => router.visit("/home")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md"
            >
              <FaHome /> {t("Home")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <label className="block text-xl font-semibold text-gray-800 mb-4">{t("Profile Image")}</label>
                <div className="w-48 h-48 mx-auto rounded-full border-4 border-dashed border-gray-400 flex items-center justify-center overflow-hidden relative">
                  {profileImage ? (
                    <img src={URL.createObjectURL(profileImage)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FaCamera className="text-gray-400 text-5xl" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <label className="block text-xl font-semibold text-gray-800 mb-4">{t("Cover Image")}</label>
                <div className="w-full h-64 rounded-xl border-4 border-dashed border-gray-400 flex items-center justify-center overflow-hidden relative">
                  {coverImage ? (
                    <img src={URL.createObjectURL(coverImage)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-xl">{t("Click to upload cover")}</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium mb-2">{t("Name")} <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  required
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Email")} <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  required
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Phone")} <span className="text-red-600">*</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="0712345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  required
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("District")} <span className="text-red-600">*</span></label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  required
                >
                  <option value="">{t("Select District")}</option>
                  {districts.map((d) => (
                    <option key={d.key} value={d.key}>{d.label}</option>
                  ))}
                </select>
                {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Province")} <span className="text-red-600">*</span></label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  required
                >
                  <option value="">{t("Select Province")}</option>
                  {provinces.map((p) => (
                    <option key={p.key} value={p.key}>{p.label}</option>
                  ))}
                </select>
                {errors.province && <p className="text-red-600 text-sm mt-1">{errors.province}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Years of Experience")}</label>
                <input
                  type="number"
                  min="0"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                  placeholder="e.g., 10"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">{t("Full Address")} <span className="text-red-600">*</span></label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                required
              />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">{t("Description / Bio")}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                placeholder={t("Tell us about your expertise...")}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">{t("Qualifications")}</label>
              <input
                type="text"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                placeholder={t("e.g., PhD in Agronomy, MSc in Plant Pathology")}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">{t("Website (optional)")}</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                placeholder="https://yourwebsite.com"
              />
            </div>

            {/* Specializations */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <label className="block text-xl font-semibold mb-4">{t("Specializations")}</label>
              <div className="flex flex-wrap gap-3 mb-4">
                {specialization.map((s) => (
                  <span key={s} className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
                    {s}
                    <FaTimes className="cursor-pointer text-sm" onClick={() => setSpecialization(specialization.filter(item => item !== s))} />
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSpecializationAdd(newSpecialization))}
                  placeholder={t("Add specialization")}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSpecializationAdd(newSpecialization)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <label className="block text-xl font-semibold mb-4">{t("Certifications")}</label>
              <div className="flex flex-wrap gap-3 mb-4">
                {certifications.map((c) => (
                  <span key={c} className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
                    {c}
                    <FaTimes className="cursor-pointer text-sm" onClick={() => setCertifications(certifications.filter(item => item !== c))} />
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleCertificationAdd(newCertification))}
                  placeholder={t("Add certification")}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleCertificationAdd(newCertification)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-6 pt-8">
              <button
                type="button"
                onClick={() => router.visit("/home")}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-10 py-4 rounded-2xl text-xl shadow-lg"
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-bold px-12 py-4 rounded-2xl text-xl shadow-lg"
              >
                {t("Create Profile")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}