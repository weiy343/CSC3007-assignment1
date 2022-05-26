fetch('https://api.data.gov.sg/v1/environment/psi')
.then(response => response.json())
.then(data =>{
    var entries = []
    readings = data.items[0].readings
    time = new Date(data.items[0].update_timestamp).toLocaleString()
    for (const item in readings) {
        entries.push({
            metric: item,
            national: readings[item].national,
            central: readings[item].central,
            west: readings[item].west,
            east: readings[item].east,
            north: readings[item].north,
            south: readings[item].south,
        })
    }

    $("#loader").remove();
    $("#lastUpdated").text("Last updated: " + time);
    $("#psiTable").show();
    $("#psiTable").DataTable({
        data: entries,
        columns: [
            { data: 'metric' },
            { data: 'national' },
            { data: 'central' },
            { data: 'west' },
            { data: 'east' },
            { data: 'north' },
            { data: 'south' }
        ],
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
    });
});