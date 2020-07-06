import './css/main.css';
import './css/header.css';
import './css/link.css';

/**
 * JS for header
 */
document.body.className += ' js-loading';

window.addEventListener('load', showPage, false);

function showPage() {
  document.body.className = document.body.className.replace('js-loading', '');
}

/**
 * JS for tooltips
 */
const anchors = document.querySelectorAll('.anchor-tooltip');
anchors.forEach((anchor) => {
  const tooltipText = anchor.getAttribute('title');

  const tooltip = document.createElement('span');
  tooltip.className = 'title-tooltip';
  tooltip.innerHTML = tooltipText;
  anchor.append(tooltip);
});
