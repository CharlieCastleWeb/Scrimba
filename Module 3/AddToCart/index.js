
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-dae1e-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");


addButtonEl.addEventListener("click", () => {
    let inputValue = inputFieldEl.value;
    appendItemToShoppingListEl(inputValue);
    push(shoppingListDB, inputValue);
    clearInputFieldEl();
});

onValue(shoppingListDB, snapshot => {

    if (snapshot.exists()) {
        let shoppingItems = Object.entries(snapshot.val());
    
        clearShoppingListEl();
        shoppingItems.forEach( item => {
            let currentItemId = item[0];
            let currentItemValue = item[1];
            appendItemToShoppingListEl(item);
        })
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }

});

const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = "";
}


const clearInputFieldEl = () => {
    inputFieldEl.value = "";
}

const appendItemToShoppingListEl = (item) => {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
    let itemId = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", () => {
        let exactLocationOfItemInDb = ref(database, `shoppingList/${itemId}`);
        remove(exactLocationOfItemInDb);
    });

    shoppingListEl.append(newEl);
}



