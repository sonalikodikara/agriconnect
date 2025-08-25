import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import React from 'react';

type PageProps = {
    auth: {
        user: {
            name: string;
        };
    };
    flash: {
        success?: string;
        error?: string;
    };
};

export default function Dashboard() {
    const { props } = usePage<PageProps>();
    const { auth, flash } = props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    AgriConnect Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="p-4 text-green-800 bg-green-100 border border-green-300 rounded">
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 text-red-800 bg-red-100 border border-red-300 rounded">
                            {flash.error}
                        </div>
                    )}

                    {/* Welcome */}
                    <div className="text-lg font-semibold text-gray-700">
                        Welcome back, {auth.user.name}! 🌱
                    </div>

                    {/* Menu Section */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Card className="shadow hover:shadow-lg transition">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <h3 className="text-lg font-bold text-gray-800">Businesses</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Manage registered businesses
                                </p>
                                <Link href={route('businesses.index')}>
                                    <Button>View Businesses</Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="shadow hover:shadow-lg transition">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <h3 className="text-lg font-bold text-gray-800">Locations</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Manage business locations
                                </p>
                                <Link href={route('locations.index')}>
                                    <Button>Manage Locations</Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="shadow hover:shadow-lg transition">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <h3 className="text-lg font-bold text-gray-800">Quotations</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Create and manage quotations
                                </p>
                                <Link href={route('quotations.index')}>
                                    <Button>Quotations</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
