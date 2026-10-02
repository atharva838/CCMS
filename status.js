const table = document.getElementById("complaintlist");
const emptyState = document.getElementById("empty-state");
function renderStatus() {
  const complaints = readComplaints().sort((a, b) => Number(b.id) - Number(a.id));
  document.getElementById("total-count").textContent = complaints.length;
  document.getElementById("pending-count").textContent = complaints.filter(c => (c.status || "pending") === "pending").length;
  document.getElementById("completed-count").textContent = complaints.filter(c => c.status === "completed").length;
  emptyState.hidden = complaints.length > 0;
  table.innerHTML = complaints.map(c => {
    const status = c.status || "pending";
    const statusClass = status === "in progress" ? "in-progress" : status;
    const date = c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—";
    return `<tr>
      <td><span class="id-text">CCMS-${escapeHTML(c.id)}</span></td>
      <td>${escapeHTML(c.username)}</td><td>${escapeHTML(c.complainttype)}</td>
      <td>${escapeHTML(c.area)}</td><td>${escapeHTML(date)}</td>
      <td><span class="status-pill status-${escapeHTML(statusClass)}">${escapeHTML(status.replace(/\b\w/g, ch => ch.toUpperCase()))}</span></td>
    </tr>`;
  }).join("");
}
document.getElementById("refresh-btn").addEventListener("click", renderStatus);
renderStatus();