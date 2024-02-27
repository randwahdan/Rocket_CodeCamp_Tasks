const inputbox = document.getElementById('input-box');
const listcontainer = document.getElementById('list-container');

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        // Create a span for editing
        let editSpan = document.createElement("span");
        editSpan.innerHTML = '<i class="fas fa-edit"></i>';
        editSpan.style.marginRight = "30px"; 
        editSpan.addEventListener("click", function () {
            editTask(li);
        });

        // Create a span for deleting
        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = '<i class="fas fa-trash"></i>';
        deleteSpan.addEventListener("click", function () {
            li.remove();
        });

        // Append both spans to the list item
        li.appendChild(editSpan);
        li.appendChild(deleteSpan);

        listcontainer.appendChild(li);
    }
    inputbox.value = "";
}
listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        let editIcon = e.target.querySelector(".fa-edit");
        if (editIcon) {
            editIcon.style.display = e.target.classList.contains("checked") ? "none" : "inline";
        }
        
        savedata();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
    }
}, false);

function editTask(taskElement) {
    let newText = prompt("Edit task:", taskElement.firstChild.textContent.trim());
    if (newText !== null) {
        taskElement.firstChild.textContent = newText;
    }
}

function showlist() {
    listcontainer.innerHTML = localStorage.getItem("data");
}

showlist();
