import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Edit } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import AddProduct from './AddProduct';

export default function Profile() {
  const { t } = useTranslation();
  const goHome = () => router.visit('/');

  const { advisor } = usePage<{ advisor: any; auth: { user: any } }>().props;
  const [activeTab, setActiveTab] = useState("overview");

  if (!advisor) {
    return <div className="p-6">{t('No advisor profile found.')}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b flex items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={goHome}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FaHome /> {t('Home')}
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">{advisor.name}</h1>
        <div className="flex items-center gap-2">
          <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-lg">
            {t('Advisor')}
          </span>
          <Link
            href={route("advisor.profile.show")}
            className="flex items-center gap-1 border px-3 py-1 rounded-lg text-green-700 hover:bg-green-50"
          >
            <Edit size={16} /> {t('Edit')}
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 px-6 mt-4 border-b">
        {["overview", "specializations", "certifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-green-600 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t(tab.charAt(0).toUpperCase() + tab.slice(1))}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6 px-6 py-6">
        {/* Left side */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white shadow rounded-2xl p-6 text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border flex items-center justify-center">
              {advisor.profile_image ? (
                <img
                  src={`/storage/${advisor.profile_image}`}
                  alt={advisor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-green-700">{advisor.name.charAt(0)}</span>
              )}
            </div>
            <h2 className="mt-3 text-lg font-semibold">{advisor.name}</h2>
            <p className="text-gray-500">{advisor.qualifications || t("N/A")}</p>
            <div className="mt-3 inline-block bg-green-50 px-3 py-1 rounded-md text-green-700 text-sm">
              {advisor.experience || t("N/A")} {t('Experience')}
            </div>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="font-semibold mb-3">{t('Contact Information')}</h3>
            <p className="text-gray-700 text-sm">📧 {advisor.email}</p>
            <p className="text-gray-700 text-sm">📞 {advisor.phone}</p>
            <p className="text-gray-700 text-sm">📍 {advisor.address}</p>
          </div>
        </div>

        {/* Right side */}
        <div className="col-span-8 space-y-6">
          {activeTab === "overview" && (
            <div className="bg-white shadow rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold">{t('About')} {advisor.name}</h3>
              <p className="text-gray-700">{advisor.description}</p>
            </div>
          )}

          {activeTab === "specializations" && (
            <div className="bg-white shadow rounded-2xl p-6">
              <h4 className="font-semibold">{t('Specializations')}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {advisor.specialization?.map((spec: string, idx: number) => (
                  <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {t(spec)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="bg-white shadow rounded-2xl p-6">
              <h4 className="font-semibold">{t('Certifications')}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {advisor.certifications?.map((cert: string, idx: number) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {t(cert)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
