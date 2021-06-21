import { fetchIptables, createRule } from '../utils/iptables-utils.js';
import { createTable } from '../utils/dom-utils.js';

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
    const headers = ["Index", "Target", "Protocol", "Opt", "Source", "Destination"]
    const tables = [];
    Object.keys(chains).forEach(key => {
        tables.push(createTable({ headers: headers, rows: chains[key], showIndex: false}));
    });
    return tables;
}


async function handleRuleCreation() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    // Todo: obtained inputs and make request
    const res = await createRule();

    notificationDiv.innerHTML = res.data.created ? res.data.message:"";
    errorDiv.innerHTML = (!res.data.created || !res.isSuccessful) ? res.data.message:"";
}

async function handleRuleRemoval() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    // Todo: Obtain input and make request

    document.getElementById("delete-close-btn").click();
}

