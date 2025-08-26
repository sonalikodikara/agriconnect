import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next';
import { Button } from '@/Components/ui/button';

export default function Index() {
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
        profile_image: null as File | null,
        cover_image: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]){
            setForm({...form, [e.target.name]: e.target.files[0]});
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if(value) formData.append(key, value as any);
        });

        router.post(route('supplier.store'), formData);
    };

    return (
        <AuthenticatedLayout>
            <Head title={t('Supplier Profile')} />

            <div className="max-w-5xl mx-auto p-6 space-y-6 bg-white rounded shadow">
                <h2 className="text-xl font-bold">{t('Create Supplier Profile')}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Images */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium">{t('Profile Picture')}</label>
                            <input type="file" name="profile_image" onChange={handleFileChange} className="mt-2"/>
                        </div>
                        <div>
                            <label className="block font-medium">{t('Cover Image')}</label>
                            <input type="file" name="cover_image" onChange={handleFileChange} className="mt-2"/>
                        </div>
                    </div>

                    {/* Supplier Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium">{t('Business Name')} *</label>
                            <input type="text" name="business_name" value={form.business_name} onChange={handleChange} className="w-full border rounded px-2 py-1"/>
                        </div>
                        <div>
                            <label className="block font-medium">{t('Contact Person')}</label>
                            <input type="text" name="contact_person" value={form.contact_person} onChange={handleChange} className="w-full border rounded px-2 py-1"/>
                        </div>

                        <div>
                            <label className="block font-medium">{t('Email')}</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-2 py-1"/>
                        </div>
                        <div>
                            <label className="block font-medium">{t('Phone')}</label>
                            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-2 py-1"/>
                        </div>

                        <div>
                            <label className="block font-medium">{t('District')}</label>
                            <select name="district" value={form.district} onChange={handleChange} className="w-full border rounded px-2 py-1">
                                <option value="">{t('Select district')}</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Kandy">Kandy</option>
                                {/* Add all districts */}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">{t('Province')}</label>
                            <select name="province" value={form.province} onChange={handleChange} className="w-full border rounded px-2 py-1">
                                <option value="">{t('Select province')}</option>
                                <option value="Western">Western</option>
                                <option value="Central">Central</option>
                                {/* Add all provinces */}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">{t('Address')}</label>
                        <textarea name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-2 py-1"/>
                    </div>

                    <div>
                        <label className="block font-medium">{t('Description')}</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-2 py-1"/>
                    </div>

                    <Button type="submit">{t('Save Profile')}</Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
