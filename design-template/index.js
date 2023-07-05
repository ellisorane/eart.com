// JavaScript
const toggleBtn = document.querySelector('.toggleBtn');
const navLinks = document.querySelector('.navlinksContainer');

toggleBtn.addEventListener('click', function() {
  if (navLinks.style.display === 'none') {
    navLinks.style.display = 'block';
  } else {
    navLinks.style.display = 'none';
  }
});