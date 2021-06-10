import { request } from "./api-utils.js";

const usersURL = "http://localhost/scripts/user-list.sh";


export async function fetchUsers() {
    const res = await request({
        url: usersURL,
        method: "GET",
    });

    return res.data.users;
}

export async function createUser(name) {

}

export async function removeUser(name) {

}