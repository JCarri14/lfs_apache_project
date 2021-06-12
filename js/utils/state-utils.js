import { request } from "./api-utils.js";

const currentUserURL = "http://localhost/scripts/check-logged-user.sh";

export async function getCurrentUser() { 
    const res = await request({
        url: currentUserURL,
        method: "GET",
    });

    console.log(res);
    if (res.isSuccessful) {
        return res.data.user;
    }
    return null;
}