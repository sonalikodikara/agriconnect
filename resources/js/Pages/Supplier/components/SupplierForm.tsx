import React from 'react';
import { usePage } from '@inertiajs/react';
import { Input, Textarea } from '@/components/ui'; // adapt to your components or use plain inputs
import { Button } from '@/Components/ui/button';

export default function SupplierForm({ form, supplier, districts = [], provinces = [], onSave, onBack }: any) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Business Name *</label>
          <input type="text" value={form.data.business_name} onChange={(e) => form.setData('business_name', e.target.value)} className="w-full p-2 border rounded" required />
          {form.errors.business_name && <div className="text-red-600 text-sm">{form.errors.business_name}</div>}
        </div>

        <div>
          <label className="block text-sm font-medium">Contact Person</label>
          <input type="text" value={form.data.contact_person} onChange={(e) => form.setData('contact_person', e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input type="text" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">District</label>
          <select value={form.data.district} onChange={(e) => form.setData('district', e.target.value)} className="w-full p-2 border rounded">
            <option value="">Select</option>
            {districts.map((d: string) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Province</label>
          <select value={form.data.province} onChange={(e) => form.setData('province', e.target.value)} className="w-full p-2 border rounded">
            <option value="">Select</option>
            {provinces.map((p: string) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Address</label>
        <textarea value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} className="w-full p-2 border rounded" rows={3} />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} className="w-full p-2 border rounded" rows={4} />
      </div>

      {/* Specialization (simple comma-separated editor) */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Specialization (comma separated)</label>
        <input type="text" value={(form.data.specialization || []).join(', ')} onChange={(e) => {
          const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
          form.setData('specialization', arr);
        }} className="w-full p-2 border rounded" />
      </div>

      {/* Certifications */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Certifications (comma separated)</label>
        <input type="text" value={(form.data.certifications || []).join(', ')} onChange={(e) => {
          const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
          form.setData('certifications', arr);
        }} className="w-full p-2 border rounded" />
      </div>

      {/* Images */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Profile Image</label>
          <input type="file" onChange={(e) => form.setData('profile_image', e.target.files?.[0] ?? null)} />
          {form.errors.profile_image && <div className="text-red-600 text-sm">{form.errors.profile_image}</div>}
        </div>
        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <input type="file" onChange={(e) => form.setData('cover_image', e.target.files?.[0] ?? null)} />
          {form.errors.cover_image && <div className="text-red-600 text-sm">{form.errors.cover_image}</div>}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded border">Cancel</button>
        <button type="submit" className="px-6 py-2 rounded bg-yellow-500 text-green-900 font-semibold" disabled={form.processing}>
          Save
        </button>
      </div>
    </form>
  );
}
