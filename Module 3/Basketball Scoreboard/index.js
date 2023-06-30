
/* --- DOCUMENT SELECTORS --- */
const quarterDisplay    = document.querySelector(".quarter");
const timeDisplay       = document.querySelector(".time");
const homeTeam          = document.querySelector("#home-team");
const guestTeam         = document.querySelector("#guest-team");
const homeScoreDisplay  = document.querySelector("#home-score-display");
const guestScoreDisplay = document.querySelector("#guest-score-display");
const scoreButtons      = document.querySelectorAll(".score-btn");
const foulButtons       = document.querySelectorAll(".foul-btn");
const resetBtn          = document.querySelector(".reset-btn");
const homeFoulsDisplay  = document.querySelector("#home-fouls-display");
const guestFoulsDisplay = document.querySelector("#guest-fouls-display");

/* --- GLOBAL VARIABLES --- */
let homeScore  = 0;
let guestScore = 0;
let homeFouls  = 0;
let guestFouls = 0;
let quarter    = 1;
let minutes    = 0;
let seconds    = 0;

/* --- FUNCTIONS --- */

// Timer and quarter update
const timer = () => {
    seconds++;
    if ( seconds == 60 ) {
        seconds = 0;
        minutes++;
        if ( minutes == 12 ) {
            minutes = 0;
            quarter++;
            if (quarter > 4 ) {
                return;
            }
        }
    }
    // Always show two digits
    let s = seconds < 10 ? "0" + seconds : seconds;
    let m = minutes < 10 ? "0" + minutes : minutes;
    displayTime(s, m, quarter);
}

// Display time and quarter
const displayTime = (seconds, minutes, quarter) => {
    quarterDisplay.innerText = quarter;
    timeDisplay.innerText    = `${minutes}:${seconds}`;
}

// Update timer every second
const startTimer = () => {
    setInterval(timer, 1000);
}

// Add and display scores and check winner when click score buttons
scoreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        addScore(btn.value, btn.getAttribute('data-team'));
        displayScores();
    });
});

// Add score to appropriate team 
const addScore = (value, team) => {
    if (team === "homeTeam") homeScore += parseInt(value);
    else if (team === "guestTeam") guestScore += parseInt(value);
}

// Display scores and winner
const displayScores = () => {
    homeScoreDisplay.innerText  = homeScore;
    guestScoreDisplay.innerText = guestScore;
    checkWinner();
}

// Check winner and add winner class to appropriate team
const checkWinner = () => {
    homeTeam.classList.remove("team-winner");
    guestTeam.classList.remove("team-winner");
    if ( homeScore > guestScore ) homeTeam.classList.add("team-winner");
    else if ( homeScore < guestScore ) guestTeam.classList.add("team-winner");
}

// Check winner and add winner class to appropriate team when clicking score buttons
foulButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        addFoul(btn.getAttribute('data-team'));
        displayFouls();
    });
});

// Add foul to appropriate team 
const addFoul = (team) => {
    if (team === "homeTeam") homeFouls++;
    else if (team === "guestTeam") guestFouls++;
}

// Display fouls 
const displayFouls = () => {
    homeFoulsDisplay.innerText  = homeFouls;
    guestFoulsDisplay.innerText = guestFouls;
}

// Restart variables
const restart = () => {
    homeScore = 0;
    guestScore = 0;
    quarter = 1;
    minutes = 0;
    seconds = 0;
    homeFouls = 0;
    guestFouls = 0;
}

// Restart variables and displays when clicking restart button
resetBtn.addEventListener("click", () => {
    restart();
    displayTime();
    displayScores();
    displayFouls();
})

startTimer();
