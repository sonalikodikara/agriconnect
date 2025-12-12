import { useState } from "react";
import { useTranslation } from "react-i18next";
import { router, usePage } from "@inertiajs/react";
import { X } from "lucide-react";

export default function AddProduct() {
  const { t } = useTranslation();
  const { flash } = usePage().props; // This will have status_key if passed from controller

  // Success message display (same style as Register/Login)
  const successMessage = flash?.status_key ? t(flash.status_key) : null;

  // Form States (unchanged)
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("kg");
  const [description, setDescription] = useState("");
  const [minimumOrder, setMinimumOrder] = useState(1);
  const [packagingSize, setPackagingSize] = useState("");

  const [npk, setNpk] = useState({ nitrogen: "", phosphorous: "", potassium: "" });
  const [otherNutrition, setOtherNutrition] = useState({ organicMatter: "", moisture: "", ph: "" });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [micronutrients, setMicronutrients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newMicronutrient, setNewMicronutrient] = useState("");

  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryPreview, setPrimaryPreview] = useState<string | null>(null);
  const [optionalImages, setOptionalImages] = useState<File[]>([]);
  const [optionalPreviews, setOptionalPreviews] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [certificatePreviews, setCertificatePreviews] = useState<string[]>([]);

  const [manufacturingDetails, setManufacturingDetails] = useState("");
  const [soilType, setSoilType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [safetyStorage, setSafetyStorage] = useState("");

  const [activeTab, setActiveTab] = useState("basic");

    // Real farming categories
  const categories = [
    "Fertilizer",
    "Seeds",
    "Pesticides",
    "Herbicides",
    "Fungicides",
    "Insecticides",
    "Organic Fertilizer",
    "Compost",
    "Bio Fertilizer",
    "Plant Growth Regulator",
    "Animal Feed",
    "Poultry Feed",
    "Livestock Medicine",
    "Irrigation Equipment",
    "Farm Tools",
    "Greenhouse Materials",
    "Nursery Plants",
    "Coconut Products",
    "Tea Fertilizer",
    "Rice Seeds",
    "Vegetable Seeds",
    "Fruit Plants",
  ];

  // Real quality grades used in Sri Lanka agriculture
  const qualityGrades = [
    "Premium Grade",
    "Grade A",
    "Grade B",
    "Grade C",
    "Organic Certified",
    "SLS Certified",
    "Export Quality",
    "Local Market",
    "First Class",
    "Second Class",
    "Farm Fresh",
    "Non-GMO",
  ];

  // Image handlers (unchanged)
  const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrimaryImage(file);
      setPrimaryPreview(URL.createObjectURL(file));
    }
  };

  const handleOptionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setOptionalImages(prev => [...prev, ...newFiles]);
      newFiles.forEach(file => {
        setOptionalPreviews(prev => [...prev, URL.createObjectURL(file)]);
      });
    }
  };

  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setCertificates(prev => [...prev, ...newFiles]);
      newFiles.forEach(file => {
        setCertificatePreviews(prev => [...prev, URL.createObjectURL(file)]);
      });
    }
  };

  const removePrimaryImage = () => { setPrimaryImage(null); setPrimaryPreview(null); };
  const removeOptionalImage = (i: number) => { setOptionalImages(p => p.filter((_, x) => x !== i)); setOptionalPreviews(p => p.filter((_, x) => x !== i)); };
  const removeCertificate = (i: number) => { setCertificates(p => p.filter((_, x) => x !== i)); setCertificatePreviews(p => p.filter((_, x) => x !== i)); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand || "");
    formData.append("category", category);
    formData.append("quality", quality || "");
    formData.append("price", price);
    formData.append("quantity", quantity || "");
    formData.append("quantity_unit", quantityUnit);
    formData.append("description", description);
    formData.append("minimum_order", minimumOrder.toString());
    formData.append("packaging_size", packagingSize || "");
    formData.append("npk[nitrogen]", npk.nitrogen);
    formData.append("npk[phosphorous]", npk.phosphorous);
    formData.append("npk[potassium]", npk.potassium);
    formData.append("otherNutrition[organicMatter]", otherNutrition.organicMatter);
    formData.append("otherNutrition[moisture]", otherNutrition.moisture);
    formData.append("otherNutrition[ph]", otherNutrition.ph);
    ingredients.forEach((ing, i) => formData.append(`ingredients[${i}]`, ing));
    micronutrients.forEach((micro, i) => formData.append(`micronutrients[${i}]`, micro));
    formData.append("manufacturingDetails", manufacturingDetails);
    formData.append("soilType", soilType);
    formData.append("instructions", instructions);
    formData.append("safetyStorage", safetyStorage);
    if (primaryImage) formData.append("primary_image", primaryImage);
    optionalImages.forEach((f, i) => formData.append(`optional_images[${i}]`, f));
    certificates.forEach((f, i) => formData.append(`certificates[${i}]`, f));

    router.post(route('suppliers.products.store'), formData, {
      forceFormData: true,
      // No toast here — we use flash message only
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 md:p-10 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-gray-200 pb-4 overflow-x-auto">
        {["basic", "nutrition", "images", "advanced"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === tab
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t(
              tab === "basic" ? "Basic Information" :
              tab === "nutrition" ? "Nutritional Info" :
              tab === "images" ? "Images & Docs" : "Advanced"
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Product Name")} *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
                placeholder={t("Enter product name")}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Brand Name")}</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder={t("Optional brand")}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Category")} *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full"
                required
              >
                <option value="">{t("Select category")}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat.toLowerCase().replace(/\s+/g, "_")}>
                    {t(cat)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Quality Grade")} *</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full"
                required
              >
                <option value="">{t("Select quality")}</option>
                {qualityGrades.map(grade => (
                  <option key={grade} value={grade}>
                    {t(grade)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Price (LKR)")} *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Quantity")} *</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg flex-1"
                  required
                />
                <select
                  value={quantityUnit}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                  className="border border-gray-300 p-3 rounded-lg"
                >
                  <option value="kg">{t("kg")}</option>
                  <option value="ltr">{t("Liter")}</option>
                  <option value="tons">{t("Tons")}</option>
                  <option value="packets">{t("Packets")}</option>
                  <option value="bags">{t("Bags")}</option>
                </select>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">{t("Description")} *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full h-32"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Minimum Order")}</label>
              <input
                type="number"
                value={minimumOrder}
                onChange={(e) => setMinimumOrder(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-lg w-full"
                min="1"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Packaging Size")}</label>
              <input
                type="text"
                value={packagingSize}
                onChange={(e) => setPackagingSize(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="e.g., 25kg, 50kg, 1L"
              />
            </div>
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div className="space-y-8">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-bold text-lg text-green-800 mb-4">{t("NPK Ratio")}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input placeholder={t("Nitrogen (%)")} value={npk.nitrogen} onChange={e => setNpk({...npk, nitrogen: e.target.value})} className="p-3 border rounded-lg" />
                <input placeholder={t("Phosphorous (%)")} value={npk.phosphorous} onChange={e => setNpk({...npk, phosphorous: e.target.value})} className="p-3 border rounded-lg" />
                <input placeholder={t("Potassium (%)")} value={npk.potassium} onChange={e => setNpk({...npk, potassium: e.target.value})} className="p-3 border rounded-lg" />
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-bold text-lg text-blue-800 mb-4">{t("Other Nutritional Values")}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input placeholder={t("Organic Matter (%)")} value={otherNutrition.organicMatter} onChange={e => setOtherNutrition({...otherNutrition, organicMatter: e.target.value})} className="p-3 border rounded-lg" />
                <input placeholder={t("Moisture Content (%)")} value={otherNutrition.moisture} onChange={e => setOtherNutrition({...otherNutrition, moisture: e.target.value})} className="p-3 border rounded-lg" />
                <input placeholder={t("pH Level")} value={otherNutrition.ph} onChange={e => setOtherNutrition({...otherNutrition, ph: e.target.value})} className="p-3 border rounded-lg" />
              </div>
            </div>

            {/* Ingredients & Micronutrients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-yellow-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3">{t("Ingredients")}</h4>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={e => setNewIngredient(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && e.preventDefault()}
                    className="flex-1 p-3 border rounded-lg"
                    placeholder={t("Add ingredient")}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newIngredient.trim()) {
                        setIngredients([...ingredients, newIngredient.trim()]);
                        setNewIngredient("");
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    {t("Add")}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing, i) => (
                    <span key={i} className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      {ing}
                      <button type="button" onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))} className="hover:text-red-600">
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3">{t("Micronutrients")}</h4>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newMicronutrient}
                    onChange={e => setNewMicronutrient(e.target.value)}
                    className="flex-1 p-3 border rounded-lg"
                    placeholder={t("Add micronutrient")}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newMicronutrient.trim()) {
                        setMicronutrients([...micronutrients, newMicronutrient.trim()]);
                        setNewMicronutrient("");
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    {t("Add")}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {micronutrients.map((micro, i) => (
                    <span key={i} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      {micro}
                      <button type="button" onClick={() => setMicronutrients(micronutrients.filter((_, idx) => idx !== i))} className="hover:text-red-600">
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Images & Docs Tab */}
        {activeTab === "images" && (
          <div className="space-y-10">
            {/* Primary Image */}
            <div>
              <label className="block font-bold text-lg text-gray-800 mb-3">{t("Primary Image")} *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePrimaryImageChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
              />
              {primaryPreview && (
                <div className="mt-4 relative inline-block">
                  <img src={primaryPreview} alt="Primary" className="w-64 h-64 object-cover rounded-xl shadow-lg border-4 border-green-300" />
                  <button
                    type="button"
                    onClick={removePrimaryImage}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Optional Images */}
            <div>
              <label className="block font-bold text-lg text-gray-800 mb-3">{t("Optional Images")}</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleOptionalImagesChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {optionalPreviews.map((src, i) => (
                  <div key={i} className="relative">
                    <img src={src} alt={`Optional ${i + 1}`} className="w-full h-48 object-cover rounded-xl shadow" />
                    <button
                      type="button"
                      onClick={() => removeOptionalImage(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <label className="block font-bold text-lg text-gray-800 mb-3">{t("Certificates & Test Reports")}</label>
              <input
                type="file"
                multiple
                onChange={handleCertificatesChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                {certificatePreviews.map((src, i) => (
                  <div key={i} className="relative">
                    {certificates[i]?.type.includes("image") ? (
                      <img src={src} alt={`Cert ${i + 1}`} className="w-full h-48 object-cover rounded-xl shadow" />
                    ) : (
                      <div className="bg-gray-100 border-2 border-dashed rounded-xl p-8 text-center">
                        <p className="text-gray-600 font-medium">{certificates[i]?.name}</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeCertificate(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeTab === "advanced" && (
          <div className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Manufacturing Details")}</label>
              <textarea
                value={manufacturingDetails}
                onChange={e => setManufacturingDetails(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full h-28"
                placeholder={t("Enter manufacturing info...")}
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Suitability Information (Soil Type)")}</label>
              <textarea
                value={soilType}
                onChange={e => setSoilType(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full h-24"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Instructions")}</label>
              <textarea
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full h-32"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">{t("Safety & Storage")}</label>
              <textarea
                value={safetyStorage}
                onChange={e => setSafetyStorage(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg w-full h-28"
              />
            </div>
          </div>
        )}

        <div className="text-center pt-8">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 to-emerald-700 text-white font-bold text-xl px-12 py-4 rounded-2xl shadow-2xl transform hover:scale-105 transition"
          >
            {t("Save Product")}
          </button>
        </div>
      </form>
    </div>
  );
}
