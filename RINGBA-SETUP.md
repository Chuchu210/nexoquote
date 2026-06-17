# Ringba → Call Connected postback (nexoquote.com)

Browser tel taps fire **call_click** (Mediago type 12) via `tkCallback.trackCallClick()`.
**Call Connected** (type 14) must come from Ringba when a call actually connects.

## Incoming postback URL

Use the **Incoming conversion URL** from the tracker admin campaign page (`lp1`), or:

```
https://track.nexoquote.com/postback?cid={click_id}&et=call_connected&payout={payout}&txid={transaction_id}
```

## Parameters

| Param | Required | Notes |
|-------|----------|-------|
| `cid` / `click_id` / `tk-cid` | Yes | Same ID as the Mediago visit (`tk-cid` on the LP URL after redirect) |
| `et` | Yes | `call_connected` (Mediago conversiontype **14**) |
| `payout` | Optional | Revenue if applicable |
| `txid` | Optional | Ringba call / transaction ID |

## Ringba configuration

1. In Ringba, add a **conversion / postback** on **call connected** (not click).
2. Map Ringba’s click-ID field to `{click_id}` — pass the tracker click ID from the LP redirect URL (`tk-cid` query param or cookie).
3. Set the postback URL to the template above.
4. Test: complete a connected call → confirm conversion `call_connected` in tracker admin and ✓ in Mediago test dashboard.

## Mediago test dashboard

Ensure **Mediago account name** is set on campaign `lp1` (or `MEDIAGO_ACCOUNT_NAME` in server env).
Mediago campaign mapping: **nexoquote → 5208604**.

## LP tracker tag

The LP must include:

```html
<script src="https://track.nexoquote.com/t/tracker.js" data-campaign="lp1" data-mode="direct" data-no-viewcontent="true"></script>
```

- `direct` — registers a visit on page load when no `tk-cid` is present.
- `data-no-viewcontent="true"` — **no View Content** postback to Mediago; optimize for **Click Button** (quiz answers fire `trackClickButton` → Mediago type 12).

In Mediago, set campaign optimization to **Click Button** (conversiontype 12), not View Content.
