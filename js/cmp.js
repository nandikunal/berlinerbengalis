/**
 * Berliner Bengalis – Custom CMP (Consent Management Platform)
 * GDPR-compliant consent banner that works like standard websites
 * - Simple, non-intrusive design
 * - Easy dismiss and preference customization
 * - Consent Mode v2 integration
 * - Analytics and ads gating
 */

(function () {
  'use strict';

  const CONSENT_KEY = 'bb_consent_prefs';
  const GA_ID = 'G-FL2JNSGKRN'; // Google Analytics Measurement ID

  /* ── Helpers ── */
  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null'); } catch (e) { return null; }
  }

  function saveConsent(prefs) {
    prefs.timestamp = new Date().toISOString();
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs)); } catch (e) {
      console.warn('[CMP] Could not save consent:', e);
    }
    return prefs;
  }

  function defaultPrefs() {
    return { essential: true, analytics: false, marketing: false, functional: true };
  }

  /* ── Google Consent Mode v2 ── */
  function pushConsentMode(prefs) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('consent', 'update', {
      ad_storage:            prefs.marketing  ? 'granted' : 'denied',
      analytics_storage:     prefs.analytics  ? 'granted' : 'denied',
      ad_user_data:          prefs.marketing  ? 'granted' : 'denied',
      ad_personalization:    prefs.marketing  ? 'granted' : 'denied',
      functionality_storage: prefs.functional ? 'granted' : 'denied',
      security_storage:      'granted'
    });
  }

  /* ── Load Google Analytics (consent-gated) ── */
  function loadGA() {
    if (document.querySelector('script[src*="gtag/js"]')) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  /* ── Load AdSense (consent-gated) ── */
  function loadAdSense() {
    if (window.adsbygoogle) {
      document.querySelectorAll('.adsbygoogle').forEach(function (el) {
        if (!el.dataset.adsbygoogleStatus) {
          try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
        }
      });
    }
  }

  /* ── Apply consent ── */
  function applyConsent(prefs) {
    saveConsent(prefs);
    pushConsentMode(prefs);
    if (prefs.analytics) loadGA();
    if (prefs.marketing) loadAdSense();
  }

  /* ── Banner UI ── */
  function hideBanner() {
    var banner = document.getElementById('bbCmpBanner');
    if (banner) {
      banner.style.display = 'none';
      banner.setAttribute('aria-hidden', 'true');
    }
  }

  function initBanner() {
    var banner   = document.getElementById('bbCmpBanner');
    var acceptBtn = document.getElementById('bbCmpAccept');
    var rejectBtn = document.getElementById('bbCmpReject');
    var customBtn = document.getElementById('bbCmpCustomize');

    if (!banner) return;

    var existing = getConsent();
    if (existing) {
      hideBanner();
      applyConsent(existing);
      return;
    }

    // Show banner
    banner.style.display = '';
    banner.setAttribute('aria-hidden', 'false');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        var prefs = { essential: true, analytics: true, marketing: true, functional: true };
        applyConsent(prefs);
        hideBanner();
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        var prefs = { essential: true, analytics: false, marketing: false, functional: false };
        applyConsent(prefs);
        hideBanner();
      });
    }

    if (customBtn) {
      customBtn.addEventListener('click', openModal);
    }
  }

  /* ── Preference Modal ── */
  function openModal() {
    var overlay  = document.getElementById('bbCmpOverlay');
    var modal    = document.getElementById('bbCmpModal');
    var tAnalytics  = document.getElementById('bbCmpToggleAnalytics');
    var tMarketing  = document.getElementById('bbCmpToggleMarketing');
    var tFunctional = document.getElementById('bbCmpToggleFunctional');

    var current = getConsent() || defaultPrefs();
    setToggle(tAnalytics,  current.analytics);
    setToggle(tMarketing,  current.marketing);
    setToggle(tFunctional, current.functional);

    if (overlay) {
      overlay.style.display = '';
      overlay.setAttribute('aria-hidden', 'false');
    }
    if (modal) {
      modal.style.display = '';
      modal.setAttribute('aria-hidden', 'false');
      modal.focus();
    }
  }

  function closeModal() {
    var overlay = document.getElementById('bbCmpOverlay');
    var modal   = document.getElementById('bbCmpModal');
    if (overlay) {
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
    }
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function setToggle(btn, active) {
    if (!btn) return;
    btn.setAttribute('data-active', !!active ? 'true' : 'false');
    btn.setAttribute('aria-pressed', !!active ? 'true' : 'false');
  }

  function initModal() {
    var overlay     = document.getElementById('bbCmpOverlay');
    var cancelBtn   = document.getElementById('bbCmpCancel');
    var saveBtn     = document.getElementById('bbCmpSave');
    var tAnalytics  = document.getElementById('bbCmpToggleAnalytics');
    var tMarketing  = document.getElementById('bbCmpToggleMarketing');
    var tFunctional = document.getElementById('bbCmpToggleFunctional');

    [tAnalytics, tMarketing, tFunctional].forEach(function (btn) {
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var isActive = this.getAttribute('data-active') === 'true';
        setToggle(this, !isActive);
      });
    });

    if (overlay) overlay.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var prefs = {
          essential: true,
          analytics:  tAnalytics  ? tAnalytics.getAttribute('data-active') === 'true' : false,
          marketing:  tMarketing  ? tMarketing.getAttribute('data-active') === 'true' : false,
          functional: tFunctional ? tFunctional.getAttribute('data-active') === 'true' : true
        };
        applyConsent(prefs);
        hideBanner();
        closeModal();
      });
    }
  }

  /* ── Init ── */
  function init() {
    // Set consent mode defaults (deny all until user chooses) – must run ASAP
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500
    });

    initBanner();
    initModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

