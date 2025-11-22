import React, { useState } from 'react'; 
import { usePage } from '@inertiajs/react'; 
import { useTranslation } from 'react-i18next';
import { Head, router } from '@inertiajs/react';
import { FaCamera, FaHome, FaTimes, FaPlus } from 'react-icons/fa';
import { toast } from "@/hooks/use-toast"; // import toast

export default function SupplierProfile() {
    const { t } = useTranslation();
    const { auth } = usePage().props; // Get authenticated user
    
    // Access control: Redirect if not supplier
    if (auth.user.role !== 'supplier') {
        router.visit('/'); // Or appropriate fallback
        return null;
    }

    // Form States
    const [businessName, setBusinessName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [established, setEstablished] = useState('');
    const [experience, setExperience] = useState('');
    const [specialization, setSpecialization] = useState<string[]>([]);
    const [certifications, setCertifications] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);

    // Quick add options
    const quickSpecializations = ['Organic Farming', 'Pesticides', 'Fertilizers', 'Livestock', 'Irrigation'];
    const quickCertifications = ['ISO 9001', 'Organic Certificate', 'Quality Certificate', 'Test Report'];
    const [newSpecialization, setNewSpecialization] = useState('');
    const [newCertification, setNewCertification] = useState('');

    const handleSpecializationAdd = (value: string) => {
        if (value && !specialization.includes(value)) {
            setSpecialization([...specialization, value]);
        }
    };

    const handleCertificationAdd = (value: string) => {
        if (value && !certifications.includes(value)) {
            setCertifications([...certifications, value]);
        }
    };

    const handleCancel = () => {
        setBusinessName('');
        setContactPerson('');
        setEmail('');
        setPhone('');
        setDistrict('');
        setProvince('');
        setAddress('');
        setDescription('');
        setWebsite('');
        setEstablished('');
        setExperience('');
        setSpecialization([]);
        setCertifications([]);
        setProfileImage(null);
        setCoverImage(null);
    };

    // Provinces of Sri Lanka
    const provinces = [
    { key: 'Western', label: t('Western Province') },
    { key: 'Central', label: t('Central Province') },
    { key: 'Southern', label: t('Southern Province') },
    { key: 'Northern', label: t('Northern Province') },
    { key: 'Eastern', label: t('Eastern Province') },
    { key: 'North Western', label: t('North Western Province') },
    { key: 'North Central', label: t('North Central Province') },
    { key: 'Uva', label: t('Uva Province') },
    { key: 'Sabaragamuwa', label: t('Sabaragamuwa Province') },
    ];

    // Districts of Sri Lanka
    const districts = [
    { key: 'Colombo', label: t('Colombo') },
    { key: 'Gampaha', label: t('Gampaha') },
    { key: 'Kalutara', label: t('Kalutara') },
    { key: 'Kandy', label: t('Kandy') },
    { key: 'Matale', label: t('Matale') },
    { key: 'Nuwara Eliya', label: t('Nuwara Eliya') },
    { key: 'Galle', label: t('Galle') },
    { key: 'Matara', label: t('Matara') },
    { key: 'Hambantota', label: t('Hambantota') },
    { key: 'Jaffna', label: t('Jaffna') },
    { key: 'Kilinochchi', label: t('Kilinochchi') },
    { key: 'Mannar', label: t('Mannar') },
    { key: 'Vavuniya', label: t('Vavuniya') },
    { key: 'Mullaitivu', label: t('Mullaitivu') },
    { key: 'Batticaloa', label: t('Batticaloa') },
    { key: 'Ampara', label: t('Ampara') },
    { key: 'Trincomalee', label: t('Trincomalee') },
    { key: 'Kurunegala', label: t('Kurunegala') },
    { key: 'Puttalam', label: t('Puttalam') },
    { key: 'Anuradhapura', label: t('Anuradhapura') },
    { key: 'Polonnaruwa', label: t('Polonnaruwa') },
    { key: 'Badulla', label: t('Badulla') },
    { key: 'Monaragala', label: t('Monaragala') },
    { key: 'Ratnapura', label: t('Ratnapura') },
    { key: 'Kegalle', label: t('Kegalle') },
    ];

    const goHome = () => {
         router.visit('/');
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post(
        route("suppliers.store"), // ✅ uses Laravel route helper if you installed ziggy
        {
            business_name: businessName,
            contact_person: contactPerson,
            email,
            phone,
            district,
            province,
            address,
            description,
            website,
            established,
            experience,
            specialization,
            certifications,
            profile_image: profileImage,
            cover_image: coverImage,
        },
        {
            forceFormData: true,
                onSuccess: () => {
                    toast({
                        title: t("Success"),
                        description: t("Supplier saved successfully!"),
                        variant: "success", // optional, depending on your toast config
                    });
                    handleCancel();
                },
                onError: (errors) => {
                    console.error(errors);
                    toast({
                        title: t("Error"),
                        description: t("There were validation errors."),
                        variant: "destructive",
                    });
                },
            }
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Head title={t('Supplier Profile Form')} />
            <div className="bg-gray-50 shadow-lg rounded-lg p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('Supplier Profile Form')}</h1>
                    <button
                        type="button"
                        onClick={goHome}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                    >
                        <FaHome /> {t('Home')}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Profile & Cover Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Image */}
                        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center relative">
                            <label className="block text-gray-700 font-semibold mb-2">{t('Profile Image')}</label>
                            <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden relative">
                                {profileImage ? (
                                    <img
                                        src={URL.createObjectURL(profileImage)}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaCamera className="text-gray-400 text-3xl" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                                className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                            >
                                {t('Upload Photo')}
                            </button>
                        </div>

                        {/* Cover Image */}
                        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center relative">
                            <label className="block text-gray-700 font-semibold mb-2">{t('Cover Image')}</label>
                            <div className="w-full h-48 rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden relative">
                                {coverImage ? (
                                    <img
                                        src={URL.createObjectURL(coverImage)}
                                        alt="Cover Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-lg">{t('Upload Cover')}</span>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                                className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                            >
                                {t('Upload Photo')}
                            </button>
                        </div>
                    </div>

                    
                    {/* Business Information */}
                    <div className="bg-white shadow rounded-lg p-6 space-y-4">
                        <h2 className="font-bold text-xl text-gray-800">{t('Supplier Profile Business Info')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">{t('Business Name')}</label>
                                <input
                                    type="text"
                                    placeholder="Enter business name"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">{t('Contact Person')}</label>
                                <input
                                    type="text"
                                    placeholder="Enter contact person"
                                    value={contactPerson}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">{t('Email')}</label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">{t('Phone')}</label>
                                <input
                                    type="tel"
                                    placeholder="+94 XX XXX XXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            {/* District */}
                            <div>
                            <label className="block text-gray-600 font-medium mb-1">{t('District')}</label>
                            <select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="border p-2 rounded w-full"
                                required
                            >
                                <option value="">{t('Select District')}</option>
                                {districts.map(d => (
                                <option key={d.key} value={d.key}>{d.label}</option>
                                ))}
                            </select>
                            </div>

                            {/* Province */}
                            <div>
                            <label className="block text-gray-600 font-medium mb-1">{t('Province')}</label>
                            <select
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                className="border p-2 rounded w-full"
                                required
                            >
                                <option value="">{t('Select Province')}</option>
                                {provinces.map(p => (
                                <option key={p.key} value={p.key}>{p.label}</option>
                                ))}
                            </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-600 font-medium mb-1">{t('Address')}</label>
                                <textarea
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-600 font-medium mb-1">{t('Description')}</label>
                                <textarea
                                    placeholder="Enter business description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">{t('Website')}</label>
                                <input
                                    type="url"
                                    placeholder="Enter website URL"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">{t('Established')}</label>
                                <input
                                    type="Date"
                                    placeholder="2020"
                                    value={established}
                                    onChange={(e) => setEstablished(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">{t('Experience')}</label>
                                <input
                                    type="text"
                                    placeholder="5+ years"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specializations */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="font-bold text-xl text-gray-800 mb-2">{t('Specialization')}</h2>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {specialization.map((item) => (
                                <span
                                    key={item}
                                    className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                                >
                                    {t(item)} 
                                    <FaTimes className="cursor-pointer" onClick={() => setSpecialization(specialization.filter(s => s !== item))} />
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {quickSpecializations.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    className={`px-3 py-1 rounded border ${specialization.includes(option) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                    onClick={() => handleSpecializationAdd(option)}
                                >
                                    {t(option)}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={t('Add specialization')}
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
                        <h2 className="font-bold text-xl text-gray-800 mb-2">{t('Certifications')}</h2>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {certifications.map((item) => (
                                <span
                                    key={item}
                                    className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                                >
                                    {t(item)} 
                                    <FaTimes className="cursor-pointer" onClick={() => setCertifications(certifications.filter(c => c !== item))} />
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {quickCertifications.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    className={`px-3 py-1 rounded border ${certifications.includes(option) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                    onClick={() => handleCertificationAdd(option)}
                                >
                                    {t(option)}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder={t('Add certification')}
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
                        <button
                            type="submit"
                            className="bg-green-700 text-white px-6 py-3 rounded font-semibold hover:bg-green-800"
                        >
                            {t('Save')}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700"
                        >
                            {t('Cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
