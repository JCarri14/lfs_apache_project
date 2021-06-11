import { fetchLogs } from '../utils/log-utils.js';

window.onload = () => {
    loadData();
}

async function loadData() {
    const logs = await fetchLogs();
    const logsTable = await createLogsTable(logs);

    const tableDiv = document.getElementById("logsTable");
    tableDiv.innerHTML = logsTable;
}


async function createLogsTable(logs) {
    const logsAdapted = await logs.map((l, idx) => {
        return `<tr><td>${idx}</td><td>${l}</td></tr>`;
    });
    return `<table class='table table-striped text-white'>
        <thead>
            <th scope="col">Index</th>
            <th scope="col">Log description</th>
        </thead>
        <tbody>
        ${logsAdapted}
        </tbody>
    </table>`;
}
