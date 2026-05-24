const DEFAULT_MONTHLY_AMOUNT = 29700;
const DEFAULT_ANNUAL_AMOUNT = 297000;

function htmlResponse(title, body, status = 200) {
  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | AI Lean Solutions</title>
    <style>
      body { margin: 0; font-family: Arial, sans-serif; color: #2c2624; background: #faf5f1; }
      main { max-width: 680px; margin: 0 auto; padding: 72px 24px; }
      h1 { color: #3e2a3c; font-family: Georgia, "Times New Roman", serif; font-size: 36px; line-height: 1.15; margin: 0 0 16px; }
      p { font-size: 17px; line-height: 1.6; margin: 0 0 16px; }
      a { color: #6b3d57; font-weight: 700; }
      .box { border: 1px solid #e3d7d0; border-radius: 8px; background: #fffaf7; padding: 22px; }
    </style>
  </head>
  <body>
    <main><div class="box"><h1>${escapeHtml(title)}</h1>${body}</div></main>
  </body>
</html>`, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function base64UrlDecode(value) {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '==='.slice((value.length + 3) % 4);
  return atob(padded);
}

function base64UrlEncode(bytes) {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function verifyToken(token, secret, businessId) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error('The checkout link is missing its verification token.');
  }

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(parts[0]));
  const expected = base64UrlEncode(new Uint8Array(signature));
  if (!timingSafeEqual(expected, parts[1])) {
    throw new Error('The checkout link could not be verified.');
  }

  const payload = JSON.parse(base64UrlDecode(parts[0]));
  if (payload.business_id !== businessId) {
    throw new Error('The checkout link does not match this business.');
  }
  if (payload.exp && Number(payload.exp) < Math.floor(Date.now() / 1000)) {
    throw new Error('The checkout link has expired.');
  }
  return payload;
}

function addLineItem(params, env, plan) {
  const priceId = plan === 'annual' ? env.STRIPE_ANNUAL_PRICE_ID : env.STRIPE_MONTHLY_PRICE_ID;
  if (priceId) {
    params.set('line_items[0][price]', priceId);
    params.set('line_items[0][quantity]', '1');
    return;
  }

  const amount = plan === 'annual'
    ? Number(env.AILEAN_ANNUAL_AMOUNT_CENTS || DEFAULT_ANNUAL_AMOUNT)
    : Number(env.AILEAN_MONTHLY_AMOUNT_CENTS || DEFAULT_MONTHLY_AMOUNT);
  const interval = plan === 'annual' ? 'year' : 'month';
  const productName = plan === 'annual'
    ? 'Phoenix Med Spa Intelligence - Annual'
    : 'Phoenix Med Spa Intelligence - Founding Member';

  params.set('line_items[0][price_data][currency]', 'usd');
  params.set('line_items[0][price_data][unit_amount]', String(amount));
  params.set('line_items[0][price_data][recurring][interval]', interval);
  params.set('line_items[0][price_data][product_data][name]', productName);
  params.set('line_items[0][quantity]', '1');
}

async function createCheckoutSession(request, env, businessId, tokenPayload, plan) {
  const url = new URL(request.url);
  const origin = env.AILEAN_SITE_ORIGIN || `${url.protocol}//${url.host}`;
  const stripeSecret = env.STRIPE_SECRET_KEY || env.STRIPE_SECRET_KEY_LIVE || env.STRIPE_SECRET_KEY_TEST;
  if (!stripeSecret) {
    throw new Error('Stripe is not configured yet.');
  }

  const params = new URLSearchParams();
  params.set('mode', 'subscription');
  params.set('client_reference_id', businessId);
  params.set('success_url', `${origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', url.toString());
  params.set('allow_promotion_codes', 'true');
  params.set('metadata[business_id]', businessId);
  params.set('metadata[checkout_source]', tokenPayload.source || 'report');
  params.set('metadata[plan]', plan);
  params.set('subscription_data[metadata][business_id]', businessId);
  params.set('subscription_data[metadata][plan]', plan);

  if (tokenPayload.report_id) {
    params.set('metadata[report_id]', tokenPayload.report_id);
    params.set('subscription_data[metadata][report_id]', tokenPayload.report_id);
  }
  if (tokenPayload.email) {
    params.set('customer_email', tokenPayload.email);
  }
  if (tokenPayload.business_name) {
    params.set('metadata[business_name]', tokenPayload.business_name);
  }

  addLineItem(params, env, plan);

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${stripeSecret}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Stripe rejected the checkout request.');
  }
  return data.url;
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const businessId = url.searchParams.get('business_id') || '';
  const plan = url.searchParams.get('plan') === 'annual' ? 'annual' : 'monthly';

  if (!businessId) {
    return htmlResponse(
      'Use your personalized checkout link',
      '<p>Each subscription is tied to the business profile in your sample report, so checkout needs to start from that report link.</p><p>If you need a fresh link, use the contact page and we will send the right one.</p><p><a href="/contact">Contact AI Lean Solutions</a></p>',
      400,
    );
  }

  try {
    const tokenSecret = env.AILEAN_CHECKOUT_TOKEN_SECRET;
    let tokenPayload = {
      business_id: businessId,
      source: url.searchParams.get('source') || 'unsigned',
      email: url.searchParams.get('email') || '',
    };
    if (tokenSecret) {
      tokenPayload = await verifyToken(url.searchParams.get('token'), tokenSecret, businessId);
    } else if (env.AILEAN_ALLOW_UNSIGNED_CHECKOUT !== 'true') {
      throw new Error('Secure checkout tokens are not configured yet.');
    }

    const checkoutUrl = await createCheckoutSession(request, env, businessId, tokenPayload, plan);
    return Response.redirect(checkoutUrl, 303);
  } catch (error) {
    return htmlResponse(
      'Checkout link needs attention',
      `<p>${escapeHtml(error.message || 'We could not start checkout from this link.')}</p><p>Please reply to your report email or use the contact page and we will fix the link.</p><p><a href="/contact">Contact AI Lean Solutions</a></p>`,
      400,
    );
  }
}
