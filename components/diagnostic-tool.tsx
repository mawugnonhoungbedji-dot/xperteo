"use client";
import { useEffect } from "react";
import { z } from "zod";
const fields = z.object({ name: z.string().max(200).optional(), company: z.string().max(200).optional(), email: z.string().email().max(254).optional(), website: z.string().url().max(500).optional(), industry: z.string().max(200).optional(), location: z.string().max(200).optional(), objective: z.string().max(200).optional(), message: z.string().max(3000).optional() }).strict();
interface ToolContext {
    registerTool(tool: {
        name: string;
        description: string;
        inputSchema: object;
        annotations: {
            readOnlyHint: boolean;
            untrustedContentHint: boolean;
        };
        execute: (input: unknown) => unknown;
    }, options: {
        signal: AbortSignal;
    }): void | Promise<void>;
}
export function DiagnosticTool() { useEffect(() => { const context = (document as Document & {
    modelContext?: ToolContext;
}).modelContext; if (!context?.registerTool)
    return; const controller = new AbortController(); try {
    Promise.resolve(context.registerTool({ name: "prepare_diagnostic_request", description: "Préremplit les champs visibles du diagnostic ou du contact. N’enregistre ni n’envoie de demande. Le visiteur doit relire puis utiliser le bouton d’envoi.", inputSchema: { type: "object", properties: Object.fromEntries(Object.keys(fields.shape).map(k => [k, { type: "string" }])), additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { const values = fields.parse(input); const form = document.querySelector<HTMLFormElement>('form[data-lead-form]'); if (!form)
            throw new Error("Formulaire indisponible ou déjà envoyé."); for (const [key, value] of Object.entries(values)) {
            const field = form.elements.namedItem(key);
            if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)
                field.value = value || "";
        } return { staged: true, submitted: false, fields: Object.keys(values) }; } }, { signal: controller.signal })).catch(() => { });
}
catch { } return () => controller.abort(); }, []); return null; }
