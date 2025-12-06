// ===== HERO SLIDER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');
  
  if(!heroSlides.length) return;
  
  let currentHeroSlide = 0;
  let heroSlideInterval;
  
  function showHeroSlide(index) {
    if(index >= heroSlides.length) index = 0;
    if(index < 0) index = heroSlides.length - 1;
    
    currentHeroSlide = index;
    
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[currentHeroSlide].classList.add('active');
    if(heroDots[currentHeroSlide]) heroDots[currentHeroSlide].classList.add('active');
  }
  
  function nextHeroSlide() {
    showHeroSlide(currentHeroSlide + 1);
  }
  
  function prevHeroSlide() {
    showHeroSlide(currentHeroSlide - 1);
  }
  
  function startAutoSlide() {
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
  }
  
  function stopAutoSlide() {
    clearInterval(heroSlideInterval);
  }
  
  // Event Listeners
  if(prevBtn) prevBtn.addEventListener('click', () => {
    prevHeroSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  
  if(nextBtn) nextBtn.addEventListener('click', () => {
    nextHeroSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showHeroSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });
  
  // Pause auto-slide on hover
  const heroSlider = document.querySelector('.hero-slider');
  if(heroSlider) {
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
  }
  
  // Initialize
  showHeroSlide(0);
  startAutoSlide();
  
  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('.hero-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});