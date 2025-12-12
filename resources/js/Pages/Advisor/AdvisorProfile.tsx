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
  const [established, setEstablished] = useState("");
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [newCertification, setNewCertification] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

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
    { key: "Colombo", label: t("Colombo") },
    { key: "Gampaha", label: t("Gampaha") },
    // ... (rest of districts)
  ];

  const handleSpecializationAdd = (value: string) => {
    if (value && !specialization.includes(value)) {
      setSpecialization([...specialization, value]);
    }
  };

  const handleCertificationAdd = (value: string) => {
    if (value && !certifications.includes(value)) {
      setCertifications([...certifications, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    formData.append('established', established);
    specialization.forEach((spec, index) => formData.append(`specialization[${index}]`, spec));
    certifications.forEach((cert, index) => formData.append(`certifications[${index}]`, cert));
    if (profileImage) formData.append('profile_image', profileImage);
    if (coverImage) formData.append('cover_image', coverImage);

    router.post('/advisor', formData, {
      onSuccess: () => {
        toast({ title: t('Success'), description: t('Profile created successfully') });
        router.visit('/advisor/profile');
      },
      onError: (errors) => {
        toast({ title: t('Error'), description: Object.values(errors).join(', ') });
      },
    });
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDistrict("");
    setProvince("");
    setAddress("");
    setDescription("");
    setQualifications("");
    setExperience("");
    setWebsite("");
    setEstablished("");
    setSpecialization([]);
    setCertifications([]);
    setProfileImage(null);
    setCoverImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Head title={t("Advisor Profile Form")} />
      <div className="bg-gray-50 shadow-lg rounded-lg p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t("Advisor Profile Form")}</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
            <FaHome /> {t("Home")}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile & Cover Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center relative">
              <label className="block text-gray-700 font-semibold mb-2">{t("Profile Image")}</label>
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden relative">
                {profileImage ? (
                  <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <FaCamera className="text-gray-400 text-3xl" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center relative">
              <label className="block text-gray-700 font-semibold mb-2">{t("Cover Image")}</label>
              <div className="w-full h-48 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden relative">
                {coverImage ? (
                  <img src={URL.createObjectURL(coverImage)} alt="Cover Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-lg">{t("Upload Cover")}</span>
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

          {/* Advisor Info */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="font-bold text-xl">{t("Advisor Info")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>{t("Name")}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" required />
              </div>
              <div>
                <label>{t("Email")}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded w-full" required />
              </div>
              <div>
                <label>{t("Phone")}</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 rounded w-full" required />
              </div>
              <div>
                <label>{t("District")}</label>
                <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border p-2 rounded w-full" required>
                  <option value="">{t("Select District")}</option>
                  {districts.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label>{t("Province")}</label>
                <select value={province} onChange={(e) => setProvince(e.target.value)} className="border p-2 rounded w-full" required>
                  <option value="">{t("Select Province")}</option>
                  {provinces.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label>{t("Address")}</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 rounded w-full" required />
              </div>
              <div className="md:col-span-2">
                <label>{t("Description")}</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded w-full" />
              </div>
              <div>
                <label>{t("Qualifications")}</label>
                <input type="text" value={qualifications} onChange={(e) => setQualifications(e.target.value)} className="border p-2 rounded w-full" />
              </div>
            </div>
          </div>

          {/* Specialization & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <label>{t("Specialization")}</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {specialization.map((s) => (
                  <span key={s} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1">
                    {s} <FaTimes className="cursor-pointer" onClick={() => setSpecialization(specialization.filter((item) => item !== s))} />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder={t("Add specialization")} className="border p-2 rounded w-full" value={newSpecialization} onChange={(e) => setNewSpecialization(e.target.value)} />
                <button type="button" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700" onClick={() => { if(newSpecialization) { handleSpecializationAdd(newSpecialization); setNewSpecialization(''); }}}><FaPlus /></button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <label>{t("Certifications")}</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {certifications.map((c) => (
                  <span key={c} className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1">
                    {c} <FaTimes className="cursor-pointer" onClick={() => setCertifications(certifications.filter((item) => item !== c))} />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder={t("Add certification")} className="border p-2 rounded w-full" value={newCertification} onChange={(e) => setNewCertification(e.target.value)} />
                <button type="button" className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700" onClick={() => { if(newCertification) { handleCertificationAdd(newCertification); setNewCertification(''); }}}><FaPlus /></button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded font-semibold hover:bg-green-800">{t("Save")}</button>
            <button type="button" onClick={handleCancel} className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700">{t("Cancel")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
