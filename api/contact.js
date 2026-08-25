// POST /api/contact — contact page form.
// Fields: name, email, reason, message, bot-field (honeypot).

const { sendMail, readFields, clean, rateLimited, EMAIL_RE } = require('./_mail');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (rateLimited(req)) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  const body = readFields(req);

  // Honeypot: real users never fill this in. Pretend success so bots move on.
  if (clean(body['bot-field'])) {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const reason = clean(body.reason, 120) || 'General Inquiry';
  const message = clean(body.message, 5000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return res.status(400).json({ error: 'Name, a valid email address, and a message are required.' });
  }

  try {
    await sendMail({
      subject: `Contact: ${reason} — ${name}`,
      replyTo: email,
      rows: [
        ['Name', name],
        ['Email', email],
        ['Subject', reason],
        ['Message', message],
      ],
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact send failed:', err);
    return res.status(502).json({ error: 'Could not send your message right now. Please try again later.' });
  }
};
