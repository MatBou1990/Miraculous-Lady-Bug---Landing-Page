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

    'signup.introTitleA': 'Ne manquez pas',
    'signup.introTitleB': 'le lever de rideau',
    'signup.introText':
      "Inscrivez-vous pour recevoir en avant-première les dates, l'ouverture de la billetterie et les secrets de fabrication du spectacle.",

    'form.title': "Rejoignez l'aventure",
    'form.lead':
      'Soyez les premiers informés de la billetterie, des dates et des coulisses du spectacle.',
    'form.firstName': 'Prénom',
    'form.firstNamePlaceholder': 'Marinette',
    'form.email': 'E-mail',
    'form.emailPlaceholder': 'vous@exemple.com',
    'form.postalCode': 'Code postal',
    'form.phone': 'Téléphone',
    'form.phonePlaceholder': '06 12 34 56 78',
    'form.optional': '(optionnel)',
    'form.emailConsent':
      "J'accepte de recevoir les actualités et offres du spectacle par e-mail.",
    'form.smsConsent': "J'accepte de recevoir des informations sur le spectacle par SMS.",
    'form.submit': 'Je m’inscris',
    'form.submitting': 'Un instant…',
    'form.legalPre':
      'En vous inscrivant, vous acceptez que vos données soient utilisées pour vous envoyer les communications choisies. Vous pouvez vous désinscrire à tout moment. Pour en savoir plus, consultez notre',
    'form.legalLink': 'politique de confidentialité',
    'form.errEmail': 'Merci de saisir une adresse e-mail valide.',
    'form.errGeneric': "L'inscription a échoué. Réessayez.",
    'form.doneTitle': 'Merci !',
    'form.doneText':
      'Votre inscription est confirmée. Gardez un œil sur votre boîte mail — le rideau se lève bientôt.',

    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    'footer.rights': 'Tous droits réservés.',
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

    'form.title': 'Join the adventure',
    'form.lead':
      'Be the first to know about tickets, dates and the making of the show.',
    'form.firstName': 'First name',
    'form.firstNamePlaceholder': 'Marinette',
    'form.email': 'Email',
    'form.emailPlaceholder': 'you@example.com',
    'form.postalCode': 'Postal code',
    'form.phone': 'Phone',
    'form.phonePlaceholder': '+33 6 12 34 56 78',
    'form.optional': '(optional)',
    'form.emailConsent': 'I agree to receive news and offers about the show by email.',
    'form.smsConsent': 'I agree to receive information about the show by SMS.',
    'form.submit': 'Sign me up',
    'form.submitting': 'One moment…',
    'form.legalPre':
      'By signing up, you agree that your data will be used to send you the communications you selected. You can unsubscribe at any time. To learn more, see our',
    'form.legalLink': 'privacy policy',
    'form.errEmail': 'Please enter a valid email address.',
    'form.errGeneric': 'Sign-up failed. Please try again.',
    'form.doneTitle': 'Thank you!',
    'form.doneText':
      "Your sign-up is confirmed. Keep an eye on your inbox — the curtain rises soon.",

    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    'footer.rights': 'All rights reserved.',
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
