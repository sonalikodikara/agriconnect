// resources/js/Pages/Advisor/Certifications.tsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import { FaTimes, FaPlus, FaHome } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";

interface Certification {
  name: string;
  details: string;
  whatsapp?: string;
  other_contacts?: string;
  images?: (string | File)[];
}

export default function Certifications({ certifications = [] }: { certifications?: Certification[] }) {
  const { t } = useTranslation();

  // Ensure we always have an array
  const initialCerts = Array.isArray(certifications)
    ? certifications.map(cert => ({
        name: cert.name || '',
        details: cert.details || '',
        whatsapp: cert.whatsapp || '',
        other_contacts: cert.other_contacts || '',
        images: cert.images || [],
      }))
    : [];

  const [certs, setCerts] = useState<Certification[]>(initialCerts);
  const [errors, setErrors] = useState<any>({});

  const addCert = () => {
    setCerts([...certs, { name: '', details: '', whatsapp: '', other_contacts: '', images: [] }]);
  };

  const removeCert = (index: number) => {
    setCerts(certs.filter((_, i) => i !== index));
  };

  const updateCert = (index: number, field: keyof Certification, value: any) => {
    const newCerts = [...certs];
    newCerts[index][field] = value;
    setCerts(newCerts);
  };

  const validateForm = () => {
    const newErrors: any = {};
    certs.forEach((cert, i) => {
      if (!cert.name.trim()) newErrors[`cert_${i}_name`] = t("Name is required");
      if (!cert.details.trim()) newErrors[`cert_${i}_details`] = t("Details are required");
      if (cert.whatsapp && !/^07\d{8}$/.test(cert.whatsapp)) newErrors[`cert_${i}_whatsapp`] = t("Invalid Sri Lankan WhatsApp number");
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    certs.forEach((cert, i) => {
      formData.append(`certifications[${i}][name]`, cert.name);
      formData.append(`certifications[${i}][details]`, cert.details);
      formData.append(`certifications[${i}][whatsapp]`, cert.whatsapp || '');
      formData.append(`certifications[${i}][other_contacts]`, cert.other_contacts || '');
      cert.images?.forEach((file: File | string, j: number) => {
        if (file instanceof File) {
          formData.append(`certifications[${i}][images][${j}]`, file);
        }
      });
    });

    router.post(route('advisors.certifications.update'), formData, {
      onSuccess: () => {
        toast({ title: t('Success'), description: t('Certifications updated') });
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
          <h1 className="text-3xl font-bold text-green-800">{t("Manage Certifications")}</h1>
          <button
            onClick={() => router.visit(route('advisors.profile.show'))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-md"
          >
            <FaHome /> {t("Back to Profile")}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {certs.map((cert, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 space-y-4 relative border border-gray-200">
              <button
                type="button"
                onClick={() => removeCert(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                <FaTimes size={20} />
              </button>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Certification Name")} <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCert(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                  required
                />
                {errors[`cert_${index}_name`] && <p className="text-red-600 text-sm mt-1">{errors[`cert_${index}_name`]}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Details / Description")} <span className="text-red-600">*</span></label>
                <textarea
                  value={cert.details}
                  onChange={(e) => updateCert(index, 'details', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                  placeholder={t("Describe the certification, validity, issuing body, etc.")}
                  required
                />
                {errors[`cert_${index}_details`] && <p className="text-red-600 text-sm mt-1">{errors[`cert_${index}_details`]}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("WhatsApp Contact")}</label>
                <input
                  type="tel"
                  value={cert.whatsapp}
                  onChange={(e) => updateCert(index, 'whatsapp', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="0712345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                />
                {errors[`cert_${index}_whatsapp`] && <p className="text-red-600 text-sm mt-1">{errors[`cert_${index}_whatsapp`]}</p>}
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">{t("Other Contacts")}</label>
                <input
                  type="text"
                  value={cert.other_contacts}
                  onChange={(e) => updateCert(index, 'other_contacts', e.target.value)}
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
                    updateCert(index, 'images', [...cert.images || [], ...files]);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {(cert.images || []).map((img: string | File, j: number) => (
                    <div key={j} className="relative">
                      <img
                        src={img instanceof File ? URL.createObjectURL(img) : img}
                        alt={`Image ${j + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = (cert.images || []).filter((_, k) => k !== j);
                          updateCert(index, 'images', newImages);
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
            <button type="button" onClick={addCert} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-xl font-bold flex items-center justify-center gap-2 mx-auto shadow-md">
              <FaPlus /> {t("Add Certification")}
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
              {t("Save Certifications")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}