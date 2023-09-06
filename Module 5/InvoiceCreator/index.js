const taskNameInput = document.querySelector("#task-name-input");
const taskPriceInput = document.querySelector("#task-price-input");
const enterTaskBtn = document.querySelector("#enter-task-btn");
const tasksDisplay = document.querySelector(".tasks");
const totalPriceDisplay = document.querySelector(".total-price");

const tasksArray = [];

enterTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (taskNameInput.value) {
        const nameToCheck = taskNameInput.value.toLowerCase();
        const nameExists = tasksArray.some((task) => task.name === nameToCheck);
        if (!nameExists) {
            const newTask = {
                name: taskNameInput.value.toLowerCase(),
                price: taskPriceInput.value.toLowerCase(),
            };
            tasksArray.push(newTask);
            displayTask(newTask);
            console.log(tasksArray);
            taskNameInput.value = "";
            taskPriceInput.value = "10";
        }
    }
});

const displayTask = ({ name, price }) => {
    const template = `
        <p class="task-title">${name}</p>
        <p class="task-price">
            <span class="dollar">$</span>${price}
        </p>
    `;
    const newTaskDiv = document.createElement("div");
    newTaskDiv.innerHTML = template;
    newTaskDiv.id = name;
    newTaskDiv.classList.add("task");
    tasksDisplay.append(newTaskDiv);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", (e) => {
        const index = tasksArray.findIndex((task) => task.name === name);
        tasksArray.splice(index, 1);
        const taskDiv = e.target.parentElement;
        tasksDisplay.removeChild(taskDiv);
        updateTotal();
    });
    newTaskDiv.insertBefore(removeBtn, newTaskDiv.childNodes[2]);
    updateTotal();
};

const updateTotal = () => {
    let totalPrice = 0;
    tasksArray.forEach((task) => {
        totalPrice += parseInt(task.price);
    });
    totalPriceDisplay.innerHTML = `$ ${totalPrice}`;
};

const removeTask = () => {};
