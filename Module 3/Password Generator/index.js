
const selectPasswordLength = document.querySelector("#password-length");
const passwordDisplays = document.querySelectorAll(".password");

const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
// Letters end at 51
// Numbers end at 61

let passwordLength = 15;
let passwordLimit = characters.length-1;

// Fill password length number selection options
const fillPasswordLengthSelection = () => {
    for (let i=0; i<30; i++) {
        selectPasswordLength.innerHTML += `<option value="${i}">${i}</option>`;
        console.log(i);
    }
}

const createPasswords = (passwordLength, passwordLimit) => {
    passwordDisplays.forEach(passwordDisplay => {
        passwordDisplay.textContent = generatePassword(passwordLength, passwordLimit);
    });
}

const generatePassword = (length, limit) => {
    const newPassword = []
    for (let i=0; i<length; i++) {
        newPassword.push( getRandomChar(limit) );
    }
    return newPassword.join('');
}

const getRandomChar = (limit) => {
    return characters[ Math.floor(Math.random() * limit) +1];
}

fillPasswordLengthSelection();
createPasswords(passwordLength, passwordLimit);

/*
Stretch goals
- Ability to set password length
- Add "copy on click"
- toggle "symbols" and numbers on off
*/