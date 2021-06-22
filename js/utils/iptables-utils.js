import { request } from "./api-utils.js";
import { getCurrentUser } from "./state-utils.js";

const ipTablesURL = "http://localhost/scripts/lists/iptables-list.sh";
//const createUserURL = "http://localhost/scripts/user-create.sh";
//const deleteUserURL = "http://localhost/scripts/user-delete.sh";

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
    console.log(values);
}

export async function removeRule(name) {
    const creator = await getCurrentUser();
    console.log(`creator:${creator}`);
    const postData = `creator:${creator};user:${name};`;

    const res = await request({
        url: deleteUserURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}