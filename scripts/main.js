// Language Switcher
function getCurrentLanguage() {
  const host = window.location.hostname;
  const parts = host.split('.');
  
  // Check if first part is language code (sv or en) or if path contains /sv/
  if (parts.length > 1 && parts[0] === 'sv') {
    return 'sv';
  }
  
  // Check path for /sv/
  if (window.location.pathname.startsWith('/sv/')) {
    return 'sv';
  }
  
  return 'en'; // Default to English
}

function switchLanguage(lang) {
  let newHost = window.location.hostname;
  const parts = newHost.split('.');
  const currentPath = window.location.pathname;
  let newPath = currentPath;
  
  // Handle subdomain approach
  if (lang === 'sv') {
    if (parts[0] !== 'sv' && parts.length > 1) {
      newHost = 'sv.' + parts.slice(1).join('.');
    } else if (parts[0] !== 'sv') {
      newHost = 'sv.' + newHost;
    }
  } else if (lang === 'en') {
    if (parts[0] === 'sv') {
      newHost = parts.slice(1).join('.');
    }
  }
  
  window.location.href = window.location.protocol + '//' + newHost + newPath + window.location.search + window.location.hash;
}

// Handle language link clicks
$(document).on('click', '.lang-link', function(e) {
  e.preventDefault();
  const lang = $(this).data('lang');
  switchLanguage(lang);
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
