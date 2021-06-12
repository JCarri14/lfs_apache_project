import { fetchProcesses } from '../utils/processes-utils.js';

window.onload = () => {
    loadData();

    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.addEventListener("click", loadData);
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
