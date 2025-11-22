import { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";

export default function AddProduct() {
  const { t } = useTranslation();

  // Basic Info
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

  // Nutritional Info
  const [npk, setNpk] = useState({ nitrogen: "", phosphorous: "", potassium: "" });
  const [otherNutrition, setOtherNutrition] = useState({ organicMatter: "", moisture: "", ph: "" });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [micronutrients, setMicronutrients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newMicronutrient, setNewMicronutrient] = useState("");

  // Images & Docs
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [optionalImages, setOptionalImages] = useState<File[]>([]);
  const [certificates, setCertificates] = useState<File[]>([]);

  // Advanced
  const [manufacturingDetails, setManufacturingDetails] = useState("");
  const [soilType, setSoilType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [safetyStorage, setSafetyStorage] = useState("");

  const [activeTab, setActiveTab] = useState("basic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("quality", quality);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("quantity_unit", quantityUnit);
    formData.append("description", description);
    formData.append("minimum_order", minimumOrder.toString());
    formData.append("packaging_size", packagingSize);
    formData.append("npk[nitrogen]", npk.nitrogen);
    formData.append("npk[phosphorous]", npk.phosphorous);
    formData.append("npk[potassium]", npk.potassium);
    formData.append("otherNutrition[organicMatter]", otherNutrition.organicMatter);
    formData.append("otherNutrition[moisture]", otherNutrition.moisture);
    formData.append("otherNutrition[ph]", otherNutrition.ph);
    ingredients.forEach((ing, idx) => formData.append(`ingredients[${idx}]`, ing));
    micronutrients.forEach((micro, idx) => formData.append(`micronutrients[${idx}]`, micro));
    if (primaryImage) formData.append("primary_image", primaryImage);
    optionalImages.forEach((file, idx) => formData.append(`optional_images[${idx}]`, file));
    certificates.forEach((file, idx) => formData.append(`certificates[${idx}]`, file));
    formData.append("manufacturingDetails", manufacturingDetails);
    formData.append("soilType", soilType);
    formData.append("instructions", instructions);
    formData.append("safetyStorage", safetyStorage);

    router.post("/advisor/products", formData, { forceFormData: true });
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">{t("Add Product")}</h3>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {["basic", "nutrition", "images", "advanced"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-green-600 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t(
              tab === "basic"
                ? "Basic Information"
                : tab === "nutrition"
                ? "Nutritional Info"
                : tab === "images"
                ? "Images & Docs"
                : "Advanced"
            )}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>{t("Product Name")} *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label>{t("Brand Name")}</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>{t("Category")} *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">{t("Select category")}</option>
                <option value="fertilizer">{t("Fertilizer")}</option>
                <option value="seeds">{t("Seeds")}</option>
              </select>
            </div>
            <div>
              <label>{t("Quality Grade")} *</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">{t("Select quality")}</option>
                <option value="A">{t("A")}</option>
                <option value="B">{t("B")}</option>
              </select>
            </div>
            <div>
              <label>{t("Price (LKR)")} *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label>{t("Quantity")} *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                <select
                  value={quantityUnit}
                  onChange={(e) => setQuantityUnit(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="kg">{t("kg")}</option>
                  <option value="ltr">{t("ltr")}</option>
                </select>
              </div>
            </div>
            <div className="col-span-2">
              <label>{t("Description")} *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label>{t("Minimum Order")}</label>
              <input
                type="number"
                value={minimumOrder}
                onChange={(e) => setMinimumOrder(Number(e.target.value))}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>{t("Packaging Size")}</label>
              <input
                type="text"
                value={packagingSize}
                onChange={(e) => setPackagingSize(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="e.g., 25kg, 50kg"
              />
            </div>
          </div>
        )}

        {/* Nutritional Info */}
        {activeTab === "nutrition" && (
        <div className="space-y-4">
            {/* NPK Ratio */}
            <div className="bg-gray-50 p-4 rounded shadow">
            <h4 className="font-semibold mb-2">{t("NPK Ratio")}</h4>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                <label>{t("Nitrogen (%)")}</label>
                <input
                    type="text"
                    placeholder={t("Nitrogen (%)")}
                    value={npk.nitrogen}
                    onChange={(e) => setNpk({ ...npk, nitrogen: e.target.value })}
                    className="border p-2 rounded w-full"
                />
                </div>
                <div className="flex flex-col">
                <label>{t("Phosphorous (%)")}</label>
                <input
                    type="text"
                    placeholder={t("Phosphorous (%)")}
                    value={npk.phosphorous}
                    onChange={(e) => setNpk({ ...npk, phosphorous: e.target.value })}
                    className="border p-2 rounded w-full"
                />
                </div>
                <div className="flex flex-col">
                <label>{t("Potassium (%)")}</label>
                <input
                    type="text"
                    placeholder={t("Potassium (%)")}
                    value={npk.potassium}
                    onChange={(e) => setNpk({ ...npk, potassium: e.target.value })}
                    className="border p-2 rounded w-full"
                />
                </div>
            </div>
            </div>

            {/* Other Nutritional Values */}
            <div className="bg-gray-50 p-4 rounded shadow">
            <h4 className="font-semibold mb-2">{t("Other Nutritional Values")}</h4>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                <label>{t("Organic Matter (%)")}</label>
                <input
                    type="text"
                    placeholder={t("Organic Matter (%)")}
                    value={otherNutrition.organicMatter}
                    onChange={(e) =>
                    setOtherNutrition({ ...otherNutrition, organicMatter: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                />
                </div>
                <div className="flex flex-col">
                <label>{t("Moisture Content (%)")}</label>
                <input
                    type="text"
                    placeholder={t("Moisture Content (%)")}
                    value={otherNutrition.moisture}
                    onChange={(e) =>
                    setOtherNutrition({ ...otherNutrition, moisture: e.target.value })
                    }
                    className="border p-2 rounded w-full"
                />
                </div>
                <div className="flex flex-col">
                <label>{t("pH Level")}</label>
                <input
                    type="text"
                    placeholder={t("pH Level")}
                    value={otherNutrition.ph}
                    onChange={(e) => setOtherNutrition({ ...otherNutrition, ph: e.target.value })}
                    className="border p-2 rounded w-full"
                />
                </div>
            </div>
            </div>

            {/* Ingredients */}
            <div className="bg-gray-50 p-4 rounded shadow space-y-2">
              <h4 className="font-semibold">{t("Ingredients")}</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder={t("Add ingredient")}
                />
                <button
                  type="button"
                  className="bg-green-600 text-white px-3 rounded"
                  onClick={() => {
                    if (newIngredient) {
                      setIngredients([...ingredients, newIngredient]);
                      setNewIngredient("");
                    }
                  }}
                >
                  {t("Add")}
                </button>
              </div>
              <ul className="list-disc ml-5 mt-2">
                {ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Micronutrients */}
            <div className="bg-gray-50 p-4 rounded shadow space-y-2">
              <h4 className="font-semibold">{t("Micronutrients")}</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMicronutrient}
                  onChange={(e) => setNewMicronutrient(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder={t("Add micronutrient")}
                />
                <button
                  type="button"
                  className="bg-green-600 text-white px-3 rounded"
                  onClick={() => {
                    if (newMicronutrient) {
                      setMicronutrients([...micronutrients, newMicronutrient]);
                      setNewMicronutrient("");
                    }
                  }}
                >
                  {t("Add")}
                </button>
              </div>
              <ul className="list-disc ml-5 mt-2">
                {micronutrients.map((micro, idx) => (
                  <li key={idx}>{micro}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Images & Docs */}
        {activeTab === "images" && (
          <div className="space-y-4">
            <div>
              <label>{t("Primary Image")}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPrimaryImage(e.target.files ? e.target.files[0] : null)
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>{t("Optional Images")}</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  e.target.files &&
                  setOptionalImages(Array.from(e.target.files))
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>{t("Certificates & Test Reports")}</label>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  e.target.files && setCertificates(Array.from(e.target.files))
                }
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}

        {/* Advanced */}
        {activeTab === "advanced" && (
          <div className="space-y-4">
            <div>
              <label>{t("Manufacturing Details")}</label>
              <textarea
                value={manufacturingDetails}
                onChange={(e) => setManufacturingDetails(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>{t("Suitability Information (Soil Type)")}</label>
              <textarea
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>{t("Instructions")}</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>{t("Safety & Storage")}</label>
              <textarea
                value={safetyStorage}
                onChange={(e) => setSafetyStorage(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          {t("Save Product")}
        </button>
      </form>
    </div>
  );
}
