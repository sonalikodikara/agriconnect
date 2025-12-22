// resources/js/Pages/Advisor/Specialties.tsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import { FaTimes, FaPlus, FaHome } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";

interface Specialization {
  name: string;
  details: string;
  whatsapp?: string;
  other_contacts?: string;
  images?: (string | File)[];
}

export default function Specialties({ specializations = [] }: { specializations?: Specialization[] }) {
  const { t } = useTranslation();

  // Ensure we always start with an array
  const initialSpecs = Array.isArray(specializations) 
    ? specializations.map(spec => ({
        name: spec.name || '',
        details: spec.details || '',
        whatsapp: spec.whatsapp || '',
        other_contacts: spec.other_contacts || '',
        images: spec.images || [],
      }))
    : [];

  const [specs, setSpecs] = useState<Specialization[]>(initialSpecs);
  const [errors, setErrors] = useState<any>({});

  const addSpec = () => {
    setSpecs([...specs, { name: '', details: '', whatsapp: '', other_contacts: '', images: [] }]);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const updateSpec = (index: number, field: keyof Specialization, value: any) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const validateForm = () => {
    const newErrors: any = {};
    specs.forEach((spec, i) => {
      if (!spec.name.trim()) newErrors[`spec_${i}_name`] = t("Name is required");
      if (!spec.details.trim()) newErrors[`spec_${i}_details`] = t("Details are required");
      if (spec.whatsapp && !/^07\d{8}$/.test(spec.whatsapp)) newErrors[`spec_${i}_whatsapp`] = t("Invalid Sri Lankan WhatsApp number (e.g., 0712345678)");
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    specs.forEach((spec, i) => {
      formData.append(`specializations[${i}][name]`, spec.name);
      formData.append(`specializations[${i}][details]`, spec.details);
      formData.append(`specializations[${i}][whatsapp]`, spec.whatsapp || '');
      formData.append(`specializations[${i}][other_contacts]`, spec.other_contacts || '');
      spec.images?.forEach((file: File | string, j: number) => {
        if (file instanceof File) {
          formData.append(`specializations[${i}][images][${j}]`, file);
        }
      });
    });

    router.post(route('advisors.specialties.update'), formData, {
      onSuccess: () => {
        toast({ title: t('Success'), description: t('Specializations updated') });
        router.visit(route('advisors.profile.show'));
      },
      onError: (err) => {
        toast({ title: t('Error'), description: Object.values(err).join(', ') });
        setErrors(err);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-green-800">{t("Manage Specializations")}</h1>
          <button
            onClick={() => router.visit(route('advisors.profile.show'))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-md"
          >
            <FaHome /> {t("Back to Profile")}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {specs.map((spec, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 space-y-4 relative border border-gray-200">
              <button
                type="button"
                onClick={() => removeSpec(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                <FaTimes size={20} />
              </button>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Specialty Name")} <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={spec.name}
                  onChange={(e) => updateSpec(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                  required
                />
                {errors[`spec_${index}_name`] && <p className="text-red-600 text-sm mt-1">{errors[`spec_${index}_name`]}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Details (Farming Info for Farmers)")} <span className="text-red-600">*</span></label>
                <textarea
                  value={spec.details}
                  onChange={(e) => updateSpec(index, 'details', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                  placeholder={t("Describe your expertise, tips for farmers, crop advice, etc.")}
                  required
                />
                {errors[`spec_${index}_details`] && <p className="text-red-600 text-sm mt-1">{errors[`spec_${index}_details`]}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("WhatsApp Contact")}</label>
                <input
                  type="tel"
                  value={spec.whatsapp}
                  onChange={(e) => updateSpec(index, 'whatsapp', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="0712345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                />
                {errors[`spec_${index}_whatsapp`] && <p className="text-red-600 text-sm mt-1">{errors[`spec_${index}_whatsapp`]}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Other Contacts (Email, Phone, etc.)")}</label>
                <input
                  type="text"
                  value={spec.other_contacts}
                  onChange={(e) => updateSpec(index, 'other_contacts', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                  placeholder={t("e.g., advisor@email.com, 0112345678")}
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Related Images (optional)")}</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    updateSpec(index, 'images', [...spec.images || [], ...files]);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {(spec.images || []).map((img: string | File, j: number) => (
                    <div key={j} className="relative">
                      <img
                        src={img instanceof File ? URL.createObjectURL(img) : img}
                        alt={`Image ${j + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = (spec.images || []).filter((_, k) => k !== j);
                          updateSpec(index, 'images', newImages);
                        }}
                        className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full text-xs"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button type="button" onClick={addSpec} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center justify-center gap-2 mx-auto shadow-lg">
              <FaPlus /> {t("Add Specialization")}
            </button>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <button
              type="button"
              onClick={() => router.visit(route('advisors.profile.show'))}
              className="bg-gray-500 hover:bg-gray-600 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-md"
            >
              {t("Cancel")}
            </button>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-md"
            >
              {t("Save Specializations")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}