// Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
    const typewriterElement = document.getElementById("typewriter-text")
    const fullText = "Aspiring Computer Scientist & Developer"
    let i = 0

    function typeWriter() {
        if (i < fullText.length) {
            typewriterElement.textContent += fullText.charAt(i)
            i++
            setTimeout(typeWriter, 100)
        }
    }

    typeWriter()
})


// Smooth Scrolling for Navigation Links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }
}

// Add click event listeners to navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href").substring(1)
        scrollToSection(targetId)
    })
})

// Intersection Observer for Animation Triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("about-card") || entry.target.classList.contains("contact-info")) {
        entry.target.classList.add("animate-left")
      } else if (entry.target.classList.contains("about-text") || entry.target.classList.contains("contact-form")) {
        entry.target.classList.add("animate-right")
      } else {
        entry.target.classList.add("animate-up")
      }
      observer.unobserve(entry.target) // run only once
    }
  })
}, observerOptions)


// Observe all animated elements
// ----- robust observe + immediate-trigger for in-view elements -----
const animatedSelector = ".hero-content, .section-header, .skill-category, .project-card, .achievement-card, .about-card, .about-text, .contact-info, .contact-form";

document.querySelectorAll(animatedSelector).forEach((el) => {
  const rect = el.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;

  // function to add the right class (same logic as observer callback)
  const addAnimClass = (target) => {
    if (target.classList.contains("about-card") || target.classList.contains("contact-info")) {
      target.classList.add("animate-left");
    } else if (target.classList.contains("about-text") || target.classList.contains("contact-form")) {
      target.classList.add("animate-right");
    } else {
      target.classList.add("animate-up");
    }
  };

  if (inView) {
    addAnimClass(el); // animate immediately if already visible
  } else {
    observer.observe(el); // otherwise observe
  }
});


// Active Navigation Link Highlighting
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""
    sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id")
        }
    })

    navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active")
        }
    })
})

// Form Submission Handler
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Create mailto link
    const mailtoLink = `mailto:hamzakashifkhanzada@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

    // Open email client
    window.location.href = mailtoLink

    // Show success message (optional)
    alert("Thank you for your message! Your email client should open now.")

    // Reset form
    this.reset()
})

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
    })
})

// Add glow effect to social links
document.querySelectorAll(".social-link").forEach((link) => {
    link.addEventListener("mouseenter", function () {
        this.style.boxShadow = "0 0 20px var(--accent)"
    })

    link.addEventListener("mouseleave", function () {
        this.style.boxShadow = "none"
    })
})

// Parallax effect for hero background
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallax = document.querySelector(".hero-bg")
    const speed = scrolled * 0.5

    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`
    }
})

// Add CSS class for active nav link
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: var(--accent) !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent);
        border-radius: 1px;
    }
`
document.head.appendChild(style)
