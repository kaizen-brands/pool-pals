import { Resend } from 'resend';
import type { QuoteData } from '@/types';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export async function sendQuoteEmail(data: QuoteData, estimatedPrice: number) {
  const from = import.meta.env.RESEND_FROM_EMAIL || 'Pool Pals <quotes@poolpals.com.au>';
  const to = [data.email];
  const bcc = import.meta.env.QUOTE_RECIPIENT ? [import.meta.env.QUOTE_RECIPIENT] : [];

  const extrasLabels: Record<string, string> = {
    heater: 'Pool heater',
    salt: 'Salt chlorinator',
    water_features: 'Water features',
    automation: 'Automation system',
  };

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
        <h2 style="margin: 0 0 16px; font-size: 20px;">Hi ${data.name}, here's your quote</h2>
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
          <li style="padding: 4px 0;">Pool size: ${data.poolSize}</li>
          <li style="padding: 4px 0;">Pool type: ${data.poolType}</li>
          <li style="padding: 4px 0;">Frequency: ${data.frequency}</li>
          <li style="padding: 4px 0;">Suburb: ${data.suburb}</li>
          <li style="padding: 4px 0;">Condition: ${data.condition}</li>
          ${data.extras.length > 0 ? `<li style="padding: 4px 0;">Extras: ${data.extras.map(e => extrasLabels[e] || e).join(', ')}</li>` : ''}
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
