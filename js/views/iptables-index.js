import { fetchIptables, createRule, removeRule } from '../utils/iptables-utils.js';
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

    const values = getAddRuleParams();
    const res = await createRule(values);

    if (!res.error) {
        notificationDiv.innerHTML = res.data.created ? res.data.message:"";
    } else {
        errorDiv.innerHTML = (!res.data.created || !res.isSuccessful) ? res.data.message:"";
    }

}

function getAddRuleParams() {
    const ruleSelector = document.getElementById("add-form-rule-type"); 
    const rule = ruleSelector.options[ruleSelector.selectedIndex].value;

    const actionSelector = document.getElementById("add-form-target");
    const action = actionSelector.options[actionSelector.selectedIndex].value;

    const protocol = document.getElementById("add-form-protocol").value;
    const port = document.getElementById("add-form-port").value;
    const origin = document.getElementById("add-form-origin").value;
    const destination = document.getElementById("add-form-dst").value;

    console.log({rule, action, protocol, port, origin, destination});
    return {rule, action, protocol, port, origin, destination};
}

async function handleRuleRemoval() {
    const errorDiv = document.getElementById("errorDiv");
    const notificationDiv = document.getElementById("notificationDiv");

    errorDiv.innerHTML = "";
    notificationDiv.innerHTML = "";

    const values = getRemoveRuleParams();
    const res = await removeRule(values);

    if (!res.error) {
        notificationDiv.innerHTML = res.data.created ? res.data.message:"";
    } else {
        errorDiv.innerHTML = (!res.data.created || !res.isSuccessful) ? res.data.message:"";
    }

}

function getRemoveRuleParams() {
    const ruleSelector = document.getElementById("delete-form-rule-type"); 
    const rule = ruleSelector.options[ruleSelector.selectedIndex].value;

    const id = document.getElementById("delete-form-id").value;
    return {rule, id};
}

