// Product A info
let productA = {
    emoji: "⭐",
    revenue: 200,
    commision: 50
}

// Product B info
let productB = {
    emoji: "🔥",
    revenue: 300,
    commision: 75
}

// Query Selectors
const productAbtn         = document.querySelector("#product-a-btn");
const productBbtn         = document.querySelector("#product-b-btn");
const darkModeToggle      = document.querySelector("#dark-mode");
const resetApp            = document.querySelector("#reset-app");
const salesCounter        = document.querySelector("#sales-counter");
const achievementsCounter = document.querySelector("#achievements-counter");
const revenueDisplay      = document.querySelector("#revenue");
const commisionDisplay    = document.querySelector("#commision");

// Declare variables and check if they exist in localstorage
// let salesNum          = localStorage.getItem("salesNum") ? localStorage.getItem("salesNum") : 0;
// let achievementsNum   = localStorage.getItem("achievementsNum") ? localStorage.getItem("salachievementsNumesNum") : 0;
let revenue           = localStorage.getItem("revenue") ? localStorage.getItem("revenue") : 0;
let commision         = localStorage.getItem("commision") ? localStorage.getItem("commision") : 0;
let trophyUnlocked    = localStorage.getItem("trophyUnlocked") ? localStorage.getItem("trophyUnlocked") : false;
let moneyFaceUnlocked = localStorage.getItem("moneyFaceUnlocked") ? localStorage.getItem("trophyUnlocked") : false;
let darkModeActive    = localStorage.getItem("darkModeActive") ? localStorage.getItem("trophyUnlocked") : true;

productAbtn.addEventListener("click", () => {
    updateApp(productA);
});

productBbtn.addEventListener("click", () => {
    updateApp(productB);
});

darkModeToggle.addEventListener("click", () => {
    toggleDarkMode();
});

resetApp.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
});

// Avoid animations on loading
document.body.onload = () => document.querySelectorAll(".preload").forEach( el => el.classList.remove("preload"));

// Update app logic
const updateApp = (product) => {
    salesNum++;
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
const updateDisplays = (product) => {
    salesCounter.querySelector("span").textContent = salesNum;
    salesCounter.querySelector("p").textContent += product.emoji;
    revenueDisplay.textContent = revenue;
    commisionDisplay.textContent = commision;
};

// Check sales achievements
const checkSalesAchievements = () => {
    if ( salesNum === 1 ) {
        achievementsNum++;
        updateAchievements("🔔");
    }
    if ( salesNum === 15 ) {
        achievementsNum++;
        updateAchievements("🏆");
    }
};

// Check revenue achievements
const checkRevenueAchievements = () => {
    if ( revenue >= 2500 && !trophyUnlocked) {
        achievementsNum++;
        trophyUnlocked = true;
        updateAchievements("💰");
    }
    if ( revenue >= 5000 && !moneyFaceUnlocked) {
        achievementsNum++;
        moneyFaceUnlocked = true;
        updateAchievements("🤑");
    }
};

// Update achievements display
const updateAchievements = (emoji) => {
    achievementsCounter.querySelector("span").textContent = achievementsNum;
    achievementsCounter.querySelector("p"). textContent += emoji;
};

const toggleDarkMode = () => {
    if (darkModeActive) {
        darkModeActive = !darkModeActive;
        document.body.style.backgroundColor = "#44354A";
        document.querySelectorAll("p").forEach(p => p.style.backgroundColor="#201A23");
    } else if (!darkModeActive) {
        darkModeActive = !darkModeActive;
        document.body.style.backgroundColor = "#201A23";
        document.querySelectorAll("p").forEach(p => p.style.backgroundColor="#44354A");
    }
};

const storeState = () => {
    localStorage.setItem("salesNum", salesNum);
    localStorage.setItem("achievementsNum", achievementsNum);
    localStorage.setItem("revenue", revenue);
    localStorage.setItem("commision", commision);
    localStorage.setItem("trophyUnlocked", trophyUnlocked);
    localStorage.setItem("moneyFaceUnlocked", moneyFaceUnlocked);
    localStorage.setItem("darkModeActive", darkModeActive);
}

// Add product icons for buttons
productAbtn.textContent = productA.emoji;
productBbtn.textContent = productB.emoji;

// Store initial values in local storage
storeState();
