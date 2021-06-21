import { createTable } from '../utils/dom-utils.js';
import { fetchLogs } from '../utils/log-utils.js';

window.onload = () => {
    loadData();
}

async function loadData() {
    const logs = await fetchLogs();
    const headers = ["Log description"];
    try {
        const logsTable = createTable({headers: headers, rows: logs});
        const tableDiv = document.getElementById("logsTable");
        tableDiv.appendChild(logsTable);
    } catch(err) {
        console.log(err);
    }

    //tableDiv.removeChild(tableDiv.childNodes[0]);
}