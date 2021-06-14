import { fetchIptables } from '../utils/iptables-utils.js';

window.onload = () => {
    loadData();

    const createBtn = document.getElementById("create-btn");
    createBtn.addEventListener("click", handleRuleCreation);
    
    const removeBtn = document.getElementById("delete-btn");
    removeBtn.addEventListener("click", handleRuleRemoval);

    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.addEventListener("click", loadData);
}

async function loadData() {
    const rules = await fetchIptables();
    const chains = normalizeRules(rules);

    const tables = await createChainsTables(chains);
    const tableDiv = document.getElementById("rulesTable");
    tableDiv.innerHTML = "";
    tables.forEach((t) => {
        tableDiv.appendChild(t);
    });
    //tableDiv.removeChild(tableDiv.childNodes[0]);
}

function extractChains(rules) {
    const chains = {};
    let currChainName = "";
    rules.forEach((item, idx) => {
        if (item !== "|||||") {
            if (item.includes("Chain")) {
                currChainName = item.split("|")[1];
                chains[currChainName] = [];
                delete rules[idx+1];
            } else {
                chains[currChainName].push(extractRule(item));
            } 
        }
    })
    return chains;
}

function extractRule(stringRule) {
    return stringRule.split("|");
}

function normalizeRules(rules) {
    const chains = extractChains(rules);  
    return chains;
}

async function createChainsTables(chains) {
    const tables = [];
    Object.keys(chains).forEach(key => {
        tables.push(createSingleTable(chains[key]));
    });
    return tables;
}

function createSingleTable(rules) {
    const tableParent = document.createElement('table');
    tableParent.classList.add("table", "table-striped", "text-white");

    const tableRows = rules.map((rule, idx) => {
        return createTableRow(rule);
    });
   
    const tableBody = document.createElement('tbody');
    tableRows.forEach((row) => {
        tableBody.appendChild(row);
    });
    
    const tableHead = document.createElement('thead');
    const headers = ["Index", "Target", "Protocol", "Opt", "Source", "Destination"]
    headers.forEach((h) => {
        const headerItem = document.createElement("th");
        headerItem.innerText = h;
        tableHead.appendChild(headerItem);
    })

    tableParent.appendChild(tableHead);
    tableParent.appendChild(tableBody);
    return tableParent;
}

function createTableRow(rule) {
    if (rule.length > 0) {
        let htmlRow = document.createElement("tr");
        rule.forEach((e) => {
            const tData = document.createElement("td");
            tData.innerText = e;
            htmlRow.appendChild(tData);
        });
        return htmlRow;
    }
    return "";
}

async function handleRuleCreation() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    // const user = document.getElementById("add-form-username").value;
    // const passwd = document.getElementById("add-form-password").value;
    
    // const res = await createUser(user, passwd);

    notificationDiv.innerHTML = res.data.created ? res.data.message:"";
    errorDiv.innerHTML = (!res.data.created || !res.isSuccessful) ? res.data.message:"";
}

async function handleRuleRemoval() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    // const delUser = document.getElementById("delete-form-username").value;

    // const res = await removeUser(delUser);

    // if (res.data) {
    //     notificationDiv.innerHTML = res.data.deleted ? res.data.message:"";
    //     errorDiv.innerHTML = (!res.data.deleted || !res.isSuccessful) ? res.data.message:"";
    // }

    document.getElementById("delete-close-btn").click();
}

