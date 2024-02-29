function buildTable(json) {
    const tableBody = document.querySelector("#myTable tbody");

    json.results.forEach((user) => {
        const row = document.createElement("tr");
        const columns = [
            user.name.first,
            user.name.last,
            user.dob.age,
            user.location.country,
            user.login.username,
            user.phone,
            user.email
        ];

        columns.forEach((column) => {
            const cell = document.createElement("td");
            cell.textContent = column;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

async function fetchData() {
    try {
        let response = await fetch("https://randomuser.me/api/?results=10");
        let json = await response.json();
        buildTable(json);
    } catch (err) {
        console.error(err);
    }
}

fetchData();