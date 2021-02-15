let taskName = document.getElementById("txtName")
let taskDate = document.getElementById("txtDate")
let addTask = document.getElementById("btnAddtask")
let dispTask = document.getElementById("displayTask")
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const search_BTN = document.getElementById('searchTodo_');
let tasks = [];


document.addEventListener("DOMContentLoaded", getTodos);
addTask.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);



function init() {
    // debugger;
    tasks = getCookie("todoList");
    // debugger;
    if (typeof tasks != "" && tasks != "") {
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


function addTodo() {

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const newTodo = document.createElement("li")
    newTodo.innerHTML = taskName.value + " " + taskDate.value;
    var index = tasks.length;
    tasks.push({ "id": index, "name": taskName.value, "date": taskDate.value });
    console.log(tasks)

    setCookie('todoList', tasks, 1);
    // saveLocalTodos(todoDate.value);

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    taskName.value = "";
    taskDate.value = "";


    //Create Edit button
    const editButton = document.createElement("button");

    editButton.innerHTML = "<div class='fa fa-edit' onclick='editTask(\"" + index + "\")'> Edit Task </div>";

    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    //Create impotant button
    const impButton = document.createElement("button");
    impButton.innerHTML = `<i class="fa fa-exclamation-triangle"> Important</i>`;
    impButton.classList.add("important-btn");
    todoDiv.appendChild(impButton);

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"> Complete</i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"> Remove</i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    // let dTask = ""
    // let id = 1
    // myTask.forEach(function(index) {
    //     dTask += `<tr><th> ${id}</th>
    //         <td>${index['task-name']} </td>
    //         <td>${index['task-date']}</td>
    //         <td> <button type="button" onclick="editTask(${index})" class="btn-primary">Edit Task</button></td>
    //         <td> <button type="button" class="btn-info">Important</button></td>
    //         <td> <button type="button" class="btn-success">Complete</button></td>
    //         <td> <button type="button" class="btn-danger">Remove</button></td>
    //     </tr>`
    //         // index['task-name'] + index['task-Date'] + "<br>"
    //     id++
    // });
    // dispTask.innerHTML = dTask
    console.log(taskName.value + taskDate.value)
}



function editTask(index) {
    // let popUp = document.getElementsByClassName("popup")
    let btnSavetask = document.getElementById("btnSavetask");
    let btnAddtask = document.getElementById("btnAddtask");
    let save_index = document.getElementById("saveIndex");
    let selectedTask = tasks[parseInt(index)];
    console.log(selectedTask)
    save_index.value = index


    taskName.value = tasks[index]['name'];
    taskDate.value = tasks[index]['date'];
    btnAddtask.style.display = "none";
    btnSavetask.style.display = "block";
}
let btnSavetask = document.getElementById("btnSavetask");
btnSavetask.addEventListener("click", function() {
    let btnAddtask = document.getElementById("btnAddtask");
    // getCookie()
    let save_index = document.getElementById("saveIndex").value

    for (let keys in tasks[save_index]) {
        if (keys == 'name') {
            tasks[save_index].name = taskName.value
        }
    }
    btnSavetask.style.display = "none"
    btnAddtask.style.display = "block"
    taskName.value = ""
    taskDate.value = ""
    getTodos()
})




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


// var myCookie = []

// function setCookie() {
//     // var cookieSet = {}
//     // cookieSet['task-name'] = taskName.value
//     // cookieSet['task-date'] = taskDate.value
//     // myCookie.push(tasks);
//     var cookieSet = JSON.stringify(tasks);
//     Cookies.set('todoList', cookieSet);
//     // document.cookie = "Todolist =" + tasks;
// }


function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");
        //at the end
        // removeLocalTodos(todo);
        // todo.addEventListener("transitionend", e => {
        //     todo.remove();
        // });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }

    if (item.classList[0] === "important-btn") {
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
        todoDiv.classList.add("todo")

        const newTodo = document.createElement("li")

        newTodo.innerHTML = `${todo.name} ${todo.date}`
        newTodo.classList.add("todo-item")

        todoDiv.appendChild(newTodo)
        taskName.value = ""
        taskDate.value = ""


        //Create Edit Button
        const editButton = document.createElement("button")
        editButton.innerHTML = `<div class="fa fa-edit" onclick="editTask(${index})"> Edit Task</div>`
        editButton.classList.add("edit-btn")
        todoDiv.appendChild(editButton)

        //Create important Button
        const impButton = document.createElement("button");
        impButton.innerHTML = `<i class="fa fa-exclamation-triangle"> Important</i>`;
        impButton.classList.add("important-btn");
        todoDiv.appendChild(impButton);

        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"> Complete</i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"> Remove</i>`;
        trashButton.classList.add("trash-btn");
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
    let trlist = document.getElementsByClassName("todo");
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
})