import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';

export default function Create() {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        business_name: '',
        contact_person: '',
        email: '',
        phone: '',
        address: '',
        district: '',
        province: '',
        description: '',
        website: '',
        established: '',
        experience: '',
        specialization: [],
        certifications: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('supplier.store'), form);
    };

    return (
        <AuthenticatedLayout>
            <Head title={t('Add Supplier')} />
            <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded shadow">
                <input type="text" name="business_name" value={form.business_name} onChange={handleChange} placeholder={t('Business Name')} className="w-full border p-2 rounded" />
                <input type="text" name="contact_person" value={form.contact_person} onChange={handleChange} placeholder={t('Contact Person')} className="w-full border p-2 rounded" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('Email')} className="w-full border p-2 rounded" />
                <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder={t('Phone')} className="w-full border p-2 rounded" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder={t('Description')} className="w-full border p-2 rounded"></textarea>

                <Button type="submit">{t('Save')}</Button>
            </form>
        </AuthenticatedLayout>
    );
}
