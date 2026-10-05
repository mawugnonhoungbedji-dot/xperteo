import { z } from "zod";
import type { leadSchema } from "./validation";

type Lead = z.infer<typeof leadSchema>;
const address = z.string().trim().email().max(254).regex(/^[^\r\n]+$/);

export async function sendLeadEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = address.safeParse(process.env.LEADS_TO_EMAIL);
  const from = address.safeParse(process.env.LEADS_FROM_EMAIL);
  if (!key || !to.success || !from.success) throw new Error("Email service unavailable");
  const text = [
    `Nouvelle demande XpertEO — ${lead.source === "diagnostic" ? "diagnostic" : "contact"}`,
    `Référence : ${lead.id}`, "",
    `Nom : ${lead.name}`, `Entreprise : ${lead.company}`, `Email : ${lead.email}`,
    `Site : ${lead.website || "Non renseigné"}`, `Secteur : ${lead.industry || "Non renseigné"}`,
    `Zone : ${lead.location || "Non renseignée"}`, `Objectif : ${lead.objective || "Non renseigné"}`,
    "", "Message du visiteur :", lead.message, "", `Page : ${lead.landing_page}`,
    `Source UTM : ${lead.utm_source}`, `Support UTM : ${lead.utm_medium}`, `Campagne UTM : ${lead.utm_campaign}`,
  ].join("\n");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json",
      "Idempotency-Key": `xperteo-lead/${lead.id}` },
    body: JSON.stringify({
      from: from.data, to: [to.data], reply_to: lead.email,
      subject: `XpertEO — demande de ${lead.source === "diagnostic" ? "diagnostic" : "contact"} — ${lead.id.slice(0, 8)}`,
      text,
    }),
    signal: AbortSignal.timeout(10000), cache: "no-store", redirect: "error",
  });
  if (!response.ok) throw new Error("Email service unavailable");
  const data = await response.json() as { id?: unknown };
  if (typeof data.id !== "string" || !data.id) throw new Error("Email service unavailable");
}
