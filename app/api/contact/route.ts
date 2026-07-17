import { NextResponse } from "next/server";
import { ConfidentialClientApplication } from "@azure/msal-node";

// ─────────────────────────────────────────────────────────────────────────────
// In-memory rate limiter (per IP, max 5 submissions per 15 minutes)
// ─────────────────────────────────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipSubmissions = new Map<string, { count: number; firstAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipSubmissions.get(ip);
  if (!record || now - record.firstAt > RATE_LIMIT_WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, firstAt: now });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX) return true;
  record.count += 1;
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Security: Strip SMTP header injection characters
// ─────────────────────────────────────────────────────────────────────────────
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n\0]/g, "").trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Security: Validate email address format
// ─────────────────────────────────────────────────────────────────────────────
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= 254;
}

// ─────────────────────────────────────────────────────────────────────────────
// Microsoft Graph API: Acquire access token
// Scope: https://graph.microsoft.com/.default  (NOT outlook.office365.com)
// Requires "Mail.Send" Application permission on the Azure App Registration
// ─────────────────────────────────────────────────────────────────────────────
async function getGraphAccessToken(): Promise<string> {
  const tenantId = process.env.AZURE_TENANT_ID!;
  const clientId = process.env.AZURE_CLIENT_ID!;
  const clientSecret = process.env.AZURE_CLIENT_SECRET!;

  const cca = new ConfidentialClientApplication({
    auth: {
      clientId,
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientSecret,
    },
  });

  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!result?.accessToken) {
    throw new Error("Failed to acquire Microsoft Graph access token.");
  }

  return result.accessToken;
}

// ─────────────────────────────────────────────────────────────────────────────
// Send an email using Microsoft Graph API
//
// Key advantages over SMTP:
//  - Works even when SmtpClientAuthentication is disabled at tenant level
//  - saveToSentItems: false → email does NOT appear in company Sent folder
//  - replyTo → clicking Reply in Outlook sends directly to client
//  - No nodemailer needed — uses native fetch
// ─────────────────────────────────────────────────────────────────────────────
async function sendViaGraph(opts: {
  accessToken: string;
  senderEmail: string;
  senderName: string;
  toEmail: string;
  toName: string;
  replyToEmail?: string;
  replyToName?: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  saveToSent?: boolean;
}) {
  const payload = {
    message: {
      subject: opts.subject,
      body: {
        contentType: "HTML",
        content: opts.htmlBody,
      },
      from: {
        emailAddress: { name: opts.senderName, address: opts.senderEmail },
      },
      toRecipients: [
        { emailAddress: { name: opts.toName, address: opts.toEmail } },
      ],
      ...(opts.replyToEmail
        ? {
            replyTo: [
              {
                emailAddress: {
                  name: opts.replyToName || opts.replyToEmail,
                  address: opts.replyToEmail,
                },
              },
            ],
          }
        : {}),
    },
    saveToSentItems: opts.saveToSent ?? false, // false = no Sent folder copy
  };

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${opts.senderEmail}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Graph API sendMail failed [${response.status}]: ${errText}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Build styled HTML email for the company inbox
// ─────────────────────────────────────────────────────────────────────────────
function buildInternalEmailHtml(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}): string {
  const { name, email, company, phone, service, message } = data;
  return `
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:620px;margin:0 auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;">
      <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #2563eb;">
        <h2 style="color:#0f172a;margin:0;font-size:24px;font-weight:800;">CALDIM <span style="color:#2563eb;">Consult</span></h2>
        <p style="color:#64748b;font-size:13px;margin-top:8px;text-transform:uppercase;letter-spacing:1px;">New Consultation Request</p>
      </div>
      <div style="padding:24px 0;">
        <h3 style="color:#0f172a;font-size:14px;text-transform:uppercase;border-left:3px solid #2563eb;padding-left:10px;">Client Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:130px;font-weight:600;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-weight:600;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-weight:600;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-weight:600;">Company</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${company || "Not provided"}</td></tr>
          <tr><td style="padding:10px 0;color:#64748b;font-weight:600;">Service</td><td style="padding:10px 0;"><span style="background:#eff6ff;color:#1d4ed8;padding:4px 10px;border-radius:4px;font-weight:600;">${service}</span></td></tr>
        </table>
      </div>
      <div style="padding-top:12px;">
        <h3 style="color:#0f172a;font-size:14px;text-transform:uppercase;border-left:3px solid #2563eb;padding-left:10px;">Project Message</h3>
        <div style="background:#f8fafc;padding:18px;border:1px solid #e2e8f0;color:#334155;font-size:14px;line-height:1.7;border-radius:8px;white-space:pre-wrap;">${message}</div>
      </div>
      <div style="margin-top:32px;padding-top:16px;border-top:1px dashed #cbd5e1;text-align:center;color:#94a3b8;font-size:12px;">
        <p style="margin:0;">Automated notification from the CALDIM website.<br/>
        <strong style="color:#64748b;">Click Reply</strong> to respond directly to <a href="mailto:${email}" style="color:#2563eb;">${email}</a>.</p>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Build auto-acknowledgement HTML for the client
// ─────────────────────────────────────────────────────────────────────────────
function buildClientAckHtml(name: string, service: string): string {
  return `
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:620px;margin:0 auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;">
      <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #2563eb;">
        <h2 style="color:#0f172a;margin:0;font-size:24px;font-weight:800;">CALDIM <span style="color:#2563eb;">DAS</span></h2>
        <p style="color:#64748b;font-size:13px;margin-top:8px;text-transform:uppercase;letter-spacing:1px;">Consultation Request Received</p>
      </div>
      <div style="padding:24px 0;">
        <p style="font-size:15px;color:#0f172a;font-weight:600;">Hello ${name},</p>
        <p style="font-size:14px;color:#334155;line-height:1.7;">
          Thank you for reaching out to <strong>CALDIM Digitalization &amp; Automation Solutions</strong>.
          We have received your consultation request for <strong>${service}</strong> and our team is reviewing it.
        </p>
        <div style="margin:20px 0;background:#eff6ff;border-left:4px solid #2563eb;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0;font-size:14px;color:#1d4ed8;font-weight:700;">⏱ Response Within 4 Hours</p>
          <p style="margin:6px 0 0;font-size:13px;color:#3b82f6;">A lead developer will reach out to schedule your scoping consultation.</p>
        </div>
        <p style="font-size:13px;color:#64748b;">For urgent queries, email us at
          <a href="mailto:salesandsupport@caldimengg.com" style="color:#2563eb;font-weight:600;">salesandsupport@caldimengg.com</a>.
        </p>
      </div>
      <div style="margin-top:20px;padding-top:16px;border-top:1px dashed #cbd5e1;text-align:center;color:#94a3b8;font-size:12px;">
        <p style="margin:0;">© CALDIM Digitalization &amp; Automation Solutions — Chennai &amp; Hosur, India</p>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main POST handler
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // 1. Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      console.warn(`[CALDIM] Rate limit exceeded: ${ip}`);
      return NextResponse.json(
        { message: "Too many requests. Please wait 15 minutes and try again." },
        { status: 429 }
      );
    }

    // 2. Parse + sanitize fields
    const body = await request.json();
    const name    = sanitizeHeader(String(body.name    || "").slice(0, 100));
    const email   = sanitizeHeader(String(body.email   || "").slice(0, 254));
    const company = sanitizeHeader(String(body.company || "").slice(0, 150));
    const phone   = sanitizeHeader(String(body.phone   || "").slice(0, 30));
    const service = sanitizeHeader(String(body.service || "General Inquiry").slice(0, 100));
    const message = String(body.message || "").slice(0, 5000).replace(/\0/g, "");

    // 3. Validate required fields
    if (!name) return NextResponse.json({ message: "Name is required." }, { status: 400 });
    if (!email) return NextResponse.json({ message: "Email address is required." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    if (!message || message.trim().length < 10) return NextResponse.json({ message: "Message must be at least 10 characters." }, { status: 400 });

    const companyEmail  = process.env.SMTP_FROM || "salesandsupport@caldimengg.com";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || companyEmail;

    // 4. Mock mode if Azure not configured
    const azureConfigured =
      !!process.env.AZURE_TENANT_ID &&
      !!process.env.AZURE_CLIENT_ID &&
      !!process.env.AZURE_CLIENT_SECRET;

    if (!azureConfigured) {
      console.log("[CALDIM] Azure not configured — mock mode");
      console.log(`  To: ${receiverEmail} | From: ${name} <${email}> | Service: ${service}`);
      return NextResponse.json({ success: true, mocked: true });
    }

    // 5. Get Microsoft Graph access token
    const accessToken = await getGraphAccessToken();

    // 6. Send internal notification → company inbox (saveToSentItems: false)
    await sendViaGraph({
      accessToken,
      senderEmail:  companyEmail,
      senderName:   "CALDIM Website",
      toEmail:      receiverEmail,
      toName:       "CALDIM Team",
      replyToEmail: email,
      replyToName:  name,
      subject:      `[CALDIM Consult] ${service} — ${company || "No Company"}`,
      htmlBody:     buildInternalEmailHtml({ name, email, company, phone, service, message }),
      textBody:     `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nService: ${service}\n\n${message}`,
      saveToSent:   false, // ← no Sent folder copy
    });

    // 7. Auto-acknowledgement → client inbox (non-fatal)
    try {
      await sendViaGraph({
        accessToken,
        senderEmail:  companyEmail,
        senderName:   "CALDIM DAS",
        toEmail:      email,
        toName:       name,
        subject:      `We've received your request — CALDIM DAS`,
        htmlBody:     buildClientAckHtml(name, service),
        textBody:     `Hello ${name}, thank you for contacting CALDIM DAS. We received your inquiry for "${service}" and will respond within 4 hours.`,
        saveToSent:   false,
      });
    } catch (ackErr: any) {
      console.error("[CALDIM] Auto-ack failed (non-fatal):", ackErr.message);
    }

    console.log(`[CALDIM] ✓ Consultation received — ${name} <${email}> | ${service} | IP: ${ip}`);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("[CALDIM] Contact form error:", { message: error.message, code: error.code });
    return NextResponse.json(
      { message: "Failed to send your request. Please try again or email salesandsupport@caldimengg.com directly." },
      { status: 500 }
    );
  }
}
