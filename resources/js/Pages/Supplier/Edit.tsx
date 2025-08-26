import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SupplierForm from '@/Pages/Supplier/components/SupplierForm';

export default function Edit({ supplier, districts, provinces }: any) {
  const form = useForm({
    business_name: supplier.business_name || '',
    contact_person: supplier.contact_person || '',
    email: supplier.email || '',
    phone: supplier.phone || '',
    address: supplier.address || '',
    district: supplier.district || '',
    province: supplier.province || '',
    description: supplier.description || '',
    website: supplier.website || '',
    established: supplier.established || '',
    experience: supplier.experience || '',
    specialization: supplier.specialization || [],
    certifications: supplier.certifications || [],
    profile_image: null as File | null,
    cover_image: null as File | null,
  });

  const save = () => {
    // Inertia supports file uploads with useForm: pass the route and method
    form.post(route('suppliers.update', supplier.id), { _method: 'PUT' });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Supplier" />
      <div className="max-w-4xl mx-auto">
        <SupplierForm
          form={form}
          supplier={supplier}
          districts={districts}
          provinces={provinces}
          onSave={save}
          onBack={() => router.visit(route('suppliers.show', supplier.id))}
        />
      </div>
    </AuthenticatedLayout>
  );
}
