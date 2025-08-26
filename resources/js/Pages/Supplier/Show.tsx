import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ supplier }: any) {
  return (
    <AuthenticatedLayout>
      <Head title={supplier.business_name} />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex items-center gap-4">
          {supplier.profile_image && <img src={`/storage/${supplier.profile_image}`} alt="profile" className="h-24 w-24 object-cover rounded-full" />}
          <div>
            <h1 className="text-2xl font-bold">{supplier.business_name}</h1>
            <p className="text-sm text-gray-600">{supplier.contact_person}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Description</h3>
          <p>{supplier.description}</p>
        </div>

        <div className="mt-4">
          <Link href={route('suppliers.edit', supplier.id)} className="text-green-600">Edit</Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
