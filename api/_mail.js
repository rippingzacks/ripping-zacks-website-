// Shared mail helper for the site's form endpoints.
// Sends via the Resend HTTPS API using plain fetch (no SDK, no dependencies).
//
// Required environment variables (set in the Vercel project):
//   RESEND_API_KEY  — API key from resend.com
//   MAIL_FROM       — verified sender, e.g. "Ripping Zacks <forms@descenttcg.com>"
//   MAIL_TO         — inbox that receives submissions, e.g. sales@rippingzacks.com

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// rows: array of [label, value]. Builds a plain-text body and a simple HTML table.
async function sendMail({ subject, replyTo, rows }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;
  if (!apiKey || !from || !to) {
    throw new Error('Mail is not configured (RESEND_API_KEY / MAIL_FROM / MAIL_TO).');
  }

  const text = rows.map(([label, value]) => `${label}: ${value || '—'}`).join('\n');
  const html =
    '<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">' +
    rows
      .map(
        ([label, value]) =>
          `<tr><th align="left" style="border-bottom:1px solid #ddd;">${escapeHtml(label)}</th>` +
          `<td style="border-bottom:1px solid #ddd;">${escapeHtml(value || '—').replace(/\n/g, '<br>')}</td></tr>`
      )
      .join('') +
    '</table>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], subject, reply_to: replyTo, text, html }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend API error ${res.status}: ${detail}`);
  }
}

// Reads the request body whether it arrives as JSON or form-urlencoded.
function readFields(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return {};
}

function clean(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength || 2000);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = { sendMail, readFields, clean, EMAIL_RE };
