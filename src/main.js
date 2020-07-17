import './css/main.less';
import './css/header.less';
import './css/link.less';
import './css/badge.less';
import './css/scroll.less';
import './css/parallax.less';
import './css/mouseleave.less';

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

/**
 * JS for scroll
 */
function isElementInViewport(el) {
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0];
  }

  const screenHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const rect = el.getBoundingClientRect();

  return (
    // element is bigger than screen
    (rect.top <= 0 && rect.bottom >= 0) ||
    // element's top is in the screen
    (rect.bottom >= screenHeight && rect.top <= screenHeight) ||
    // element's bottom is in the screen
    (rect.top >= 0 && rect.bottom <= screenHeight)
  );
}

const scroll =
  window.requestAnimationFrame ||
  function (callback) {
    windows.setTimeout(callback, 1000 / 60);
  };

const elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {
  elementsToShow.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  });

  scroll(loop);
}

loop();

/* parallax */
new Rellax('.rellax', {
  center: true,
});
new Rellax('.rellax-non-centered', {
  center: false,
});

/* Mouse leave */
$(function () {
  $(window).mouseleave(function (e) {
    const modalSeen = sessionStorage.getItem('modalSeen');

    if (e.toElement == null && !modalSeen) {
      document.documentElement.classList.add('mouse-out');
    }
  });

  $('#close-modal').click(function (e) {
    e.preventDefault();
    document.documentElement.classList.remove('mouse-out');
    sessionStorage.setItem('modalSeen', true);
  });
});
