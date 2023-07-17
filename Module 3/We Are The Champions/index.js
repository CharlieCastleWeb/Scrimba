
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://realtime-database-dae1e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const button = document.querySelector("button");
const endorsementMessageInput = document.querySelector("#endorsement-message");
const endorsementFromInput = document.querySelector("#from-input");
const endorsementToInput = document.querySelector("#to-input");
const endorsementsDisplay = document.querySelector(".endorsements")

button.addEventListener("click", () => {

    const endorsement = {
        message: endorsementMessageInput.value,
        from: endorsementFromInput.value,
        to: endorsementToInput.value,
        hearts: 0
    }

    push(endorsementsInDB, endorsement);

    
});

const clearInputs = () => {
    endorsementMessageInput.value = "";
    endorsementFromInput.value = "";
    endorsementsDisplay.value = "";
}

const clearEndorsements = () => {
    endorsementsDisplay.innerHTML = "";
}

const displayEndorsement = (endorsement, currentItemId) => {
    const endorsementDisplay = document.createElement("div");
    const heartDisplay = document.createElement("span");
    heartDisplay.classList.add("material-symbols-outlined");
    endorsement.hearts > 0 ? heartDisplay.classList.add("liked") : "";
    heartDisplay.addEventListener("click", () => {
        if (endorsement.hearts > 0) {
            endorsement.hearts--;
            heartDisplay.classList.remove("liked");

        } else {
            endorsement.hearts++;
            heartDisplay.classList.add("liked");
        }
        let locationOfEndorsementInDB = ref(database, `endorsements/${currentItemId}`)
        update(locationOfEndorsementInDB, { hearts: endorsement.hearts });
        console.log(endorsement);
    });
    heartDisplay.textContent = "favorite";
    endorsementDisplay.innerHTML = `
        <div class="endorsement">
            <h3>To ${endorsement.to}</h3>
            <p>${endorsement.message}</p>
            <div>
                <h3>From ${endorsement.from}</h3>
                <div class="hearts">
                    <span class="heart-number">${endorsement.hearts}</span>
                </div>
            </div>
        </div>
    `
    endorsementDisplay.querySelector(".hearts").prepend(heartDisplay);
    endorsementsDisplay.append(endorsementDisplay);
}

onValue(endorsementsInDB, (snapshot) => {
    clearInputs();
    clearEndorsements();
    let endorsementsArr = Object.entries(snapshot.val());
    endorsementsArr.forEach(endorsement => {
        let currentItemId = endorsement[0];
        displayEndorsement(endorsement[1], currentItemId);
    });
});