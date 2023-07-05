
const selectPasswordLength = document.querySelector("#password-length");
const passwordDisplays     = document.querySelectorAll(".password-display");
const symbolsInput         = document.querySelector("#symbols-check");
const numbersInput         = document.querySelector("#numbers-check");
const btn                  = document.querySelector("button");
const copyButtons          = document.querySelectorAll(".copy-icon");

const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
// Letters end at 51
// Numbers end at 61

let passwordLength = 10;
let symbolsCheck   = false;
let numbersCheck   = false;

// Event Listeners
selectPasswordLength.addEventListener( "change", () => passwordLength = selectPasswordLength.value );
symbolsInput.addEventListener( "click", () => symbolsCheck = !symbolsCheck );
numbersInput.addEventListener( "click", () => numbersCheck = !numbersCheck );
btn.addEventListener( "click", () => createPasswords(passwordLength));
copyButtons.forEach( copyBtn => copyBtn.addEventListener("click", () => copyPasswordToClipboard(copyBtn)));

// Fill password length number selection options
const fillPasswordLengthSelection = () => {
    for (let i=0; i<=20; i++) {
        selectPasswordLength.innerHTML += `<option value="${i}" id="option${i}">${i}</option>`;
    }
    document.querySelector("#password-length").selectedIndex = passwordLength;
}

// Generate and display passwords
const createPasswords = (passwordLength) => {
    let newCharacters = newCharactersArr(characters, numbersCheck, symbolsCheck);
    passwordDisplays.forEach(passwordDisplay => {
        passwordDisplay.querySelector(".password").textContent = generatePassword(passwordLength, newCharacters);
    });
}

// Generate new Password
const generatePassword = (passwordLength, characters) => {
    const newPassword = [];
    const length = characters.length;
    for (let i=0; i<passwordLength; i++) {
        newPassword.push( characters[ Math.floor( Math.random() * length )]);
    }
    return newPassword.join('');
}

// Create new characters array depending on numbers and symbols
const newCharactersArr = (characters, numbers, symbols) => {
    const newCharactersArr = characters.slice(0,52);
    if ( numbers ) {
        for ( let i=52; i <= 61; i++) {
            newCharactersArr.push(characters[i]);
        }
    }
    if ( symbols ) {
        for ( let i=62; i < characters.length; i++) {
            newCharactersArr.push(characters[i]);
        }
    }
    return newCharactersArr;
}

// Copy password to clipboard
const copyPasswordToClipboard = (copyButton) => {
    navigator.clipboard.writeText(copyButton.previousElementSibling.textContent);
    copyButton.textContent = "check_circle";
    setInterval(() => copyButton.textContent = "content_copy", 10000);
}

fillPasswordLengthSelection();
createPasswords(passwordLength);