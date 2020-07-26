import './css/main.less';
import './css/header.less';
import './css/link.less';
import './css/badge.less';
import './css/scroll.less';
import './css/parallax.less';
import './css/mouseleave.less';
import './css/carousel.less';

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

/**
 * Carousel
 */
$(function () {
  let prevInd = 0;
  let currentInd = 1;
  let nextInd = 2;
  let lastInd = $('#quotes-carousel').find('.quote').length - 1;

  $('#quotes-carousel').on('click', '.previous', showQuote);
  $('#quotes-carousel').on('click', '.next', showQuote);
  $('#quotes-carousel-pips').on('click', '.pip', showFromPip);

  generatePips();
  setLeftClass();

  let carouselRunning = true;
  let carouselRestartTimeout;
  let interval = setInterval(function () {
    if (carouselRunning) {
      showNextQuote();
    }
  }, 4000);

  function showNextQuote() {
    if (currentInd === lastInd) {
      currentInd = 0;
    } else {
      currentInd += 1;
    }

    updateState(currentInd);
  }

  function showQuote(event) {
    let target;
    if ($(event.target).hasClass('quote')) {
      target = $(event.target);
    } else {
      target = $(event.target).parent();
    }
    const index = $('.quote').index(target);

    updateState(index, true);
  }

  function updateState(ind, pauseTemporary = false) {
    prevInd = ind === 0 ? lastInd : ind - 1;
    currentInd = ind;
    nextInd = ind === lastInd ? 0 : ind + 1;

    updateCarouselPosition();
    setLeftClass();
    updatePips();

    if (pauseTemporary) {
      clearTimeout(carouselRestartTimeout);
      carouselRunning = false;
      carouselRestartTimeout = setTimeout(function () {
        carouselRunning = true;
      }, 10000);
    }
  }

  function updateCarouselPosition() {
    $('#quotes-carousel').find('.previous').removeClass('previous');
    $('#quotes-carousel').find('.current').removeClass('current');
    $('#quotes-carousel').find('.next').removeClass('next');

    const allQuotes = $('#quotes-carousel').find('.quote');
    $(allQuotes[prevInd]).addClass('previous');
    $(allQuotes[currentInd]).addClass('current');
    $(allQuotes[nextInd]).addClass('next');
  }

  function generatePips() {
    const listContainer = $('#quotes-carousel-pips').find('ul');
    for (let iLoop = 0; iLoop < lastInd; iLoop++) {
      const newPip = $('<li class="pip"></li>');
      $(listContainer).append(newPip);
    }
    updatePips();
  }

  function updatePips() {
    $('#quotes-carousel-pips').find('.previous').removeClass('previous');
    $('#quotes-carousel-pips').find('.current').removeClass('current');
    $('#quotes-carousel-pips').find('.next').removeClass('next');

    const allQuotePips = $('#quotes-carousel-pips').find('.pip');
    $(allQuotePips[prevInd]).addClass('previous');
    $(allQuotePips[currentInd]).addClass('current');
    $(allQuotePips[nextInd]).addClass('next');
  }

  function showFromPip(event) {
    const ind = $('#quotes-carousel-pips li').index(event.target);
    updateState(ind, true);
  }

  function setLeftClass() {
    const allQuotes = $('#quotes-carousel').find('.quote');
    $('.quote.left').removeClass('left');

    if (prevInd > 0) {
      $(allQuotes[prevInd - 1]).addClass('left');
    } else {
      $(allQuotes[lastInd]).addClass('left');
    }
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      carouselRunning = false;
    } else {
      carouselRunning = true;
    }
  });
});
