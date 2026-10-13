import { PageIntro } from "@/components/site-shell";
import { faqs } from "@/lib/content";
import { meta } from "@/lib/site";
import { getPublished } from "@/lib/db";
export const dynamic = "force-dynamic";
export const metadata = meta("Questions fréquentes", "Diagnostic, refonte, budget, recherche IA et suivi : les réponses aux questions sur XpertEO.", "/faq");
export default async function Page() { let extra: {
    title: string;
    content: string;
}[] = []; try {
    extra = await getPublished("faq");
}
catch { } return <><PageIntro campaign="faq" label="QUESTIONS FRÉQUENTES" title="Des réponses claires, avant de vous lancer." description="Ce qu’il faut savoir pour cadrer un projet avec XpertEO."/><section id="questions" className="wrap content-section readable faq-list">{[...faqs, ...extra.map(a => [a.title, a.content])].map(([q, a]) => <details className="answer-box" key={q}><summary>{q}<span className="plus">+</span></summary><p>{a}</p></details>)}</section></>; }
