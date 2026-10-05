import { z } from "zod";
import nodemailer from "nodemailer";
import { DeliveryError } from "./delivery-error";
import type { leadSchema } from "./validation";

type Lead = z.infer<typeof leadSchema>;
const address = z.string().trim().email().max(254).regex(/^[^\r\n]+$/);

export async function sendLeadEmail(lead: Lead) {
  const to = address.safeParse(process.env.LEADS_TO_EMAIL);
  const from = address.safeParse(process.env.LEADS_FROM_EMAIL);
  const user = address.safeParse(process.env.SMTP_USER);
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT || "465";
  const pass = process.env.SMTP_PASSWORD;
  if (!to.success) throw new DeliveryError("smtp_recipient_config");
  if (!from.success) throw new DeliveryError("smtp_sender_config");
  if (!user.success) throw new DeliveryError("smtp_user_config");
  if (user.data !== from.data) throw new DeliveryError("smtp_sender_mismatch");
  if (!pass) throw new DeliveryError("smtp_password_missing");
  if (!host || !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(host)) {
    throw new DeliveryError("smtp_host_config");
  }
  if (!["465", "587"].includes(port)) throw new DeliveryError("smtp_port_config");
  const text = [
    `Nouvelle demande XpertEO — ${lead.source === "diagnostic" ? "diagnostic" : "contact"}`,
    `Référence : ${lead.id}`, "",
    `Nom : ${lead.name}`, `Entreprise : ${lead.company}`, `Email : ${lead.email}`,
    `Site : ${lead.website || "Non renseigné"}`, `Secteur : ${lead.industry || "Non renseigné"}`,
    `Zone : ${lead.location || "Non renseignée"}`, `Objectif : ${lead.objective || "Non renseigné"}`,
    "", "Message du visiteur :", lead.message, "", `Page : ${lead.landing_page}`,
    `Source UTM : ${lead.utm_source}`, `Support UTM : ${lead.utm_medium}`, `Campagne UTM : ${lead.utm_campaign}`,
  ].join("\n");
  const transport = nodemailer.createTransport({
    host, port: Number(port), secure: port === "465", requireTLS: true,
    auth: { user: user.data, pass },
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 10000, dnsTimeout: 5000,
    disableFileAccess: true, disableUrlAccess: true, logger: false, debug: false,
  });
  try {
    const result = await transport.sendMail({
      from: from.data, to: [to.data], replyTo: lead.email,
      subject: `XpertEO — demande de ${lead.source === "diagnostic" ? "diagnostic" : "contact"} — ${lead.id.slice(0, 8)}`,
      text, messageId: `<xperteo-${lead.id}@${from.data.split("@")[1]}>`,
    });
    if (!result.accepted?.includes(to.data) || result.rejected?.length) {
      throw new DeliveryError("smtp_recipient_rejected");
    }
  } finally {
    transport.close();
  }
}
