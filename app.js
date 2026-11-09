// ---------- 1. Reusable toast notification ----------
function showToast(message) {
  // Create the toast box
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Add it to the page
  document.body.appendChild(toast);

  // Remove it after 3 seconds
  setTimeout(function () {
    toast.remove();
  }, 3000);
}

// ---------- 2. Book buttons: smooth scroll + toast ----------
const bookButtons = document.querySelectorAll(".book-btn");
const bookingForm = document.getElementById("book");
const matchSelect = document.getElementById("match");

bookButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const matchName = button.dataset.match;   // e.g. "CSK vs MI"

    matchSelect.value = matchName;            // select the match in the form
    bookingForm.scrollIntoView({ behavior: "smooth" });  // smooth scroll
    showToast(matchName + " selected. Please fill in your details.");
  });
});