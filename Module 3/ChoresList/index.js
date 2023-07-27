const choreInput = document.querySelector("#chore-input");
const arrowBtn = document.querySelector("#arrow-btn");
const crossBtn = document.querySelector("#cross-btn");
const choresListDisplay = document.querySelector("#chores-list");

// Check if choresList exists in localstorage or set it to empty array
let choresList = localStorage.getItem("choresList")
  ? JSON.parse(localStorage.getItem("choresList"))
  : [];

const successGifs = [
  "https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif",
  "https://media.giphy.com/media/zaqclXyLz3Uoo/giphy.gif",
  "https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif",
  "https://media.giphy.com/media/skmziDEEjiin6/giphy.gif",
  "https://media.giphy.com/media/xUNd9RiuOySv3HBYOc/giphy.gif",
];

// Input event listener
choreInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addChore(choreInput.value);
  }
});

// Arrow button event listener
arrowBtn.addEventListener("click", () => {
  addChore(choreInput.value);
});

// Cross button event listener
crossBtn.addEventListener("click", () => {
  deleteAllChores();
});

// Add chore and display it
const addChore = (chore) => {
  if (chore && choresList.indexOf(chore) < 0) {
    choresList.push(chore);
    displayChore(chore);
  }
  choreInput.value = "";
  localStorage.setItem("choresList", JSON.stringify(choresList));
};

// Delete all chores and display success gif
const deleteAllChores = () => {
  choresList = [];
  choresListDisplay.innerHTML = "";
  localStorage.removeItem("choresList");
  choresListDisplay.innerHTML = displayRandomGif();
};

// Display an individual chore
const displayChore = (chore) => {
  let newChore = document.createElement("div");
  newChore.innerHTML = `<p>${chore}</p>`;
  newChore.classList.add("chore");
  newChore.addEventListener("click", (e) => {
    deleteChore(e.target.textContent);
  });
  if (choresList.length === 1) choresListDisplay.innerHTML = "";
  choresListDisplay.append(newChore);
};

// Delete an individual chore
const deleteChore = (chore) => {
  choresList = choresList.filter((existingChore) => existingChore != chore);
  localStorage.setItem("choresList", JSON.stringify(choresList));
  if (choresList.length === 0) {
    choresListDisplay.innerHTML = displayRandomGif();
  } else {
    choresListDisplay.innerHTML = "";
    displayChoresList();
  }
};

// Display chores list
const displayChoresList = () => {
  choresList.forEach((chore) => displayChore(chore));
};

// Display random gif
const displayRandomGif = () => {
  const url = successGifs[Math.floor(Math.random() * 5)];
  return `
        <img src="${url}" alt="random gif of success" class="success-gif">
    `;
};

// Render choresList on load
choresListDisplay.innerHTML = "";
displayChoresList();
