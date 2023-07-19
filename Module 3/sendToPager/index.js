
const pagerDisplay = document.querySelector("#pager-display");
const phoneDisplay = document.querySelector("#phone-display");
const phoneKeys    = document.querySelectorAll(".key");
const resetBtn     = document.querySelector("#reset-btn");
const sendBtn      = document.querySelector("#send-btn");

let message = "";

phoneKeys.forEach( (key) => {
    key.addEventListener("click", () => {
        message += key.value;
        phoneDisplay.textContent = message;
    });
});

resetBtn.addEventListener("click", () => {
    message = "";
    phoneDisplay.textContent = message;
});

sendBtn.addEventListener("click", () => {
    pagerDisplay.textContent = message;
    message = ""
    phoneDisplay.textContent = message;
});