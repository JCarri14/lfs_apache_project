import { request } from "./api-utils.js";

const logsURL = "http://localhost/scripts/log-list.sh";

export async function fetchLogs() {
    const res = await request({
        url: logsURL,
        method: "GET",
    });
    return res.data.logs;
}