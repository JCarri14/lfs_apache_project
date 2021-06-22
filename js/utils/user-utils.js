import { request } from "./api-utils.js";
import { getCurrentUser } from "./state-utils.js";

const usersURL = "http://localhost/scripts/user/user-list.sh";
const createUserURL = "http://localhost/scripts/user/user-create.sh";
const deleteUserURL = "http://localhost/scripts/user/user-delete.sh";

export async function fetchUsers() {
    const res = await request({
        url: usersURL,
        method: "GET",
    });

    if (res.isSuccessful) {
        return res.data.users;
    } else {
        return [];
    }
}



export async function createUser(username, password) { 
    const creator = await getCurrentUser();
    console.log(`creator:${creator}`);
    const postData = `creator:${creator};user:${username};password:${password}`;

    const res = await request({
        url: createUserURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}

export async function removeUser(name) {
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