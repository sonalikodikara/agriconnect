import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ArrowLeft, Edit, Package, Layers, ShoppingCart, BarChart } from "lucide-react";

export default function Profile() {
  const { supplier } = usePage<{ supplier: any }>().props; // fetch from backend
  const [activeTab, setActiveTab] = useState("overview");

  if (!supplier) {
    return <div className="p-6">No supplier profile found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white border-b flex items-center justify-between px-6 py-3">
        <Link
          href={route("dashboard")}
          className="flex items-center gap-2 text-green-700 font-medium hover:underline"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <h1 className="text-2xl font-semibold text-gray-800">{supplier.business_name}</h1>
        <div className="flex items-center gap-2">
          <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-lg">
            Supplier
          </span>
          <Link
            href={route("suppliers.edit", supplier.id)}
            className="flex items-center gap-1 border px-3 py-1 rounded-lg text-green-700 hover:bg-green-50"
          >
            <Edit size={16} /> Edit
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 px-6 mt-4 border-b">
        {["overview", "products", "orders", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-green-600 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6 px-6 py-6">
        {/* Left side */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white shadow rounded-2xl p-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
              {supplier.business_name.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-3 text-lg font-semibold">{supplier.business_name}</h2>
            <p className="text-gray-500">{supplier.contact_person}</p>
            <div className="mt-3 inline-block bg-green-50 px-3 py-1 rounded-md text-green-700 text-sm">
              {supplier.experience || "N/A"} Experience
            </div>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <p className="text-gray-700 text-sm">📧 {supplier.email}</p>
            <p className="text-gray-700 text-sm">📞 {supplier.phone}</p>
            <p className="text-gray-700 text-sm">📍 {supplier.address}</p>
          </div>
        </div>

        {/* Right side */}
        <div className="col-span-8 space-y-6">
          {activeTab === "overview" && (
            <div className="bg-white shadow rounded-2xl p-6">
              <h3 className="text-lg font-semibold">About {supplier.business_name}</h3>
              <p className="text-gray-700 mt-2">{supplier.description}</p>
            </div>
          )}

          {/* Other tabs content can be added similarly */}
        </div>
      </div>
    </div>
  );
}
