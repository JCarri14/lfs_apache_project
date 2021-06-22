import { request } from "./api-utils.js";

const loginURL = "http://localhost/scripts/auth/login.sh";

export async function loginFormHandler(e) {
    e.preventDefault();
    const errorDiv = document.getElementById("errorDiv");
    errorDiv.innerHTML = "";
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

    if (res.isSuccessful && res.data.valid) {
        window.location.replace("http://localhost/views/dashboard.html");
    } else if (res.isSuccessful && !res.data.valid) {
        const errorDiv = document.getElementById("errorDiv");
        errorDiv.innerHTML = "Login failed! Incorrect username or password";
    } else {
        errorDiv.innerHTML = "Internal Server error!";
    }
}
