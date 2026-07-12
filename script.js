const url = "http://127.0.0.1:5000";

function showPopup(message) {
    document.getElementById("popupText").innerText = message;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function addNeed() {
    fetch(url + "/add_need", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            area: document.getElementById("area").value,
            issue: document.getElementById("issue").value,
            severity: document.getElementById("severity").value
        })
    })
    .then(res => res.json())
    .then(data => showPopup(data.message));
}

function addVolunteer() {
    fetch(url + "/add_volunteer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            skill: document.getElementById("skill").value,
            location: document.getElementById("location").value
        })
    })
    .then(res => res.json())
    .then(data => showPopup(data.message));
}

function allocate() {
    fetch(url + "/allocate")
    .then(res => res.json())
    .then(data => {
        let output = "";
        data.forEach(d => {
            let color=d.level==="High" ? 
            "#e53935": 
            d.level=== "Medium" ? 
            "#fb8c00":
            "#43a047";
            output += `<li style="margin:10px; padding:10px; background:#f9f9f9; border-radius:5px border-left:5px solid ${color};"> 
            <b>${d.volunteer} </b> assigned to 
            <b> ${d.area} </b>
            (${d.issue})
            <span style="
            background:${color};
            color:white;
            padding: 3px 8px;
            border-radius:5px;
            margin-left:10px;
            font-size:12px;
            ">
            ${d.level}
            </span>
            </li>`;
        });
        document.getElementById("result").innerHTML = output;
    });
}
