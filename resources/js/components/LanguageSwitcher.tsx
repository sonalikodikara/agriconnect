import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex gap-2 mt-2">
            <button onClick={() => changeLanguage('en')} className="px-2 py-1 bg-white rounded">English</button>
            <button onClick={() => changeLanguage('si')} className="px-2 py-1 bg-white rounded">සිංහල</button>
            <button onClick={() => changeLanguage('ta')} className="px-2 py-1 bg-white rounded">தமிழ்</button>
        </div>
    );
}
