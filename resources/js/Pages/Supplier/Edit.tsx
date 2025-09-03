import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { FaCamera, FaTimes, FaPlus, FaHome } from 'react-icons/fa';
import { toast } from '@/hooks/use-toast';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface Props {
  supplier: any;
  districts: { key: string; label: string }[];
  provinces: { key: string; label: string }[];
}

interface SupplierFormData {
  business_name: string;
  contact_person: string;
  email: string;
  phone: string;
  district: string;
  province: string;
  address: string;
  description: string;
  website: string;
  established: string;
  experience: string;
  specialization: string[];
  certifications: string[];
  profile_image: File | string | null;
  cover_image: File | string | null;
}

export default function Edit({ supplier, districts, provinces }: Props) {
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const form = useForm<SupplierFormData>({
    business_name: supplier?.business_name || '',
    contact_person: supplier?.contact_person || '',
    email: supplier?.email || '',
    phone: supplier?.phone || '',
    district: supplier?.district || '',
    province: supplier?.province || '',
    address: supplier?.address || '',
    description: supplier?.description || '',
    website: supplier?.website || '',
    established: supplier?.established || '',
    experience: supplier?.experience || '',
    specialization: supplier?.specialization || [],
    certifications: supplier?.certifications || [],
    profile_image: supplier?.profile_image || null,
    cover_image: supplier?.cover_image || null,
  });

  const goHome = () => router.visit('/');

  const handleSpecializationAdd = (value: string) => {
    if (value && !form.data.specialization.includes(value)) {
      form.setData('specialization', [...form.data.specialization, value]);
    }
  };

  const handleCertificationAdd = (value: string) => {
    if (value && !form.data.certifications.includes(value)) {
      form.setData('certifications', [...form.data.certifications, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use form.put with the supplier ID
    form.put(route('suppliers.update', supplier.id), {
      forceFormData: true,
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Supplier updated successfully!',
          variant: 'success',
        });
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Validation failed.',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Supplier" />
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gray-50 shadow-lg rounded-lg p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Supplier</h1>
            <button
              type="button"
              onClick={goHome}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <FaHome /> Home
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile & Cover Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Image */}
              <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center relative">
                <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
                <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden relative">
                  {form.data.profile_image ? (
                    typeof form.data.profile_image === 'string' ? (
                      <img src={`/storage/${form.data.profile_image}`} className="w-full h-full object-cover" />
                    ) : (
                      <img src={URL.createObjectURL(form.data.profile_image)} className="w-full h-full object-cover" />
                    )
                  ) : supplier.profile_image ? (
                    <img src={`/storage/${supplier.profile_image}`} className="w-full h-full object-cover" />
                  ) : (
                    <FaCamera className="text-gray-400 text-3xl" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => form.setData('profile_image', e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center relative">
                <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
                <div className="w-full h-48 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden relative">
                  {form.data.cover_image ? (
                    typeof form.data.cover_image === 'string' ? (
                      <img src={`/storage/${form.data.cover_image}`} className="w-full h-full object-cover" />
                    ) : (
                      <img src={URL.createObjectURL(form.data.cover_image)} className="w-full h-full object-cover" />
                    )
                  ) : supplier.cover_image ? (
                    <img src={`/storage/${supplier.cover_image}`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-lg">Upload Cover</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => form.setData('cover_image', e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
              <h2 className="font-bold text-xl text-gray-800">Business Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Business Name</label>
                  <input
                    type="text"
                    value={form.data.business_name}
                    onChange={(e) => form.setData('business_name', e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={form.data.contact_person}
                    onChange={(e) => form.setData('contact_person', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={form.data.email}
                    onChange={(e) => form.setData('email', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.data.phone}
                    onChange={(e) => form.setData('phone', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">District</label>
                  <select
                    value={form.data.district}
                    onChange={(e) => form.setData('district', e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.key} value={d.key}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Province</label>
                  <select
                    value={form.data.province}
                    onChange={(e) => form.setData('province', e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Province</option>
                    {provinces.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Address</label>
                  <textarea
                    value={form.data.address}
                    onChange={(e) => form.setData('address', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-600 font-medium mb-1">Description</label>
                  <textarea
                    value={form.data.description}
                    onChange={(e) => form.setData('description', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Website</label>
                  <input
                    type="url"
                    value={form.data.website}
                    onChange={(e) => form.setData('website', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Established</label>
                  <input
                    type="date"
                    value={form.data.established}
                    onChange={(e) => form.setData('established', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Experience</label>
                  <input
                    type="text"
                    value={form.data.experience}
                    onChange={(e) => form.setData('experience', e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="font-bold text-xl text-gray-800 mb-2">Specialization</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.data.specialization.map((item) => (
                  <span key={item} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1">
                    {item}{' '}
                    <FaTimes
                      className="cursor-pointer"
                      onClick={() => form.setData('specialization', form.data.specialization.filter((s) => s !== item))}
                    />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add specialization"
                  className="border p-2 rounded w-full"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newSpecialization.trim()) {
                        handleSpecializationAdd(newSpecialization.trim());
                        setNewSpecialization('');
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 flex items-center"
                  onClick={() => {
                    if (newSpecialization.trim()) {
                      handleSpecializationAdd(newSpecialization.trim());
                      setNewSpecialization('');
                    }
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="font-bold text-xl text-gray-800 mb-2">Certifications</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.data.certifications.map((item) => (
                  <span key={item} className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1">
                    {item}{' '}
                    <FaTimes
                      className="cursor-pointer"
                      onClick={() => form.setData('certifications', form.data.certifications.filter((c) => c !== item))}
                    />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add certification"
                  className="border p-2 rounded w-full"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newCertification.trim()) {
                        handleCertificationAdd(newCertification.trim());
                        setNewCertification('');
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
                  onClick={() => {
                    if (newCertification.trim()) {
                      handleCertificationAdd(newCertification.trim());
                      setNewCertification('');
                    }
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded font-semibold hover:bg-green-800">
                Save
              </button>
              <button
                type="button"
                onClick={() => router.visit('/supplier/profile')}
                className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
