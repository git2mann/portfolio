import { NextResponse } from 'next/server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Sanitize input
    const sanitizedEmail = String(email).trim().toLowerCase().slice(0, 100);

    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({ email: sanitizedEmail }),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
    } else {
      console.error('MailerLite error:', await response.text());
      return NextResponse.json({ error: 'Subscription failed' }, { status: response.status });
    }
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
