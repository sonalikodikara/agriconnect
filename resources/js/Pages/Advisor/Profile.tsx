// resources/js/Pages/Advisor/Profile.tsx

<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { FaHome, FaPlus, FaEdit, FaCalendarAlt, FaClock, FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";
=======
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { FaHome, FaPlus, FaEdit, FaCalendarAlt, FaClock, FaCheck, FaTimes } from "react-icons/fa";
>>>>>>> AG-26
import { Menu, X, ChevronDown, LogOut, Settings } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function Profile() {
  const { t } = useTranslation();
  const goHome = () => router.visit("/home");

<<<<<<< HEAD
  const { advisor, auth, flash, availabilities = [] } = usePage<{
    advisor: any;
    auth: { user: { name: string; email: string } };
    flash: { status_key?: string };
    availabilities: any[];
  }>().props;

  const topRef = useRef<HTMLDivElement>(null);

=======
  const { advisor, auth, flash } = usePage<{
    advisor: any;
    auth: { user: { name: string; email: string } };
    flash: { status_key?: string };
  }>().props;

>>>>>>> AG-26
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
<<<<<<< HEAD
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
=======
>>>>>>> AG-26

  // Consultation scheduling state
  const [scheduleType, setScheduleType] = useState<"date" | "week" | "month">("date");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
<<<<<<< HEAD
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([{ start: "", end: "" }]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const manageDetailsRef = useRef<HTMLDivElement>(null);
  const consultationFormRef = useRef<HTMLDivElement>(null);
=======
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([{ start: "", end: "" }]);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
>>>>>>> AG-26

  const toggleWeekday = (day: string) => {
    setSelectedWeekdays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const removeTimeSlot = (index: number) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((_, i) => i !== index));
    }
  };

  const updateTimeSlot = (index: number, field: "start" | "end", value: string) => {
    const updated = [...timeSlots];
    updated[index][field] = value;
    setTimeSlots(updated);
  };

<<<<<<< HEAD
  const startEdit = (availability: any) => {
    setIsEditing(true);
    setEditingId(availability.id);
    setScheduleType(availability.type);
    setSelectedDate(availability.specific_date || "");
    setSelectedWeekdays(availability.weekdays || []);
    setSelectedMonths(availability.months || []);
    setTimeSlots(availability.time_slots.map((s: any) => ({
      start: s.start_time,
      end: s.end_time
    })));

    // Scroll to form
    setTimeout(() => {
      consultationFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setScheduleType("date");
    setSelectedDate("");
    setSelectedWeekdays([]);
    setSelectedMonths([]);
    setTimeSlots([{ start: "", end: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      type: scheduleType,
      specific_date: scheduleType === "date" ? selectedDate : null,
      weekdays: scheduleType !== "date" ? selectedWeekdays : [],
      months: scheduleType === "month" ? selectedMonths : [],
      time_slots: timeSlots,
    };

    const onSuccess = () => {
      resetForm();
      setSuccessMessage(isEditing ? t("availability_updated") : t("availability_saved"));

      setTimeout(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      setTimeout(() => setSuccessMessage(null), 5000);
    };

    if (isEditing && editingId) {
      router.put(route("advisors.availability.update", editingId), data, {
        preserveScroll: true,
        onSuccess,
      });
    } else {
      router.post(route("advisors.availability.store"), data, {
        preserveScroll: true,
        onSuccess,
      });
    }
  };

  const deleteAvailability = (id: number) => {
    router.delete(route("advisors.availability.destroy", id), {
      preserveScroll: true,
      onSuccess: () => {
        setSuccessMessage(t("availability_deleted"));
        setTimeout(() => setSuccessMessage(null), 5000);
      },
    });
  };

  const handleLogout = () => router.post(route("logout"));

  // Auto-scroll to Manage Profile Details when Edit Profile is clicked
  const handleEditProfileClick = () => {
    setShowEditOptions(true);
    setTimeout(() => {
      manageDetailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  // Show flash message if coming from server
  useEffect(() => {
    if (flash?.status_key) {
      setSuccessMessage(t(flash.status_key));
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, [flash]);
=======
  const handleLogout = () => router.post(route("logout"));

  const successMessage = flash?.status_key ? t(flash.status_key) : null;
>>>>>>> AG-26

  if (!advisor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl text-red-600 font-bold">{t("No advisor profile found.")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={goHome}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
            >
              <FaHome size={22} />
              <span className="hidden sm:inline">{t("Home")}</span>
            </button>

            <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-green-800">
              {advisor.name}
            </h1>

            <div className="hidden md:flex items-center gap-6">
              <span className="bg-green-600 text-white px-5 py-2 rounded-full font-bold text-lg shadow">
                {t("Advisor")}
              </span>

              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl transition font-semibold text-gray-800"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">{auth.user.name}</span>
                  <ChevronDown size={20} className={`transition ${profileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50">
                    <a href={route("profile.edit")} className="flex items-center gap-4 px-6 py-4 hover:bg-green-50 transition text-lg">
                      <Settings size={22} />
                      {t("Account Settings")}
                    </a>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition text-lg text-red-600 font-semibold"
                    >
                      <LogOut size={22} />
                      {t("Logout")}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                {["en", "si", "ta"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => i18n.changeLanguage(lang)}
                    className={`px-5 py-2 rounded-lg font-bold transition ${
                      i18n.language === lang ? "bg-green-600 text-white shadow" : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lang === "en" ? "English" : lang === "si" ? "සිංහල" : "தமிழ்"}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 space-y-6">
            <a href={route("profile.edit")} className="block text-center py-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-lg">
              {t("Account Settings")}
            </a>
            <button
              onClick={handleLogout}
              className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-4 rounded-xl font-bold text-lg"
            >
              {t("Logout")}
            </button>
<<<<<<< HEAD
            <div className="flex justify-center gap-2 pt-4">
              {["en", "si", "ta"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`px-4 py-2 rounded-lg font-bold transition ${
                    i18n.language === lang ? "bg-green-600 text-white shadow" : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {lang === "en" ? "English" : lang === "si" ? "සිංහල" : "தமிழ்"}
                </button>
              ))}
            </div>
=======
>>>>>>> AG-26
          </div>
        )}
      </nav>

      {/* Mobile Advisor Name */}
      <div className="md:hidden text-center py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <h1 className="text-3xl font-bold">{advisor.name}</h1>
      </div>

<<<<<<< HEAD
      {/* Tabs - fully responsive */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-8 py-4">
=======
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 py-4 overflow-x-auto">
>>>>>>> AG-26
            {[
              { key: "services", label: t("My Services") },
              { key: "consultations", label: t("Consultations") },
              { key: "profile", label: t("Profile") },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
<<<<<<< HEAD
                className={`px-5 md:px-8 py-2.5 md:py-3 font-bold text-sm md:text-lg rounded-t-xl transition flex-shrink-0 ${
=======
                className={`px-8 py-3 font-bold text-lg rounded-t-xl transition ${
>>>>>>> AG-26
                  activeTab === tab.key
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
<<<<<<< HEAD
     
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Success Message with auto-hide */}
         <div ref={topRef}></div>
        {successMessage && (
          <div className="mb-6 md:mb-8 p-5 md:p-6 bg-green-100 border-4 border-green-400 rounded-2xl text-center shadow-md animate-fade-in">
            <p className="text-xl md:text-2xl font-bold text-green-800">{successMessage}</p>
=======
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {successMessage && (
          <div className="mb-8 p-6 bg-green-100 border-4 border-green-400 rounded-2xl text-center shadow-md">
            <p className="text-2xl font-bold text-green-800">{successMessage}</p>
>>>>>>> AG-26
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
<<<<<<< HEAD
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 md:p-10 text-center">
              <div className="w-32 md:w-40 h-32 md:h-40 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl mb-4 md:mb-6">
=======
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-10 text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl mb-6">
>>>>>>> AG-26
                {advisor.profile_image_url ? (
                  <img src={advisor.profile_image_url} alt={advisor.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
<<<<<<< HEAD
                    <span className="text-5xl md:text-7xl font-bold text-green-700">
=======
                    <span className="text-7xl font-bold text-green-700">
>>>>>>> AG-26
                      {advisor.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
<<<<<<< HEAD
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{advisor.name}</h2>
              <p className="text-xl md:text-2xl opacity-90">{advisor.qualifications || t("Agricultural Advisor")}</p>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-10 gap-4 md:gap-0">
                <h3 className="text-2xl md:text-3xl font-bold text-green-800">{t("Profile Overview")}</h3>
                <button
                  onClick={handleEditProfileClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl flex items-center gap-3 shadow-lg w-full md:w-auto justify-center"
=======
              <h2 className="text-4xl font-bold mb-2">{advisor.name}</h2>
              <p className="text-2xl opacity-90">{advisor.qualifications || t("Agricultural Advisor")}</p>
            </div>

            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-bold text-green-800">{t("Profile Overview")}</h3>
                <button
                  onClick={() => setShowEditOptions(!showEditOptions)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 shadow-lg"
>>>>>>> AG-26
                >
                  <FaEdit /> {t("Edit Profile")}
                </button>
              </div>

<<<<<<< HEAD
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 mb-10 md:mb-12">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 md:mb-6">{t("Personal Information")}</h4>
                  <div className="space-y-4 md:space-y-5 text-base md:text-lg">
=======
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">{t("Personal Information")}</h4>
                  <div className="space-y-5 text-lg">
>>>>>>> AG-26
                    <p><strong>{t("Name")}:</strong> {advisor.name}</p>
                    <p><strong>{t("Email")}:</strong> {advisor.email}</p>
                    <p><strong>{t("Phone")}:</strong> {advisor.phone}</p>
                    <p><strong>{t("Location")}:</strong> {advisor.district}, {advisor.province}</p>
                    <p><strong>{t("Address")}:</strong> {advisor.address}</p>
                    <p><strong>{t("Years of Experience")}:</strong> {advisor.experience || "0"} {t("years")}</p>
                    <p><strong>{t("Languages Spoken")}:</strong> English, Sinhala, Tamil</p>
                  </div>
                </div>

                <div>
<<<<<<< HEAD
                  <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 md:mb-6">{t("Statistics")}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 text-center shadow-md">
                      <p className="text-4xl md:text-5xl font-bold text-green-700">0</p>
                      <p className="text-lg md:text-xl text-gray-700 mt-2">{t("Total Services")}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 text-center shadow-md">
                      <p className="text-4xl md:text-5xl font-bold text-blue-700">1</p>
                      <p className="text-lg md:text-xl text-gray-700 mt-2">{t("Consultations")}</p>
=======
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">{t("Statistics")}</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 text-center shadow-md">
                      <p className="text-5xl font-bold text-green-700">0</p>
                      <p className="text-xl text-gray-700 mt-3">{t("Total Services")}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 text-center shadow-md">
                      <p className="text-5xl font-bold text-blue-700">1</p>
                      <p className="text-xl text-gray-700 mt-3">{t("Consultations")}</p>
>>>>>>> AG-26
                    </div>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              {/* Manage Profile Details - scroll target */}
              <div ref={manageDetailsRef} className="mt-10 md:mt-12 pt-8 md:pt-10 border-t-4 border-gray-200">
                {showEditOptions && (
                  <>
                    <h4 className="text-xl md:text-2xl font-bold text-green-800 mb-6 md:mb-8 text-center">{t("Manage Profile Details")}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <button
                        onClick={() => router.visit(route('advisors.specialties.edit'))}
                        className="bg-green-600 hover:bg-green-700 text-white py-6 md:py-8 rounded-2xl font-bold text-lg md:text-2xl shadow-xl flex flex-col items-center gap-3 md:gap-4 transition transform hover:scale-105"
                      >
                        <FaPlus size={32} className="md:size-40" />
                        {t("Manage Specializations")}
                      </button>
                      <button
                        onClick={() => router.visit(route('advisors.certifications.edit'))}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-6 md:py-8 rounded-2xl font-bold text-lg md:text-2xl shadow-xl flex flex-col items-center gap-3 md:gap-4 transition transform hover:scale-105"
                      >
                        <FaPlus size={32} className="md:size-40" />
                        {t("Manage Certifications")}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Professional Bio */}
              <div className="mt-12 md:mt-16">
                <h4 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 md:mb-8 text-center">{t("Professional Bio")}</h4>
                <div className="bg-gray-50 rounded-2xl p-6 md:p-10 text-base md:text-lg leading-relaxed text-gray-700">
=======
              {/* Edit Options */}
              {showEditOptions && (
                <div className="mt-12 pt-10 border-t-4 border-gray-200">
                  <h4 className="text-2xl font-bold text-green-800 mb-8 text-center">{t("Manage Profile Details")}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <button
                      onClick={() => router.visit(route('advisors.specialties.edit'))}
                      className="bg-green-600 hover:bg-green-700 text-white py-8 rounded-2xl font-bold text-2xl shadow-xl flex flex-col items-center gap-4 transition transform hover:scale-105"
                    >
                      <FaPlus size={40} />
                      {t("Manage Specializations")}
                    </button>
                    <button
                      onClick={() => router.visit(route('advisors.certifications.edit'))}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-8 rounded-2xl font-bold text-2xl shadow-xl flex flex-col items-center gap-4 transition transform hover:scale-105"
                    >
                      <FaPlus size={40} />
                      {t("Manage Certifications")}
                    </button>
                  </div>
                </div>
              )}

              {/* Professional Bio */}
              <div className="mt-16">
                <h4 className="text-3xl font-bold text-green-800 mb-8 text-center">{t("Professional Bio")}</h4>
                <div className="bg-gray-50 rounded-2xl p-10 text-lg leading-relaxed text-gray-700">
>>>>>>> AG-26
                  {advisor.description || t("No professional bio added yet. Share your expertise, journey, and passion for helping farmers.")}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === "consultations" && (
<<<<<<< HEAD
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10" ref={consultationFormRef}>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-8 md:mb-12">
              {isEditing ? t("Edit Consultation Availability") : t("Set Your Consultation Availability")}
            </h2>

            <form className="space-y-8 md:space-y-12" onSubmit={handleSubmit}>

              {/* Schedule Type Selection */}
              <div className="text-center">
                <label className="block text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">{t("Choose Schedule Type")}</label>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  <button
                    type="button"
                    onClick={() => setScheduleType("date")}
                    className={`px-6 md:px-10 py-4 md:py-6 rounded-2xl text-lg md:text-xl font-bold transition shadow-lg ${
                      scheduleType === "date" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-2 md:mb-3 text-3xl md:text-4xl" />
=======
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-green-800 text-center mb-12">{t("Set Your Consultation Availability")}</h2>

            <form className="space-y-12">
              {/* Schedule Type Selection */}
              <div className="text-center">
                <label className="block text-2xl font-semibold text-gray-800 mb-6">{t("Choose Schedule Type")}</label>
                <div className="flex flex-wrap justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => setScheduleType("date")}
                    className={`px-10 py-6 rounded-2xl text-xl font-bold transition shadow-lg ${
                      scheduleType === "date"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-3 text-4xl" />
>>>>>>> AG-26
                    {t("Specific Date")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleType("week")}
<<<<<<< HEAD
                    className={`px-6 md:px-10 py-4 md:py-6 rounded-2xl text-lg md:text-xl font-bold transition shadow-lg ${
                      scheduleType === "week" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-2 md:mb-3 text-3xl md:text-4xl" />
=======
                    className={`px-10 py-6 rounded-2xl text-xl font-bold transition shadow-lg ${
                      scheduleType === "week"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-3 text-4xl" />
>>>>>>> AG-26
                    {t("Weekly Recurring")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleType("month")}
<<<<<<< HEAD
                    className={`px-6 md:px-10 py-4 md:py-6 rounded-2xl text-lg md:text-xl font-bold transition shadow-lg ${
                      scheduleType === "month" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-2 md:mb-3 text-3xl md:text-4xl" />
=======
                    className={`px-10 py-6 rounded-2xl text-xl font-bold transition shadow-lg ${
                      scheduleType === "month"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-3 text-4xl" />
>>>>>>> AG-26
                    {t("Monthly Recurring")}
                  </button>
                </div>
              </div>

              {/* Specific Date */}
              {scheduleType === "date" && (
                <div className="max-w-md mx-auto">
<<<<<<< HEAD
                  <label className="block text-lg md:text-xl font-medium mb-2 md:mb-4 text-center">
=======
                  <label className="block text-xl font-medium mb-4 text-center">
>>>>>>> AG-26
                    {t("Select Date")}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
<<<<<<< HEAD
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
=======
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
>>>>>>> AG-26
                    required
                  />
                </div>
              )}

<<<<<<< HEAD
              {/* Weekdays */}
              {(scheduleType === "week" || scheduleType === "month") && (
                <div>
                  <label className="block text-lg md:text-xl font-medium mb-4 md:mb-6 text-center">
                    {t("Select Weekdays")}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
=======
              {/* Week / Month - Weekday Selection */}
              {(scheduleType === "week" || scheduleType === "month") && (
                <div>
                  <label className="block text-xl font-medium mb-6 text-center">
                    {t("Select Days")}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
>>>>>>> AG-26
                    {weekdays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleWeekday(day)}
<<<<<<< HEAD
                        className={`py-4 md:py-6 rounded-2xl text-lg md:text-xl font-bold transition shadow-lg ${
=======
                        className={`py-6 rounded-2xl text-xl font-bold transition shadow-lg ${
>>>>>>> AG-26
                          selectedWeekdays.includes(day)
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                      >
<<<<<<< HEAD
                        {selectedWeekdays.includes(day) && <FaCheck className="mx-auto mb-1 md:mb-2 text-xl md:text-2xl" />}
=======
                        {selectedWeekdays.includes(day) && <FaCheck className="mx-auto mb-2 text-2xl" />}
>>>>>>> AG-26
                        {t(day)}
                      </button>
                    ))}
                  </div>
                  {selectedWeekdays.length === 0 && (
<<<<<<< HEAD
                    <p className="text-red-600 text-center mt-4 text-lg">{t("Please select at least one weekday")}</p>
                  )}
                </div>
              )}

              {/* Month Selection */}
              {scheduleType === "month" && (
                <div className="max-w-md mx-auto">
                  <label className="block text-lg md:text-xl font-medium mb-2 md:mb-4 text-center">
                    {t("Select Months")}
                  </label>
                  <select
                    multiple
                    value={selectedMonths}
                    onChange={(e) => setSelectedMonths(Array.from(e.target.selectedOptions).map(o => o.value))}
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none h-32 md:h-40 bg-white shadow-md"
                  >
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {t(m)}
                      </option>
                    ))}
                  </select>
                  {selectedMonths.length === 0 && (
                    <p className="text-red-600 text-center mt-4 text-lg">{t("Please select at least one month")}</p>
                  )}
                  {selectedMonths.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {selectedMonths.map((m) => (
                        <span
                          key={m}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm md:text-base font-medium"
                        >
                          {t(m)}
                        </span>
                      ))}
                    </div>
=======
                    <p className="text-red-600 text-center mt-4 text-lg">{t("Please select at least one day")}</p>
>>>>>>> AG-26
                  )}
                </div>
              )}

              {/* Time Slots */}
              <div>
<<<<<<< HEAD
                <h3 className="text-2xl md:text-3xl font-bold text-green-800 text-center mb-8 md:mb-10 flex items-center justify-center gap-3 md:gap-4">
                  <FaClock className="text-3xl md:text-4xl" />
=======
                <h3 className="text-3xl font-bold text-green-800 text-center mb-10 flex items-center justify-center gap-4">
                  <FaClock className="text-4xl" />
>>>>>>> AG-26
                  {t("Available Time Slots")}
                </h3>

                <div className="max-w-4xl mx-auto space-y-6">
                  {timeSlots.map((slot, index) => (
<<<<<<< HEAD
                    <div key={index} className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start md:items-end bg-gray-50 p-4 md:p-6 rounded-2xl">
                      <div className="flex-1 w-full">
                        <label className="block text-base md:text-lg font-medium mb-1 md:mb-2">{t("Start Time")}</label>
=======
                    <div key={index} className="flex flex-col sm:flex-row gap-6 items-end bg-gray-50 p-6 rounded-2xl">
                      <div className="flex-1">
                        <label className="block text-lg font-medium mb-2">{t("Start Time")}</label>
>>>>>>> AG-26
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(index, "start", e.target.value)}
<<<<<<< HEAD
                          className="w-full px-4 md:px-6 py-3 md:py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                          required
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block text-base md:text-lg font-medium mb-1 md:mb-2">{t("End Time")}</label>
=======
                          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-lg font-medium mb-2">{t("End Time")}</label>
>>>>>>> AG-26
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(index, "end", e.target.value)}
<<<<<<< HEAD
                          className="w-full px-4 md:px-6 py-3 md:py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
=======
                          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
>>>>>>> AG-26
                          required
                        />
                      </div>
                      {timeSlots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(index)}
<<<<<<< HEAD
                          className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-md mt-4 sm:mt-0"
=======
                          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-md"
>>>>>>> AG-26
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={addTimeSlot}
<<<<<<< HEAD
                      className="bg-green-600 hover:bg-green-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-bold flex items-center gap-2 md:gap-3 mx-auto shadow-xl"
=======
                      className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold flex items-center gap-3 mx-auto shadow-xl"
>>>>>>> AG-26
                    >
                      <FaPlus /> {t("Add Another Time Slot")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
<<<<<<< HEAD
              <div className="text-center pt-8 md:pt-10 flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white px-12 md:px-16 py-5 md:py-6 rounded-3xl text-xl md:text-2xl font-bold shadow-2xl transition transform hover:scale-105 w-full sm:w-auto"
                >
                  {isEditing ? t("Update Availability Schedule") : t("Save Availability Schedule")}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-12 md:px-16 py-5 md:py-6 rounded-3xl text-xl md:text-2xl font-bold shadow-2xl transition transform hover:scale-105 w-full sm:w-auto"
                  >
                    {t("Cancel")}
                  </button>
                )}
              </div>
            </form>

            <h3 className="text-2xl md:text-3xl font-bold text-green-800 mt-12 md:mt-16 mb-6">
              {t("Saved Availability")}
            </h3>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border rounded-xl overflow-hidden divide-y divide-gray-200">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-4 text-left text-lg">{t("Type")}</th>
                    <th className="p-4 text-left text-lg">{t("Days / Date / Months")}</th>
                    <th className="p-4 text-left text-lg">{t("Time Slots")}</th>
                    <th className="p-4 text-left text-lg">{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {availabilities.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="p-4">{t(a.type.charAt(0).toUpperCase() + a.type.slice(1))}</td>
                      <td className="p-4">
                        {a.type === "date" && a.specific_date}
                        {a.type === "week" && a.weekdays?.map((d: string) => t(d)).join(", ")}
                        {a.type === "month" && (
                          <>
                            {a.weekdays?.map((d: string) => t(d)).join(", ")}
                            <br />
                            {a.months?.map((m: string) => t(m)).join(", ")}
                          </>
                        )}
                      </td>
                      <td className="p-4">
                        {a.time_slots.map((s: any, i: number) => (
                          <div key={i}>
                            {s.start_time} – {s.end_time}
                          </div>
                        ))}
                      </td>
                      <td className="p-4 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => startEdit(a)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 justify-center"
                        >
                          <FaEdit /> {t("Edit")}
                        </button>
                        <button
                          onClick={() => deleteAvailability(a.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 justify-center"
                        >
                          <FaTrashAlt /> {t("Delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {availabilities.map((a) => (
                <div key={a.id} className="bg-gray-50 rounded-2xl p-6 shadow-md">
                  <h4 className="text-xl font-bold text-green-800 mb-4">
                    {t(a.type.charAt(0).toUpperCase() + a.type.slice(1))}
                  </h4>
                  <p className="mb-3">
                    <strong>{t("Details")}:</strong><br />
                    {a.type === "date" && a.specific_date}
                    {a.type === "week" && a.weekdays?.map((d: string) => t(d)).join(", ")}
                    {a.type === "month" && (
                      <>
                        {a.weekdays?.map((d: string) => t(d)).join(", ")}
                        <br />
                        {a.months?.map((m: string) => t(m)).join(", ")}
                      </>
                    )}
                  </p>
                  <p className="mb-3"><strong>{t("Time Slots")}:</strong></p>
                  {a.time_slots.map((s: any, i: number) => (
                    <p key={i} className="ml-4 mb-1">
                      {s.start_time} – {s.end_time}
                    </p>
                  ))}
                  <div className="flex flex-col gap-3 mt-5">
                    <button
                      onClick={() => startEdit(a)}
                      className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                      <FaEdit /> {t("Edit")}
                    </button>
                    <button
                      onClick={() => deleteAvailability(a.id)}
                      className="bg-red-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                      <FaTrashAlt /> {t("Delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
=======
              <div className="text-center pt-10">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white px-16 py-6 rounded-3xl text-2xl font-bold shadow-2xl transition transform hover:scale-105"
                >
                  {t("Save Availability Schedule")}
                </button>
              </div>
            </form>
>>>>>>> AG-26
          </div>
        )}

        {/* My Services Tab */}
        {activeTab === "services" && (
<<<<<<< HEAD
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 md:mb-8">{t("My Services")}</h2>
            <p className="text-xl md:text-2xl text-gray-600">{t("Your consultation packages and services will be listed here.")}</p>
            <button className="mt-8 md:mt-10 bg-green-600 hover:bg-green-700 text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl text-xl md:text-2xl font-bold shadow-xl">
=======
          <div className="bg-white rounded-3xl shadow-2xl p-16 text-center">
            <h2 className="text-4xl font-bold text-green-800 mb-8">{t("My Services")}</h2>
            <p className="text-2xl text-gray-600">{t("Your consultation packages and services will be listed here.")}</p>
            <button className="mt-10 bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-2xl text-2xl font-bold shadow-xl">
>>>>>>> AG-26
              {t("Add New Service")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}