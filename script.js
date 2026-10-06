const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  mobileMenu.hidden = open;
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    if (mobileMenu) mobileMenu.hidden = true;
  });
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});


// Match the Home "Our service" step dividers to the exact right edge of the
// final "journey:" line above. This keeps the rule length correct after the
// Manrope webfont loads and when the desktop viewport changes size.
const setHomeJourneyRuleWidth = () => {
  const anchor = document.querySelector('.home-journey-rule-anchor');
  const panel = anchor?.closest('.journey-panel');
  if (!anchor || !panel) return;

  if (window.matchMedia('(max-width: 980px)').matches) {
    panel.style.removeProperty('--journey-rule-width');
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(anchor);
  const rects = Array.from(range.getClientRects()).filter((rect) => rect.width > 0);
  const lastLine = rects.at(-1);
  if (!lastLine) return;

  const panelRect = panel.getBoundingClientRect();
  const width = Math.max(0, Math.ceil(lastLine.right - panelRect.left));
  panel.style.setProperty('--journey-rule-width', `${width}px`);
};

if (document.fonts?.ready) {
  document.fonts.ready.then(setHomeJourneyRuleWidth);
} else {
  setHomeJourneyRuleWidth();
}
window.addEventListener('resize', setHomeJourneyRuleWidth);
