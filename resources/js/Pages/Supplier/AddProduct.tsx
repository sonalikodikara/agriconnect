// resources/js/Pages/Supplier/AddProduct.tsx

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { router, usePage } from "@inertiajs/react";
import { X, Bold, List, ArrowLeft } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function AddProduct() {
  const { t } = useTranslation();
  const { flash, product } = usePage().props as any;
  const isEdit = !!product;
  const successMessage = flash?.status_key ? t(flash.status_key) : null;

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-40",
      },
    },
  });

  // Product Type
  const [productType, setProductType] = useState<"general" | "vehicle" | "tool">("general");

  // Shared Image States
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [primaryPreview, setPrimaryPreview] = useState<string | null>(null);
  const [removedPrimary, setRemovedPrimary] = useState(false);

  // New uploads
  const [optionalImages, setOptionalImages] = useState<File[]>([]);
  const [optionalPreviews, setOptionalPreviews] = useState<string[]>([]);

  // Existing (for edit mode)
  const [existingOptionalPaths, setExistingOptionalPaths] = useState<string[]>([]);
  const [existingOptionalPreviews, setExistingOptionalPreviews] = useState<string[]>([]);
  const [removedExistingOptional, setRemovedExistingOptional] = useState<string[]>([]);

  const [certificates, setCertificates] = useState<File[]>([]);
  const [certificatePreviews, setCertificatePreviews] = useState<string[]>([]);
  const [existingCertificatePaths, setExistingCertificatePaths] = useState<string[]>([]);
  const [existingCertificatePreviews, setExistingCertificatePreviews] = useState<string[]>([]);
  const [removedExistingCertificates, setRemovedExistingCertificates] = useState<string[]>([]);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // General Product States
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [quality, setQuality] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("kg");
  const [minimumOrder, setMinimumOrder] = useState(1);
  const [packagingSize, setPackagingSize] = useState("");

  const [npk, setNpk] = useState({ nitrogen: "", phosphorous: "", potassium: "" });
  const [otherNutrition, setOtherNutrition] = useState({ organicMatter: "", moisture: "", ph: "" });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [micronutrients, setMicronutrients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newMicronutrient, setNewMicronutrient] = useState("");

  const [manufacturingDetails, setManufacturingDetails] = useState("");
  const [soilType, setSoilType] = useState("");
  const [instructions, setInstructions] = useState("");
  const [safetyStorage, setSafetyStorage] = useState("");

  const [activeTab, setActiveTab] = useState<"basic" | "nutrition" | "images" | "advanced">("basic");

  // Vehicle States
  const [vehicleType, setVehicleType] = useState("");
  const [brandModel, setBrandModel] = useState("");
  const [vehiclePublishedDate, setVehiclePublishedDate] = useState("");
  const [enginePower, setEnginePower] = useState("");
  const [condition, setCondition] = useState("new");
  const [forRent, setForRent] = useState(false);
  const [rentalPrice, setRentalPrice] = useState("");
  const [vehicleQuantity, setVehicleQuantity] = useState("1");

  // Tool States
  const [toolName, setToolName] = useState("");
  const [toolType, setToolType] = useState("manual");
  const [powerSource, setPowerSource] = useState("manual");
  const [workingWidth, setWorkingWidth] = useState("");
  const [toolQuantity, setToolQuantity] = useState("1");
  const [toolPublishedDate, setToolPublishedDate] = useState("");

  // Categories & Quality
  const categories = [
    "Fertilizer", "Seeds", "Pesticides", "Herbicides", "Fungicides", "Insecticides",
    "Organic Fertilizer", "Compost", "Bio Fertilizer", "Plant Growth Regulator",
    "Animal Feed", "Poultry Feed", "Livestock Medicine", "Irrigation Equipment",
    "Farm Tools", "Greenhouse Materials", "Nursery Plants", "Coconut Products",
    "Tea Fertilizer", "Rice Seeds", "Vegetable Seeds", "Fruit Plants",
  ];

  const qualityGrades = [
    "Premium Grade", "Grade A", "Grade B", "Grade C", "Organic Certified",
    "SLS Certified", "Export Quality", "Local Market", "First Class", "Second Class",
    "Farm Fresh", "Non-GMO",
  ];

  // Populate when editing; clear editor when product type changes
  useEffect(() => {
    setErrors({});
    if (product) {
      setProductType(product.product_type || 'general');
      setName(product.name || '');
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setQuality(product.quality || '');
      setPrice(product.price ? String(product.price) : '');
      setQuantity(product.quantity ? String(product.quantity) : '');
      setQuantityUnit(product.quantity_unit || 'kg');
      setMinimumOrder(product.minimum_order || 1);
      setPackagingSize(product.packaging_size || '');

      // Nutrition
      setNpk(product.npk || { nitrogen: '', phosphorous: '', potassium: '' });
      setOtherNutrition(product.other_nutrition || { organicMatter: '', moisture: '', ph: '' });
      setIngredients(product.ingredients || []);
      setMicronutrients(product.micronutrients || []);

      setManufacturingDetails(product.manufacturing_details || '');
      setSoilType(product.soil_type || '');
      setInstructions(product.instructions || '');
      setSafetyStorage(product.safety_storage || '');

      // Vehicle
      setVehicleType(product.vehicle_type || '');
      setBrandModel(product.brand_model || '');
      setVehiclePublishedDate(product.year ? String(product.year) + '-01-01' : '');
      setEnginePower(product.engine_power_hp || '');
      setCondition(product.condition || 'new');
      setForRent(Boolean(product.for_rent));
      setRentalPrice(product.rental_price_per_day ? String(product.rental_price_per_day) : '');
      setVehicleQuantity(product.quantity ? String(product.quantity) : '1');

      // Tool
      setToolName(product.tool_name || '');
      setToolType(product.tool_type || 'manual');
      setPowerSource(product.power_source || 'manual');
      setWorkingWidth(product.working_width || '');
      setToolQuantity(product.quantity ? String(product.quantity) : '1');
      setToolPublishedDate(product.year ? String(product.year) + '-01-01' : '');

      // Images & certificates
      setPrimaryPreview(product.primary_image_url || null);
      setExistingOptionalPaths(product.optional_images || []);
      setExistingOptionalPreviews(product.optional_images_urls || []);
      setExistingCertificatePaths(product.certificates || []);
      setExistingCertificatePreviews(product.certificates_urls || []);

      // Description
      if (product.description) {
        editor?.commands.setContent(product.description);
      }
    } else {
      // New product: clear editor when productType changes
      editor?.commands.clearContent();
    }
  }, [product, productType, editor]);

  // Image Handlers
  const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrimaryImage(file);
      setPrimaryPreview(URL.createObjectURL(file));
      setRemovedPrimary(false);
      setErrors(prev => ({ ...prev, primary_image: "" }));
    }
  };

  const handleOptionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setOptionalImages(prev => [...prev, ...newFiles]);
      newFiles.forEach(file => setOptionalPreviews(prev => [...prev, URL.createObjectURL(file)]));
    }
  };

  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setCertificates(prev => [...prev, ...newFiles]);
      newFiles.forEach(file => setCertificatePreviews(prev => [...prev, URL.createObjectURL(file)]));
    }
  };

  const removePrimaryImage = () => {
    if (primaryPreview && isEdit && !primaryImage) {
      // removing existing primary
      setRemovedPrimary(true);
    }
    setPrimaryImage(null);
    setPrimaryPreview(null);
  };

  const removeOptionalImage = (i: number) => {
    // if it's a newly added image
    if (i < optionalPreviews.length) {
      setOptionalImages(p => p.filter((_, x) => x !== i));
      setOptionalPreviews(p => p.filter((_, x) => x !== i));
      return;
    }
    // otherwise it's an existing image (index shifted by new previews length)
    const existingIndex = i - optionalPreviews.length;
    const path = existingOptionalPaths[existingIndex];
    if (path) {
      setRemovedExistingOptional(prev => [...prev, path]);
      setExistingOptionalPaths(p => p.filter((_, x) => x !== existingIndex));
      setExistingOptionalPreviews(p => p.filter((_, x) => x !== existingIndex));
    }
  };

  const removeCertificate = (i: number) => {
    if (i < certificatePreviews.length) {
      setCertificates(p => p.filter((_, x) => x !== i));
      setCertificatePreviews(p => p.filter((_, x) => x !== i));
      return;
    }
    const existingIndex = i - certificatePreviews.length;
    const path = existingCertificatePaths[existingIndex];
    if (path) {
      setRemovedExistingCertificates(prev => [...prev, path]);
      setExistingCertificatePaths(p => p.filter((_, x) => x !== existingIndex));
      setExistingCertificatePreviews(p => p.filter((_, x) => x !== existingIndex));
    }
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Common required fields
    if (!primaryImage && !primaryPreview) newErrors.primary_image = t("Primary image is required");
    if (!price || Number(price) <= 0) newErrors.price = t("Valid price is required");

    const descriptionHTML = editor?.getHTML().trim() || "";
    if (!descriptionHTML || descriptionHTML === "<p></p>") {
      newErrors.description = t("Description is required");
    }

    if (productType === "general") {
      if (!name.trim()) newErrors.name = t("Product name is required");
      if (!category) newErrors.category = t("Category is required");
      if (!quality) newErrors.quality = t("Quality grade is required");
      if (!quantity || Number(quantity) <= 0) newErrors.quantity = t("Valid quantity is required");
    }

    if (productType === "vehicle") {
      if (!brandModel.trim()) newErrors.brand_model = t("Vehicle name/model is required");
      if (!vehicleType) newErrors.vehicle_type = t("Vehicle type is required");
      if (!vehiclePublishedDate) newErrors.published_date = t("Published date is required");
      if (!vehicleQuantity || Number(vehicleQuantity) < 1) newErrors.quantity = t("Quantity must be at least 1");
    }

    if (productType === "tool") {
      if (!toolName.trim()) newErrors.tool_name = t("Tool name is required");
      if (!toolType) newErrors.tool_type = t("Tool type is required");
      if (!powerSource) newErrors.power_source = t("Power source is required");
      if (!toolPublishedDate) newErrors.published_date = t("Published date is required");
      if (!toolQuantity || Number(toolQuantity) < 1) newErrors.quantity = t("Quantity must be at least 1");
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error (and switch tabs if needed so the element exists)
      const firstErrorKey = Object.keys(newErrors)[0];

      const vehicleKeys = ['brand_model', 'vehicle_type', 'published_date', 'engine_power', 'condition', 'quantity'];
      const toolKeys = ['tool_name', 'power_source', 'published_date', 'quantity'];

      let el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (!el) {
        if (vehicleKeys.includes(firstErrorKey)) {
          setProductType('vehicle');
          setActiveTab('basic');
        } else if (toolKeys.includes(firstErrorKey)) {
          setProductType('tool');
          setActiveTab('basic');
        }
        el = document.querySelector(`[name="${firstErrorKey}"]`);
      }
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const formData = new FormData();
    formData.append("product_type", productType);

    // Common
    formData.append("name", name || toolName || brandModel || "Unnamed Item");
    formData.append("brand", brand || brandModel || "");
    formData.append("price", price);
    formData.append("description", editor?.getHTML() || "");

    // Images
    if (primaryImage) formData.append("primary_image", primaryImage);
    if (removedPrimary) formData.append('remove_primary', '1');

    optionalImages.forEach((f, i) => formData.append(`optional_images[${i}]`, f));
    // include removed existing optional image paths
    removedExistingOptional.forEach((p, i) => formData.append(`remove_optional_images[${i}]`, p));

    certificates.forEach((f, i) => formData.append(`certificates[${i}]`, f));
    removedExistingCertificates.forEach((p, i) => formData.append(`remove_certificates[${i}]`, p));

    // if editing, mark method and product id
    if (isEdit && product) {
      formData.append('_method', 'put');
    }

    // General
    if (productType === "general") {
      formData.append("category", category);
      formData.append("quality", quality);
      formData.append("quantity", quantity);
      formData.append("quantity_unit", quantityUnit);
      formData.append("minimum_order", minimumOrder.toString());
      formData.append("packaging_size", packagingSize);

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
    }

    // Vehicle
    if (productType === "vehicle") {
      formData.append("category", "vehicle");
      formData.append("quantity", vehicleQuantity);
      formData.append("quantity_unit", "units");
      formData.append("vehicle_type", vehicleType);
      formData.append("brand_model", brandModel);
      formData.append("published_date", vehiclePublishedDate);
      formData.append("condition", condition);
      formData.append("for_rent", forRent ? "1" : "0");
      if (forRent) formData.append("rental_price_per_day", rentalPrice);
      formData.append("vehicle_features", editor?.getHTML() || "");
    }

    // Tool
    if (productType === "tool") {
      formData.append("category", "farm_tool");
      formData.append("quantity", toolQuantity);
      formData.append("quantity_unit", "units");
      formData.append("tool_name", toolName);
      formData.append("tool_type", toolType);
      formData.append("power_source", powerSource);
      formData.append("working_width", workingWidth);
      formData.append("published_date", toolPublishedDate);
      formData.append("tool_features", editor?.getHTML() || "");
    }

    if (isEdit && product) {
      // Update
      router.post(route('suppliers.products.update', product.id), formData, {
        forceFormData: true,
        preserveState: true,
        preserveScroll: true,
      });
    } else {
      // Create
      router.post(route('suppliers.products.store'), formData, {
        forceFormData: true,
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  const RichTextToolbar = () => (
    <div className="flex gap-2 mb-4 flex-wrap">
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={`p-3 rounded-lg ${editor?.isActive('bold') ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
      >
        <Bold size={20} />
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`p-3 rounded-lg ${editor?.isActive('bulletList') ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
      >
        <List size={20} />
      </button>
    </div>
  );

  const ImageUploadSection = () => (
    <div className="space-y-8">
      {/* Primary Image */}
      <div>
        <label className="block font-bold text-base sm:text-lg mb-3">
          {t("Primary Image")} <span className="text-red-600">*</span>
        </label>
        <input
          type="file"
          name="primary_image"
          accept="image/*"
          onChange={handlePrimaryImageChange}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:bg-green-600 file:text-white hover:file:bg-green-700"
        />
        {errors.primary_image && <p className="text-red-600 text-sm mt-1">{errors.primary_image}</p>}
        {primaryPreview && (
          <div className="mt-4 relative inline-block">
            <img src={primaryPreview} alt="Primary" className="max-w-full h-auto max-h-80 rounded-lg shadow-lg" />
            <button type="button" onClick={removePrimaryImage} className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full">
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Optional Images */}
      <div>
        <label className="block font-bold text-base sm:text-lg mb-3">{t("Optional Images")}</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleOptionalImagesChange}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {/* New uploads first */}
          {optionalPreviews.map((src, i) => (
            <div key={`n-${i}`} className="relative">
              <img src={src} alt={`Optional new ${i + 1}`} className="w-full h-48 object-cover rounded-lg shadow" />
              <button type="button" onClick={() => removeOptionalImage(i)} className="absolute top-1 right-1 bg-red-600 text-white p-1.5 rounded-full">
                <X size={16} />
              </button>
            </div>
          ))}

          {/* Existing images (edit mode) */}
          {existingOptionalPreviews.map((src, i) => (
            <div key={`e-${i}`} className="relative">
              <img src={src} alt={`Optional existing ${i + 1}`} className="w-full h-48 object-cover rounded-lg shadow" />
              <button type="button" onClick={() => removeOptionalImage(optionalPreviews.length + i)} className="absolute top-1 right-1 bg-red-600 text-white p-1.5 rounded-full">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <label className="block font-bold text-base sm:text-lg mb-3">{t("Certificates & Test Reports")}</label>
        <input
          type="file"
          multiple
          onChange={handleCertificatesChange}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {/* New upload certificates */}
          {certificatePreviews.map((src, i) => (
            <div key={`n-cert-${i}`} className="relative">
              {certificates[i]?.type.includes("image") ? (
                <img src={src} alt={`Cert ${i + 1}`} className="w-full h-48 object-cover rounded-lg shadow" />
              ) : (
                <div className="bg-gray-100 border-2 border-dashed rounded-lg p-6 text-center">
                  <p className="text-gray-600 font-medium text-sm break-all">{certificates[i]?.name}</p>
                </div>
              )}
              <button type="button" onClick={() => removeCertificate(i)} className="absolute top-1 right-1 bg-red-600 text-white p-1.5 rounded-full">
                <X size={16} />
              </button>
            </div>
          ))}

          {/* Existing certificates */}
          {existingCertificatePreviews.map((src, i) => (
            <div key={`e-cert-${i}`} className="relative">
              <img src={src} alt={`Cert existing ${i + 1}`} className="w-full h-48 object-cover rounded-lg shadow" />
              <button type="button" onClick={() => removeCertificate(certificatePreviews.length + i)} className="absolute top-1 right-1 bg-red-600 text-white p-1.5 rounded-full">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-10 max-w-4xl w-full mx-auto my-6">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-10 p-6 bg-green-100 border-4 border-green-500 rounded-2xl text-center shadow-lg">
          <p className="text-2xl sm:text-3xl font-bold text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Back button when editing */}
      {isEdit && product && (
        <div className="mb-4">
          <button type="button" onClick={() => router.visit(route('suppliers.products.index'))} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-600">
            <ArrowLeft size={18} />
            <span>{t('Back to My Products')}</span>
          </button>
        </div>
      )}

      {/* Product Type Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {[
          { id: "general", label: t("Farming Products") },
          { id: "vehicle", label: t("Machinery") },
          { id: "tool", label: t("Farming Tools") },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setProductType(tab.id as any)}
            className={`px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition ${productType === tab.id
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* General Product */}
        {productType === "general" && (
          <div className="bg-green-50 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2">
              {["basic", "nutrition", "images", "advanced"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-5 py-2 rounded-lg font-medium text-sm sm:text-base transition ${activeTab === tab
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {t(tab === "basic" ? "Basic Information" : tab === "nutrition" ? "Nutritional Info" : tab === "images" ? "Images & Docs" : "Advanced")}
                </button>
              ))}
            </div>

            {activeTab === "basic" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Product Name")} <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Brand Name")}</label>
                  <input type="text" value={brand} onChange={e => setBrand(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Category")} <span className="text-red-600">*</span></label>
                  <select
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={`w-full p-3 border rounded-lg ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">{t("Select category")}</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat.toLowerCase().replace(/\s+/g, "_")}>{t(cat)}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Quality Grade")} <span className="text-red-600">*</span></label>
                  <select
                    name="quality"
                    value={quality}
                    onChange={e => setQuality(e.target.value)}
                    className={`w-full p-3 border rounded-lg ${errors.quality ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">{t("Select quality")}</option>
                    {qualityGrades.map(grade => <option key={grade} value={grade}>{t(grade)}</option>)}
                  </select>
                  {errors.quality && <p className="text-red-600 text-sm mt-1">{errors.quality}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Price (LKR)")} <span className="text-red-600">*</span></label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className={`w-full p-3 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <input type="hidden" name="description" value={editor?.getHTML() || ""} />
                  {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Quantity")} <span className="text-red-600">*</span></label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      min="0"
                      step="0.01"
                      className={`flex-1 p-3 border rounded-lg ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <select value={quantityUnit} onChange={e => setQuantityUnit(e.target.value)} className="p-3 border border-gray-300 rounded-lg">
                      <option value="kg">{t("kg")}</option>
                      <option value="ltr">{t("Liter")}</option>
                      <option value="tons">{t("Tons")}</option>
                      <option value="packets">{t("Packets")}</option>
                      <option value="bags">{t("Bags")}</option>
                    </select>
                  </div>
                  {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Description")} <span className="text-red-600">*</span></label>
                  <RichTextToolbar />
                  <div className={`border rounded-lg p-3 bg-white min-h-40 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}>
                    <EditorContent editor={editor} />
                  </div>
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Minimum Order")}</label>
                  <input type="number" value={minimumOrder} onChange={e => setMinimumOrder(Number(e.target.value) || 1)} min="1" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2 text-base">{t("Packaging Size")}</label>
                  <input type="text" value={packagingSize} onChange={e => setPackagingSize(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., 25kg" />
                </div>
              </div>
            )}

            {/* Nutrition Tab */}
            {activeTab === "nutrition" && (
              <div className="space-y-8">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-bold text-lg text-green-800 mb-4">{t("NPK Ratio")}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input placeholder={t("Nitrogen (%)")} value={npk.nitrogen} onChange={e => setNpk({ ...npk, nitrogen: e.target.value })} className="p-3 border rounded-lg" />
                    <input placeholder={t("Phosphorous (%)")} value={npk.phosphorous} onChange={e => setNpk({ ...npk, phosphorous: e.target.value })} className="p-3 border rounded-lg" />
                    <input placeholder={t("Potassium (%)")} value={npk.potassium} onChange={e => setNpk({ ...npk, potassium: e.target.value })} className="p-3 border rounded-lg" />
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-lg text-blue-800 mb-4">{t("Other Nutritional Values")}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input placeholder={t("Organic Matter (%)")} value={otherNutrition.organicMatter} onChange={e => setOtherNutrition({ ...otherNutrition, organicMatter: e.target.value })} className="p-3 border rounded-lg" />
                    <input placeholder={t("Moisture Content (%)")} value={otherNutrition.moisture} onChange={e => setOtherNutrition({ ...otherNutrition, moisture: e.target.value })} className="p-3 border rounded-lg" />
                    <input placeholder={t("pH Level")} value={otherNutrition.ph} onChange={e => setOtherNutrition({ ...otherNutrition, ph: e.target.value })} className="p-3 border rounded-lg" />
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
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-lg font-bold"
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
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-3 rounded-lg font-bold"
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
            {activeTab === "images" && <ImageUploadSection />}

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
          </div>
        )}

        {/* ====================== VEHICLE FORM ====================== */}
        {productType === "vehicle" && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-10 border-4 border-yellow-400">
            <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-gray-200 pb-4 overflow-x-auto">
              {["basic", "images"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === tab ? "bg-orange-600 text-white" : "bg-gray-100"
                    }`}
                >
                  {tab === "basic" ? t("Basic Information") : t("Images & Docs")}
                </button>
              ))}
            </div>

            {activeTab === "basic" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Vehicle Name / Model")} *</label>
                  <input name="brand_model" value={brandModel} onChange={e => setBrandModel(e.target.value)} required className="w-full p-5 border-2 border-orange-400 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Vehicle Type")} *</label>
                  <select name="vehicle_type" value={vehicleType} onChange={e => setVehicleType(e.target.value)} required className="vehicle_type w-full p-5 border-2 border-orange-400 rounded-xl">
                    <option value="">{t("Select Type")}</option>
                    <option value="tractor">{t("Tractor")}</option>
                    <option value="harvester">{t("Harvester")}</option>
                    <option value="rotavator">{t("Rotavator")}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Date Published / Listed")} *</label>
                  <input name="published_date" type="date" value={vehiclePublishedDate} onChange={e => setVehiclePublishedDate(e.target.value)} required className="w-full p-5 border-2 border-orange-400 rounded-xl" />
                  ...
                  <input type="number" value={vehicleQuantity} onChange={e => setVehicleQuantity(e.target.value)} min="1" required className="w-full p-5 border-2 border-orange-400 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Engine Power (HP)")}</label>
                  <input value={enginePower} onChange={e => setEnginePower(e.target.value)} className="w-full p-5 border-2 border-orange-400 rounded-xl" />
                </div>
                <div>

                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Condition")} *</label>
                  <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full p-5 border-2 border-orange-400 rounded-xl">
                    <option value="new">{t("Brand New")}</option>
                    <option value="used">{t("Used")}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Available Quantity")} *</label>
                  <input name="quantity" type="number" value={vehicleQuantity} onChange={e => setVehicleQuantity(e.target.value)} min="1" required className="w-full p-5 border-2 border-orange-400 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Price (LKR)")} *</label>
                  <input name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-5 border-2 border-orange-400 rounded-xl" />
                </div>
                <div className="flex items-center gap-4">
                  <input type="checkbox" checked={forRent} onChange={e => setForRent(e.target.checked)} className="w-6 h-6" />
                  <label className="text-xl">{t("Available for Rent")}</label>
                </div>
                {forRent && (
                  <div>
                    <label className="block font-bold text-xl text-orange-800 mb-3">{t("Rental Price per Day (LKR)")}</label>
                    <input type="number" value={rentalPrice} onChange={e => setRentalPrice(e.target.value)} className="w-full p-5 border-2 border-orange-400 rounded-xl" />
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className="block font-bold text-xl text-orange-800 mb-3">{t("Description")}</label>
                  <RichTextToolbar />
                  <EditorContent editor={editor} className="border-2 border-orange-400 rounded-xl min-h-64 p-4 bg-white" />
                </div>
              </div>
            )}

            {activeTab === "images" && <ImageUploadSection />}
          </div>
        )}

        {/* ====================== TOOL FORM ====================== */}
        {productType === "tool" && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border-4 border-blue-400">
            <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-gray-200 pb-4 overflow-x-auto">
              {["basic", "images"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100"
                    }`}
                >
                  {tab === "basic" ? t("Basic Information") : t("Images & Docs")}
                </button>
              ))}
            </div>

            {activeTab === "basic" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Tool Name")} *</label>
                  <input name="tool_name" value={toolName} onChange={e => setToolName(e.target.value)} required className="w-full p-5 border-2 border-blue-400 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Tool Type")} *</label>
                  <select name="tool_type" value={toolType} onChange={e => setToolType(e.target.value)} className="w-full p-5 border-2 border-blue-400 rounded-xl">
                    <option value="manual">{t("Hand Tool")}</option>
                    <option value="battery">{t("Battery")}</option>
                    <option value="tractor_mounted">{t("Tractor Mounted")}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Date Published / Listed")} *</label>
                  <input name="published_date" type="date" value={toolPublishedDate} onChange={e => setToolPublishedDate(e.target.value)} required className="w-full p-5 border-2 border-blue-400 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Power Source")} *</label>
                  <select name="power_source" value={powerSource} onChange={e => setPowerSource(e.target.value)} className="w-full p-5 border-2 border-blue-400 rounded-xl">
                    <option value="manual">{t("Manual")}</option>
                    <option value="petrol">{t("Petrol")}</option>
                    <option value="battery">{t("Battery")}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Working Width (cm)")}</label>
                  <input value={workingWidth} onChange={e => setWorkingWidth(e.target.value)} className="w-full p-5 border-2 border-blue-400 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Available Quantity")} *</label>
                  <input name="quantity" type="number" value={toolQuantity} onChange={e => setToolQuantity(e.target.value)} min="1" required className="w-full p-5 border-2 border-blue-400 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Price (LKR)")} *</label>
                  <input name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-5 border-2 border-blue-400 rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-bold text-xl text-blue-800 mb-3">{t("Description")}</label>
                  <RichTextToolbar />
                  <EditorContent editor={editor} className="border-2 border-blue-400 rounded-xl min-h-64 p-4 bg-white" />
                </div>
              </div>
            )}

            {activeTab === "images" && <ImageUploadSection />}
          </div>
        )}

        <div className="text-center pt-8 flex flex-col sm:flex-row sm:justify-center gap-4 items-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl sm:text-2xl px-12 sm:px-16 py-4 sm:py-5 rounded-2xl shadow-xl transition w-full sm:w-auto"
          >
            {isEdit ? t("Update Product") : t("Save Product")}
          </button>

          {isEdit && product && (
            <button
              type="button"
              onClick={() => {
                if (confirm(t('Are you sure you want to delete this product?'))) {
                  router.delete(route('suppliers.products.destroy', product.id));
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-6 py-3 rounded-2xl shadow"
            >
              {t('Delete')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}