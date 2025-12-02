// script.js
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileDrawer').classList.add('open');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('mobileDrawer').classList.remove('open');
});

// Close when clicking outside (optional)
document.getElementById('mobileDrawer').addEventListener('click', (e) => {
  if (e.target === document.getElementById('mobileDrawer')) {
    document.getElementById('mobileDrawer').classList.remove('open');
  }
});