import Link from "@/components/site-link";
import { PageIntro } from "@/components/site-shell";
import { meta, site } from "@/lib/site";

export const metadata = { ...meta("Mentions légales", "Éditeur, hébergement et coordonnées du site XpertEO.", "/terms"), robots: { index: false, follow: true } };

export default function Page() {
  return <>
    <PageIntro campaign="terms" label="MENTIONS LÉGALES" title="Informations sur l’éditeur." description="Les coordonnées de l’éditeur et les prestataires du site XpertEO." />
    <section id="informations" className="wrap content-section readable prose">
      <h2>Éditeur et publication</h2>
      <p>Le site XpertEO est édité par {site.editor}, personne physique établie au Bénin et responsable de la publication.</p>
      <p>XpertEO est une équipe spécialisée en growth marketing et en acquisition de clients : référencement naturel (SEO), visibilité dans les recherches IA et conversion. La création de sites internet fait partie de son offre complète.</p>
      <p>Email : <a href={"mailto:" + site.email}>{site.email}</a><br />Téléphone : <a href={"tel:" + site.phone}>{site.phoneDisplay}</a></p>
      <h2>Hébergement du site</h2>
      <p>Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.</p>
      <p><a href="https://vercel.com/legal">Informations légales et contact de Vercel</a>.</p>
      <h2>Nom de domaine et messagerie</h2>
      <p>Le nom de domaine e-xperteo.com est enregistré auprès de LWS. La messagerie professionnelle utilisée pour recevoir les demandes est également fournie par LWS.</p>
      <p><a href="https://www.lws.fr/">Site de LWS</a>.</p>
      <h2>Contenu et propriété intellectuelle</h2>
      <p>Les textes présentent l’approche et les services de XpertEO. Les marques et contenus de tiers restent la propriété de leurs titulaires. L’illustration architecturale est une image de création et ne représente pas les locaux de l’équipe.</p>
      <h2>Conditions des prestations</h2>
      <p>Une demande de diagnostic ne constitue ni une commande ni un engagement contractuel. Le périmètre, les tarifs, les délais, les droits et les conditions de suivi sont définis dans une proposition distincte. Les résultats dépendent du contexte de chaque mission ; aucune position dans les moteurs de recherche ni citation par une IA n’est garantie.</p>
      <h2>Données personnelles</h2>
      <p>Les modalités de traitement des demandes sont décrites dans la <Link href="/privacy">politique de confidentialité</Link>.</p>
    </section>
  </>;
}
