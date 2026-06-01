import { Resend } from 'resend';
import type { QuoteData } from '@/types';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const poolSizeLabels: Record<string, string> = {
  small: 'Small (up to 30,000L)',
  medium: 'Medium (30,000-60,000L)',
  large: 'Large (60,000-100,000L)',
  xl: 'Extra large (100,000L+)',
  'not-sure': 'Not sure',
};

const poolTypeLabels: Record<string, string> = {
  chlorine: 'Chlorine',
  salt: 'Salt water',
  mineral: 'Mineral / magnesium',
  'not-sure': 'Not sure',
};

const frequencyLabels: Record<string, string> = {
  weekly: 'Weekly',
  fortnightly: 'Fortnightly',
  'twice-weekly': 'Twice a week',
  'once-off': 'One-off / rescue',
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function sendQuoteEmail(data: QuoteData, estimatedPrice: number) {
  const from = import.meta.env.RESEND_FROM_EMAIL || 'Pool Pals <quotes@poolpals.com.au>';
  const to = [data.email];
  const bcc = import.meta.env.QUOTE_RECIPIENT ? [import.meta.env.QUOTE_RECIPIENT] : [];
  const notes = data.notes.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Pool Pals Quote</title>
    </head>
    <body style="font-family: Inter, system-ui, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-family: 'Instrument Serif', serif; font-size: 32px; margin: 0; color: #1a1a2e;">Pool Pals</h1>
        <p style="color: #666; margin: 8px 0 0;">Gold Coast Pool Cleaning</p>
      </div>
      
      <div style="background: #f8f9fa; border-radius: 14px; padding: 24px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px; font-size: 20px;">Hi ${escapeHtml(data.name)}, here's your quote</h2>
        <p style="margin: 0; color: #555;">Thanks for getting in touch! Based on your pool details, here's your estimated pricing:</p>
      </div>
      
      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 24px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px;">
          <span style="font-size: 14px; color: #666;">Estimated per visit</span>
          <span style="font-family: 'Instrument Serif', serif; font-size: 36px; font-weight: 400;">$${estimatedPrice}</span>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
        
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #666; margin: 0 0 12px;">Your details</h3>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: #555;">
          <li style="padding: 4px 0;">Pool size: ${escapeHtml(poolSizeLabels[data.approxSize] ?? data.approxSize)}</li>
          <li style="padding: 4px 0;">Pool type: ${escapeHtml(poolTypeLabels[data.poolType] ?? data.poolType)}</li>
          <li style="padding: 4px 0;">Frequency: ${escapeHtml(frequencyLabels[data.frequency] ?? data.frequency)}</li>
          <li style="padding: 4px 0;">Postcode: ${escapeHtml(data.postcode)}</li>
          ${notes ? `<li style="padding: 4px 0;">Notes: ${escapeHtml(notes)}</li>` : ''}
        </ul>
      </div>
      
      <div style="text-align: center; margin-bottom: 24px;">
        <p style="color: #555; margin-bottom: 16px;">Ready to book? Reply to this email or call us on <a href="tel:1300766572" style="color: #0891b2; text-decoration: none;">1300 POOL PAL</a></p>
      </div>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center; font-size: 12px; color: #999;">
        <p>Pool Pals Pty Ltd · ABN 41 638 902 117</p>
        <p>Unit 4 / 28 Sunshine Bvd, Mermaid Waters QLD</p>
      </div>
    </body>
    </html>
  `;

  return resend.emails.send({
    from,
    to,
    bcc,
    subject: `Your Pool Pals Quote — $${estimatedPrice}/visit`,
    html,
  });
}
