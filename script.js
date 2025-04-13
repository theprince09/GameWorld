// Typing Effect
const text = "Welcome to the Ultimate Game World";
const typingSpeed = 100; // Speed in milliseconds
let index = 0;

function typeWriter() {
  if (index < text.length) {
    document.getElementById("typed-text").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, typingSpeed);
  }
}

// Start typing effect when window loads
window.onload = function() {
  typeWriter();
};


const smoothLinks = document.querySelectorAll('a[href="#explore"], a[href="#home"], .start-btn');

smoothLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// For "Get Started" button
document.querySelector('.start-btn').addEventListener('click', function(e) {
    e.preventDefault(); // prevent default jump
    document.querySelector('#explore').scrollIntoView({ 
      behavior: 'smooth'
    });
  });

  // For "Explore" link in Navbar
  document.querySelector('a[href="#explore"]').addEventListener('click', function(e) {
    e.preventDefault(); // prevent default jump
    document.querySelector('#explore').scrollIntoView({ 
      behavior: 'smooth'
    });
  });

 
const gameCards = document.querySelectorAll('.game-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.8
});

gameCards.forEach(card => {
  observer.observe(card);
});

