// POST /api/offer — "Make an Offer" modal on the vault pages.
// Fields: item, offer, name, contact, message?, bot-field (honeypot).

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

  const item = clean(body.item, 200);
  const offer = Number(body.offer);
  const name = clean(body.name, 120);
  const contact = clean(body.contact, 200);
  const message = clean(body.message, 2000);

  if (!item || !name || !contact || !Number.isFinite(offer) || offer <= 0) {
    return res.status(400).json({ error: 'Item, a valid offer, your name, and contact info are required.' });
  }

  try {
    await sendMail({
      subject: `Offer: $${offer} on ${item}`,
      replyTo: EMAIL_RE.test(contact) ? contact : undefined,
      rows: [
        ['Item', item],
        ['Offer', `$${offer}`],
        ['Name', name],
        ['Contact', contact],
        ['Message', message],
      ],
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('offer send failed:', err);
    return res.status(502).json({ error: 'Could not send your offer right now. Please try again later.' });
  }
};
