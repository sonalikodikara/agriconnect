import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import SupplierProfile from '@/Pages/Dashboard/SupplierProfile';
import AdvisorProfile from './Dashboard/AdvisorProfile';
import AdminProfile from './Dashboard/AdminProfile';
import BuyerProfile from './Dashboard/BuyerProfile';

export default function Dashboard() {
    const { props } = usePage();
    const user = props.auth.user;
    const { t } = useTranslation();

    const renderProfile = () => {
        switch (user.role) {
            case 'supplier':
                return <SupplierProfile />;
            case 'advisor':
                return <AdvisorProfile />;
            case 'admin':
                return <AdminProfile />;
            case 'buyer':
                return <BuyerProfile />;
            default:
                return <div>{t('No profile available')}</div>;
        }
    };

    return (
        <AuthenticatedLayout
        >
            <Head title={t('Dashboard')} />
            <div className="py-8 max-w-5xl mx-auto">{renderProfile()}</div>
        </AuthenticatedLayout>
    );
}
