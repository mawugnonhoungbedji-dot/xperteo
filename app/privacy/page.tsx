import { PageIntro } from "@/components/site-shell";
import { meta, site } from "@/lib/site";

export const metadata = { ...meta("Confidentialité", "Comment les demandes et les préférences de mesure sont traitées sur XpertEO.", "/privacy"), robots: { index: false, follow: true } };

export default function Page() {
  return <>
    <PageIntro campaign="privacy" label="CONFIDENTIALITÉ" title="Vos informations ont une fonction précise." description="Comment nous recevons vos demandes, utilisons vos coordonnées et conservons vos échanges." />
    <section id="donnees" className="wrap content-section readable prose">
      <h2>Responsable du traitement</h2>
      <p>{site.editor}, éditeur du site XpertEO et établi au Bénin, est votre interlocuteur pour le traitement des demandes. Contact : <a href={"mailto:" + site.email}>{site.email}</a> ou <a href={"tel:" + site.phone}>{site.phoneDisplay}</a>.</p>
      <h2>Demandes de diagnostic et de contact</h2>
      <p>Votre nom, votre entreprise, votre email et les informations que vous renseignez servent à étudier votre demande et à vous répondre. Les champs obligatoires sont signalés. Votre demande est transmise par email à l’équipe XpertEO via sa messagerie LWS. Votre adresse permet à l’équipe de vous répondre directement.</p>
      <h2>Accès et hébergement</h2>
      <p>Le site est hébergé sur Vercel. Les nouvelles demandes ne sont pas enregistrées dans une base de données du site : elles sont traitées par le service d’envoi et la messagerie destinataire. Seules les personnes habilitées par XpertEO doivent accéder à cette messagerie. Un message peut être conservé par ces services selon leurs paramètres de conservation.</p>
      <h2>Protection contre les abus</h2>
      <p>Des compteurs temporaires limitent les envois répétés. Ils sont conservés dans la mémoire du serveur ou, lorsque ce service est activé, dans Upstash. Les quotas sont renouvelés chaque heure. Ces compteurs utilisent une empreinte protégée de l’adresse IP et ne contiennent ni le texte de votre demande ni votre adresse email. Les prestataires d’hébergement peuvent également traiter des données techniques de connexion.</p>
      <h2>Mesure optionnelle</h2>
      <p>Votre choix de mesure est conservé localement dans votre navigateur. Le stockage des événements de navigation est actuellement inactif sur la version Vercel. Aucun service de publicité tierce ni Google Analytics n’est activé dans le code du site.</p>
      <h2>Conservation et droits</h2>
      <p>Les demandes reçues par email qui restent sans suite sont conservées au maximum 45 jours à compter de leur réception, puis supprimées de la messagerie utilisée par l’équipe. Cette suppression relève de la gestion de la messagerie ; elle n’est pas automatisée par le site. Les échanges devenus des dossiers clients suivent les durées liées à la prestation et aux obligations applicables.</p>
      <p>Pour demander l’accès à vos données, leur rectification ou leur suppression, contactez <a href={"mailto:" + site.email}>{site.email}</a>. Vous pouvez également vous adresser à l’<a href="https://apdp.bj/">Autorité de Protection des Données Personnelles du Bénin</a>.</p>
      <p>L’hébergement Vercel et la messagerie LWS font intervenir des prestataires établis hors du Bénin. Leurs modalités de traitement sont décrites dans leurs politiques respectives. Les lieux de traitement et les garanties applicables doivent être vérifiés selon les services utilisés.</p>
      <p>Ne transmettez pas de mot de passe ni de données sensibles dans les champs libres.</p>
    </section>
  </>;
}
