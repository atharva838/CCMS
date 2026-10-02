document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
function readComplaints() {
  try {
    const value = JSON.parse(localStorage.getItem("complaint") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
function saveComplaints(items) {
  localStorage.setItem("complaint", JSON.stringify(items));
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}