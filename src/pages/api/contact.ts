import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
    let name = '';
    let email = '';
    let phone = '';
    let subject = '';
    let message = '';

    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const body = await request.json();
      ({ name = '', email = '', phone = '', subject = '', message = '' } = body);
    } else {
      const form = await request.formData();
      name = String(form.get('name') ?? '');
      email = String(form.get('email') ?? '');
      phone = String(form.get('phone') ?? '');
      subject = String(form.get('subject') ?? '');
      message = String(form.get('message') ?? '');
    }

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const safeSubject = subject || 'General enquiry';
    const { error } = await resend.emails.send({
      from: 'Pool Pals <quotes@poolpals.com.au>',
      to: ['hello@poolpals.com.au'],
      replyTo: email,
      subject: `Contact form: ${safeSubject} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone || 'Not provided')}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Subject</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(safeSubject)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(message)}</td></tr>
        </table>
      `,
    });

    if (error) {
      console.error('Resend contact email error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
