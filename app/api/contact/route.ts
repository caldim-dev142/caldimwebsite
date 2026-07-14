import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, company, phone, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Configure the transporter. 
    // In production, configure environment variables for SMTP.
    // If SMTP host is not set, we'll log the details and return a mock success response.
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log("SMTP Environment variables not fully configured. Mocking email output:");
      console.log(`To: support@caldimengg.in`);
      console.log(`CC: exampleA@gmail.com, exampleB@gmail.com`);
      console.log(`Subject: New Consultation Request: ${service}`);
      console.log(`Details: Name: ${name}, Email: ${email}, Company: ${company}, Phone: ${phone}`);
      console.log(`Message: ${message}`);

      return NextResponse.json({ success: true, mocked: true });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailFrom = process.env.SMTP_FROM || smtpUser;
    const mailTo = process.env.CONTACT_RECEIVER_EMAIL || mailFrom || "support@caldimengg.in";

    const mailOptions = {
      from: `"${name} via CALDIM" <${mailFrom}>`,
      replyTo: `"${name}" <${email}>`,
      to: mailTo,
      subject: `[CALDIM Consult] ${service} - ${company || "No Company"}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Phone: ${phone || "N/A"}
Service: ${service}

Message:
${message}
      `,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2563eb;">
            <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">CALDIM <span style="color: #2563eb;">Consult</span></h2>
            <p style="color: #64748b; font-size: 14px; margin-top: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">New Consultation Request</p>
          </div>
          <div style="padding: 25px 0;">
            <h3 style="color: #0f172a; margin-top: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; border-left: 3px solid #2563eb; padding-left: 10px;">Client Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 15px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 130px; font-weight: 600;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${phone || "<span style='color:#94a3b8;font-style:italic;'>Not provided</span>"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company || "<span style='color:#94a3b8;font-style:italic;'>Not provided</span>"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-weight: 600;">Service Area</td>
                <td style="padding: 12px 0; color: #0f172a;"><span style="background-color: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 13px;">${service}</span></td>
              </tr>
            </table>
          </div>
          <div style="padding-top: 15px;">
            <h3 style="color: #0f172a; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; border-left: 3px solid #2563eb; padding-left: 10px;">Project Message</h3>
            <div style="background-color: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; color: #334155; font-size: 15px; line-height: 1.6; border-radius: 8px; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #cbd5e1; text-align: center; color: #94a3b8; font-size: 13px; line-height: 1.5;">
            <p style="margin: 0;">This is an automated notification from the CALDIM website.<br/>You can reply directly to this email to reach the client.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { message: "Failed to process email request.", error: error.message },
      { status: 500 }
    );
  }
}
