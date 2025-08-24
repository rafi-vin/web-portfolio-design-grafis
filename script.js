// Global variables
let isVisible = false
let aboutVisible = false
let portfolioVisible = false
let contactVisible = false
let mobileMenuOpen = false
let scrolled = false

// DOM elements
const navbar = document.getElementById("navbar")
const heroContent = document.getElementById("heroContent")
const aboutContent = document.getElementById("aboutContent")
const aboutImage = document.getElementById("aboutImage")
const statsGrid = document.getElementById("statsGrid")
const portfolioHeader = document.getElementById("portfolioHeader")
const portfolioGrid = document.getElementById("portfolioGrid")
const viewMoreContainer = document.getElementById("viewMoreContainer")
const contactHeader = document.getElementById("contactHeader")
const contactDetails = document.getElementById("contactDetails")
const contactMap = document.getElementById("contactMap")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const menuIcon = document.getElementById("menuIcon")
const closeIcon = document.getElementById("closeIcon")

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  setupEventListeners()
  setupIntersectionObserver()
})

// Initialize animations
function initializeAnimations() {
  // Hero content fade in
  setTimeout(() => {
    if (heroContent) {
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
      isVisible = true
    }
  }, 100)
}

// Setup event listeners
function setupEventListeners() {
  // Scroll event for navbar
  window.addEventListener("scroll", handleScroll)

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileMenuOpen && !mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
      closeMobileMenu()
    }
  })
}

// Handle scroll events
function handleScroll() {
  const currentScrolled = window.scrollY > 50

  if (currentScrolled !== scrolled) {
    scrolled = currentScrolled
    if (navbar) {
      navbar.classList.toggle("scrolled", scrolled)
    }
  }
}

// Setup Intersection Observer for scroll animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetId = entry.target.id

        switch (targetId) {
          case "about":
            animateAboutSection()
            break
          case "portfolio":
            animatePortfolioSection()
            break
          case "contact":
            animateContactSection()
            break
        }
      }
    })
  }, observerOptions)

  // Observe sections
  const sections = ["about", "portfolio", "contact"]
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      observer.observe(section)
    }
  })
}

// Animate about section
function animateAboutSection() {
  if (aboutVisible) return
  aboutVisible = true

  if (aboutContent) {
    aboutContent.classList.add("visible")
  }

  setTimeout(() => {
    if (aboutImage) {
      aboutImage.classList.add("visible")
    }
  }, 300)

  setTimeout(() => {
    if (statsGrid) {
      statsGrid.classList.add("visible")
    }
  }, 500)
}

// Animate portfolio section
function animatePortfolioSection() {
  if (portfolioVisible) return
  portfolioVisible = true

  if (portfolioHeader) {
    portfolioHeader.classList.add("visible")
  }

  // Animate portfolio items with stagger
  const portfolioItems = document.querySelectorAll(".portfolio-item")
  portfolioItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible")
    }, index * 150)
  })

  setTimeout(
    () => {
      if (viewMoreContainer) {
        viewMoreContainer.classList.add("visible")
      }
    },
    portfolioItems.length * 150 + 200,
  )
}

// Animate contact section
function animateContactSection() {
  if (contactVisible) return
  contactVisible = true

  if (contactHeader) {
    contactHeader.classList.add("visible")
  }

  if (contactDetails) {
    contactDetails.classList.add("visible")
  }

  setTimeout(() => {
    if (contactMap) {
      contactMap.classList.add("visible")
    }
  }, 300)
}

// Mobile menu functions
function toggleMobileMenu() {
  if (mobileMenuOpen) {
    closeMobileMenu()
  } else {
    openMobileMenu()
  }
}

function openMobileMenu() {
  mobileMenuOpen = true
  if (mobileMenu) {
    mobileMenu.classList.add("open")
  }
  if (menuIcon && closeIcon) {
    menuIcon.classList.add("hidden")
    closeIcon.classList.remove("hidden")
  }
}

function closeMobileMenu() {
  mobileMenuOpen = false
  if (mobileMenu) {
    mobileMenu.classList.remove("open")
  }
  if (menuIcon && closeIcon) {
    menuIcon.classList.remove("hidden")
    closeIcon.classList.add("hidden")
  }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })

    // Close mobile menu if open
    if (mobileMenuOpen) {
      closeMobileMenu()
    }
  }
}

// Add smooth scrolling for anchor links
document.addEventListener("click", (event) => {
  if (event.target.matches('a[href^="#"]')) {
    event.preventDefault()
    const targetId = event.target.getAttribute("href").substring(1)
    scrollToSection(targetId)
  }
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll handler
window.addEventListener("scroll", throttle(handleScroll, 16)) // ~60fps

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Preload images for better performance
function preloadImages() {
  const images = [
    "professional-graphic-designer-workspace-with-clean.png",
    "modern-minimalist-brand-identity-design-with-clean.png",
    "clean-editorial-magazine-layout-design-with-modern.png",
    "digital-marketing-campaign-design-with-bold-graphi.png",
    "minimalist-product-packaging-design-with-elegant-t.png",
    "clean-modern-website-interface-design-with-minimal.png",
    "professional-corporate-identity-design-with-sophis.png",
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Call preload on page load
window.addEventListener("load", preloadImages)
