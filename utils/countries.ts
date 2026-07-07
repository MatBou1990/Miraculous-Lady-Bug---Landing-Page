// International country list for the signup form.
// code = ISO 3166-1 alpha-2, dial = international dialing code (E.164 prefix).
// Names are provided in both English and French for the FR/EN toggle.
export interface Country {
  code: string
  dial: string
  en: string
  fr: string
}

export const countries: Country[] = [
  { code: 'FR', dial: '+33', en: 'France', fr: 'France' },
  { code: 'BE', dial: '+32', en: 'Belgium', fr: 'Belgique' },
  { code: 'CH', dial: '+41', en: 'Switzerland', fr: 'Suisse' },
  { code: 'LU', dial: '+352', en: 'Luxembourg', fr: 'Luxembourg' },
  { code: 'MC', dial: '+377', en: 'Monaco', fr: 'Monaco' },
  { code: 'GB', dial: '+44', en: 'United Kingdom', fr: 'Royaume-Uni' },
  { code: 'IE', dial: '+353', en: 'Ireland', fr: 'Irlande' },
  { code: 'DE', dial: '+49', en: 'Germany', fr: 'Allemagne' },
  { code: 'AT', dial: '+43', en: 'Austria', fr: 'Autriche' },
  { code: 'NL', dial: '+31', en: 'Netherlands', fr: 'Pays-Bas' },
  { code: 'ES', dial: '+34', en: 'Spain', fr: 'Espagne' },
  { code: 'PT', dial: '+351', en: 'Portugal', fr: 'Portugal' },
  { code: 'IT', dial: '+39', en: 'Italy', fr: 'Italie' },
  { code: 'DK', dial: '+45', en: 'Denmark', fr: 'Danemark' },
  { code: 'SE', dial: '+46', en: 'Sweden', fr: 'Suède' },
  { code: 'NO', dial: '+47', en: 'Norway', fr: 'Norvège' },
  { code: 'FI', dial: '+358', en: 'Finland', fr: 'Finlande' },
  { code: 'IS', dial: '+354', en: 'Iceland', fr: 'Islande' },
  { code: 'PL', dial: '+48', en: 'Poland', fr: 'Pologne' },
  { code: 'CZ', dial: '+420', en: 'Czechia', fr: 'Tchéquie' },
  { code: 'SK', dial: '+421', en: 'Slovakia', fr: 'Slovaquie' },
  { code: 'HU', dial: '+36', en: 'Hungary', fr: 'Hongrie' },
  { code: 'RO', dial: '+40', en: 'Romania', fr: 'Roumanie' },
  { code: 'BG', dial: '+359', en: 'Bulgaria', fr: 'Bulgarie' },
  { code: 'GR', dial: '+30', en: 'Greece', fr: 'Grèce' },
  { code: 'HR', dial: '+385', en: 'Croatia', fr: 'Croatie' },
  { code: 'SI', dial: '+386', en: 'Slovenia', fr: 'Slovénie' },
  { code: 'RS', dial: '+381', en: 'Serbia', fr: 'Serbie' },
  { code: 'EE', dial: '+372', en: 'Estonia', fr: 'Estonie' },
  { code: 'LV', dial: '+371', en: 'Latvia', fr: 'Lettonie' },
  { code: 'LT', dial: '+370', en: 'Lithuania', fr: 'Lituanie' },
  { code: 'UA', dial: '+380', en: 'Ukraine', fr: 'Ukraine' },
  { code: 'TR', dial: '+90', en: 'Türkiye', fr: 'Turquie' },
  { code: 'US', dial: '+1', en: 'United States', fr: 'États-Unis' },
  { code: 'CA', dial: '+1', en: 'Canada', fr: 'Canada' },
  { code: 'MX', dial: '+52', en: 'Mexico', fr: 'Mexique' },
  { code: 'BR', dial: '+55', en: 'Brazil', fr: 'Brésil' },
  { code: 'AR', dial: '+54', en: 'Argentina', fr: 'Argentine' },
  { code: 'CL', dial: '+56', en: 'Chile', fr: 'Chili' },
  { code: 'CO', dial: '+57', en: 'Colombia', fr: 'Colombie' },
  { code: 'PE', dial: '+51', en: 'Peru', fr: 'Pérou' },
  { code: 'MA', dial: '+212', en: 'Morocco', fr: 'Maroc' },
  { code: 'DZ', dial: '+213', en: 'Algeria', fr: 'Algérie' },
  { code: 'TN', dial: '+216', en: 'Tunisia', fr: 'Tunisie' },
  { code: 'SN', dial: '+221', en: 'Senegal', fr: 'Sénégal' },
  { code: 'CI', dial: '+225', en: "Côte d'Ivoire", fr: "Côte d'Ivoire" },
  { code: 'CM', dial: '+237', en: 'Cameroon', fr: 'Cameroun' },
  { code: 'ZA', dial: '+27', en: 'South Africa', fr: 'Afrique du Sud' },
  { code: 'EG', dial: '+20', en: 'Egypt', fr: 'Égypte' },
  { code: 'AE', dial: '+971', en: 'United Arab Emirates', fr: 'Émirats arabes unis' },
  { code: 'SA', dial: '+966', en: 'Saudi Arabia', fr: 'Arabie saoudite' },
  { code: 'IL', dial: '+972', en: 'Israel', fr: 'Israël' },
  { code: 'QA', dial: '+974', en: 'Qatar', fr: 'Qatar' },
  { code: 'IN', dial: '+91', en: 'India', fr: 'Inde' },
  { code: 'CN', dial: '+86', en: 'China', fr: 'Chine' },
  { code: 'JP', dial: '+81', en: 'Japan', fr: 'Japon' },
  { code: 'KR', dial: '+82', en: 'South Korea', fr: 'Corée du Sud' },
  { code: 'SG', dial: '+65', en: 'Singapore', fr: 'Singapour' },
  { code: 'HK', dial: '+852', en: 'Hong Kong', fr: 'Hong Kong' },
  { code: 'TH', dial: '+66', en: 'Thailand', fr: 'Thaïlande' },
  { code: 'MY', dial: '+60', en: 'Malaysia', fr: 'Malaisie' },
  { code: 'ID', dial: '+62', en: 'Indonesia', fr: 'Indonésie' },
  { code: 'PH', dial: '+63', en: 'Philippines', fr: 'Philippines' },
  { code: 'VN', dial: '+84', en: 'Vietnam', fr: 'Viêt Nam' },
  { code: 'AU', dial: '+61', en: 'Australia', fr: 'Australie' },
  { code: 'NZ', dial: '+64', en: 'New Zealand', fr: 'Nouvelle-Zélande' },
]

/** Sorted copy for display in the given locale. */
export function sortedCountries(locale: 'fr' | 'en'): Country[] {
  return [...countries].sort((a, b) => a[locale].localeCompare(b[locale], locale))
}
