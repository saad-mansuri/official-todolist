//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoDate = document.querySelector(".todo-date");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const search_BTN = document.getElementById('searchTodo_');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo() {

    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value + " " + todoDate.value;

    //Save to local - do this last
    saveLocalTodos(todoInput.value + " " + todoDate.value);
    // saveLocalTodos(todoDate.value);

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    todoDate.value = "";

    //Create Edit button

    const editButton = document.createElement("button");
    editButton.innerHTML = `<div class="btn fa fa-edit" onclick="editTask(${index})">Edit Task</div>`;
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


    //attach final Todo
    todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");
        //at the end
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
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


function editTask(index) {
    // let btnSavetask = document.getElementById("btnSavetask");
    let saveindex = document.getElementById("saveIndex");
    let btnAddtask = document.getElementById("btnAddtask");
    saveindex.value = index;

    let webtask = localStorage.getItem("todos");
    let todos = JSON.parse(webtask);

    todoInput.value = todos[index];
    btnAddtask.style.display = "none";
    btnSavetask.style.display = "block";
    // popupOpen();
}
let btnSavetask = document.getElementById("btnSavetask");
btnSavetask.addEventListener("click", function() {

    let webtask = localStorage.getItem("todos");
    let todos = JSON.parse(webtask);

    let saveindex = document.getElementById("saveIndex").value;
    todos[saveindex] = todoInput.value;
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
    // getTodos();
})

function saveLocalTodos(todo) {
    let todos;
    let webtask = localStorage.getItem("todos");
    if (webtask === null) {
        todos = [];
    } else {
        todos = JSON.parse(webtask);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalstorage() {
    $todos = JSON.parse(localStorage.getItem("todos"));
    return $todos
}

function removeLocalTodos(todo) {
    let todos;
    let webtask = localStorage.getItem("todos");
    if (webtask === null) {
        todos = [];
    } else {
        todos = JSON.parse(webtask);
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(t = []) {
    let todos;
    if (t.length > 0) {
        todoList.innerHTML = ""
        todos = t;
    } else {
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
    }

    todos.forEach(function(todo, index) {

        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        dateTOdo = todo.split(" ")[1]
            //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        todoDate.value = "";

        //Create Edit Button

        const editButton = document.createElement("button");
        editButton.innerHTML = `<div class="fa fa-edit" onclick="editTask(${index})">Edit Task</div>`;
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

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

        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}


function getDifference(date1, date2) {
    $date1 = new Date(date1)
    $date2 = new Date(date2)

    return Math.ceil(Math.abs($date2 - $date1) / (1000 * 60 * 60 * 24))
}



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

    $data = getLocalstorage();
    todoFindList = []
    $dateRange.forEach(daterange => {
        $data.forEach(e => {
            $ee = e.split(" ")
            if ($ee[1] == daterange) {
                todoFindList.push($ee.join(" "))
            }
        })
    })
    getTodos(todoFindList)
}



// SearchList
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function() {
    let todosearch = document.querySelectorAll("ul");
    Array.from(todosearch).forEach(function(todo) {
        let searchedtext = todo.getElementsByClassName("todo")[0].innerHTML;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if (searchedtext.match(re)) {
            todo.style.display = "table";
        } else {
            todo.style.display = "none";
        }
    })
})


searchTodo_.addEventListener('click', filter_datewise)