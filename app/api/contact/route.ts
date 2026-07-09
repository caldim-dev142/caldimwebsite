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
        <h3>New Consultation Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Service Area:</strong> ${service}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px;">${message}</p>
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
