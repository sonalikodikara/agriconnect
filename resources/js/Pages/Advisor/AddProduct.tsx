import { useState } from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";

export default function AddProduct() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/advisor/products", { name, price, description });
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold">{t("Add New Product")}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>{t("Product Name")}</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-full" required />
        </div>
        <div>
          <label>{t("Price")}</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded w-full" required />
        </div>
        <div>
          <label>{t("Description")}</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{t("Save Product")}</button>
      </form>
    </div>
  );
}
