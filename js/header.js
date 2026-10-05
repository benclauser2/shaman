/*
 * Site header interactions: mobile menu, submenu disclosures and account dropdown.
 * Mouse users also get hover-open submenus on desktop via CSS.
 */
'use strict';

(() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const menuToggle = header.querySelector('.menu-toggle');
  const subToggles = [...header.querySelectorAll('.sub-toggle')];
  const accountToggle = header.querySelector('.account-toggle');
  const accountPanel = document.getElementById('account-panel');

  const setExpanded = (button, open) => button.setAttribute('aria-expanded', String(open));
  const isOpen = (button) => button.getAttribute('aria-expanded') === 'true';

  function closeSubmenus(except) {
    subToggles.forEach((button) => { if (button !== except) setExpanded(button, false); });
  }

  function setAccount(open) {
    setExpanded(accountToggle, open);
    accountPanel.hidden = !open;
  }

  menuToggle?.addEventListener('click', () => {
    const open = !isOpen(menuToggle);
    setExpanded(menuToggle, open);
    if (!open) closeSubmenus();
  });

  subToggles.forEach((button) => {
    button.addEventListener('click', () => {
      const open = !isOpen(button);
      closeSubmenus(button);
      setExpanded(button, open);
    });
  });

  accountToggle?.addEventListener('click', () => setAccount(!isOpen(accountToggle)));

  // Close open menus on outside click or Escape, returning focus to the trigger.
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-sub')) closeSubmenus();
    if (accountToggle && !e.target.closest('.account-menu')) setAccount(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openSub = subToggles.find(isOpen);
    if (openSub) {
      setExpanded(openSub, false);
      openSub.focus();
      return;
    }
    if (accountToggle && isOpen(accountToggle)) {
      setAccount(false);
      accountToggle.focus();
    }
  });
})();
