// ============================================
// Mobile Navigation Toggle
// ============================================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger icon
  const spans = hamburger.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");

    // Reset hamburger icon
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow on scroll
  if (currentScroll > 0) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// Scroll Animation Observer
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll(".skill-card, .project-card");
animateOnScroll.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ============================================
// Dynamic Year in Footer
// ============================================
const updateYear = () => {
  const footer = document.querySelector(".footer p");
  const currentYear = new Date().getFullYear();
  if (footer) {
    footer.innerHTML = footer.innerHTML.replace(/\d{4}/, currentYear);
  }
};

updateYear();

// ============================================
// Add hover effect to project cards
// ============================================
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// ============================================
// Console Message
// ============================================
console.log(
  "%c👋 Hello there!",
  "font-size: 20px; font-weight: bold; color: #6c63ff;",
);
console.log(
  "%cThanks for checking out my portfolio!",
  "font-size: 14px; color: #636e72;",
);
console.log(
  "%cFeel free to reach out if you want to work together!",
  "font-size: 14px; color: #636e72;",
);

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener("keydown", (e) => {
  // Press 'Escape' to close mobile menu
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");

    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// ============================================
// Loading Animation
// ============================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// ============================================
// Travel Map Initialization
// ============================================
window.addEventListener("load", () => {
  // Check if Leaflet is loaded and map element exists
  if (typeof L !== "undefined" && document.getElementById("map")) {
    // Initialize the map centered on Europe
    const map = L.map("map").setView([48.5, 18], 5);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom icon for markers
    const travelIcon = L.divIcon({
      className: "custom-marker",
      html: '<div style="background-color: #6c63ff; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Travel destinations with coordinates
    const destinations = [
      {
        name: "Athens, Greece",
        coords: [37.9838, 23.7275],
        description: "Home sweet home & endless discoveries",
      },
      {
        name: "Budapest, Hungary",
        coords: [47.4979, 19.0402],
        description: "Beautiful architecture & thermal baths",
      },
      {
        name: "Krakow, Poland",
        coords: [50.0647, 19.945],
        description: "Rich history & vibrant culture",
      },
      {
        name: "Vienna, Austria",
        coords: [48.2082, 16.3738],
        description: "Classical music & imperial palaces",
      },
    ];

    // Add markers for each destination
    destinations.forEach((destination) => {
      const marker = L.marker(destination.coords, { icon: travelIcon }).addTo(
        map,
      );

      // Add popup to marker
      marker.bindPopup(
        `<div style="text-align: center; font-family: 'Inter', sans-serif;">
          <strong style="font-size: 1.1em; color: #6c63ff;">${destination.name}</strong>
          <p style="margin: 0.5rem 0 0; color: #636e72;">${destination.description}</p>
        </div>`,
      );
    });

    // Add a polyline connecting the destinations
    const polylineCoords = destinations.map((dest) => dest.coords);
    L.polyline(polylineCoords, {
      color: "#6c63ff",
      weight: 2,
      opacity: 0.5,
      dashArray: "10, 10",
    }).addTo(map);
  }
});
