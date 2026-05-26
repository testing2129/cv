// Language Switcher
function getBasePath() {
  let path = window.location.pathname;
  path = path.replace(/\/sv\/?$/, '').replace(/\/sv\//, '/');
  path = path.replace(/index\.html$/, '');
  path = path.replace(/\/$/, '');
  return path || '/';
}

function switchLanguage(lang) {
  const basePath = getBasePath();
  const currentPath = window.location.pathname;
  const hash = window.location.hash;
  
  console.log('switchLanguage called with lang:', lang);
  console.log('basePath:', basePath);
  console.log('currentPath:', currentPath);
  
  if (lang === 'sv') {
    if (currentPath.includes('/sv/')) {
      console.log('Already on Swedish');
      return;
    }
    console.log('Navigating to:', basePath + '/sv/' + hash);
    window.location.href = basePath + '/sv/' + hash;
  } else if (lang === 'en') {
    if (!currentPath.includes('/sv/')) {
      console.log('Already on English');
      return;
    }
    console.log('Navigating to:', basePath + '/' + hash);
    window.location.href = basePath + '/' + hash;
  }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded - Attaching language switcher');
  
  // Find all lang-link elements
  const langLinks = document.querySelectorAll('.lang-link');
  console.log('Found lang-link elements:', langLinks.length);
  
  langLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      console.log('Language link clicked:', lang);
      switchLanguage(lang);
    });
  });
});

// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
