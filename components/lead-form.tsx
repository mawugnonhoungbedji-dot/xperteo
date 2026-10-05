"use client";
import { DiagnosticTool } from "./diagnostic-tool";
import { clientId } from "@/lib/client-id";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/site-link";
import { ArrowUpRight } from "lucide-react";
import { leadSchema } from "@/lib/validation";
import { track } from "./site-client";
export function LeadForm({ source = "diagnostic" }: {
    source?: "diagnostic" | "contact";
}) {
    const [status, setStatus] = useState("idle"), [error, setError] = useState(""), [ref, setRef] = useState("");
    const started = useRef(0), id = useRef(""), touched = useRef(false);
    const inFlight = useRef(false);
    useEffect(() => { started.current = Date.now(); id.current = clientId(); }, []);
    async function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); if (inFlight.current) return; setError(""); const values = Object.fromEntries(new FormData(e.currentTarget)); const query = new URLSearchParams(location.search); const body = { ...values, id: id.current, source, started: started.current, landing_page: location.pathname, utm_source: query.get("utm_source") || "", utm_medium: query.get("utm_medium") || "", utm_campaign: query.get("utm_campaign") || "" }; const v = leadSchema.safeParse(body); if (!v.success) {
        setError(v.error.issues[0].message);
        return;
    } inFlight.current = true; setStatus("sending"); try {
        const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v.data) });
        const data = await res.json() as {
            error?: string;
            reference: string;
        };
        if (!res.ok)
            throw new Error(data.error);
        setRef(data.reference);
        setStatus("sent");
        track("form_submitted", source);
    }
    catch (e) {
        setStatus("idle");
        setError(e instanceof Error ? e.message : "L’envoi a échoué. Réessayez.");
    } finally { inFlight.current = false; } }
    if (status === "sent")
        return <div className="success" role="status"><span className="eyebrow">DEMANDE TRANSMISE</span><h2>Merci pour votre confiance.</h2><p>Votre demande a été transmise à XpertEO sous la référence <strong>{ref}</strong>. Notre équipe pourra vous répondre à l’adresse email indiquée. Aucun audit automatique ni rendez-vous n’est déclenché.</p><Link href="/methodology" className="underlink">Découvrir la suite de notre méthode →</Link></div>;
    return <form data-lead-form onSubmit={submit} onFocus={() => { if (!touched.current) {
        touched.current = true;
        track("form_started", source);
    } }} aria-label={source === "diagnostic" ? "Demande de diagnostic" : "Demande de contact"}><DiagnosticTool /><div className="form-grid"><label>Votre nom *<input name="name" autoComplete="name" required minLength={2} maxLength={200} placeholder="Prénom et nom"/></label><label>Entreprise *<input name="company" autoComplete="organization" required minLength={2} maxLength={200} placeholder="Nom de votre entreprise"/></label><label>Email professionnel *<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="vous@entreprise.com"/></label><label>Site web<input name="website" type="url" maxLength={500} placeholder="https://votre-site.com"/></label><label>Secteur d’activité<input name="industry" maxLength={200} placeholder="Votre métier"/></label><label>Zone géographique<input name="location" maxLength={200} placeholder="Ville, pays ou marché ciblé"/></label><label className="full">Votre objectif<input name="objective" maxLength={200} placeholder="Ex. recevoir davantage de demandes qualifiées"/></label><label className="full">Quel est votre principal besoin ? *<textarea name="message" required minLength={10} maxLength={3000} placeholder="Présentez votre projet, vos difficultés et vos priorités."/></label></div><div className="honey" aria-hidden="true"><label>Fax<input name="fax" tabIndex={-1} autoComplete="off"/></label></div><p className="form-fineprint">* Champs obligatoires. Ces informations permettent à XpertEO d’étudier votre demande et de vous répondre. <Link href="/privacy">Confidentialité</Link>.</p>{error && <p className="error" role="alert">{error}</p>}<button className="button purple" disabled={status === "sending"}>{status === "sending" ? "Envoi…" : source === "diagnostic" ? "Demander mon diagnostic" : "Envoyer ma demande"}<ArrowUpRight size={20}/></button></form>;
}
