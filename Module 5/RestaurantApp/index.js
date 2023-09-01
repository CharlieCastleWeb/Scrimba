import { menuArray } from "./data.js";

const menuDisplay = document.querySelector(".menu");
const orderDisplay = document.querySelector(".order");
const orderItemsDisplay = document.querySelector(".order-items");
const orderTotalDisplay = document.querySelector("#total-order-display");
const completeOrder = document.querySelector("#complete-order");
const modal = document.querySelector(".modal");
const paymentForm = document.querySelector("#payment-form");
const confirmationMessage = document.querySelector(".confirmation-message");

let orderSum = 0;

// Display a food item in the menu
const displayMenuItem = ({ emoji, name, ingredients, price }) => {
    const menuItemtemplate = `
        <p class="menu-item-emoji">${emoji}</p>
        <div class="menu-item-description">
            <p class="title">${name}</p>
            <p class="menu-item-ingredients">
                ${ingredients}
            </p>
            <p class="price menu-item-price">$ ${price}</p>
        </div>
    `;
    // Create new menu item
    const newMenuItem = document.createElement("div");
    newMenuItem.classList.add("menu-item");
    newMenuItem.innerHTML = menuItemtemplate;
    // Add order button to menu item
    const addItemToCartBtn = document.createElement("button");
    addItemToCartBtn.classList.add("order-add-btn");
    addItemToCartBtn.textContent = "+";
    addItemToCartBtn.addEventListener("click", (e) => {
        updateOrder(name, price);
    });
    newMenuItem.append(addItemToCartBtn);
    menuDisplay.append(newMenuItem);
};

// Display food item in the order
const displayOrderItem = (name, price) => {
    const orderItemTemplate = `
            <p class="title">${name}</p>
            <p class="price">$ ${price}</p>
    `;
    // Create new order item
    const newOrderItem = document.createElement("div");
    newOrderItem.classList.add("order-item");
    newOrderItem.innerHTML += orderItemTemplate;
    // Add remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("order-item-remove");
    removeBtn.innerHTML = "remove";
    removeBtn.addEventListener("click", (e) => {
        removeItem(e, price);
    });
    newOrderItem.insertBefore(removeBtn, newOrderItem.childNodes[2]);
    orderItemsDisplay.append(newOrderItem);
};

// Updates order when adding item from menu
const updateOrder = (name, price) => {
    orderDisplay.classList.add("display-block");
    displayOrderItem(name, price);
    updateOrderSum(price);
};

// Updates total order price
const updateOrderSum = (price) => {
    orderSum += price;
    orderTotalDisplay.textContent = `$ ${orderSum}`;
    // Check if there's no item on order and hides it
    if (orderSum === 0) {
        orderDisplay.classList.remove("display-block");
    }
};

// Remove item from order
const removeItem = (e, price) => {
    orderItemsDisplay.removeChild(e.target.parentElement);
    updateOrderSum(-price);
};

// Display menu items on load
menuArray.forEach((menuItem) => {
    displayMenuItem(menuItem);
});

// Complete order and display payment modal
completeOrder.addEventListener("click", () => {
    orderDisplay.classList.remove("display-block");
    modal.classList.add("display-block");
});

// Submits form, hides form and display confirmation message
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.classList.remove("display-block");
    confirmationMessage.classList.add("display-block");
    document.querySelectorAll(".order-add-btn").forEach((btn) => {
        btn.disabled = true;
    });
});
