let taskName = document.getElementById("txtName")
let taskDate = document.getElementById("txtDate")
let addTask = document.getElementById("btnAddtask")
let dispTask = document.getElementById("displayTask")
const todoList = document.querySelector(".todo__list");
const filterOption = document.querySelector(".filter__todo");
const search_BTN = document.getElementById('searchTodo_');
let tasks = [];


document.addEventListener("DOMContentLoaded", getTodos);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);



function init() {
    // debugger;
    tasks = getCookie("todoList");
    // debugger;
    if (typeof tasks != "" && tasks != "") {
        // tasks = JSON.parse(tasks);
        tasks = JSON.parse(tasks);
    } else {
        tasks = [];
    }
}
init()

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + JSON.stringify(cvalue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

addTask.addEventListener("click", addTodo)
    // var index = ""

function addTodo() {

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo__display")

    const newTodo = document.createElement("li")
    newTodo.innerHTML = taskName.value + " " + taskDate.value;
    var index = tasks.length;
    tasks.push({ "id": index, "name": taskName.value, "date": taskDate.value });
    console.log(tasks)

    setCookie('todoList', tasks, 1);

    newTodo.classList.add("todo__item");
    todoDiv.appendChild(newTodo);
    taskName.value = "";
    taskDate.value = "";


    //Create Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = "<div class='fa fa-edit' onclick='editTask(\"" + index + "\")'> Edit Task </div>";
    editButton.classList.add("edit__btn");
    todoDiv.appendChild(editButton);

    //Create impotant button
    const impButton = document.createElement("button");
    impButton.innerHTML = `<i class="fa fa-exclamation-triangle"> Important</i>`;
    impButton.classList.add("important__btn");
    todoDiv.appendChild(impButton);

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"> Complete</i>`;
    completedButton.classList.add("complete__btn");
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"> Remove</i>`;
    trashButton.classList.add("trash__btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    popupClose()
}


var selectedTask = ""

function editTask(index) {
    let btnSavetask = document.getElementById("btnSavetask");
    let btnAddtask = document.getElementById("btnAddtask");
    selectedTask = tasks[parseInt(index)];
    console.log(selectedTask)

    taskName.value = tasks[index]['name'];
    taskDate.value = tasks[index]['date'];
    btnAddtask.style.display = "none";
    btnSavetask.style.display = "block";
    popupOpen()
}
let btnSavetask = document.getElementById("btnSavetask");
btnSavetask.addEventListener("click", onSaveTask);

function onSaveTask() {
    saveTask({
        id: selectedTask,
        name: taskName.value,
        date: taskDate.value
    });
    // setCookie("todoList", JSON.stringify(tasks))

    // console.log(taskName.value + " " + taskDate.value)
    popupClose()
}

function saveTask(taskData) {
    // alert("hello")

    if (!taskData) {
        return
    }
    for (let keys in tasks[taskData.id.id]) {
        if (keys == 'name' || keys == 'date') {
            tasks[taskData.id.id].name = taskName.value
            tasks[taskData.id.id].date = taskDate.value
        }
    }
    // setCookie("todoList", JSON.stringify(tasks))
    setCookie("todoList", tasks)
        // getCookie('todoList', JSON.parse(tasks))

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "important":
                if (todo.classList.contains("important")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains("completed") && !todo.classList.contains("important")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "trash__btn") {
        e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");
        //at the end
        // removeLocalTodos(todo);
        // todo.addEventListener("transitionend", e => {
        //     todo.remove();
        // });
    }

    if (item.classList[0] === "complete__btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }

    if (item.classList[0] === "important__btn") {
        const todo = item.parentElement;
        todo.classList.toggle("important");
        console.log(todo);
    }
}


function getTodos($t = []) {
    // console.log(tasks)
    $tasklist = []
    if ($t.length > 0) {
        todoList.innerHTML = ''
        $tasklist = $t
    } else {
        $tasklist = tasks
    }


    $tasklist.forEach(function(todo, index) {
        const todoDiv = document.createElement("li")
        todoDiv.classList.add("todo__display")

        const newTodo = document.createElement("li")

        newTodo.innerHTML = `${todo.name} ${todo.date}`
        newTodo.classList.add("todo__item")

        todoDiv.appendChild(newTodo)
        taskName.value = ""
        taskDate.value = ""


        //Create Edit Button
        const editButton = document.createElement("button")
        editButton.innerHTML = `<div class="fa fa-edit" onclick="editTask(${index})"> Edit Task</div>`
        editButton.classList.add("edit__btn")
        todoDiv.appendChild(editButton)

        //Create important Button
        const impButton = document.createElement("button");
        impButton.innerHTML = `<i class="fa fa-exclamation-triangle"> Important</i>`;
        impButton.classList.add("important__btn");
        todoDiv.appendChild(impButton);

        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"> Complete</i>`;
        completedButton.classList.add("complete__btn");
        todoDiv.appendChild(completedButton);

        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"> Remove</i>`;
        trashButton.classList.add("trash__btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
        console.log(taskName.value + taskDate.value)

    });
}




function getDifference(date1, date2) {
    $date1 = new Date(date1)
    $date2 = new Date(date2)

    return Math.ceil(Math.abs($date2 - $date1) / (1000 * 60 * 60 * 24))
}

searchTodo_.addEventListener('click', filter_datewise)

function filter_datewise() {
    $datefrom = document.getElementById('fromDate').value
    $dateto = document.getElementById('toDate').value
    $dateRange = [$datefrom]
    $diff = getDifference($datefrom, $dateto)

    for (let i = 1; i <= $diff; i++) {

        $dateToInc = new Date($datefrom)
        $dateConverted = new Date($dateToInc.setDate($dateToInc.getDate() + i))

        $dateUpdate = $dateConverted.getDate() >= 10 ? $dateConverted.getDate() : `0${$dateConverted.getDate()}`
        $monthUpdate = $dateConverted.getMonth() + 1 >= 10 ? $dateConverted.getMonth() + 1 : `0${$dateConverted.getMonth() + 1}`

        $createddate = `${$dateConverted.getFullYear()}-${$monthUpdate}-${$dateUpdate}`
        $dateRange.push($createddate)
    }
    console.log($dateRange)

    $data = JSON.parse(getCookie('todoList'));

    console.log($data)
    console.log($dateRange)
    todoFindList = []
    $dateRange.forEach(daterange => {
        $data.forEach(taskdict => {
            if (taskdict.date == daterange) {
                todoFindList.push(taskdict)
            }
        })
    })
    getTodos(todoFindList)
}

let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function() {
    let trlist = document.getElementsByClassName("todo__display");
    Array.from(trlist).forEach(function(item) {
            let searchedtext = item.getElementsByTagName("li")[0].innerText;
            let searchtextboxval = searchtextbox.value;
            let re = new RegExp(searchtextboxval, 'gi');
            if (searchedtext.match(re)) {
                // const todoDiv = document.createElement("div")
                // todoDiv.classList.add("todo")
                item.style.display = "d-block";
            } else {
                item.style.display = "none";
            }
        })
        // searchtextbox.value = ""
})

// Popup Open
function popupOpen() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}
// Popup Close
function popupClose() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}