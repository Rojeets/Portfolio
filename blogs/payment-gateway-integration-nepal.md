---
title: "Payment Gateway Integration in Nepal: eSewa, Khalti, ConnectIPS, FonePay"
description: "Everything you need to know about integrating Nepali payment gateways — eSewa, Khalti, ConnectIPS, FonePay — and how NRB rules shape e-commerce checkout in Nepal."
keywords:
  - "payment gateway integration Nepal"
  - "eSewa payment integration"
  - "Khalti payment integration"
  - "ConnectIPS integration"
  - "FonePay integration"
  - "online payment Nepal e-commerce"
  - "NRB payment gateway rules Nepal"
date: 2026-08-01
lastmod: 2026-08-01
slug: payment-gateway-integration-nepal
author: "Rojit Pokharel"
---

# Payment Gateway Integration in Nepal: eSewa, Khalti, ConnectIPS, FonePay

Accepting online payments in Nepal is no longer a luxury — it is table stakes for any serious e-commerce or booking business. But integrating Nepali payment gateways is different from wiring up Stripe. This guide explains the landscape, the NRB rules that shape it, and how to pick the right gateway for your product.

---

## The Nepali payment landscape

Nepal's digital payment ecosystem is small but active. Four gateways dominate e-commerce checkout:

| Gateway | Best for | Type |
| --- | --- | --- |
| **eSewa** | Wallet payments, wide merchant base | Digital wallet |
| **Khalti** | Wallet + card, developer-friendly docs | Digital wallet |
| **ConnectIPS** | Bank-account direct transfers | Bank transfer |
| **FonePay** | QR + wallet, growing | Digital wallet |
| **Stripe/PayPal (international)** | Foreign customers / USD | Card |

For a domestic customer base, your checkout will usually need **eSewa or Khalti first**, and **ConnectIPS** for users who prefer direct bank transfers.

---

## The NRB factor you must understand

Nepal Rastra Bank (NRB) regulates payment service providers. The practical consequences for developers and business owners:

- Payment providers must be **licensed** by NRB — use only licensed gateways for real money.
- Settlement is **not instant**. Funds typically reach your bank account on **T+1 or T+2** days. Plan your reconciliation accordingly.
- You are responsible for **matching transactions** between your database and the gateway's ledger — implement idempotency keys and webhooks carefully.
- Merchant onboarding requires **business documents** (PAN, company registration) — gateways approve merchants, not developers.

---

## Integration basics (the patterns are the same)

Whatever gateway you choose, the flow is nearly identical:

1. **Create a merchant account** and get API keys (public + secret).
2. **Build an order** in your backend, then request a payment **initiation** from the gateway.
3. **Redirect** the customer to the gateway's hosted page (or open their app via deep link).
4. Receive the **verification callback** (webhook or redirect with signed params).
5. **Verify the signature server-side** before trusting it — never trust the frontend.
6. **Update the order status** and reconcile with the settlement report.

### Signed callback example (pseudo-flow)

```php
// 1. Initiate payment from server
$payment = $gateway->initiate([
    'amount'   => $order->total,
    'ref_id'   => $order->uuid,   // your idempotency key
    'callback' => route('payment.verify'),
]);

// 2. Redirect customer
return redirect($payment->payment_url);

// 3. Verify callback signature BEFORE updating the order
if ($gateway->verifySignature($request)) {
    $order->markAsPaid($request->transaction_id);
}
```

The single most important rule: **always verify the callback signature on the server** and make sure the `amount` and `ref_id` match your order. Otherwise you leave the door open for forged callbacks.

---

## Choosing the right gateway

- **Selling goods to Nepali customers?** Start with eSewa + Khalti. High wallet adoption.
- **B2B or high-value invoices?** Add ConnectIPS so customers can pay directly from their bank account.
- **Selling to foreigners or in USD?** Stripe or PayPal, with a pricing strategy that accounts for fees and currency conversion.
- **Restaurant or physical store?** FonePay QR codes at the counter pair well with a web checkout.

### Watch the fees

Gateway fees in Nepal typically range from **1% to 3%** per transaction, sometimes with a minimum per transaction. Compare total cost (setup + per-transaction + settlement) rather than just headline rates.

---

## Common mistakes I see in production

1. **Trusting the frontend callback.** Always verify server-side.
2. **No idempotency.** A customer double-clicking "Pay" can create two orders.
3. **Ignoring webhooks.** Redirect-based callbacks are lost if the browser closes — implement webhooks for reliable updates.
4. **Forgetting reconciliation.** Settlement files differ from your DB totals; build a daily reconciliation job early.
5. **Storing secrets in the frontend.** Merchant secret keys must live on the server only.

---

## Beyond checkout: payments as a feature

In my agency work, payment logic rarely stays a simple "pay for order" step. I've built:

- **Multi-currency booking engines** with departure-based fare rules and partial payments.
- **Automated invoicing** that generates sequential invoice numbers and triggers payment reminders.
- **Vendor earnings dashboards** that aggregate payouts from marketplace orders.

Each of these adds moving parts — which is exactly why a payment-savvy developer saves you far more than the invoice suggests.

---

### Getting help

If you are planning a store or platform with Nepali payments, I've integrated eSewa, Khalti, ConnectIPS, and international gateways across production systems. [Contact me](/contact) and I can help you pick the right stack and avoid the expensive mistakes above.
