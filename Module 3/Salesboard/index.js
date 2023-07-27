// Product A info
let productA = {
  emoji: "⭐",
  revenue: 200,
  commision: 50,
};

// Product B info
let productB = {
  emoji: "🔥",
  revenue: 300,
  commision: 75,
};

// Query Selectors
const productAbtn = document.querySelector("#product-a-btn");
const productBbtn = document.querySelector("#product-b-btn");
const darkModeToggle = document.querySelector("#dark-mode");
const resetApp = document.querySelector("#reset-app");
const salesCounter = document.querySelector("#sales-counter");
const achievementsCounter = document.querySelector("#achievements-counter");
const revenueDisplay = document.querySelector("#revenue");
const commisionDisplay = document.querySelector("#commision");

// Declare variables and check if they exist in localstorage
let sales = localStorage.getItem("sales") ? localStorage.getItem("sales") : "";
let salesNum = localStorage.getItem("salesNum")
  ? localStorage.getItem("salesNum")
  : 0;
let achievements = localStorage.getItem("achievements")
  ? localStorage.getItem("achievements")
  : "";
let achievementsNum = localStorage.getItem("achievementsNum")
  ? localStorage.getItem("achievementsNum")
  : 0;
let revenue = localStorage.getItem("revenue")
  ? Number(localStorage.getItem("revenue"))
  : 0;
let commision = localStorage.getItem("commision")
  ? Number(localStorage.getItem("commision"))
  : 0;
let trophyUnlocked = localStorage.getItem("trophyUnlocked")
  ? localStorage.getItem("trophyUnlocked")
  : false;
let moneyFaceUnlocked = localStorage.getItem("moneyFaceUnlocked")
  ? localStorage.getItem("trophyUnlocked")
  : false;
let darkModeActive = localStorage.getItem("darkModeActive")
  ? localStorage.getItem("trophyUnlocked")
  : true;

// Event Listeners
productAbtn.addEventListener("click", () => updateApp(productA));
productBbtn.addEventListener("click", () => updateApp(productB));
darkModeToggle.addEventListener("click", () => toggleDarkMode());
resetApp.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

// Avoid animations on loading and display initial app state
document.body.onload = () => {
  document
    .querySelectorAll(".preload")
    .forEach((el) => el.classList.remove("preload"));
  updateDisplays();
};

// Update app logic
const updateApp = (product) => {
  sales += product.emoji;
  salesNum++;
  localStorage.setItem("sales", sales);
  localStorage.setItem("salesNum", salesNum);
  checkSalesAchievements();
  revenue += product.revenue;
  localStorage.setItem("revenue", revenue);
  checkRevenueAchievements();
  commision += product.commision;
  localStorage.setItem("commision", commision);
  updateDisplays(product);
};

// Update data displays
const updateDisplays = () => {
  salesCounter.querySelector("span").textContent = salesNum;
  salesCounter.querySelector("p").textContent = sales;
  achievementsCounter.querySelector("span").textContent = achievementsNum;
  achievementsCounter.querySelector("p").textContent = achievements;
  revenueDisplay.textContent = revenue;
  commisionDisplay.textContent = commision;
};

// Check sales achievements
const checkSalesAchievements = () => {
  if (salesNum === 1) {
    updateAchievements("🔔");
  }
  if (salesNum === 15) {
    updateAchievements("🏆");
  }
};

// Check revenue achievements
const checkRevenueAchievements = () => {
  if (revenue >= 2500 && !trophyUnlocked) {
    updateAchievements("💰");
    trophyUnlocked = true;
    localStorage.setItem("trophyUnlocked", trophyUnlocked);
  }
  if (revenue >= 5000 && !moneyFaceUnlocked) {
    updateAchievements("🤑");
    moneyFaceUnlocked = true;
    localStorage.setItem("moneyFaceUnlocked", moneyFaceUnlocked);
  }
};

// Update achievements display
const updateAchievements = (emoji) => {
  achievements += emoji;
  achievementsNum++;
  localStorage.setItem("achievements", achievements);
  localStorage.setItem("achievementsNum", achievementsNum);
  achievementsCounter.querySelector("span").textContent = achievementsNum;
  achievementsCounter.querySelector("p").textContent = achievements;
};

// Toggle dark mode
const toggleDarkMode = () => {
  if (darkModeActive) {
    darkModeActive = !darkModeActive;
    document.body.style.backgroundColor = "#44354A";
    document
      .querySelectorAll("p")
      .forEach((p) => (p.style.backgroundColor = "#201A23"));
  } else if (!darkModeActive) {
    darkModeActive = !darkModeActive;
    document.body.style.backgroundColor = "#201A23";
    document
      .querySelectorAll("p")
      .forEach((p) => (p.style.backgroundColor = "#44354A"));
  }
};

// Add product icons for buttons
productAbtn.textContent = productA.emoji;
productBbtn.textContent = productB.emoji;
