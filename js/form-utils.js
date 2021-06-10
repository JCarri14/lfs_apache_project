import { request } from "./api-utils.js";

const loginURL = "http://localhost/scripts/login.sh";

export async function loginFormHandler(e) {
    e.preventDefault();
        
    const user = document.getElementById("form-username").value;
    const passwd = document.getElementById("form-password").value;
    const postData = `user:${user};password:${passwd}`;

    const res = await request({
        url: loginURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    if (res.isSuccessful) {
        
    }
}
