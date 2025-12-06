// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
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
  
  if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', function(e) {
      if (e.target === mobileDrawer) closeMobileMenu();
    });
  }
  
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) closeMobileMenu();
  });
  
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
  
  // ===== OFFICE SLIDER =====
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if(slides.length) {
    let currentSlide = 0;

    function showSlide(index) {
      if(index >= slides.length) index = 0;
      if(index < 0) index = slides.length - 1;
      currentSlide = index;
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      slides[currentSlide].classList.add('active');
      if(dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    if(prevBtn) prevBtn.addEventListener('click', prevSlide);
    if(nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => showSlide(i));
    });

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide on hover
    const officeSlider = document.querySelector('.office-slider-container');
    if(officeSlider) {
      officeSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      officeSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
    }

    showSlide(0); // Initialize
  }
});