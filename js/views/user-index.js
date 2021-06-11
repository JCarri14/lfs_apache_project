import { fetchUsers } from '../utils/user-utils.js';

window.onload = () => {
    loadData();
}

async function loadData() {
    const users = await fetchUsers();
    const usersTable = await createUsersTable(users);

    const tableDiv = document.getElementById("usersTable");
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
