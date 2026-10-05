// Only fixed diagnostic codes may reach logs. Never include provider messages.
export class DeliveryError extends Error {
  constructor(public readonly reason:
    | "smtp_recipient_config" | "smtp_sender_config" | "smtp_user_config"
    | "smtp_password_missing" | "smtp_host_config" | "smtp_port_config"
    | "smtp_sender_mismatch" | "smtp_recipient_rejected"
    | "redis_config" | "trusted_ip_missing") {
    super(reason);
  }
}

export function deliveryFailureReason(error: unknown, stage: "rate_limit" | "smtp") {
  if (error instanceof DeliveryError) return error.reason;
  if (stage === "rate_limit") return "rate_limit_unavailable";
  const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
  switch (code) {
    case "EAUTH": return "smtp_auth_failed";
    case "EDNS": case "ENOTFOUND": case "EAI_AGAIN": return "smtp_dns_failed";
    case "ETIMEDOUT": return "smtp_timeout";
    case "ECONNECTION": case "ECONNREFUSED": case "ESOCKET": return "smtp_connection_failed";
    case "ETLS": case "ERR_TLS_CERT_ALTNAME_INVALID": case "CERT_HAS_EXPIRED":
    case "DEPTH_ZERO_SELF_SIGNED_CERT": case "UNABLE_TO_VERIFY_LEAF_SIGNATURE":
      return "smtp_tls_failed";
    case "EENVELOPE": case "EMESSAGE": return "smtp_message_rejected";
    default: return "smtp_unavailable";
  }
}
