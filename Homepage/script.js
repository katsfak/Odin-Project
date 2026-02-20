// ==================== SMOOTH SCROLL ENHANCEMENTS ====================
document.addEventListener("DOMContentLoaded", function () {
  initializeScrollAnimations();
  initializeMobileMenu();
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Observe about section
  const aboutSection = document.querySelector(".about-content");
  if (aboutSection) {
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(20px)";
    aboutSection.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(aboutSection);
  }

  // Observe contact cards
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// ==================== MOBILE MENU TOGGLE ====================
function initializeMobileMenu() {
  // Add smooth scroll behavior for navigation links
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

// ==================== SCROLL POSITION INDICATOR ====================
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
  }
});

// ==================== FORM SUBMISSION HANDLER ====================
document.addEventListener("DOMContentLoaded", function () {
  // Handle contact form if added in the future
  const contactForm = document.querySelector('form[id="contact-form"]');
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Add your form submission logic here
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    // Close any open modals if they exist
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => modal.classList.remove("active"));
  }
});

// ==================== LAZY LOADING IMAGES ====================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to resize events if needed
window.addEventListener(
  "resize",
  debounce(function () {
    // Handle window resize
  }, 250),
);

console.log("Portfolio website initialized successfully!");
