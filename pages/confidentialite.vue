<script setup lang="ts">
const { locale } = useLocale()
useHead({
  title: () =>
    locale.value === 'fr'
      ? 'Politique de confidentialité — Miraculous : Le Spectacle Live'
      : 'Privacy Policy — Miraculous: The Live Stage Spectacular',
})
</script>

<template>
  <LegalPage :title="locale === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy'">
    <!-- FRENCH -->
    <template v-if="locale === 'fr'">
      <p>
        La présente politique explique quelles données personnelles nous collectons via ce site,
        pourquoi, et quels sont vos droits. Elle s'applique à tous les visiteurs, où qu'ils se
        trouvent dans le monde.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        <span class="todo">[À compléter : raison sociale, forme juridique, adresse du siège,
        e-mail de contact du responsable / DPO.]</span>
      </p>

      <h2>Données que nous collectons</h2>
      <p>Lorsque vous vous inscrivez à nos actualités, nous collectons :</p>
      <ul>
        <li>votre prénom (facultatif) ;</li>
        <li>votre adresse e-mail (obligatoire) ;</li>
        <li>votre code postal (facultatif) ;</li>
        <li>votre numéro de téléphone (facultatif, uniquement si vous le fournissez) ;</li>
        <li>vos choix de consentement (e-mail et/ou SMS).</li>
      </ul>

      <h2>Finalités et base légale</h2>
      <p>
        Ces données sont utilisées uniquement pour vous envoyer les communications que vous avez
        expressément acceptées (actualités, dates, billetterie, coulisses). La base légale est
        votre <strong>consentement</strong>, recueilli au moyen de cases à cocher distinctes et
        décochées par défaut. Vous pouvez le retirer à tout moment.
      </p>

      <h2>Hébergement et transferts internationaux</h2>
      <p>
        Nos communications sont gérées via le prestataire <strong>Brevo</strong>, qui stocke les
        contacts pour notre compte. Le spectacle étant présenté à l'international, vos données
        peuvent être traitées dans plusieurs pays. Nous veillons à ce que ces traitements
        bénéficient de garanties appropriées.
        <span class="todo">[À compléter : localisation des serveurs, mécanismes de transfert le
        cas échéant — clauses contractuelles types, etc.]</span>
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Vos données sont conservées tant que vous êtes inscrit·e, puis supprimées ou anonymisées
        dans un délai raisonnable après votre désinscription.
        <span class="todo">[À compléter : durée précise selon votre politique interne.]</span>
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément aux réglementations applicables (dont le RGPD dans l'Union européenne, et des
        droits équivalents dans d'autres juridictions), vous disposez d'un droit d'accès, de
        rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données.
        Pour les exercer, écrivez-nous à
        <span class="todo">[adresse e-mail de contact]</span>.
      </p>
      <p>
        Vous pouvez vous désinscrire à tout moment via le lien présent dans chaque e-mail, ou en
        répondant STOP à un SMS. Vous avez également le droit d'introduire une réclamation auprès
        de l'autorité de protection des données compétente.
      </p>

      <h2>Mise à jour</h2>
      <p>
        Cette politique pourra être mise à jour. La version en vigueur est celle publiée sur cette
        page. <span class="todo">[Dernière mise à jour : date.]</span>
      </p>
    </template>

    <!-- ENGLISH -->
    <template v-else>
      <p>
        This policy explains what personal data we collect through this site, why, and what your
        rights are. It applies to all visitors, wherever they are in the world.
      </p>

      <h2>Data controller</h2>
      <p>
        <span class="todo">[To complete: company name, legal form, registered address, contact
        email of the controller / DPO.]</span>
      </p>

      <h2>Data we collect</h2>
      <p>When you sign up for our updates, we collect:</p>
      <ul>
        <li>your first name (optional);</li>
        <li>your email address (required);</li>
        <li>your postal code (optional);</li>
        <li>your phone number (optional, only if you provide it);</li>
        <li>your consent choices (email and/or SMS).</li>
      </ul>

      <h2>Purpose and legal basis</h2>
      <p>
        This data is used solely to send you the communications you have expressly agreed to
        (news, dates, ticketing, behind-the-scenes). The legal basis is your
        <strong>consent</strong>, collected via separate checkboxes that are unticked by default.
        You may withdraw it at any time.
      </p>

      <h2>Hosting and international transfers</h2>
      <p>
        Our communications are managed through the provider <strong>Brevo</strong>, which stores
        contacts on our behalf. As the show is presented internationally, your data may be
        processed in several countries. We ensure such processing benefits from appropriate
        safeguards.
        <span class="todo">[To complete: server locations, transfer mechanisms where applicable —
        standard contractual clauses, etc.]</span>
      </p>

      <h2>Retention</h2>
      <p>
        Your data is kept for as long as you remain subscribed, then deleted or anonymised within
        a reasonable period after you unsubscribe.
        <span class="todo">[To complete: precise duration per your internal policy.]</span>
      </p>

      <h2>Your rights</h2>
      <p>
        In accordance with applicable regulations (including the GDPR in the European Union, and
        equivalent rights in other jurisdictions such as the UK GDPR, CCPA/CPRA, PIPEDA and LGPD),
        you have the right to access, rectify, erase, restrict, object to and port your data. To
        exercise these rights, write to us at
        <span class="todo">[contact email address]</span>.
      </p>
      <p>
        You can unsubscribe at any time via the link in every email, or by replying STOP to a SMS.
        You also have the right to lodge a complaint with the competent data protection authority.
      </p>

      <h2>Updates</h2>
      <p>
        This policy may be updated. The version in force is the one published on this page.
        <span class="todo">[Last updated: date.]</span>
      </p>
    </template>
  </LegalPage>
</template>
