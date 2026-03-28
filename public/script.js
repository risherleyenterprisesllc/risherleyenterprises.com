// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
    
    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// Contact Form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    // Set timestamp
    const timeField = document.getElementById("timeField");
    if (timeField) {
        timeField.value = new Date().toLocaleString();
    }
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        emailjs.sendForm("service_73pre4c", "template_q94nkln", this)
            .then(() => {
                if (formMessage) {
                    formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you soon.';
                    formMessage.style.color = "#28a745";
                }
                contactForm.reset();
                if (timeField) timeField.value = new Date().toLocaleString();
                
                setTimeout(() => {
                    if (formMessage) formMessage.innerHTML = "";
                }, 5000);
            })
            .catch((error) => {
                if (formMessage) {
                    formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.';
                    formMessage.style.color = "#dc3545";
                }
                console.error("EmailJS Error:", error);
                
                setTimeout(() => {
                    if (formMessage) formMessage.innerHTML = "";
                }, 5000);
            });
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.about-section, .preview-section, .services-section, .contact-section');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Active navigation highlight
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href && href === `#${current}`) {
            link.classList.add("active");
        }
    });
});