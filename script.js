// Mobile menu
const toggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Email form
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

document.getElementById("timeField").value = new Date().toLocaleString();

form.addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_73pre4c",
    "template_q94nkln",
    this
  )
  .then(() => {
    message.textContent = "✅ Message sent successfully!";
    message.style.color = "green";
    form.reset();
  })
  .catch((error) => {
    message.textContent = "❌ Failed to send message.";
    message.style.color = "red";
    console.error(error);
  });
});