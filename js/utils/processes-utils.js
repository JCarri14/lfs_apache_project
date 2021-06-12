import { request } from "./api-utils.js";

const processesURL = "http://localhost/scripts/process-list.sh";

export async function fetchProcesses() {
    const res = await request({
        url: processesURL,
        method: "GET",
    });
    return res.data.processes;
}