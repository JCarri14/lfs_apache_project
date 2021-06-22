import { request } from "./api-utils.js";
import { getCurrentUser } from "./state-utils.js";

const ipTablesURL = "http://localhost/scripts/iptables/iptables-list.sh";
const addURL = "http://localhost/scripts/iptables/iptables-add.sh";
const removeURL = "http://localhost/scripts/iptables/iptables-remove.sh";


export async function fetchIptables() {
    const res = await request({
        url: ipTablesURL,
        method: "GET",
    });

    if (res.isSuccessful) {
        return res.data.rules;
    } else {
        return [];
    }
}



export async function createRule(values) { 
    const creator = await getCurrentUser();
    const postData = `creator:${creator};rule:${values.rule};action:${values.action};prot:${values.protocol};port:${values.port};org:${values.origin};dst:${values.destination}`;

    const res = await request({
        url: addURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}

export async function removeRule(values) {
    const creator = await getCurrentUser();
    const postData = `creator:${creator};rule:${values.rule};id:${values.id}`;

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