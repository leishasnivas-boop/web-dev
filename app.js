// ---------- 1. Reusable toast notification ----------
function showToast(message) {
  const toast = document.createElement("div");   // create a new box
  toast.className = "toast";                     // give it the CSS class
  toast.textContent = message;                   // put the message inside
  document.body.appendChild(toast);              // show it on the page

  setTimeout(function () {                       // remove it after 3 seconds
    toast.remove();
  }, 3000);
}

// ---------- 2. Book buttons: smooth scroll + toast ----------
const bookButtons = document.querySelectorAll(".book-btn");
const bookingSection = document.getElementById("book");
const matchSelect = document.getElementById("match");

bookButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const matchName = button.dataset.match;      // e.g. "CSK vs MI"

    matchSelect.value = matchName;               // select the match in the form
    bookingSection.scrollIntoView({ behavior: "smooth" });
    showToast(matchName + " selected. Please fill in your details.");
  });
});