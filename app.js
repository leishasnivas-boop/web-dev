// ---------- 1. Reusable toast notification ----------
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(function () {
    toast.remove();
  }, 3000);
}

// ---------- 2. Ticket prices for each match and stand ----------
const prices = {
  "CSK vs MI":  { General: 1500, Premium: 4000, VIP: 9000 },
  "RCB vs KKR": { General: 1800, Premium: 4500, VIP: 10000 }
};

// ---------- 3. Select the form controls and summary fields ----------
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const qtyInput = document.getElementById("qty");

const sumMatch = document.getElementById("sum-match");
const sumStand = document.getElementById("sum-stand");
const sumPrice = document.getElementById("sum-price");
const sumQty = document.getElementById("sum-qty");
const sumTotal = document.getElementById("sum-total");

// ---------- 4. Read the choices and update the summary ----------
function updateSummary(showMessage) {
  const match = matchSelect.value;
  const stand = standSelect.value;
  const qty = Number(qtyInput.value);

  // Show the chosen details (or "-" if nothing is chosen yet)
  sumMatch.textContent = match || "-";
  sumStand.textContent = stand || "-";
  sumQty.textContent = qty;

  // Work out the price only when both match and stand are chosen
  if (match && stand) {
    const price = prices[match][stand];
    const total = price * qty;

    sumPrice.textContent = "₹" + price;
    sumTotal.textContent = "₹" + total;

    if (showMessage) {
      showToast("Summary updated: total ₹" + total);
    }
  } else {
    sumPrice.textContent = "₹0";
    sumTotal.textContent = "₹0";
  }
}

// ---------- 5. Update the summary whenever a choice changes ----------
matchSelect.addEventListener("change", function () {
  updateSummary(true);
});

standSelect.addEventListener("change", function () {
  updateSummary(true);
});

qtyInput.addEventListener("change", function () {
  updateSummary(true);
});

// ---------- 6. Book buttons: select match, smooth scroll, toast ----------
const bookButtons = document.querySelectorAll(".book-btn");
const bookingSection = document.getElementById("book");

bookButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const matchName = button.dataset.match;

    matchSelect.value = matchName;
    updateSummary(false);
    bookingSection.scrollIntoView({ behavior: "smooth" });
    showToast(matchName + " selected. Now choose your stand.");
  });
});