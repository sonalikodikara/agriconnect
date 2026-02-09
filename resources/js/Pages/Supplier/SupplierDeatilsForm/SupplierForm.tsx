import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';

export default function SupplierForm({
  form,
  supplier,
  districts = [],
  provinces = [],
  onSave,
  onBack,
}: any) {
  const { t } = useTranslation();
  const [localErrors, setLocalErrors] = useState<any>({});

   const [coverPreview, setCoverPreview] = useState<string | null>(
    supplier?.cover_image || null
  );

  const validate = () => {
    const errors: any = {};

    if (!form.data.business_name)
      errors.business_name = t('validation.business_name');

    if (!form.data.email)
      errors.email = t('validation.email_required');

    if (form.data.email && !/\S+@\S+\.\S+/.test(form.data.email))
      errors.email = t('validation.email_invalid');

    if (!form.data.phone)
      errors.phone = t('validation.phone');

    if (!form.data.district)
      errors.district = t('validation.district');

    if (!form.data.province)
      errors.province = t('validation.province');

    if (!form.data.address)
      errors.address = t('validation.address');

    setLocalErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (!validate()) return;
    onSave();
  };

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Name */}
        <div className="mb-6">
        <div
          className="relative h-48 w-full rounded-lg bg-gray-200 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: coverPreview ? `url(${coverPreview})` : undefined,
          }}
        >
          <input
            id="coverUpload"
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              form.setData('cover_image', file);
              setCoverPreview(URL.createObjectURL(file));
            }}
          />

          <label
            htmlFor="coverUpload"
            className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded shadow cursor-pointer text-sm"
          >
            {t('form.cover_image')}
          </label>
        </div>

        <p className="text-red-600 text-sm mt-1">{form.errors.cover_image}</p>
      </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium">
            {t('form.contact_person')}
          </label>
          <input
            type="text"
            value={form.data.contact_person}
            onChange={(e) => form.setData('contact_person', e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">
            {t('form.email')} *
          </label>
          <input
            type="email"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-600 text-sm">
            {localErrors.email || form.errors.email}
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">
            {t('form.phone')} *
          </label>
          <input
            type="text"
            value={form.data.phone}
            onChange={(e) => form.setData('phone', e.target.value)}
            className="w-full p-2 border rounded"
          />
          <p className="text-red-600 text-sm">
            {localErrors.phone || form.errors.phone}
          </p>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium">
            {t('form.district')} *
          </label>
          <select
            value={form.data.district}
            onChange={(e) => form.setData('district', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">{t('form.select')}</option>
            {districts.map((d: string) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <p className="text-red-600 text-sm">
            {localErrors.district || form.errors.district}
          </p>
        </div>

        {/* Province */}
        <div>
          <label className="block text-sm font-medium">
            {t('form.province')} *
          </label>
          <select
            value={form.data.province}
            onChange={(e) => form.setData('province', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">{t('form.select')}</option>
            {provinces.map((p: string) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <p className="text-red-600 text-sm">
            {localErrors.province || form.errors.province}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="mt-4">
        <label className="block text-sm font-medium">
          {t('form.address')} *
        </label>
        <textarea
          value={form.data.address}
          onChange={(e) => form.setData('address', e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <p className="text-red-600 text-sm">
          {localErrors.address || form.errors.address}
        </p>
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="block text-sm font-medium">
          {t('form.description')}
        </label>
        <textarea
          value={form.data.description}
          onChange={(e) => form.setData('description', e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>

      {/* Images */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            {t('form.profile_image')}
          </label>
          <input
            type="file"
            onChange={(e) =>
              form.setData('profile_image', e.target.files?.[0] ?? null)
            }
          />
          <p className="text-red-600 text-sm">{form.errors.profile_image}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">
            {t('form.cover_image')}
          </label>
          <input
            type="file"
            onChange={(e) =>
              form.setData('cover_image', e.target.files?.[0] ?? null)
            }
          />
          <p className="text-red-600 text-sm">{form.errors.cover_image}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded border"
        >
          {t('form.cancel')}
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded bg-yellow-500 text-green-900 font-semibold"
          disabled={form.processing}
        >
          {t('form.save')}
        </button>
      </div>
    </form>
  );
}
