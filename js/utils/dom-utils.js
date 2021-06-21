export function createTable({ headers = [], rows = [], showIndex = true}) {
    const tableParent = document.createElement('table');
    tableParent.classList.add("table", "table-striped", "text-white");

    const tableRows = rows.map((row, idx) => {
        return createTableRow(row, idx, showIndex);
    });
   
    const tableBody = document.createElement('tbody');
    tableRows.forEach((row) => {
        tableBody.appendChild(row);
    });
    
    const tableHead = document.createElement('thead');

    if (showIndex) {
        headers.splice(0, 0, "Index");
    }

    headers.forEach((h) => {
        const headerItem = document.createElement("th");
        headerItem.innerText = h;
        tableHead.appendChild(headerItem);
    });

    tableParent.appendChild(tableHead);
    tableParent.appendChild(tableBody);
    return tableParent;
}

function createTableRow(row, idx, showIndex) {
    let htmlRow = document.createElement("tr");
    if (showIndex) {
        const tData = document.createElement("td");
        tData.innerText = idx;
        htmlRow.appendChild(tData);
    }
    if (Array.isArray(row) && row.length > 0) {
        row.forEach((e) => {
            const tData = document.createElement("td");
            tData.innerText = e;
            htmlRow.appendChild(tData);
        });
        return htmlRow;
    } else {
        const tData = document.createElement("td");
        tData.innerText = row;
        htmlRow.appendChild(tData);
        return htmlRow;
    }
    return "";
}