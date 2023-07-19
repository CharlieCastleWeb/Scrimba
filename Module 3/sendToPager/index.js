
const pagerDisplay = document.querySelector("#pager-display");
const phoneDisplay = document.querySelector("#phone-display");
const phoneKeys    = document.querySelectorAll(".key");
const resetBtn     = document.querySelector("#reset-btn");
const sendBtn      = document.querySelector("#send-btn");
const pagerSound   = new Audio("./assets/pager.wav");

let message = "";

// Add event listener to keys
phoneKeys.forEach( (key) => {
    key.addEventListener("click", () => {
        message += key.value;
        phoneDisplay.textContent = message;
    });
});

// Add event listener to reset button
resetBtn.addEventListener("click", () => {
    message = "";
    phoneDisplay.textContent = message;
});

// Add event listener to reset send
sendBtn.addEventListener("click", () => {
    if (message != "") {
        setTimeout( () => {
            pagerDisplay.textContent = message;
            message = ""
            pagerSound.play();
        },1000);
        phoneDisplay.textContent = "sending...";
        setTimeout( () => {
            phoneDisplay.textContent = message;
        }, 1000);
    }
});