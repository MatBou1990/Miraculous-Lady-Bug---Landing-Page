<script setup lang="ts">
const { locale } = useLocale()
useHead({
  title: () =>
    locale.value === 'fr'
      ? 'Mentions légales — Miraculous : Le Spectacle Live'
      : 'Legal Notice — Miraculous: The Live Stage Spectacular',
})
</script>

<template>
  <LegalPage :title="locale === 'fr' ? 'Mentions légales' : 'Legal Notice'">
    <!-- FRENCH -->
    <template v-if="locale === 'fr'">
      <h2>Éditeur du site</h2>
      <p>
        <span class="todo">[À compléter : raison sociale, forme juridique et capital, adresse du
        siège social, numéro d'immatriculation (RCS / registre équivalent), numéro de TVA,
        directeur de la publication, e-mail et téléphone de contact.]</span>
      </p>

      <h2>Hébergement</h2>
      <p><span class="todo">[À compléter : nom et adresse de l'hébergeur du site.]</span></p>

      <h2>Propriété intellectuelle</h2>
      <p>
        « Miraculous », « Ladybug &amp; Cat Noir », les visuels, logos et l'ensemble des éléments
        du site sont protégés par le droit de la propriété intellectuelle et demeurent la propriété
        de leurs titulaires respectifs.
        <span class="todo">[À compléter : mention des licences / titulaires de droits, ZAG,
        etc.]</span>
        Toute reproduction sans autorisation est interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données personnelles est décrit dans notre
        <NuxtLink to="/confidentialite">politique de confidentialité</NuxtLink>.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site, écrivez-nous à
        <span class="todo">[adresse e-mail de contact]</span>.
      </p>
    </template>

    <!-- ENGLISH -->
    <template v-else>
      <h2>Site publisher</h2>
      <p>
        <span class="todo">[To complete: company name, legal form and share capital, registered
        office address, registration number, VAT number, publication director, contact email and
        phone.]</span>
      </p>

      <h2>Hosting</h2>
      <p><span class="todo">[To complete: name and address of the site's host.]</span></p>

      <h2>Intellectual property</h2>
      <p>
        "Miraculous", "Ladybug &amp; Cat Noir", the artwork, logos and all elements of this site
        are protected by intellectual property law and remain the property of their respective
        owners.
        <span class="todo">[To complete: mention of licences / rights holders, ZAG, etc.]</span>
        Any reproduction without authorisation is prohibited.
      </p>

      <h2>Personal data</h2>
      <p>
        The processing of your personal data is described in our
        <NuxtLink to="/confidentialite">privacy policy</NuxtLink>.
      </p>

      <h2>Contact</h2>
      <p>
        For any question about this site, write to us at
        <span class="todo">[contact email address]</span>.
      </p>
    </template>
  </LegalPage>
</template>
