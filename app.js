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

// ---------- 2. Hamburger menu (class toggle) ----------
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("open");
});

// close the menu after a link is clicked
navMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
  });
});

// ---------- 3. Filter match cards by team ----------
const teamFilter = document.getElementById("team");
const matchCards = document.querySelectorAll(".match-card");

teamFilter.addEventListener("change", function () {
  const team = teamFilter.value;
  let count = 0;

  matchCards.forEach(function (card) {
    const teams = card.dataset.teams.split(" ");   // e.g. ["CSK", "MI"]
    const show = team === "all" || teams.includes(team);

    card.classList.toggle("hidden", !show);        // hide or show the card
    if (show) count++;
  });

  showToast("Showing " + count + " match(es)");
});

// ---------- 4. Toggle grid / list view ----------
const matchGrid = document.getElementById("match-grid");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

gridBtn.addEventListener("click", function () {
  matchGrid.classList.remove("list-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", function () {
  matchGrid.classList.add("list-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

// ---------- 5. Ticket prices ----------
const prices = {
  "CSK vs MI":  { General: 1500, Premium: 4000, VIP: 9000 },
  "RCB vs KKR": { General: 1800, Premium: 4500, VIP: 10000 },
  "MI vs RCB":  { General: 2000, Premium: 5000, VIP: 12000 },
  "KKR vs CSK": { General: 1600, Premium: 4200, VIP: 9500 }
};

// ---------- 6. Live booking summary ----------
const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const qtyInput = document.getElementById("qty");

const sumMatch = document.getElementById("sum-match");
const sumStand = document.getElementById("sum-stand");
const sumPrice = document.getElementById("sum-price");
const sumQty = document.getElementById("sum-qty");
const sumTotal = document.getElementById("sum-total");

function updateSummary(showMessage) {
  const match = matchSelect.value;
  const stand = standSelect.value;
  const qty = Number(qtyInput.value);

  sumMatch.textContent = match || "-";
  sumStand.textContent = stand || "-";
  sumQty.textContent = qty;

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

matchSelect.addEventListener("change", function () { updateSummary(true); });
standSelect.addEventListener("change", function () { updateSummary(true); });
qtyInput.addEventListener("change", function () { updateSummary(true); });

// ---------- 7. Book buttons: select match, smooth scroll, toast ----------
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