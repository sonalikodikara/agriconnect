import React from 'react';
import { Button } from './button';
import useMainNavItems from '@/hooks/useMainNavItems';

export default function Sidebar() {
    const navItems = useMainNavItems();

    return (
        <div className="w-64 bg-gray-100 h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <ul className="space-y-2">
                {navItems.map((item: { title: string; href: string }, index: number) => (
                    <li key={index}>
                        <Button onClick={() => window.location.href = item.href} className="w-full text-left">
                            {item.title}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
