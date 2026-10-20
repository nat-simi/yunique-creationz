document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", e => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });

const form = document.getElementById("contactForm");
if (form) {
  const note = document.getElementById("formNote");
  const text = d => `Hi Yunique Creationz, I'm ${d.get("name")} (${d.get("email")}).\nService: ${d.get("service")}\n\n${d.get("message")}`;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    location.href = `mailto:yuniquecreationz247@gmail.com?subject=${encodeURIComponent("New project enquiry from " + d.get("name"))}&body=${encodeURIComponent(text(d))}`;
    note.textContent = "Opening your email app. Thank you for reaching out!";
  });
  document.getElementById("waBtn").addEventListener("click", () => {
    if (!form.reportValidity()) return;
    window.open(`https://wa.me/2348082730009?text=${encodeURIComponent(text(new FormData(form)))}`, "_blank");
  });
}
