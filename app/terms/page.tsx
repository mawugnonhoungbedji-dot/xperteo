import { PageIntro } from "@/components/site-shell";
import { meta } from "@/lib/site";
export const metadata = { ...meta("Mentions légales", "Informations relatives à l’éditeur du site XpertEO.", "/terms"), robots: { index: false, follow: true } };
export default function Page() {
    return <><PageIntro label="MENTIONS LÉGALES" title="Informations sur l’éditeur." description="Cette version privée prépare le futur site officiel. Les informations juridiques restent à compléter avant sa diffusion publique."/><section className="wrap content-section readable prose"><h2>Éditeur</h2><p>Nom commercial : XpertEO.
Raison sociale, forme juridique, immatriculation, adresse et responsable de publication : à renseigner.
Email et téléphone professionnels : à renseigner.</p><h2>Hébergement</h2><p>Le site est publié via Sites, sur une infrastructure Cloudflare. Les coordonnées légales de l’hébergeur et les informations contractuelles sont à vérifier avant diffusion publique.</p><h2>Contenu et propriété intellectuelle</h2><p>Les textes présentent l’approche et les services de XpertEO. L’illustration architecturale est une image de création, et ne représente pas les locaux de l’entreprise. Les résultats éventuels dépendent du contexte de chaque mission.</p><h2>Conditions des prestations</h2><p>Une demande de diagnostic ne constitue ni une commande ni un engagement contractuel. Le périmètre, les tarifs, les délais, les droits et les conditions de maintenance sont définis dans une proposition distincte.</p></section></>;
}
