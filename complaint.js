const form = document.getElementById("complaintform");
const message = document.getElementById("form-message");
form.addEventListener("submit", event => {
  event.preventDefault();
  message.className = "form-message";
  const name = document.getElementById("username").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const complainttype = document.getElementById("complainttype").value;
  const description = document.getElementById("description").value.trim();
  const area = document.getElementById("area").value.trim();
  const landmark = document.getElementById("landmark").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const image = document.getElementById("complaintimg").files[0];

  if (name.length < 2 || !/^[6-9]\d{9}$/.test(mobile) || !complainttype ||
      description.length < 10 || !area || !landmark || !/^\d{6}$/.test(pincode)) {
    message.textContent = "Please check all required fields and enter valid details.";
    message.classList.add("show", "error");
    return;
  }
  if (image && !["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
    message.textContent = "Please upload a JPG, PNG, or WEBP image.";
    message.classList.add("show", "error");
    return;
  }
  const complaints = readComplaints();
  const item = {
    id: Date.now(),
    username: name,
    mobile,
    complainttype,
    description,
    imageName: image ? image.name : "",
    area,
    landmark,
    pincode,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  complaints.push(item);
  try {
    saveComplaints(complaints);
    message.textContent = `Complaint submitted successfully! Your complaint ID is CCMS-${item.id}. Save this ID to refer to your report.`;
    message.classList.add("show", "success");
    form.reset();
  } catch (error) {
    message.textContent = "Could not save this complaint in browser storage. Try a shorter description or clear local storage.";
    message.classList.add("show", "error");
  }
});