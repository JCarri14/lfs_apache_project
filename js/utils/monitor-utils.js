import { request } from "./api-utils.js";

const monitorURL = "http://localhost/scripts/lists/monitoring.sh";

export async function fetchMonitorData() {
    const res = await request({
        url: monitorURL,
        method: "GET",
    });
    console.log(res);
    return res.data.processes;
}

