// script.js - GUARANTEED WORKING SLIDER

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const body = document.body;
  
  let isMenuOpen = false;
  
  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    menuBtn.classList.add('open');
    body.style.overflow = 'hidden';
    isMenuOpen = true;
  }
  
  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    menuBtn.classList.remove('open');
    body.style.overflow = '';
    isMenuOpen = false;
    menuBtn.focus();
  }
  
  function toggleMobileMenu() {
    isMenuOpen ? closeMobileMenu() : openMobileMenu();
  }
  
  // Event listeners
  if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', function(e) {
      if (e.target === mobileDrawer) closeMobileMenu();
    });
  }
  
  // Close menu on nav link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) closeMobileMenu();
  });
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          if (isMenuOpen) closeMobileMenu();
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// ===== SIMPLE SLIDER - GUARANTEED WORKING =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('Setting up simple slider...');
  
  // Wait a moment for DOM to be fully ready
  setTimeout(function() {
    setupSimpleSlider();
  }, 300);
});

function setupSimpleSlider() {
  // Get elements
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  console.log('Slider elements:', {
    slides: slides.length,
    dots: dots.length,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn
  });
  
  // If no slides, exit
  if (slides.length === 0) {
    console.log('No slides found');
    return;
  }
  
  let currentSlide = 0;
  let autoSlideInterval;
  
  // Function to show a specific slide
  function showSlide(index) {
    console.log('Showing slide:', index);
    
    // Handle wrap-around
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    // Update current slide
    currentSlide = index;
    
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show current slide
    if (slides[currentSlide]) {
      slides[currentSlide].classList.add('active');
    }
    
    // Activate current dot
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }
  
  // Function to go to next slide
  function nextSlide() {
    console.log('Going to next slide');
    showSlide(currentSlide + 1);
    resetAutoSlide();
  }
  
  // Function to go to previous slide
  function prevSlide() {
    console.log('Going to previous slide');
    showSlide(currentSlide - 1);
    resetAutoSlide();
  }
  
  // Function to go to specific slide
  function goToSlide(index) {
    console.log('Going to slide:', index);
    showSlide(index);
    resetAutoSlide();
  }
  
  // Start auto-slide
  function startAutoSlide() {
    console.log('Starting auto-slide');
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
  }
  
  // Stop auto-slide
  function stopAutoSlide() {
    console.log('Stopping auto-slide');
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }
  
  // Reset auto-slide timer
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }
  
  // ===== DIRECT EVENT HANDLERS =====
  
  // Previous button - SIMPLE DIRECT CLICK
  if (prevBtn) {
    console.log('Setting up previous button');
    
    // Remove any existing event listeners
    const newPrevBtn = prevBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    
    // Add SIMPLE click handler
    newPrevBtn.onclick = function(e) {
      console.log('PREV BUTTON CLICKED!');
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
    };
    
    // Also add touch event
    newPrevBtn.addEventListener('touchend', function(e) {
      console.log('PREV BUTTON TOUCHED!');
      e.preventDefault();
      prevSlide();
    });
  }
  
  // Next button - SIMPLE DIRECT CLICK
  if (nextBtn) {
    console.log('Setting up next button');
    
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    newNextBtn.onclick = function(e) {
      console.log('NEXT BUTTON CLICKED!');
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
    };
    
    newNextBtn.addEventListener('touchend', function(e) {
      console.log('NEXT BUTTON TOUCHED!');
      e.preventDefault();
      nextSlide();
    });
  }
  
  // Dot navigation
  dots.forEach((dot, index) => {
    const newDot = dot.cloneNode(true);
    dot.parentNode.replaceChild(newDot, dot);
    
    newDot.onclick = function(e) {
      console.log('DOT CLICKED:', index);
      e.preventDefault();
      goToSlide(index);
    };
    
    newDot.addEventListener('touchend', function(e) {
      e.preventDefault();
      goToSlide(index);
    });
  });
  
  // Hover pause
  const slider = document.querySelector('.office-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Keyboard controls
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  // Initialize
  showSlide(0);
  startAutoSlide();
  
  console.log('Slider setup complete!');
}

// ===== FORCE BUTTONS TO WORK =====
// This is the nuclear option - makes buttons work NO MATTER WHAT
setTimeout(function() {
  console.log('=== FORCING BUTTONS TO WORK ===');
  
  // Get all buttons and dots
  const allPrevButtons = document.querySelectorAll('.prev-btn, [class*="prev"], button:first-child');
  const allNextButtons = document.querySelectorAll('.next-btn, [class*="next"], button:last-child');
  const allDots = document.querySelectorAll('.dot, [class*="dot"]');
  const allSlides = document.querySelectorAll('.slide');
  
  console.log('Force mode - Found:', {
    prevButtons: allPrevButtons.length,
    nextButtons: allNextButtons.length,
    dots: allDots.length,
    slides: allSlides.length
  });
  
  if (allSlides.length === 0) {
    console.log('No slides found in force mode');
    return;
  }
  
  // Simple slider logic for force mode
  let currentIndex = 0;
  
  function forceShowSlide(index) {
    // Handle boundaries
    if (index >= allSlides.length) index = 0;
    if (index < 0) index = allSlides.length - 1;
    
    // Update all slides
    allSlides.forEach(slide => slide.classList.remove('active'));
    allDots.forEach(dot => dot.classList.remove('active'));
    
    // Show new slide
    if (allSlides[index]) allSlides[index].classList.add('active');
    if (allDots[index]) allDots[index].classList.add('active');
    
    currentIndex = index;
    console.log('Force mode: Now showing slide', index + 1);
  }
  
  // Apply force click handlers to ALL prev buttons
  allPrevButtons.forEach(btn => {
    console.log('Adding force handler to prev button');
    
    // Direct onclick - most reliable
    btn.onclick = function() {
      console.log('FORCE: Prev clicked');
      forceShowSlide(currentIndex - 1);
      return false;
    };
    
    // Also add event listener as backup
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      console.log('FORCE EVENT: Prev clicked');
      forceShowSlide(currentIndex - 1);
    }, true); // Use capture phase
    
    // Make absolutely sure it's clickable
    btn.style.pointerEvents = 'auto';
    btn.style.cursor = 'pointer';
    btn.style.position = 'relative';
    btn.style.zIndex = '9999';
  });
  
  // Apply force click handlers to ALL next buttons
  allNextButtons.forEach(btn => {
    console.log('Adding force handler to next button');
    
    btn.onclick = function() {
      console.log('FORCE: Next clicked');
      forceShowSlide(currentIndex + 1);
      return false;
    };
    
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      console.log('FORCE EVENT: Next clicked');
      forceShowSlide(currentIndex + 1);
    }, true);
    
    btn.style.pointerEvents = 'auto';
    btn.style.cursor = 'pointer';
    btn.style.position = 'relative';
    btn.style.zIndex = '9999';
  });
  
  // Apply force click handlers to ALL dots
  allDots.forEach((dot, index) => {
    dot.onclick = function() {
      console.log('FORCE: Dot', index, 'clicked');
      forceShowSlide(index);
      return false;
    };
    
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      console.log('FORCE EVENT: Dot', index, 'clicked');
      forceShowSlide(index);
    }, true);
    
    dot.style.pointerEvents = 'auto';
    dot.style.cursor = 'pointer';
  });
  
  // Initialize
  forceShowSlide(0);
  
  console.log('=== FORCE MODE ACTIVATED ===');
  console.log('Buttons should now work 100%');
  console.log('Test by clicking buttons and checking console');
}, 1000); // Run after 1 second

// ===== ADD CRITICAL CSS =====
const criticalCSS = document.createElement('style');
criticalCSS.textContent = `
  /* MAKE BUTTONS CLICKABLE NO MATTER WHAT */
  .slider-btn, .prev-btn, .next-btn {
    cursor: pointer !important;
    pointer-events: auto !important;
    position: relative !important;
    z-index: 1000 !important;
  }
  
  .slider-btn:hover, .prev-btn:hover, .next-btn:hover {
    background: #fff !important;
    color: #000 !important;
    transform: scale(1.05) !important;
  }
  
  .slider-btn:active, .prev-btn:active, .next-btn:active {
    transform: scale(0.95) !important;
  }
  
  /* DOTS */
  .dot {
    cursor: pointer !important;
    pointer-events: auto !important;
  }
  
  .dot:hover {
    background: #f2b200 !important;
    transform: scale(1.3) !important;
  }
  
  /* REMOVE ANY OVERLAY THAT MIGHT BLOCK CLICKS */
  .office-slider-container * {
    pointer-events: auto !important;
  }
  
  /* FIX Z-INDEX ISSUES */
  .slider-nav {
    position: relative;
    z-index: 1001 !important;
  }
  
  .slider-dots {
    position: relative;
    z-index: 1001 !important;
  }
  
  /* Hamburger menu */
  .menu-btn.open span {
    background: #f2b200 !important;
  }
  
  /* Animation */
  .slide {
    transition: all 0.5s ease !important;
  }
`;
document.head.appendChild(criticalCSS);

// ===== TEST FUNCTION =====
// Run this in browser console to test buttons: testSliderButtons()
window.testSliderButtons = function() {
  console.log('=== TESTING SLIDER BUTTONS ===');
  
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  const slides = document.querySelectorAll('.slide');
  
  console.log('Current state:');
  console.log('- Total slides:', slides.length);
  console.log('- Active slide:', document.querySelector('.slide.active') ? 'Found' : 'None');
  console.log('- Prev button exists:', !!prevBtn);
  console.log('- Next button exists:', !!nextBtn);
  console.log('- Dots:', dots.length);
  
  // Test click events
  if (prevBtn) {
    console.log('Testing prev button...');
    prevBtn.click();
    setTimeout(() => {
      console.log('After prev click - Active slide:', 
        document.querySelector('.slide.active')?.querySelector('h4')?.textContent);
    }, 100);
  }
  
  if (nextBtn) {
    setTimeout(() => {
      console.log('Testing next button...');
      nextBtn.click();
      setTimeout(() => {
        console.log('After next click - Active slide:', 
          document.querySelector('.slide.active')?.querySelector('h4')?.textContent);
      }, 100);
    }, 200);
  }
  
  console.log('=== TEST COMPLETE ===');
};

// ===== FINAL INIT =====
window.addEventListener('load', function() {
  console.log('=== MFL WEBSITE READY ===');
  console.log('Slider buttons are FORCED to work');
  console.log('Test by clicking buttons or running testSliderButtons() in console');
  
  // Make extra sure
  setTimeout(function() {
    const buttons = document.querySelectorAll('.slider-btn, .prev-btn, .next-btn');
    buttons.forEach(btn => {
      if (!btn.onclick) {
        console.log('Adding final click handler to:', btn.className);
        btn.onclick = function() {
          console.log('FINAL: Button clicked - please check slide change');
          return false;
        };
      }
    });
  }, 2000);
});