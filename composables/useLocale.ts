// Lightweight FR/EN toggle for the landing page. French is the launch default;
// English exists so clients can review/approve in English.
export type Locale = 'fr' | 'en'

type Dict = Record<string, string>

const messages: Record<Locale, Dict> = {
  fr: {
    'hero.tagline': 'Vos héros préférés prennent enfin vie sur scène.',
    'hero.cta': 'Restez informé·e',
    'hero.logoAlt': 'Miraculous : Ladybug & Cat Noir — Le Spectacle Live',
    'hero.scrollAria': "Aller à l'inscription",

    'signup.introTitleA': 'Soyez aux',
    'signup.introTitleB': 'premières loges',
    'signup.introText':
      "Inscrivez-vous pour recevoir en avant-première les dates, l'ouverture de la billetterie et les secrets de fabrication du spectacle.",

    'form.title': 'Offrez à vos enfants un moment magique',
    'form.lead':
      "Soyez informé·e en priorité de l'ouverture de la billetterie et préparez la sortie en famille à ne pas manquer.",
    'form.firstName': 'Prénom',
    'form.firstNamePlaceholder': 'Votre prénom',
    'form.email': 'E-mail',
    'form.emailPlaceholder': 'vous@exemple.com',
    'form.country': 'Pays',
    'form.countryPlaceholder': 'Sélectionnez votre pays',
    'form.postalCode': 'Code postal',
    'form.phone': 'Téléphone',
    'form.phonePlaceholder': '6 12 34 56 78',
    'form.dialCode': 'Indicatif',
    'form.optional': '(optionnel)',
    'form.emailConsent':
      "J'accepte de recevoir par e-mail les actualités et offres du spectacle pour préparer notre sortie en famille.",
    'form.smsConsent': "J'accepte de recevoir des informations sur le spectacle par SMS.",
    'form.age': "Je confirme avoir 16 ans ou plus.",
    'form.smsNote':
      "En indiquant votre numéro, vous acceptez de recevoir des SMS relatifs au spectacle. Des frais peuvent s'appliquer. Répondez STOP pour vous désinscrire.",
    'form.submit': 'Je m’inscris',
    'form.submitting': 'Un instant…',
    'form.legalPre':
      'En vous inscrivant, vous acceptez que vos données soient utilisées pour vous envoyer les communications choisies. Vous pouvez vous désinscrire à tout moment. Pour en savoir plus, consultez notre',
    'form.legalLink': 'politique de confidentialité',
    'form.errEmail': 'Merci de saisir une adresse e-mail valide.',
    'form.errCountry': 'Merci de sélectionner votre pays.',
    'form.errAge': 'Vous devez confirmer avoir 16 ans ou plus.',
    'form.errGeneric': "L'inscription a échoué. Réessayez.",
    'form.doneTitle': 'Merci !',
    'form.doneText':
      'Votre inscription est confirmée. Gardez un œil sur votre boîte mail — le rideau se lève bientôt.',

    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    'footer.rights': 'Tous droits réservés.',
    'footer.license':
      '© [Année] [Titulaire de licence — à compléter]. Miraculous™ et tous les personnages associés sont des marques de leurs détenteurs respectifs. Utilisé sous licence.',
  },
  en: {
    'hero.tagline': 'Your favourite heroes finally come to life on stage.',
    'hero.cta': 'Keep me posted',
    'hero.logoAlt': 'Miraculous: Ladybug & Cat Noir — The Live Stage Spectacular',
    'hero.scrollAria': 'Go to sign-up',

    'signup.introTitleA': "Don't miss",
    'signup.introTitleB': 'the curtain rising',
    'signup.introText':
      'Sign up to be the first to hear about dates, on-sale times and behind-the-scenes secrets of the show.',

    'form.title': 'Give your children a magical night out',
    'form.lead':
      'Be the first to know when tickets go on sale, and plan the family outing not to be missed.',
    'form.firstName': 'First name',
    'form.firstNamePlaceholder': 'Your first name',
    'form.email': 'Email',
    'form.emailPlaceholder': 'you@example.com',
    'form.country': 'Country',
    'form.countryPlaceholder': 'Select your country',
    'form.postalCode': 'Postal code',
    'form.phone': 'Phone',
    'form.phonePlaceholder': '6 12 34 56 78',
    'form.dialCode': 'Dialing code',
    'form.optional': '(optional)',
    'form.emailConsent':
      'I agree to receive news and offers about the show by email to plan our family outing.',
    'form.smsConsent': 'I agree to receive information about the show by SMS.',
    'form.age': 'I confirm I am 16 or older.',
    'form.smsNote':
      'By providing your number, you agree to receive SMS about the show. Message rates may apply. Reply STOP to opt out.',
    'form.submit': 'Sign me up',
    'form.submitting': 'One moment…',
    'form.legalPre':
      'By signing up, you agree that your data will be used to send you the communications you selected. You can unsubscribe at any time. To learn more, see our',
    'form.legalLink': 'privacy policy',
    'form.errEmail': 'Please enter a valid email address.',
    'form.errCountry': 'Please select your country.',
    'form.errAge': 'You must confirm you are 16 or older.',
    'form.errGeneric': 'Sign-up failed. Please try again.',
    'form.doneTitle': 'Thank you!',
    'form.doneText':
      "Your sign-up is confirmed. Keep an eye on your inbox — the curtain rises soon.",

    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.rights': 'All rights reserved.',
    'footer.license':
      '© [Year] [Licence holder — to complete]. Miraculous™ and all related characters are trademarks of their respective owners. Used under licence.',
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
