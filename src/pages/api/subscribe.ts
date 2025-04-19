import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return res.status(200).json({ message: "Subscription successful" });
    } else {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.message || "Subscription failed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}