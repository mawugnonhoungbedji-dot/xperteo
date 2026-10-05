import { PageIntro } from "@/components/site-shell";
import { meta } from "@/lib/site";

export const metadata = { ...meta("Confidentialité", "Comment les demandes et les préférences de mesure sont traitées sur XpertEO.", "/privacy"), robots: { index: false, follow: true } };

export default function Page() {
  return <>
    <PageIntro label="CONFIDENTIALITÉ" title="Vos informations ont une fonction précise." description="Les coordonnées du responsable et les durées de conservation restent à compléter." />
    <section className="wrap content-section readable prose">
      <h2>Demandes de diagnostic et de contact</h2>
      <p>Votre nom, votre entreprise, votre email et les informations que vous renseignez servent à étudier votre demande et à vous répondre. Les champs obligatoires sont signalés. Une fois le service d’envoi activé, votre demande est transmise par email à l’équipe XpertEO via sa messagerie LWS. Votre adresse permet à l’équipe de vous répondre directement.</p>
      <h2>Accès et hébergement</h2>
      <p>Le site est hébergé sur Vercel. Les nouvelles demandes ne sont pas enregistrées dans une base de données du site : elles sont traitées par le service d’envoi et la messagerie destinataire. Seules les personnes habilitées par XpertEO doivent accéder à cette messagerie. Un message peut être conservé par ces services selon leurs paramètres de conservation.</p>
      <h2>Protection contre les abus</h2>
      <p>Des compteurs temporaires dans Upstash limitent les envois répétés. Ils utilisent une empreinte protégée de l’adresse IP et expirent au bout d’une heure. Ils ne contiennent ni le texte de votre demande ni votre adresse email. Les prestataires d’hébergement peuvent également traiter des données techniques de connexion.</p>
      <h2>Mesure optionnelle</h2>
      <p>Votre choix de mesure est conservé localement dans votre navigateur. Le stockage des événements de navigation est actuellement inactif sur la version Vercel. Aucun service de publicité tierce ni Google Analytics n’est activé dans le code du site.</p>
      <h2>Conservation et droits</h2>
      <p>Responsable du traitement et contact pour l’exercice des droits : à renseigner. Les durées de conservation des messages, la base juridique et les éventuels transferts doivent être précisés par XpertEO selon son activité et les services configurés.</p>
      <p>Ne transmettez pas de mot de passe ni de données sensibles dans les champs libres.</p>
    </section>
  </>;
}
