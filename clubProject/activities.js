function load() {

    var table = document.getElementById("list").getElementsByTagName("tbody")[0];
    events.map(function (activity) {
        var newRow = table.insertRow(table.rows.length);

        newRow.insertCell(0).textContent = activity.name;
        newRow.insertCell(1).textContent = activity.dates;
    });
}


window.onload = load;

// The magical sports and Fitness 2020 events
