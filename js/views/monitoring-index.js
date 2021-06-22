import { fetchMonitorData } from '../utils/monitor-utils.js';
import { createTable } from '../utils/dom-utils.js';

window.onload = () => {
    loadData();

    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.addEventListener("click", loadData);
}

async function loadData() {
    const monitorRes = await fetchMonitorData();

    if (!monitorRes.error) {
        console.log(monitorRes.data);
    }
}
