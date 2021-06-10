#!/bin/bash

printPageHeaders () {
    echo "<!doctype html>"
    echo "<html lang="en">"
    echo "<head>"
    echo "<title>ASO - Practica 2</title>"
    echo "<meta charset="utf-8">"
    echo "<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">"
    echo "<meta http-equiv="X-UA-Compatible" content="ie=edge">"
    echo "<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">"
    echo "<link rel="stylesheet" href="../css/styles.css" type="text/css" media="screen">"
    echo "</head>"
}

printPageEnd () {
    echo "</div>"
    echo "</div>"
    echo "</div>"
    echo "</div>"
    echo "<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>"
    echo "<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>"
    echo "<script src="../js/particles.js"></script>"
    echo "<script src="../js/main.js"></script>"
    echo "</body>"
    echo "</html>"
}

printPageContent () {
    echo "<body>"
    echo "<div id="particles-js"></div>"
    echo "<div class="main">"
    echo "<div class='main__layout container'>"
}




printMemTableData () {
    mem_data=$(cat /proc/meminfo | awk -F: '{print "<tr>"; print "<td>" $1 "</td>"; print "<td>" $2 "</td>"; print "</tr>"}'); 
    echo -e "<div class='mem-card card'>"
    echo "<table class='table table-striped'>"
    echo -e "<thead>
    <th scope="col">Entry</th>
    <th scope="col">Value</th>
    <tbody>"
    echo "$mem_data"
    echo "</tbody>"
    echo "</table>"
}

printDiskTableData () {
    disk_data=$(df -h | awk -F " " ' NR>1{print "<tr>"; for(i=1;i<=NF;i++) print "<td>" $i "</td>"; print "</tr>"}'); 
    echo -e "<div class='disk-card card'>"
    echo "<table class='table table-striped'>"
    echo -e "<thead>
    <th scope="col">FileSystem</th>
    <th scope="col">Size</th>
    <th scope="col">Used</th>
    <th scope="col">Avail</th>
    <th scope="col">Use</th>
    <th scope="col">Mounted on</th>
    <tbody>"
    echo "$disk_data"
    echo "</tbody>"
    echo "</table>"
}



echo "Content-type: text/html"
echo ""
echo $(printPageHeaders)
echo $(printPageContent)
echo $(printMemTableData)
#echo $(printDiskTableData)
echo $(printPageEnd)


