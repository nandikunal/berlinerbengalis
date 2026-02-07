/**
 * Google Consent Management Platform (CMP)
 * Manages cookie consent across the entire site
 * Shared module for all pages
 */

function initGoogleCMP() {
  const consentBanner = document.getElementById('cmpConsentBanner');
  const consentBtn = document.getElementById('cmpConsentBtn');
  const rejectBtnId = 'cmpRejectBtn';
  const manageBtn = document.getElementById('cmpManageBtn');
  const overlay = document.getElementById('cmpOverlay');
  const modal = document.getElementById('cmpModal');
  const cancelBtn = document.getElementById('cmpCancelBtn');
  const saveBtn = document.getElementById('cmpSaveBtn');
  const toggleAnalytics = document.getElementById('cmpToggleAnalytics');
  const toggleMarketing = document.getElementById('cmpToggleMarketing');
  const toggleFunctional = document.getElementById('cmpToggleFunctional');

  const consentKey = 'google-cmp-consent';

  // Ensure banner is hidden by default if consent already exists
  const existingConsentRaw = localStorage.getItem(consentKey);
  if (existingConsentRaw) {
    const existingConsent = JSON.parse(existingConsentRaw);
    if (consentBanner) {
      consentBanner.classList.add('hidden');
      consentBanner.style.display = 'none';
    }
    applyConsent(existingConsent);
    return;
  }

  // Show banner when no saved consent
  if (consentBanner) {
    consentBanner.classList.remove('hidden');
    consentBanner.style.display = '';
  }

  // Add a Reject button dynamically if missing
  if (consentBanner && !document.getElementById(rejectBtnId)) {
    const actions = consentBanner.querySelector('.cmp-actions');
    if (actions) {
      const btn = document.createElement('button');
      btn.id = rejectBtnId;
      btn.className = 'cmp-btn cmp-btn-reject';
      btn.setAttribute('aria-label', 'Reject all non-essential cookies');
      btn.textContent = 'Reject';
      actions.insertBefore(btn, actions.firstChild);
    }
  }

  const rejectBtn = document.getElementById(rejectBtnId);

  // Consent button - accept all
  if (consentBtn) {
    consentBtn.addEventListener('click', function () {
      const preferences = {
        essential: true,
        analytics: true,
        marketing: true,
        functional: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(consentKey, JSON.stringify(preferences));
      applyConsent(preferences);
      if (consentBanner) { consentBanner.classList.add('hidden'); consentBanner.style.display = 'none'; }
    });
  }

  // Reject button - reject non-essential
  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      const preferences = {
        essential: true,
        analytics: false,
        marketing: false,
        functional: false,
        rejected: true,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(consentKey, JSON.stringify(preferences));
      applyConsent(preferences);
      if (consentBanner) { consentBanner.classList.add('hidden'); consentBanner.style.display = 'none'; }
    });
  }

  // Manage button - open modal
  if (manageBtn) {
    manageBtn.addEventListener('click', function () {
      openPreferenceCenter();
    });
  }

  // Preference center functions
  function openPreferenceCenter() {
    const current = JSON.parse(localStorage.getItem(consentKey) || JSON.stringify(getDefaultPreferences()));

    if (toggleAnalytics) toggleAnalytics.classList.toggle('active', !!current.analytics);
    if (toggleMarketing) toggleMarketing.classList.toggle('active', !!current.marketing);
    if (toggleFunctional) toggleFunctional.classList.toggle('active', !!current.functional);

    if (overlay) overlay.classList.add('active');
    if (modal) modal.classList.remove('hidden');
  }

  function closePreferenceCenter() {
    if (overlay) overlay.classList.remove('active');
    if (modal) modal.classList.add('hidden');
  }

  // Toggle switches (guarded)
  [toggleAnalytics, toggleMarketing, toggleFunctional].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      this.classList.toggle('active');
    });
  });

  // Modal buttons
  if (cancelBtn) cancelBtn.addEventListener('click', closePreferenceCenter);
  if (overlay) overlay.addEventListener('click', closePreferenceCenter);

  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const preferences = {
        essential: true,
        analytics: toggleAnalytics ? toggleAnalytics.classList.contains('active') : false,
        marketing: toggleMarketing ? toggleMarketing.classList.contains('active') : false,
        functional: toggleFunctional ? toggleFunctional.classList.contains('active') : false,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(consentKey, JSON.stringify(preferences));
      applyConsent(preferences);
      if (consentBanner) { consentBanner.classList.add('hidden'); consentBanner.style.display = 'none'; }
      closePreferenceCenter();
    });
  }
}

function getDefaultPreferences() {
  return {
    essential: true,
    analytics: false,
    marketing: false,
    functional: true
  };
}

function applyConsent(preferences) {
  // Persist preference and apply behaviour
  try {
    localStorage.setItem('google-cmp-consent', JSON.stringify(preferences));
  } catch (e) {
    console.warn('Failed to persist consent preferences:', e);
  }

  if (preferences.analytics) {
    loadGoogleAnalytics();
  }
  console.log('Consent preferences applied:', preferences);
}

function loadGoogleAnalytics() {
  const consent = JSON.parse(localStorage.getItem('google-cmp-consent') || '{}');
  if (consent.analytics) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-FL2JNSGKRN');
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGoogleCMP);
} else {
  initGoogleCMP();
}
