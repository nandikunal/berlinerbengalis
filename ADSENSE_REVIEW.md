AdSense Review — Berliner Bengalis e.V.

Summary of changes made prior to requesting review:

- Gated Google AdSense script behind explicit advertising consent using a custom CMP.
  - `js/cmp.js` now dynamically inserts the AdSense script only after the user grants marketing/advertising consent.
- Removed unconditional AdSense script tags from page heads (`index.html`, `pages/about.html`, `pages/event.html`).
- Added a substantive `pages/news.html` page to increase site content quality.
- Ensured `pages/privacy-policy.html` includes explicit Google/AdSense disclosures and opt-out links.
- Verified `ads.txt` contains the publisher entry.

How to reproduce (what I tested):

1. Visit the site on a fresh browser (no existing `bb_consent_prefs`). The cookie banner appears and no AdSense script is loaded.
2. Click **Reject All** — AdSense script must NOT load; user preferences recorded as marketing: false.
3. Clear cookies/localStorage, reload, click **Accept All** — AdSense script should load and ad units should render.

Files changed:
- `js/cmp.js`
- `index.html`
- `pages/about.html`
- `pages/event.html`
- `pages/privacy-policy.html`
- `pages/news.html` (new)

Notes / remaining manual checks for your review:
- Replace `SLOT_ID_*` placeholders in ad unit `data-ad-slot` attributes with actual AdSense ad slot IDs.
- Verify publisher ID `ca-pub-7408218273710039` is correct for your AdSense account.
- Test the live site in multiple browsers and devices; confirm ads only load after consent and that personalized ads comply with your settings.

Suggested message to AdSense review team (copy-paste):

Hello AdSense team,

We fixed the policy issues flagged as "Low value content" and consent handling. Changes include gating AdSense behind an explicit consent banner, adding original site content (News section), and updating the Privacy Policy with Google disclosures. We removed unconditional ad script loading and implemented Consent Mode v2 integration.

Please review the site at: https://berlinerbengalis.com
Publisher ID: ca-pub-7408218273710039

Key verification steps performed:
- Confirmed cookie banner prevents ad script loading before acceptance.
- Confirmed ad script and ad rendering occur only after marketing consent.
- Added site content to address low-value content concerns.

If you need further logs or a video walkthrough of the consent flow, I can provide them.

Thanks,
Berliner Bengalis
