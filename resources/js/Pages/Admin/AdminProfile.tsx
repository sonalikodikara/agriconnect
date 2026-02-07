import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AdminProfile() {
    const { t } = useTranslation();

    return (
        <div className="p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">{t('advisor.profile')}</h2>
            <p>{t('advisor.instructions')}</p>
        </div>
    );
}
