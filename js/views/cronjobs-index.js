import { fetchCronjobs, createTask, removeTask} from '../utils/cronjobs-utils.js';
import { createTable } from '../utils/dom-utils.js';
import { getCurrentUser } from "../utils/state-utils.js";

window.onload = () => {
    loadData();

    const createBtn = document.getElementById("create-btn");
    createBtn.addEventListener("click", handleTaskCreation);
    
    const removeBtn = document.getElementById("delete-btn");
    removeBtn.addEventListener("click", handleTaskRemoval);

    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.addEventListener("click", loadData);
}

async function loadData() {
    const tasks = await fetchCronjobs();

    const headers = ["Target", "Protocol", "Opt", "Source", "Destination"]
    const table = await createTable({headers: headers, rows: tasks});
    const tableDiv = document.getElementById("cronTable");
    tableDiv.innerHTML = null;
    tableDiv.appendChild(table);
}


async function handleTaskCreation() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    const values = readValues();
    const res = await createTask(values);
    console.log(res);
    
    notificationDiv.innerHTML = res.data.created ? res.data.message:"";
    errorDiv.innerHTML = (!res.data.created || !res.isSuccessful) ? res.data.message:"";
}

function readValues() {
    const creator = getCurrentUser();
    const minutes = document.getElementById("add-form-minute").value;
    const hour = document.getElementById("add-form-hour").value;
    const monthDay = document.getElementById("add-form-day-month").value;
    const month = document.getElementById("add-form-month").value;
    const weekDay = document.getElementById("add-form-day-week").value;
    const task = document.getElementById("add-form-task").value;
    return {creator, minutes, hour, monthDay, month, weekDay, task}
}

async function handleTaskRemoval() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    // Todo: Obtain input and make request
    const values = readValues();
    const res = await removeTask(values);

    document.getElementById("delete-close-btn").click();
}

