
const input                  = document.querySelector("input");
const convertBtn             = document.querySelector("button");
const userNumbersDisplay     = document.querySelectorAll(".user-number");
const metersToFeetDisplay    = document.querySelector("#meters-to-feet");
const feetToMetersDisplay    = document.querySelector("#feet-to-meters");
const litersToGallonsDisplay = document.querySelector("#liters-to-gallons");
const gallonsToLitersDisplay = document.querySelector("#gallons-to-liters");
const kilosToPoundsDisplay   = document.querySelector("#kilos-to-pounds");
const poundsToKilosDisplay   = document.querySelector("#pounds-to-kilos");

let userNumber = 1;
const metersToFeetFactor = 3.28084; 
const gallonsToLiterFactor = 3.78541; 
const kilosToPoundFactor = 2.20462; 
const f = Intl.NumberFormat("en-us", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
})

input.addEventListener("click", () => input.value = "");

convertBtn.addEventListener("click", () => {
    userNumber = input.value;
    if (userNumber > 0) {
        executeConversions();
    } else {
        alert("Please insert a valid number");
    }
})

// Execute conversions
const executeConversions = () => {
    displayUserNumber();
    metersToFeetDisplay.textContent    = convertMetersToFeet();
    feetToMetersDisplay.textContent    = convertFeetToMeters();
    litersToGallonsDisplay.textContent = convertLitersToGallons();
    gallonsToLitersDisplay.textContent = convertGallonsToLiters();
    kilosToPoundsDisplay.textContent   = convertKilosToPounds();
    poundsToKilosDisplay.textContent   = convertPoundsToKilos();
}

// Display the user input number in conversions
const displayUserNumber = () => {
    userNumbersDisplay.forEach((display) => {
        display.textContent = userNumber;
    })};

//Convert meters to feet
const convertMetersToFeet = () => {
    return f.format(userNumber*metersToFeetFactor);
}

//Convert feet to meters
const convertFeetToMeters = () => {
    // return f.format((userNumber/metersToFeetFactor));
    return f.format(userNumber/metersToFeetFactor);
}

//Convert liters to gallons
const convertLitersToGallons = () => {
    return f.format(userNumber/gallonsToLiterFactor);
}

//Convert gallons to liters
const convertGallonsToLiters = () => {
    return f.format(userNumber*gallonsToLiterFactor);
}

//Convert kilos to pounds
const convertKilosToPounds = () => {
    return f.format(userNumber*kilosToPoundFactor);
}

//Convert pounds to kilos
const convertPoundsToKilos = () => {
    return f.format(userNumber/kilosToPoundFactor);
}

// Start app with default input number value
executeConversions();