AdSense Consent Flow Test Results

Date: 2026-09-04

Tests performed (headless Playwright):

1) Reject flow
- Action: Cleared stored consent, loaded homepage, clicked **Reject All** on cookie banner.
- Observed: No AdSense script present before or after rejecting. No requests to `pagead2.googlesyndication.com` were observed during the reject run.
- Stored prefs: `bb_consent_prefs` recorded with marketing:false (as expected).

2) Accept flow
- Action: Cleared stored consent, loaded homepage, clicked **Accept All** on cookie banner.
- Observed: AdSense script (`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`) was dynamically inserted after acceptance and ad units were triggered to render.
- Network: Requests to `pagead2.googlesyndication.com` were observed after consent.
- Stored prefs: `bb_consent_prefs` recorded with marketing:true.

Conclusion:
- The CMP correctly prevents AdSense from loading before explicit marketing consent and dynamically loads the AdSense script only after consent is granted. This satisfies the common AdSense/GDPR requirement to gate advertising scripts behind explicit consent.

Notes:
- For full evidence (HAR or video), I can re-run the test and save a HAR file or screen recording on request.
- Next manual checks: verify ad slot IDs, test on multiple browsers/devices, and perform a live AdSense account review once you confirm slot IDs.
