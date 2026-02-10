// resources/js/Pages/ListPages/Advisors.tsx

import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaCertificate, FaWhatsapp, FaFilter, FaArrowLeft } from 'react-icons/fa';

interface Advisor {
  id: number;
  name: string;
  email: string;
  phone: string;
  district: string;
  province: string;
  description?: string;
  experience?: number;
  specialization?: string[];
  certifications?: string[];
  profile_image?: string;
  available_time?: any;
}

interface Props {
  advisors: Advisor[];
  category_name: string;
  filters?: {
    specialties: string[];
    provinces: string[];
  };
  currentFilters?: {
    specialty: string;
    province: string;
  };
}

export default function Advisors({ advisors = [], category_name, filters = { specialties: [], provinces: [] }, currentFilters = { specialty: '', province: '' } }: Props) {
  const { t } = useTranslation();
  const [selectedSpecialty, setSelectedSpecialty] = useState(currentFilters.specialty || '');
  const [selectedProvince, setSelectedProvince] = useState(currentFilters.province || '');

  // Debug logging
  console.log('Advisors component received:', {
    advisorsCount: advisors?.length || 0,
    advisors: advisors,
    filters: filters,
  });

  // Debug logging
  console.log('Advisors component received:', {
    advisorsCount: advisors?.length || 0,
    advisors: advisors,
    filters: filters,
  });

  return (
    <>
      <Head title={t('Advisors & Consultants')} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Same Navbar as all other pages */}
        <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3">
                <img src="/images/AgriLogo.png" alt="Logo" className="h-12 w-12 rounded-full" />
                <span className="text-2xl font-bold text-green-800">AgriConnect</span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/login" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700">
                  {t('Login')}
                </Link>
                <Link href="/register" className="bg-yellow-500 text-green-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-600">
                  {t('Register')}
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t('Agricultural Advisors')}</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto px-4">
            {t('Connect with experienced farming experts in your area')}
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-green-100">
            <div className="flex items-center gap-4 mb-4">
              <FaFilter className="text-green-600 text-2xl" />
              <h2 className="text-2xl font-bold text-green-800">{t('Filter Advisors')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Specialty Filter */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  {t('Specialty')}
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => {
                    setSelectedSpecialty(e.target.value);
                    router.get(route('list.advisors'), {
                      specialty: e.target.value || undefined,
                      province: selectedProvince || undefined,
                    }, { preserveState: true });
                  }}
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-600 focus:outline-none text-lg"
                >
                  <option value="">{t('All Specialties')}</option>
                  {filters.specialties.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Province Filter */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  {t('Province')}
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    router.get(route('list.advisors'), {
                      specialty: selectedSpecialty || undefined,
                      province: e.target.value || undefined,
                    }, { preserveState: true });
                  }}
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-600 focus:outline-none text-lg"
                >
                  <option value="">{t('All Provinces')}</option>
                  {filters.provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
              </div>
            </div>
            {(selectedSpecialty || selectedProvince) && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelectedSpecialty('');
                    setSelectedProvince('');
                    router.get(route('list.advisors'));
                  }}
                  className="text-green-600 hover:text-green-800 font-semibold text-lg underline"
                >
                  {t('Clear Filters')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <button
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-green-700 font-bold text-lg hover:underline"
          >
            <FaArrowLeft />
            {t('Back')}
          </button>
        </div>


        {/* Advisors Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          {!advisors || advisors.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
              <p className="text-3xl text-gray-600 mb-8">{t('No advisors registered yet.')}</p>
              <Link href="/home" className="bg-green-600 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-green-700">
                {t('Back to Home')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {advisors.map((advisor) => (
                <div
                  key={advisor.id}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-100 hover:shadow-3xl transition transform hover:-translate-y-3"
                >
                  {/* Profile Image */}
                  <div className="h-64 bg-gradient-to-br from-green-400 to-emerald-500 relative">
                    {advisor.profile_image ? (
                      <img
                        src={`/storage/${advisor.profile_image}`}
                        alt={advisor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-8xl font-bold text-white opacity-50">
                          {advisor.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-3xl font-bold text-white">{advisor.name}</h3>
                      <p className="text-xl text-yellow-300">
                        {(() => {
                          const specs = Array.isArray(advisor.specialization) 
                            ? advisor.specialization 
                            : (typeof advisor.specialization === 'string' 
                                ? (() => {
                                    try {
                                      return JSON.parse(advisor.specialization);
                                    } catch {
                                      return [];
                                    }
                                  })()
                                : []);
                          return t(Array.isArray(specs) && specs.length > 0 ? specs[0] : 'Expert');
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8">
                    <p className="text-lg text-gray-700 mb-6 line-clamp-3">
                      {advisor.description || t('Experienced agricultural consultant')}
                    </p>

                    {/* Experience */}
                    <div className="flex items-center gap-3 text-green-700 font-bold text-lg mb-4">
                      <FaCertificate />
                      <span>{advisor.experience || '?'} {t('years experience')}</span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 text-gray-700 mb-3">
                      <FaMapMarkerAlt className="text-green-600" />
                      <span>{advisor.district}, {advisor.province}</span>
                    </div>

                    {/* Phone */}
                    {advisor.phone && (
                      <div className="flex items-center gap-3 text-gray-700 mb-3">
                        <FaPhone className="text-green-600" />
                        <span>{advisor.phone}</span>
                      </div>
                    )}

                    {/* Email */}
                    {advisor.email && (
                      <div className="flex items-center gap-3 text-gray-700 mb-6">
                        <FaEnvelope className="text-green-600" />
                        <span>{advisor.email}</span>
                      </div>
                    )}

                    {/* Specializations */}
                    {(() => {
                      const specs = Array.isArray(advisor.specialization) 
                        ? advisor.specialization 
                        : (typeof advisor.specialization === 'string' 
                            ? (() => {
                                try {
                                  return JSON.parse(advisor.specialization);
                                } catch {
                                  return [];
                                }
                              })()
                            : []);
                      return specs && specs.length > 0 && (
                        <div className="mb-6">
                          <p className="font-bold text-green-800 mb-2">{t('Specializations')}:</p>
                          <div className="flex flex-wrap gap-2">
                            {specs.map((spec: any, i: number) => (
                              <span key={i} className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                                {typeof spec === 'string' ? spec : String(spec)}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Certifications */}
                    {(() => {
                      const certs = Array.isArray(advisor.certifications) 
                        ? advisor.certifications 
                        : (typeof advisor.certifications === 'string' 
                            ? (() => {
                                try {
                                  return JSON.parse(advisor.certifications);
                                } catch {
                                  return [];
                                }
                              })()
                            : []);
                      return certs && certs.length > 0 && (
                        <div className="mb-6">
                          <p className="font-bold text-blue-800 mb-2">{t('Certifications')}:</p>
                          <div className="flex flex-wrap gap-2">
                            {certs.map((cert: any, i: number) => (
                              <span key={i} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                                {typeof cert === 'string' ? cert : String(cert)}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Contact Buttons */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => {
                          try {
                            const url = route('advisor.show', advisor.id);
                            console.log('Navigating to advisor profile:', url, 'Advisor ID:', advisor.id);
                            router.visit(url);
                          } catch (error) {
                            console.error('Error navigating to advisor profile:', error);
                            // Fallback to direct URL
                            router.visit(`/advisor/${advisor.id}`);
                          }
                        }}
                        className="block text-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 to-emerald-700 text-white font-bold text-xl py-4 rounded-2xl transition shadow-lg w-full"
                      >
                        {t('View Full Profile')}
                      </button>
                      
                      <div className="flex gap-3">
                        {advisor.phone && (
                          <button
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-md"
                            title={t('WhatsApp')}
                          >
                            <FaWhatsapp className="text-xl" />
                            <span className="hidden sm:inline">{t('WhatsApp')}</span>
                          </button>
                        )}
                        {advisor.email && (
                          <button
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition shadow-md"
                            title={t('Email')}
                          >
                            <FaEnvelope className="text-xl" />
                            <span className="hidden sm:inline">{t('Email')}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}