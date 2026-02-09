import React from 'react';
import { Button } from './button';
import useMainNavItems from '@/hooks/useMainNavItems';

export default function Sidebar() {
    const navItems = useMainNavItems();

    return (
        <div className="w-64 bg-gray-100 h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <ul className="space-y-2">
                {navItems.map((item: { action: React.MouseEventHandler<HTMLButtonElement> | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
                    <li key={index}>
                        <Button onClick={item.action} className="w-full text-left">
                            {item.label}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
