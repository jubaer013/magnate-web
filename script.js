// script.js - COMPLETE WITH HAMBURGER TO X ANIMATION

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const body = document.body;
  
  // State variable to track menu status
  let isMenuOpen = false;
  
  // Function to open mobile menu
  function openMobileMenu() {
    if (mobileDrawer && menuBtn) {
      mobileDrawer.classList.add('open');
      menuBtn.classList.add('open'); // Add open class for X animation
      body.style.overflow = 'hidden'; // Prevent background scrolling
      isMenuOpen = true;
      
      // Update aria label for accessibility
      menuBtn.setAttribute('aria-label', 'Close menu');
      menuBtn.setAttribute('aria-expanded', 'true');
      
      // Add focus trap for accessibility
      trapFocus(mobileDrawer);
    }
  }
  
  // Function to close mobile menu
  function closeMobileMenu() {
    if (mobileDrawer && menuBtn) {
      mobileDrawer.classList.remove('open');
      menuBtn.classList.remove('open'); // Remove open class for hamburger animation
      body.style.overflow = ''; // Restore scrolling
      isMenuOpen = false;
      
      // Update aria label for accessibility
      menuBtn.setAttribute('aria-label', 'Open menu');
      menuBtn.setAttribute('aria-expanded', 'false');
      
      // Return focus to menu button
      menuBtn.focus();
    }
  }
  
  // Toggle menu function
  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  // Focus trap for accessibility
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
    
    function handleKeydown(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    }
    
    element.addEventListener('keydown', handleKeydown);
    
    // Store reference to remove event listener later
    element._handleKeydown = handleKeydown;
  }
  
  // Remove focus trap when closing
  function removeFocusTrap(element) {
    if (element._handleKeydown) {
      element.removeEventListener('keydown', element._handleKeydown);
      delete element._handleKeydown;
    }
  }
  
  // Event Listeners
  
  // Toggle menu when hamburger is clicked
  if (menuBtn) {
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Also toggle on Enter/Space key for accessibility
    menuBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
      }
    });
  }
  
  // Close menu when X button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
    
    // Also close on Enter/Space key for accessibility
    closeBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeMobileMenu();
      }
    });
  }
  
  // Close menu when clicking outside drawer content
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', function(e) {
      if (e.target === mobileDrawer) {
        closeMobileMenu();
      }
    });
  }
  
  // Close menu when clicking on mobile nav links
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu on Escape key press
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Handle window resize - close menu on large screens
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth >= 992 && isMenuOpen) {
        closeMobileMenu();
      }
    }, 250); // Debounce resize event
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only process if it's a same-page anchor link (not external)
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          // Close menu if open
          if (isMenuOpen) {
            closeMobileMenu();
          }
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 100, // Adjust for header height
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add loading class to body for initial animation control
  body.classList.add('loaded');
  
  // Console log for debugging (remove in production)
  console.log('MFL Website - Hamburger menu script loaded');
});

// Additional utility functions
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add CSS for loaded state and animation improvements
const style = document.createElement('style');
style.textContent = `
  body.loaded .welcome-text,
  body.loaded .welcome-image {
    animation-play-state: running;
  }
  
  /* Improve hamburger animation smoothness */
  .menu-btn span {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  /* Ensure the X animation is smooth */
  .menu-btn.open span {
    background: #f2b200;
  }
  
  /* Accessibility focus styles */
  .menu-btn:focus {
    outline: 2px solid #f2b400;
    outline-offset: 2px;
    border-radius: 8px;
  }
  
  /* Prevent animation on page load */
  .menu-btn span {
    animation: none !important;
  }
  
  /* Custom styles for better mobile experience */
  @media (max-width: 480px) {
    .menu-btn {
      width: 40px;
      height: 40px;
    }
    
    .menu-btn span {
      width: 24px;
      height: 2.5px;
    }
    
    .menu-btn.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    
    .menu-btn.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('load', function() {
  // Set initial aria attributes
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.setAttribute('aria-label', 'Open menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', 'mobileDrawer');
  }
  
  // Add aria label to close button
  const closeBtn = document.getElementById('closeBtn');
  if (closeBtn) {
    closeBtn.setAttribute('aria-label', 'Close menu');
  }
  
  // Add role and aria-label to mobile drawer
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileDrawer) {
    mobileDrawer.setAttribute('role', 'dialog');
    mobileDrawer.setAttribute('aria-modal', 'true');
    mobileDrawer.setAttribute('aria-label', 'Mobile menu');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    
    // Update aria-hidden when menu opens/closes
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const isOpen = mobileDrawer.classList.contains('open');
          mobileDrawer.setAttribute('aria-hidden', !isOpen);
        }
      });
    });
    
    observer.observe(mobileDrawer, { attributes: true });
  }
});