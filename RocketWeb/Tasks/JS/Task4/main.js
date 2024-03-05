
const inputbox = document.getElementById('input-box');
const listcontainer = document.getElementById('list-container');

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
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
            savedata();
            showlist();
        });

        // Append delete span to the list item
        li.appendChild(editSpan);
        li.appendChild(deleteSpan);
        // Insert the new task at the top of the list :)
        if (listcontainer.firstChild) {
            listcontainer.insertBefore(li, listcontainer.firstChild);
        } else {
            listcontainer.appendChild(li);
        }
        savedata();
    }
    inputbox.value = "";
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
        showlist();
    }
}, false);

function editTask(taskElement) {
    let newText = prompt("Edit task:", taskElement.firstChild.textContent.trim());
    if (newText !== null) {
        taskElement.firstChild.textContent = newText;
        savedata();
    }
}

function deleteTask(taskElement) {
    taskElement.remove();
    savedata();
}

function savedata() {
    let tasks = [];
    document.querySelectorAll("li").forEach(function (task) {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains("checked")
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showlist() {
    listcontainer.innerHTML = "";
    let savedTasks = JSON.parse(localStorage.getItem("data")) || [];

    // Separate completed and non-completed tasks
    let completedTasks = savedTasks.filter(task => task.completed);
    let nonCompletedTasks = savedTasks.filter(task => !task.completed);

    // Display non-completed tasks first, followed by completed tasks
    nonCompletedTasks.concat(completedTasks).forEach(function (task) {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add("checked");
        }
        if (!task.completed) {
            let editSpan = document.createElement("span");
            editSpan.innerHTML = '<i class="fas fa-edit"></i>';
            editSpan.style.marginRight = "30px";
            editSpan.addEventListener("click", function () {
                editTask(li);
            });

            // Append edit span to the list item
            li.appendChild(editSpan);
        }

        let deleteSpan = document.createElement("span");
        deleteSpan.innerHTML = '<i class="fas fa-trash"></i>';
        deleteSpan.addEventListener("click", function () {
            deleteTask(li);
        });

        // Append delete span to the list item
        li.appendChild(deleteSpan);

        listcontainer.appendChild(li);
    });
}

showlist();
