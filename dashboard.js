if (localStorage.getItem("islogedin") !== "true") {
  alert("Please log in to access the admin dashboard.");
  window.location.replace("login.html");
}
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("islogedin");
  window.location.href = "login.html";
});
const adminTable = document.getElementById("admincomplaintlist");
const adminEmpty = document.getElementById("empty-state");
function renderComplaints() {
  const complaints = readComplaints().sort((a, b) => Number(b.id) - Number(a.id));
  document.getElementById("total-count").textContent = complaints.length;
  document.getElementById("pending-count").textContent = complaints.filter(c => (c.status || "pending") === "pending").length;
  document.getElementById("progress-count").textContent = complaints.filter(c => c.status === "in progress").length;
  document.getElementById("completed-count").textContent = complaints.filter(c => c.status === "completed").length;
  adminEmpty.hidden = complaints.length > 0;
  adminTable.innerHTML = complaints.map(c => {
    const status = c.status || "pending";
    const date = c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—";
    const options = ["pending", "in progress", "completed"].map(value =>
      `<option value="${value}" ${status === value ? "selected" : ""}>${value.replace(/\b\w/g, ch => ch.toUpperCase())}</option>`
    ).join("");
    return `<tr>
      <td><span class="id-text">CCMS-${escapeHTML(c.id)}</span></td>
      <td>${escapeHTML(c.username)}</td><td>${escapeHTML(c.complainttype)}</td>
      <td>${escapeHTML(c.area)}<br><small>${escapeHTML(c.landmark || "")}</small></td>
      <td>${escapeHTML(date)}</td>
      <td><select class="status-select" aria-label="Update status for complaint ${escapeHTML(c.id)}" data-id="${escapeHTML(c.id)}">${options}</select></td>
      <td>${status === "completed" ? `<button class="delete-btn" data-delete="${escapeHTML(c.id)}">Delete</button>` : `<span class="muted-action">—</span>`}</td>
    </tr>`;
  }).join("");
}
adminTable.addEventListener("change", event => {
  if (!event.target.matches(".status-select")) return;
  const id = Number(event.target.dataset.id);
  const complaints = readComplaints();
  const item = complaints.find(c => Number(c.id) === id);
  if (!item) return;
  item.status = event.target.value;
  saveComplaints(complaints);
  renderComplaints();
});
adminTable.addEventListener("click", event => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  const id = Number(button.dataset.delete);
  if (!confirm("Delete this completed complaint? This cannot be undone.")) return;
  saveComplaints(readComplaints().filter(c => Number(c.id) !== id));
  renderComplaints();
});
document.getElementById("refresh-btn").addEventListener("click", renderComplaints);
renderComplaints();