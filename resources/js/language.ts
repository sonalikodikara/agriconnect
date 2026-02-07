import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lang/en.json';
import si from './lang/si.json';
import ta from './lang/ta.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        si: { translation: si },
        ta: { translation: ta },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;
