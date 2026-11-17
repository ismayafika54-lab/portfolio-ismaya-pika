// MENU NAVIGASI UNTUK TAMPILAN HP
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


// ANIMASI REVEAL
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}


// TAHUN FOOTER OTOMATIS
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// MENANDAI MENU SESUAI BAGIAN YANG DILIHAT
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}


// CONTACT FORM - EMAILJS

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const sendButton = document.getElementById("sendButton");
    const formStatus = document.getElementById("formStatus");

    sendButton.disabled = true;
    sendButton.textContent = "Mengirim pesan...";

    formStatus.textContent = "";

    try {

      await emailjs.sendForm(
        "service_57o63yd",
        "template_81jqgcs",
        contactForm,
        {
          publicKey: "z-NG_7ubwzpwRKXbG"
        }
      );

      formStatus.textContent = "Pesan berhasil dikirim! Terima kasih sudah menghubungi saya ♡";
      formStatus.style.color = "green";

      contactForm.reset();

    } catch (error) {

      console.error("Gagal mengirim pesan:", error);

      formStatus.textContent = "Pesan gagal dikirim. Silakan coba lagi.";
      formStatus.style.color = "red";

    } finally {

      sendButton.disabled = false;
      sendButton.innerHTML = 'Kirim Pesan <span>↗</span>';

    }

  });

}