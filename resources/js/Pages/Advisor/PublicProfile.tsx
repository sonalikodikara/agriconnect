// resources/js/Pages/Advisor/PublicProfile.tsx

import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCertificate, FaWhatsapp, FaClock, FaHome } from 'react-icons/fa';

interface Advisor {
  id: number;
  name: string;
  email: string;
  phone: string;
  district: string;
  province: string;
  address: string;
  description?: string;
  qualifications?: string;
  experience?: number;
  specialization?: string[];
  certifications?: string[];
  profile_image?: string;
  profile_image_url?: string;
  available_time?: any;
}

interface Props {
  advisor: Advisor;
}

export default function PublicProfile({ advisor }: Props) {
  const { t } = useTranslation();

  const formatAvailableTime = (availableTime: any) => {
    if (!availableTime || (Array.isArray(availableTime) && availableTime.length === 0)) {
      return t('Not specified');
    }

    if (typeof availableTime === 'string') {
      try {
        availableTime = JSON.parse(availableTime);
      } catch {
        return availableTime;
      }
    }

    if (Array.isArray(availableTime) && availableTime.length > 0) {
      return availableTime.map((slot: any, index: number) => {
        if (typeof slot === 'string') return slot;
        if (slot.day && slot.start && slot.end) {
          return `${slot.day}: ${slot.start} - ${slot.end}`;
        }
        return JSON.stringify(slot);
      }).join(', ');
    }

    return t('Not specified');
  };

  return (
    <>
      <Head title={`${advisor.name} - ${t('Advisor Profile')}`} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Navbar */}
        <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3">
                <img src="/images/AgriLogo.png" alt="Logo" className="h-12 w-12 rounded-full" />
                <span className="text-2xl font-bold text-green-800">AgriConnect</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/home" className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700">
                  <FaHome /> {t('Home')}
                </Link>
                <Link href="/list/advisors" className="bg-yellow-500 text-green-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-600">
                  {t('Back to Advisors')}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                {advisor.profile_image_url || advisor.profile_image ? (
                  <img
                    src={advisor.profile_image_url || `/storage/${advisor.profile_image}`}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <span className="text-7xl font-bold text-green-700">
                      {advisor.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Name and Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4">{advisor.name}</h1>
                {advisor.qualifications && (
                  <p className="text-2xl opacity-90 mb-4">{advisor.qualifications}</p>
                )}
                {advisor.experience && (
                  <div className="flex items-center justify-center md:justify-start gap-2 text-xl mb-4">
                    <FaCertificate />
                    <span>{advisor.experience} {t('years of experience')}</span>
                  </div>
                )}
                <div className="flex items-center justify-center md:justify-start gap-2 text-lg opacity-90">
                  <FaMapMarkerAlt />
                  <span>{advisor.district}, {advisor.province}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Contact & Info */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-100">
                <h2 className="text-2xl font-bold text-green-800 mb-6">{t('Contact Information')}</h2>
                <div className="space-y-4">
                  {advisor.phone && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaPhone className="text-green-600 text-xl" />
                      <span className="text-lg">{advisor.phone}</span>
                    </div>
                  )}
                  {advisor.email && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <FaEnvelope className="text-green-600 text-xl" />
                      <span className="text-lg break-all">{advisor.email}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3 text-gray-700">
                    <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
                    <span className="text-lg">{advisor.address}</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="mt-6 space-y-3">
                  {advisor.phone && (
                    <button
                      className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition shadow-lg"
                      title={t('WhatsApp')}
                    >
                      <FaWhatsapp className="text-2xl" />
                      <span>{t('Contact via WhatsApp')}</span>
                    </button>
                  )}
                  {advisor.email && (
                    <button
                      className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition shadow-lg"
                      title={t('Email')}
                    >
                      <FaEnvelope className="text-xl" />
                      <span>{t('Send Email')}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Available Time Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-3">
                  <FaClock className="text-2xl" />
                  {t('Available Time')}
                </h2>
                <p className="text-gray-700 text-lg">
                  {formatAvailableTime(advisor.available_time)}
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:col-span-2 space-y-6">
              {/* Description */}
              {advisor.description && (
                <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-green-100">
                  <h2 className="text-3xl font-bold text-green-800 mb-6">{t('About')}</h2>
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {advisor.description}
                  </p>
                </div>
              )}

              {/* Specializations */}
              {advisor.specialization && advisor.specialization.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 border-4 border-green-200">
                  <h2 className="text-3xl font-bold text-green-800 mb-6">{t('Specializations')}</h2>
                  <div className="flex flex-wrap gap-4">
                    {advisor.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg"
                      >
                        {typeof spec === 'string' ? spec : JSON.stringify(spec)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {advisor.certifications && advisor.certifications.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl shadow-xl p-8 border-4 border-blue-200">
                  <h2 className="text-3xl font-bold text-blue-800 mb-6">{t('Certifications')}</h2>
                  <div className="flex flex-wrap gap-4">
                    {advisor.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg"
                      >
                        {typeof cert === 'string' ? cert : JSON.stringify(cert)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
