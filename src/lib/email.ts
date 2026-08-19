import nodemailer from "nodemailer";

export interface LeadEmailPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  website?: string;
  automationNeed?: string;
  sourceUrl?: string;
  submittedAt?: string;
}

/**
 * Sends a server-side lead notification email to the ZTechAI team.
 * Kept strictly server-side — no credentials ever reach the client.
 */
export async function sendLeadNotification(payload: LeadEmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const mailTo = process.env.MAIL_TO || "zubair@ztechai.us";
  const mailFrom = process.env.MAIL_FROM || "info@ztechai.us";
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpSecure = process.env.SMTP_SECURE !== "false";
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  const timestamp = payload.submittedAt || new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const subject = `New ZTechAI AI Automation Inquiry — ${payload.businessName}`;

  const textBody = `
--------------------------------
NEW ZTECHAI LEAD
--------------------------------

Name: ${payload.name}
Business: ${payload.businessName}
Email: ${payload.email}
Phone: ${payload.phone}
Industry: ${payload.industry}
Website: ${payload.website || "N/A"}

Automation Need:
${payload.automationNeed || "Not specified"}

Submitted: ${timestamp}
Source: ZTechAI Website (${payload.sourceUrl || "https://voice.ztechai.us"})
--------------------------------
`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%); color: #ffffff; padding: 24px; }
    .header h2 { margin: 0; font-size: 20px; }
    .header p { margin: 4px 0 0 0; opacity: 0.9; font-size: 13px; }
    .content { padding: 24px; }
    .row { margin-bottom: 14px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; }
    .value { font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 2px; }
    .box { background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #0d9488; margin-top: 16px; }
    .footer { border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 12px; color: #94a3b8; background: #fafafa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New AI Automation Opportunity</h2>
      <p>Received via ZTechAI Voice Website</p>
    </div>
    <div class="content">
      <div class="row">
        <div class="label">Business Name</div>
        <div class="value">${escapeHtml(payload.businessName)}</div>
      </div>
      <div class="row">
        <div class="label">Contact Name</div>
        <div class="value">${escapeHtml(payload.name)}</div>
      </div>
      <div class="row">
        <div class="label">Business Email</div>
        <div class="value"><a href="mailto:${escapeHtml(payload.email)}" style="color: #0d9488; text-decoration: none;">${escapeHtml(payload.email)}</a></div>
      </div>
      <div class="row">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${escapeHtml(payload.phone)}" style="color: #0d9488; text-decoration: none;">${escapeHtml(payload.phone)}</a></div>
      </div>
      <div class="row">
        <div class="label">Industry</div>
        <div class="value">${escapeHtml(payload.industry)}</div>
      </div>
      ${payload.website ? `
      <div class="row">
        <div class="label">Website</div>
        <div class="value"><a href="${escapeHtml(payload.website)}" target="_blank" rel="noopener" style="color: #2563eb;">${escapeHtml(payload.website)}</a></div>
      </div>` : ""}
      
      <div class="box">
        <div class="label">Automation Goals / Phone Bottlenecks</div>
        <div class="value" style="font-weight: 400; font-size: 14px; line-height: 1.6; margin-top: 6px; white-space: pre-wrap;">${escapeHtml(payload.automationNeed || "Not specified")}</div>
      </div>
    </div>
    <div class="footer">
      Submitted on ${timestamp} • Reply directly to this email to contact the lead.
    </div>
  </div>
</body>
</html>
`;

  // Check if SMTP is configured
  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.info("ℹ️ [ZTechAI Server Notice]: SMTP not fully configured (SMTP_HOST/USER/PASSWORD). Lead logged to server successfully:", {
      to: mailTo,
      from: mailFrom,
      replyTo: payload.email,
      business: payload.businessName,
      name: payload.name,
      phone: payload.phone,
    });

    return {
      success: true,
      messageId: "mock-" + Date.now(),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const info = await transporter.sendMail({
      from: `"${payload.businessName} via ZTechAI" <${mailFrom}>`,
      to: mailTo,
      replyTo: payload.email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    // Log error safely without exposing passwords
    console.error("❌ Failed to send lead notification email via SMTP:", error instanceof Error ? error.message : "Unknown SMTP error");
    return {
      success: false,
      error: "Failed to dispatch email notification.",
    };
  }
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
