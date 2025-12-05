const menuButton = document.querySelector('#menu');
const navMenu = document.querySelector('.navigation');
const mainContent = document.querySelector('main');
const siteFooter = document.querySelector('footer');
let lastFocusedElement = null;

// Create a single overlay element used by the off-canvas menu
let overlay = document.querySelector('.menu-overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);
}

function openMenu() {
  if (!navMenu || !menuButton) return;
  navMenu.classList.add('open');
  overlay.classList.add('visible');
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.textContent = '✖';

  // keep note of previously focused element so we can return focus on close
  lastFocusedElement = document.activeElement;

  // hide the main content from assistive tech while menu is open
  if (mainContent) mainContent.setAttribute('aria-hidden', 'true');
  if (siteFooter) siteFooter.setAttribute('aria-hidden', 'true');

  // move focus to first focusable element inside the menu for keyboard users
  const first = navMenu.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
  if (first) first.focus();
}

function closeMenu() {
  if (!navMenu || !menuButton) return;
  navMenu.classList.remove('open');
  overlay.classList.remove('visible');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';

  // restore aria-hidden on main content
  if (mainContent) mainContent.removeAttribute('aria-hidden');
  if (siteFooter) siteFooter.removeAttribute('aria-hidden');

  // return focus to the element that had focus before opening the menu
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  } else {
    menuButton.focus();
  }
}

if (menuButton && navMenu) {
  // initialize aria attribute
  menuButton.setAttribute('aria-controls', 'main-navigation');
  menuButton.setAttribute('aria-expanded', 'false');

  // ensure nav has an id for accessibility
  if (!navMenu.id) navMenu.id = 'main-navigation';

  menuButton.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  // close the menu when overlay is clicked
  overlay.addEventListener('click', () => closeMenu());

  // close when a link inside the menu is clicked (use event delegation)
  navMenu.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor) closeMenu();
  });

  // trap focus and handle Escape when menu is open
  document.addEventListener('keydown', (e) => {
    // close on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      return;
    }

    // focus trap when menu is open — keep focus inside .navigation
    if (e.key === 'Tab' && navMenu.classList.contains('open')) {
      const focusable = Array.from(navMenu.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled'));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // if Shift+Tab on first element, move to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab on last element -> wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
}
// Footer dinámico
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;