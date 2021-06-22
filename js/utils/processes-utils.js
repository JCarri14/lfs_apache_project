import { request } from "./api-utils.js";
import { getCurrentUser } from "./state-utils.js";

const processesURL = "http://localhost/scripts/process-list.sh";
const detailsURL = "http://localhost/scripts/process-state.sh";
const stopURL = "http://localhost/scripts/process-stop.sh";
const removeURL = "http://localhost/scripts/process-remove.sh";

export async function fetchProcesses() {
    const res = await request({
        url: processesURL,
        method: "GET",
    });
    return res.data.processes;
}

export async function fetchDetails(pid) {
    const creator = await getCurrentUser();
    console.log(`creator:${creator}`);
    const postData = `creator:${creator};pid:${pid}`;

    const res = await request({
        url: detailsURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}

export async function stopProcess({pid, interval}) {
    const creator = await getCurrentUser();
    console.log(`creator:${creator}`);
    const postData = `creator:${creator};pud:${pid};interval:${interval}`;

    const res = await request({
        url: stopURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}

export async function removeProcess(pid) {
    const creator = await getCurrentUser();
    console.log(`creator:${creator}`);
    const postData = `creator:${creator};pud:${pid}`;

    const res = await request({
        url: removeURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}