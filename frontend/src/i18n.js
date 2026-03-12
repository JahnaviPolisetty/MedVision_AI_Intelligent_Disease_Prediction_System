import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Placeholder translations for structure
const resources = {
  en: { translation: { "Intelligent Disease Prediction": "Intelligent Disease Prediction" } },
  te: { translation: { "Intelligent Disease Prediction": "ఇంటెలిజెంట్ డిసీజ్ ప్రిడిక్షన్" } },
  hi: { translation: { "Intelligent Disease Prediction": "बुद्धिमान रोग भविष्यवाणी" } },
  ta: { translation: { "Intelligent Disease Prediction": "நுண்ணறிவு நோய் கணிப்பு" } },
  kn: { translation: { "Intelligent Disease Prediction": "ಬುದ್ಧಿವಂತ ರೋಗದ ಮುನ್ಸೂಚನೆ" } },
  ml: { translation: { "Intelligent Disease Prediction": "ഇന്റലിജന്റ് ഡിസീസ് പ്രെഡിക്ഷൻ" } },
  es: { translation: { "Intelligent Disease Prediction": "Predicción Inteligente de Enfermedades" } },
  fr: { translation: { "Intelligent Disease Prediction": "Prédiction Intelligente des Maladies" } },
  de: { translation: { "Intelligent Disease Prediction": "Intelligente Krankheitsprognose" } },
  zh: { translation: { "Intelligent Disease Prediction": "智能疾病预测" } },
  ja: { translation: { "Intelligent Disease Prediction": "インテリジェントな病気予測" } }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
