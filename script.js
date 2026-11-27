const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const navigationLinks = navigation.querySelectorAll("a");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeNavigation));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle.focus();
  }
});

document.querySelectorAll(".year").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const formStatus = document.querySelector("#form-status");
  const fields = [
    { input: document.querySelector("#name"), error: document.querySelector("#name-error"), label: "name" },
    { input: document.querySelector("#email"), error: document.querySelector("#email-error"), label: "email" },
    { input: document.querySelector("#message"), error: document.querySelector("#message-error"), label: "message" },
  ];

  function validateField(field) {
    const { input, error, label } = field;
    let message = "";

    if (!input.value.trim()) {
      message = `Please enter your ${label}.`;
    } else if (label === "email" && !input.validity.valid) {
      message = "Enter a valid email address.";
    }

    input.setAttribute("aria-invalid", String(Boolean(message)));
    field.error.textContent = message;
    return !message;
  }

  fields.forEach(({ input }) => {
    input.addEventListener("input", () => {
      if (input.hasAttribute("aria-invalid")) {
        const field = fields.find((item) => item.input === input);
        validateField(field);
      }
      formStatus.textContent = "";
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "";

    const invalidFields = fields.filter((field) => !validateField(field));
    if (invalidFields.length) {
      invalidFields[0].input.focus();
      return;
    }

    formStatus.textContent = "Thanks! Your message is ready. This demo form does not send submissions yet.";
    contactForm.reset();
    fields.forEach(({ input }) => input.removeAttribute("aria-invalid"));
  });
}