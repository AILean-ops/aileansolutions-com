export async function onRequestGet() {
  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Subscription Started | AI Lean Solutions</title>
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
    <main>
      <div class="box">
        <h1>Subscription started.</h1>
        <p>Stripe has confirmed checkout. We will connect your subscription to the business profile from your report and keep the weekly intelligence coming.</p>
        <p>If anything looks off, reply to the report email and we will correct it before the next send.</p>
        <p><a href="/">Back to AI Lean Solutions</a></p>
      </div>
    </main>
  </body>
</html>`, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
