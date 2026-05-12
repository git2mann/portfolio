import type { NextApiRequest, NextApiResponse } from "next";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Sanitize input
  const sanitizedEmail = String(email).trim().toLowerCase().slice(0, 100);

  try {
    const response = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({ email: sanitizedEmail }),
    });

    if (response.ok) {
      return res.status(200).json({ message: "Subscription successful" });
    } else {
      // Log error internally
      console.error('MailerLite error:', await response.text());
      return res.status(response.status).json({ error: "Subscription failed" });
    }
  } catch (error) {
    console.error('Subscribe API error:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
}