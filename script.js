// SMOOTH SCROLL (for same-page nav links with IDs)
document.querySelectorAll(".nav-links a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// SCROLL ANIMATIONS
const animatedEls = document.querySelectorAll(".animate-on-scroll");

// INITIAL STATE (hidden)
animatedEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "0.5s ease";
});

window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.85;

  animatedEls.forEach(el => {
    // Skip if already animated
    if (el.classList.contains("animated")) return;
    
    const elTop = el.getBoundingClientRect().top;

    if (elTop < triggerBottom) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.classList.add("animated");
    }
  });
}, { passive: true });

// HAMBURGER MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });
}

// NAVBAR SCROLL EFFECT (add shadow/background on scroll)
const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ACCORDION CASES
document.querySelectorAll(".accordion-trigger").forEach(trigger => {
  const activate = () => {
    const card = trigger.closest(".accordion-case");
    const isOpen = card.classList.contains("open");

    // Close all others
    document.querySelectorAll(".accordion-case.open").forEach(openCard => {
      openCard.classList.remove("open");
      openCard.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
    });

    // Toggle clicked one
    if (!isOpen) {
      card.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }
  };

  trigger.addEventListener("click", activate);

  // Keyboard support: Enter or Space
  trigger.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  });
});
