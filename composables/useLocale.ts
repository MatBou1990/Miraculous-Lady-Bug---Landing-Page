// Lightweight FR/EN toggle for the landing page. French is the launch default;
// English exists so clients can review/approve in English.
export type Locale = 'fr' | 'en'

type Dict = Record<string, string>

const messages: Record<Locale, Dict> = {
  fr: {
    'hero.tagline': 'Vos héros préférés prennent enfin vie sur scène.',
    'hero.cta': "Je m'inscris",
    'hero.logoAlt': 'Miraculous : Ladybug & Cat Noir — Le Spectacle Live',
    'hero.scrollAria': "Aller à l'inscription",

    'signup.introTitleA': 'Ramenez Ladybug & Cat Noir',
    'signup.introTitleB': 'dans votre ville',
    'signup.introText':
      'Envie de voir Miraculous Ladybug & Cat Noir : The Live Stage Spectacular près de chez vous ? Inscrivez-vous pour manifester votre intérêt et être les premiers informés des dates, des salles et de la billetterie.',

    'form.title': 'Soyez notifié·e',
    'form.lead':
      'Nous vous enverrons les dates, les salles et les informations de billetterie dès leur annonce.',
    'form.firstName': 'Prénom',
    'form.firstNamePlaceholder': 'Votre prénom',
    'form.email': 'E-mail',
    'form.emailPlaceholder': 'vous@exemple.com',
    'form.city': 'Ville',
    'form.cityPlaceholder': 'Sélectionnez votre ville',
    'form.cityOther': 'Autre',
    'form.postalCode': 'Code postal',
    'form.phone': 'Téléphone',
    'form.phonePlaceholder': '6 12 34 56 78',
    'form.dialCode': 'Indicatif',
    'form.optional': '(optionnel)',
    'form.emailConsent':
      "J'accepte de recevoir par e-mail les actualités, mises à jour, offres et contenus exclusifs liés à Miraculous Ladybug & Cat Noir : The Live Stage Spectacular.",
    'form.smsConsent':
      "J'accepte de recevoir par SMS les actualités, mises à jour et offres liées à Miraculous Ladybug & Cat Noir : The Live Stage Spectacular. En fournissant votre numéro, vous acceptez de recevoir des SMS concernant le spectacle. Des frais de message et de données peuvent s'appliquer. Répondez STOP pour vous désinscrire.",
    'form.age': "Je confirme avoir 16 ans ou plus.",
    'form.smsNote': '',
    'form.submit': 'Restez informé·e',
    'form.submitting': 'Un instant…',
    'form.legalPre':
      'En vous inscrivant, vous acceptez que vos données soient utilisées pour vous envoyer les communications choisies. Vous pouvez vous désinscrire à tout moment. Pour en savoir plus, consultez notre',
    'form.legalLink': 'politique de confidentialité',
    'form.errEmail': 'Merci de saisir une adresse e-mail valide.',
    'form.errCity': 'Merci de sélectionner votre ville.',
    'form.errPostal': "Merci d'indiquer votre code postal.",
    'form.errAge': 'Vous devez confirmer avoir 16 ans ou plus.',
    'form.errGeneric': "L'inscription a échoué. Réessayez.",
    'form.doneTitle': 'Merci !',
    'form.doneText':
      'Votre inscription est confirmée. Gardez un œil sur votre boîte mail — le rideau se lève bientôt.',

    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    'footer.rights': 'ALL RIGHTS RESERVED',
    'footer.trademark': '© 2026 | Miraculous® is a registered trademark of MIRACULOUS CORP.',
    'footer.production':
      '© 2026 | Miraculous Ladybug & Cat Noir The Live Stage Spectacular by MIRACULOUS CORP. & MONLOVE INTERNATIONAL',
  },
  en: {
    'hero.tagline': 'Your favourite heroes finally come to life on stage.',
    'hero.cta': 'Count me in',
    'hero.logoAlt': 'Miraculous: Ladybug & Cat Noir — The Live Stage Spectacular',
    'hero.scrollAria': 'Go to sign-up',

    'signup.introTitleA': 'Bring Ladybug & Cat Noir',
    'signup.introTitleB': 'to your city',
    'signup.introText':
      'Want to see Miraculous Ladybug & Cat Noir: The Live Stage Spectacular near you? Sign up to show your interest and be the first to know about show dates, venues and tickets.',

    'form.title': 'Get notified',
    'form.lead':
      "We'll send you show dates, venues and ticket information as soon as they're announced.",
    'form.firstName': 'First name',
    'form.firstNamePlaceholder': 'Your first name',
    'form.email': 'Email',
    'form.emailPlaceholder': 'you@example.com',
    'form.city': 'City',
    'form.cityPlaceholder': 'Select your city',
    'form.cityOther': 'Other',
    'form.postalCode': 'Postal code',
    'form.phone': 'Phone',
    'form.phonePlaceholder': '6 12 34 56 78',
    'form.dialCode': 'Dialing code',
    'form.optional': '(optional)',
    'form.emailConsent':
      'I agree to receive news, updates, offers and exclusive content related to Miraculous Ladybug & Cat Noir: The Live Stage Spectacular by email.',
    'form.smsConsent':
      'I agree to receive news, updates and offers related to Miraculous Ladybug & Cat Noir: The Live Stage Spectacular by SMS. By providing your number, you agree to receive SMS communications about the show. Message and data rates may apply. Reply STOP to opt out.',
    'form.age': 'I confirm I am 16 or older.',
    'form.smsNote': '',
    'form.submit': 'Keep me posted',
    'form.submitting': 'One moment…',
    'form.legalPre':
      'By signing up, you agree that your data will be used to send you the communications you selected. You can unsubscribe at any time. To learn more, see our',
    'form.legalLink': 'privacy policy',
    'form.errEmail': 'Please enter a valid email address.',
    'form.errCity': 'Please select your city.',
    'form.errPostal': 'Please enter your postal code.',
    'form.errAge': 'You must confirm you are 16 or older.',
    'form.errGeneric': 'Sign-up failed. Please try again.',
    'form.doneTitle': 'Thank you!',
    'form.doneText':
      "Your sign-up is confirmed. Keep an eye on your inbox — the curtain rises soon.",

    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.rights': 'ALL RIGHTS RESERVED',
    'footer.trademark': '© 2026 | Miraculous® is a registered trademark of MIRACULOUS CORP.',
    'footer.production':
      '© 2026 | Miraculous Ladybug & Cat Noir The Live Stage Spectacular by MIRACULOUS CORP. & MONLOVE INTERNATIONAL',
  },
}

export function useLocale() {
  // English is the default for now (client review / approval). Toggle to FR.
  const locale = useState<Locale>('locale', () => 'en')

  const t = (key: string): string => messages[locale.value][key] ?? key

  const toggle = () => {
    locale.value = locale.value === 'fr' ? 'en' : 'fr'
  }

  return { locale, t, toggle }
}
