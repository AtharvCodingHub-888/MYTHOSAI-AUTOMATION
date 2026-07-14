import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route for Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, company, industry, date, requirements, honeypot } = req.body;

      // 1. Anti-spam check (Honeypot)
      // If a spam bot fills out the hidden honeypot field, we silently ignore and pretend it succeeded.
      if (honeypot && honeypot.trim() !== "") {
        console.warn("Spam detected via honeypot field. Suppressing email transmission.");
        return res.status(200).json({
          success: true,
          message: "Thank you! Your inquiry has been received."
        });
      }

      // 2. Input validation
      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, error: "Name is required." });
      }
      if (!email || !email.trim()) {
        return res.status(400).json({ success: false, error: "Business email is required." });
      }
      if (!phone || !phone.trim()) {
        return res.status(400).json({ success: false, error: "Phone number is required." });
      }

      // 3. Simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: "Invalid business email address." });
      }

      // 4. Sanitize strings to avoid any HTML injection in the email body
      const sanitize = (val: any) => {
        if (!val) return "N/A";
        return String(val)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;");
      };

      const sName = sanitize(name);
      const sEmail = sanitize(email);
      const sPhone = sanitize(phone);
      const sCompany = sanitize(company);
      const sIndustry = sanitize(industry);
      const sDate = sanitize(date);
      const sRequirements = sanitize(requirements);
      const timestamp = new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC";

      // 5. Check if Resend API Key is configured
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error("ERROR: RESEND_API_KEY environment variable is missing.");
        return res.status(500).json({
          success: false,
          error: "API_KEY_MISSING",
          message: "Email service is not configured. Please define RESEND_API_KEY in environment variables."
        });
      }

      // 6. Build the email body
      const emailText = `Name:\n${name}\n\nBusiness Email:\n${email}\n\nPhone Number:\n${phone}\n\nCompany Name:\n${company || "N/A"}\n\nIndustry:\n${industry || "N/A"}\n\nPreferred Consultation Date:\n${date || "N/A"}\n\nProject Requirements:\n${requirements || "N/A"}\n\nSubmitted At:\n${timestamp}`;

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E6B55E; border-radius: 12px; background-color: #0B0B0D; color: #FFFFFF;">
          <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid rgba(230, 181, 94, 0.2); padding-bottom: 16px;">
            <h1 style="color: #F4CE81; font-size: 24px; margin: 0; font-family: 'Times New Roman', Times, serif; font-style: italic; letter-spacing: 1px;">MYTHOS AI</h1>
            <p style="color: #A3A3A3; font-size: 12px; margin: 4px 0 0 0; font-family: monospace;">SYSTEM INQUIRY DISPATCH</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #A3A3A3; font-size: 12px; font-family: monospace; width: 40%;">NAME:</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-size: 14px; font-weight: bold;">${sName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A3A3A3; font-size: 12px; font-family: monospace;">BUSINESS EMAIL:</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-size: 14px;"><a href="mailto:${sEmail}" style="color: #F4CE81; text-decoration: none;">${sEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A3A3A3; font-size: 12px; font-family: monospace;">PHONE NUMBER:</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-size: 14px;">${sPhone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A3A3A3; font-size: 12px; font-family: monospace;">COMPANY NAME:</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-size: 14px;">${sCompany}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A3A3A3; font-size: 12px; font-family: monospace;">INDUSTRY:</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-size: 14px;">${sIndustry}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A3A3A3; font-size: 12px; font-family: monospace;">PREFERRED DATE:</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-size: 14px;">${sDate}</td>
            </tr>
          </table>

          <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(230, 181, 94, 0.15); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #F4CE81; font-size: 11px; font-family: monospace; margin: 0 0 8px 0; font-weight: bold; letter-spacing: 1px;">PROJECT REQUIREMENTS:</p>
            <p style="color: #E5E5E5; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${sRequirements}</p>
          </div>

          <div style="font-size: 11px; color: #737373; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 16px; font-family: monospace;">
            SUBMITTED AT: ${timestamp}<br />
            &copy; 2026 MYTHOS AI SYSTEMS. ALL RIGHTS RESERVED.
          </div>
        </div>
      `;

      // 7. Post email via Resend API
      const response = await globalThis.fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: "Mythos AI <onboarding@resend.dev>",
          to: "mythosai888111@gmail.com",
          subject: "New Client Inquiry — Mythos AI Website",
          text: emailText,
          html: emailHtml
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.error("Resend API error response:", errData);
        return res.status(500).json({
          success: false,
          error: "EMAIL_SEND_FAILED",
          message: errData.message || "Failed to send email through Resend."
        });
      }

      const resData = await response.json();
      console.log("Email sent successfully via Resend:", resData);

      return res.status(200).json({
        success: true,
        message: "Thank you! Your inquiry has been received."
      });

    } catch (error: any) {
      console.error("Internal Server Error in /api/contact:", error);
      return res.status(500).json({
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: error.message || "An unexpected error occurred."
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
