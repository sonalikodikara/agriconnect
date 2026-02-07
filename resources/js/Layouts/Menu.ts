import { usePage, router } from '@inertiajs/react';

export default function useMainNavItems() {
    const { auth } = usePage().props as {
        auth?: { user?: { role?: string } };
    };

    const role = auth?.user?.role ?? '';

    const dashboardItem = {
        label: 'Dashboard',
        action: () => router.visit(route('dashboard')),
    };

    console.log('User role:', role);

    // Role-specific grouped items
    const adminItems = [
        {
            group: 'Admin Settings',
            items: [
                { label: 'Company Details', action: () => router.visit(route('companies.index')) },
                { label: 'Employees', action: () => router.visit(route('employees.index')) },
                { label: 'Permissions List', action: () => router.visit(route('permissions.index')) },
                { label: 'Users', action: () => router.visit(route('users.index')) },
            ],
        },
    ];

    const supplierItems = [
        {
            group: 'Supplier Menu',
            items: [
                { label: 'Products', action: () => router.visit(route('products.index')) },
                { label: 'Orders', action: () => router.visit(route('orders.index')) },
            ],
        },
    ];

    const buyerItems = [
        {
            group: 'Buyer Menu',
            items: [
                { label: 'Shop', action: () => router.visit(route('shop.index')) },
                { label: 'My Orders', action: () => router.visit(route('orders.index')) },
            ],
        },
    ];

    const advisorItems = [
        {
            group: 'Advisor Menu',
            items: [
                { label: 'Advices', action: () => router.visit(route('advices.index')) },
            ],
        },
    ];

    // Assemble main navigation items based on role
    let mainNavItems: { label: string; action: () => void }[] = [dashboardItem];

    if (role === 'admin') {
        mainNavItems.push(...adminItems.flatMap(group => group.items));
    } else if (role === 'supplier') {
        mainNavItems.push(...supplierItems.flatMap(group => group.items));
    } else if (role === 'buyer') {
        mainNavItems.push(...buyerItems.flatMap(group => group.items));
    } else if (role === 'advisor') {
        mainNavItems.push(...advisorItems.flatMap(group => group.items));
    }

    return mainNavItems;
}
