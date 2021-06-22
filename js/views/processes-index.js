import { fetchProcesses, fetchDetails, stopProcess, removeProcess } from '../utils/processes-utils.js';

window.onload = () => {
    loadData();

    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.addEventListener("click", loadData);

    const detailsBtn = document.getElementById("details-btn");
    detailsBtn.addEventListener("click", handleDetailsForm);

    const stopBtn = document.getElementById("stop-btn");
    stopBtn.addEventListener("click", handleStopForm);

    const removeBtn = document.getElementById("remove-btn");
    removeBtn.addEventListener("click", handleRemoveForm);
}

async function loadData() {
    const processList = await fetchProcesses();
    const processTable = await createProcessesTable(processList);

    const tableDiv = document.getElementById("processTable");
    tableDiv.innerHTML = processTable;
    tableDiv.removeChild(tableDiv.childNodes[0]);
}


async function createProcessesTable(processList) {
    const processListAdapted = await processList.map((p) => {
        const pr = p.split("-");
        return `<tr><td>${pr[0]}</td><td>${pr[1]}</td></tr>`;
    });
    return `<table class='table table-striped text-white'>
        <thead>
            <th scope="col">PID</th>
            <th scope="col">COMMAND</th>
        </thead>
        <tbody>
        ${processListAdapted}
        </tbody>
    </table>`;
}

async function handleDetailsForm() {
    const pid = document.getElementById("details-form-pid").value;
    document.getElementById("details-container").innerHTML = null;

    const res = await fetchDetails(pid);

    if (!res.error) {
        const info = document.createElement("p");
        info.innerText = res.data.details;
        document.getElementById("details-container").appendChild(info);
    } else {
        console.log(res.error);
        //errorDiv.innerHTML = res.data.message;
    }
}

async function handleStopForm() {
    const pid = document.getElementById("stop-form-pid").value;
    const interval = document.getElementById("stop-form-interval").value;

    if (!interval) interval = 0;
    const res = await stopProcess({pid: pid, interval: interval});

    if (!res.error) {
        //notificationDiv.innerHTML = res.data.message;
    } else {
        //errorDiv.innerHTML = res.data.message;
    }
}

async function handleRemoveForm() {
    const pid = document.getElementById("remove-form-pid").value;

    const res = await removeProcess(pid);

    if (!res.error) {
        //notificationDiv.innerHTML = res.data.message;
    } else {
        //errorDiv.innerHTML = res.data.message;
    }
}