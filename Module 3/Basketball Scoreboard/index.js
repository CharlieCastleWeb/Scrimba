
const scoreButtons = document.querySelectorAll(".score-btn");

scoreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let scoreDisplay = btn.parentNode.previousElementSibling.querySelector("p");
        scoreDisplay.innerText = parseInt(scoreDisplay.innerText) + parseInt(btn.value);
    });
});
