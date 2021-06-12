import { fetchUsers, createUser, removeUser } from '../utils/user-utils.js';



window.onload = () => {
    loadData();

    const createBtn = document.getElementById("create-btn");
    createBtn.addEventListener("click", handleUserCreation);
    
    const removeBtn = document.getElementById("delete-btn");
    removeBtn.addEventListener("click", handleUserRemoval);

    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.addEventListener("click", loadData);
}

async function loadData() {
    const users = await fetchUsers();
    const usersTable = await createUsersTable(users);

    const tableDiv = document.getElementById("usersTable");
    tableDiv.innerHTML = "";
    tableDiv.innerHTML = usersTable;
}


async function createUsersTable(users) {
    const usersAdapted = await users.map((u, idx) => {
        return `<tr><td>${idx}</td><td>${u}</td></tr>`;
    });
    return `<table class='table table-striped text-white'>
        <thead>
            <th scope="col">Index</th>
            <th scope="col">User name</th>
        </thead>
        <tbody>
        ${usersAdapted}
        </tbody>
    </table>`;
}

async function handleUserCreation() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    const user = document.getElementById("add-form-username").value;
    const passwd = document.getElementById("add-form-password").value;
    
    const res = await createUser(user, passwd);

    notificationDiv.innerHTML = res.data.created ? res.data.message:"";
    errorDiv.innerHTML = (!res.data.created || !res.isSuccessful) ? res.data.message:"";
}

async function handleUserRemoval() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    const delUser = document.getElementById("delete-form-username").value;

    const res = await removeUser(delUser);

    notificationDiv.innerHTML = res.data.deleted ? res.data.message:"";
    errorDiv.innerHTML = (!res.data.deleted || !res.isSuccessful) ? res.data.message:"";

    document.getElementById("delete-close-btn").click();
}

