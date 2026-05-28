import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { sendQuoteEmail } from '@/lib/resend';

export const prerender = false;

/** Rough price estimate matching the wizard's pricing tiers */
function estimatePrice(frequency: string, approxSize: string): number {
  const baseByFrequency: Record<string, number> = {
    weekly: 65,
    fortnightly: 75,
    monthly: 95,
  };
  const sizeMultiplier: Record<string, number> = {
    small: 0.9,
    medium: 1.0,
    large: 1.2,
    'extra-large': 1.4,
  };
  const base = baseByFrequency[frequency?.toLowerCase()] ?? 75;
  const multiplier = sizeMultiplier[approxSize?.toLowerCase()] ?? 1.0;
  return Math.round(base * multiplier);
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Email service not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { frequency, poolType, approxSize, postcode, name, email, phone, notes } = body;

    if (!name || !email || !phone || !postcode || !frequency) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Ops notification email
    const { data, error } = await resend.emails.send({
      from: 'Pool Pals <quotes@poolpals.com.au>',
      to: ['hello@poolpals.com.au'],
      replyTo: email,
      subject: `New quote request from ${name}`,
      html: `
        <h2>New Pool Pals Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Postcode</strong></td><td style="padding:8px;border:1px solid #ddd">${postcode}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Frequency</strong></td><td style="padding:8px;border:1px solid #ddd">${frequency}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Pool Type</strong></td><td style="padding:8px;border:1px solid #ddd">${poolType || 'Not specified'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Pool Size</strong></td><td style="padding:8px;border:1px solid #ddd">${approxSize || 'Not specified'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Notes</strong></td><td style="padding:8px;border:1px solid #ddd">${notes || 'None'}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error('Resend ops email error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Customer confirmation email via sendQuoteEmail()
    // Map wizard fields → QuoteData shape expected by the template
    const estimatedPrice = estimatePrice(frequency, approxSize);
    const customerEmailResult = await sendQuoteEmail(
      {
        name,
        email,
        phone,
        frequency,
        poolType: poolType || '',
        poolSize: approxSize || '',
        suburb: postcode,
        condition: '',
        extras: [],
      },
      estimatedPrice,
    );
    if (customerEmailResult.error) {
      // Log but don't fail the request — ops email already sent
      console.error('Customer confirmation email error:', customerEmailResult.error);
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
