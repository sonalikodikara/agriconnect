// resources/js/Pages/Advisor/Profile.tsx

import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { FaHome, FaPlus, FaEdit, FaCalendarAlt, FaClock, FaCheck, FaTimes } from "react-icons/fa";
import { Menu, X, ChevronDown, LogOut, Settings } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

export default function Profile() {
  const { t } = useTranslation();
  const goHome = () => router.visit("/home");

  const { advisor, auth, flash } = usePage<{
    advisor: any;
    auth: { user: { name: string; email: string } };
    flash: { status_key?: string };
  }>().props;

  const [activeTab, setActiveTab] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);

  // Consultation scheduling state
  const [scheduleType, setScheduleType] = useState<"date" | "week" | "month">("date");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([{ start: "", end: "" }]);

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const handleLogout = () => router.post(route("logout"));

  const successMessage = flash?.status_key ? t(flash.status_key) : null;

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
          </div>
        )}
      </nav>

      {/* Mobile Advisor Name */}
      <div className="md:hidden text-center py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <h1 className="text-3xl font-bold">{advisor.name}</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 py-4 overflow-x-auto">
            {[
              { key: "services", label: t("My Services") },
              { key: "consultations", label: t("Consultations") },
              { key: "profile", label: t("Profile") },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-bold text-lg rounded-t-xl transition ${
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {successMessage && (
          <div className="mb-8 p-6 bg-green-100 border-4 border-green-400 rounded-2xl text-center shadow-md">
            <p className="text-2xl font-bold text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-10 text-center">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl mb-6">
                {advisor.profile_image_url ? (
                  <img src={advisor.profile_image_url} alt={advisor.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <span className="text-7xl font-bold text-green-700">
                      {advisor.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <h2 className="text-4xl font-bold mb-2">{advisor.name}</h2>
              <p className="text-2xl opacity-90">{advisor.qualifications || t("Agricultural Advisor")}</p>
            </div>

            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-bold text-green-800">{t("Profile Overview")}</h3>
                <button
                  onClick={() => setShowEditOptions(!showEditOptions)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 shadow-lg"
                >
                  <FaEdit /> {t("Edit Profile")}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">{t("Personal Information")}</h4>
                  <div className="space-y-5 text-lg">
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
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">{t("Statistics")}</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 text-center shadow-md">
                      <p className="text-5xl font-bold text-green-700">0</p>
                      <p className="text-xl text-gray-700 mt-3">{t("Total Services")}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 text-center shadow-md">
                      <p className="text-5xl font-bold text-blue-700">1</p>
                      <p className="text-xl text-gray-700 mt-3">{t("Consultations")}</p>
                    </div>
                  </div>
                </div>
              </div>

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
                  {advisor.description || t("No professional bio added yet. Share your expertise, journey, and passion for helping farmers.")}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === "consultations" && (
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
                    {t("Specific Date")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleType("week")}
                    className={`px-10 py-6 rounded-2xl text-xl font-bold transition shadow-lg ${
                      scheduleType === "week"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-3 text-4xl" />
                    {t("Weekly Recurring")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleType("month")}
                    className={`px-10 py-6 rounded-2xl text-xl font-bold transition shadow-lg ${
                      scheduleType === "month"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    <FaCalendarAlt className="mx-auto mb-3 text-4xl" />
                    {t("Monthly Recurring")}
                  </button>
                </div>
              </div>

              {/* Specific Date */}
              {scheduleType === "date" && (
                <div className="max-w-md mx-auto">
                  <label className="block text-xl font-medium mb-4 text-center">
                    {t("Select Date")}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                    required
                  />
                </div>
              )}

              {/* Week / Month - Weekday Selection */}
              {(scheduleType === "week" || scheduleType === "month") && (
                <div>
                  <label className="block text-xl font-medium mb-6 text-center">
                    {t("Select Days")}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {weekdays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleWeekday(day)}
                        className={`py-6 rounded-2xl text-xl font-bold transition shadow-lg ${
                          selectedWeekdays.includes(day)
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                      >
                        {selectedWeekdays.includes(day) && <FaCheck className="mx-auto mb-2 text-2xl" />}
                        {t(day)}
                      </button>
                    ))}
                  </div>
                  {selectedWeekdays.length === 0 && (
                    <p className="text-red-600 text-center mt-4 text-lg">{t("Please select at least one day")}</p>
                  )}
                </div>
              )}

              {/* Time Slots */}
              <div>
                <h3 className="text-3xl font-bold text-green-800 text-center mb-10 flex items-center justify-center gap-4">
                  <FaClock className="text-4xl" />
                  {t("Available Time Slots")}
                </h3>

                <div className="max-w-4xl mx-auto space-y-6">
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-6 items-end bg-gray-50 p-6 rounded-2xl">
                      <div className="flex-1">
                        <label className="block text-lg font-medium mb-2">{t("Start Time")}</label>
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(index, "start", e.target.value)}
                          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-lg font-medium mb-2">{t("End Time")}</label>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(index, "end", e.target.value)}
                          className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-green-600 outline-none"
                          required
                        />
                      </div>
                      {timeSlots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-md"
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
                      className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold flex items-center gap-3 mx-auto shadow-xl"
                    >
                      <FaPlus /> {t("Add Another Time Slot")}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="text-center pt-10">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white px-16 py-6 rounded-3xl text-2xl font-bold shadow-2xl transition transform hover:scale-105"
                >
                  {t("Save Availability Schedule")}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* My Services Tab */}
        {activeTab === "services" && (
          <div className="bg-white rounded-3xl shadow-2xl p-16 text-center">
            <h2 className="text-4xl font-bold text-green-800 mb-8">{t("My Services")}</h2>
            <p className="text-2xl text-gray-600">{t("Your consultation packages and services will be listed here.")}</p>
            <button className="mt-10 bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-2xl text-2xl font-bold shadow-xl">
              {t("Add New Service")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}