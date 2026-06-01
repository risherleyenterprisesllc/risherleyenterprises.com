// ======================
// Mobile Menu Toggle
// ======================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// ======================
// Contact Form
// ======================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

function showMessage(message, color) {
    if (!formMessage) return;

    formMessage.innerHTML = message;
    formMessage.style.color = color;

    setTimeout(() => {
        formMessage.innerHTML = "";
    }, 5000);
}

if (contactForm) {
    const timeField = document.getElementById("timeField");

    const updateTimestamp = () => {
        if (timeField) {
            timeField.value = new Date().toLocaleString();
        }
    };

    updateTimestamp();

    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        try {
            // Primary email
            await emailjs.sendForm(
                "service_46nsjak",
                "template_xkc86zi",
                this
            );

            showMessage(
                '<i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you soon.',
                "#28a745"
            );
        } catch (primaryError) {
            console.warn(
                "Primary email failed, trying backup...",
                primaryError
            );

            try {
                // Backup email
                await emailjs.sendForm(
                    "service_73pre4c",
                    "template_q94nkln",
                    this
                );

                showMessage(
                    '<i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you soon.',
                    "#28a745"
                );
            } catch (backupError) {
                console.error("Backup email failed:", backupError);

                showMessage(
                    '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again.',
                    "#dc3545"
                );

                return;
            }
        }

        contactForm.reset();
        updateTimestamp();
    });
}

// ======================
// Scroll Reveal
// ======================
const revealElements = document.querySelectorAll(
    ".about-section, .preview-section, .services-section, .contact-section"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
});

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// ======================
// Active Navigation
// ======================
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            current = section.id;
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${current}`) {
            link.classList.add("active");
        }
    });
}

// ======================
// Navbar Scroll Effect
// ======================
function updateNavbar() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

// ======================
// Combined Scroll Handler
// ======================
function handleScroll() {
    updateNavbar();
    revealOnScroll();
    updateActiveNav();
}

window.addEventListener("scroll", handleScroll);

// Run once on load
handleScroll();

// ======================
// Smooth Scroll
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.getElementById(href.slice(1));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
