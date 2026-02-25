// Mobile menu toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Fake contact form handler
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_73pre4c",
    "template_q94nkln",
    this
  )
  .then(() => {
    message.textContent = "Message sent successfully!";
    form.reset();
  })
  .catch(() => {
    message.textContent = "Failed to send message. Try again.";
  });
});