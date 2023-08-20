import accounts from "./accounts.js";

const accountsDisplay = document.querySelector(".accounts");
const spendingsDisplay = document.querySelector(".spendings");
let accountButtons = [];

// Display account
const displayAccount = ({ title, balance, spendings }) => {
    const template = `
    <span class="account-name">${title}</span>
    <span class="account-balance">$ ${formatNumber(balance)}</span>
    `;
    const newAccountBtn = document.createElement("div");
    newAccountBtn.classList.add("account");
    newAccountBtn.innerHTML = template;
    newAccountBtn.addEventListener("click", () => {
        displaySpendings(spendings);
        resetActiveAccount();
        newAccountBtn.classList.add("account-active");
    });
    accountButtons.push(newAccountBtn);
    accountsDisplay.appendChild(newAccountBtn);
};

// Format number as dollars
const formatNumber = (numString) => {
    return Number(numString).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

// Reset active account
const resetActiveAccount = () => {
    accountButtons.forEach((button) =>
        button.classList.remove("account-active")
    );
};

// Display active account spendings
const displaySpendings = (spendings) => {
    if (spendings.length === 0) {
        spendingsDisplay.classList.remove("show-spendings");
        return;
    } else {
        spendingsDisplay.classList.add("show-spendings");
        spendingsDisplay.innerHTML = "<h2>Spendings</h2>";
        const maxSpent = calcSpendingMax(spendings);
        spendings.forEach((spending) => {
            const template = `
          <span class="spending-name">${spending.category}</span>
          <span class="spending-amount">$ ${formatNumber(spending.spent)}</span>
          `;
            const newSpending = document.createElement("div");
            newSpending.classList.add("spending");
            newSpending.innerHTML = template;
            newSpending.style.width = calcSpendingWidth(
                spending.spent,
                maxSpent
            );
            spendingsDisplay.appendChild(newSpending);
        });
    }
};

// Calculate spendings max value
const calcSpendingMax = (spendings, spent) => {
    const spendingsAmounts = [];
    spendings.forEach((spending) => {
        spendingsAmounts.push(JSON.parse(spending.spent));
    });
    return Math.max(...spendingsAmounts);
};

// Set spending width
const calcSpendingWidth = (value, maxValue) => {
    const width = (JSON.parse(value) / maxValue) * 100;
    return width > 45 ? `${width}%` : "45%";
};

// Display all accounts
accounts.forEach((account) => {
    displayAccount(account);
});
