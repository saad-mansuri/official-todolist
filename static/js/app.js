const todoList = document.querySelector(".todolist__all-tasks")
const filterOption = document.querySelector(".selectfilter__todo")
const search_BTN = $("#searchTodo_")
let tasks = [];

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

    $("#btnAddtask").click(function(){addTodo()})
    function addTodo(index){
        var taskName = $("#txtName").val() 
        var taskDate = $("#txtDate").val()
        
        var index = tasks.length;
        tasks.push({ "id": index, "name": taskName, "date": taskDate });
        // console.log(tasks)
        
        $(".todolist__all-tasks").append("<li class='todolist__single-task'></li>")
        $(".todolist__single-task:last").text(taskName+ " " + taskDate)
        $(".todolist__single-task:last").append("<button class='todolist__important-btn fa fa-edit' id='btnImp'>Important Task</button> <button class='todolist__edit-btn fa fa-edit' id='btnEdit'>Edit Task</button> <button class='todolist__complete-btn fas fa-check'>Complete Task</button> <button class='todolist__trash-btn fas fa-trash'>Remove Task</button>")
        setCookie('todoList', tasks, 1);
        popupClose()
        // $("#txtName").val() = ""
        // $("#txtDate").val() = ""
        $(".todolist__edit-btn").click(function(){
            popupOpen()
            console.log("hello")
            selectedTask = tasks[parseInt(index)];
            console.log(selectedTask)   
            $("#txtName").val(tasks[index]['name'])         
            $("#txtDate").val(tasks[index]['date'])         
            // $("#btnSavetask").css("display","block")
            // $("#btnAddtask").css("display","none")
            
        })

        $(".todolist__complete-btn").click(function(){
            $(this).parent().addClass("todolist__completed_btn")
            $('.todolist__complete-btn').dblclick(function(){
                $(this).parent().removeClass("todolist__completed_btn")
            })
        })

        $(".todolist__important-btn").click(function(){
            $(this).parent().addClass("todolist__important_btn")
            $('.todolist__important-btn').dblclick(function(){
                $(this).parent().removeClass("todolist__important_btn")
            })
        })
        
        $(".todolist__trash-btn").click(function(){
            
            $(this).parent().addClass("fall")
        })
    }
var selectedTask = ""
$("#btnSavetask").click(function(){
    // saveTask()
    saveTask({
        id: selectedTask,
        name: $("$txtName").val(),
        date: $("$txtDate").val()
    });
    popupClose()
})
function saveTask(taskData) {
    // alert("hello")
    if (!taskData) {
        return
    }
    for (let keys in tasks[taskData.id.id]) {
        if (keys == 'name' || keys == 'date') {
            tasks[taskData.id.id].name = $("$txtName").val()
            tasks[taskData.id.id].date = $("$txtDate").val()
        }
    }
    // // setCookie("todoList", JSON.stringify(tasks))
    // setCookie("todoList", tasks)
    //     // getCookie('todoList', JSON.parse(tasks))

}

filterOption.addEventListener("click", filterTodo);
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "todolist__completed_btn":
                if (todo.classList.contains("todolist__completed_btn")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "todolist__important_btn":
                if (todo.classList.contains("todolist__important_btn")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains("todolist__completed_btn") && !todo.classList.contains("todolist__important_btn")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}


// $(".todolist__all-tasks").click(deleteTodo())
todoList.addEventListener("click", deleteTodo);
function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "todolist__trash-btn") {
        e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add("fall");
        //at the end
        // removeLocalTodos(todo);
        // todo.addEventListener("transitionend", e => {
        //     todo.remove();
        // });
    }

    if (item.classList[0] === "todolist__complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("todolist__completed_btn");
        // console.log(todo);s
    }

    if (item.classList[0] === "todolist__important-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("todolist__important_btn");
        // console.log(todo);
    }
}

$(document).ready(getTodos())
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
            $(".todolist__all-tasks").append("<li class='todolist__single-task'></li>")
            $(".todolist__single-task:last").text(`${todo.name} ${todo.date}`)
            $(".todolist__single-task:last").append("<button class='todolist__important-btn fa fa-edit' id='btnImp'>Important Task</button> <button class='todolist__edit-btn fa fa-edit' id='btnEdit'>Edit Task</button> <button class='todolist__complete-btn fas fa-check'>Complete Task</button> <button class='todolist__trash-btn fas fa-trash'>Remove Task</button>")
            setCookie('todoList', tasks, 1);
            popupClose()
            $(".todolist__edit-btn").click(function(){
                console.log("hello")
                $("#txtName").val(tasks[index]['name'])
                $("#txtDate").val(tasks[index]['date'])
                $("#btnSavetask").css("display","block")
                $("#btnAddtask").css("display","none")
                popupOpen()
            })


            $(".todolist__complete-btn").click(function(){
                // $(this).parent().addClass("todolist__completed_btn")
                // $('.todolist__complete-btn').dblclick(function(){
                //     $(this).parent().removeClass("todolist__completed_btn")
                // })
            })
            $(".todolist__important-btn").click(function(){
                // $(this).parent().addClass("todolist__completed_btn")
                // $('.todolist__complete-btn').dblclick(function(){
                //     $(this).parent().removeClass("todolist__completed_btn")
                // })
            })

            $(".todolist__trash-btn").click(function(){
                $(this).parent().addClass("fall")
            })
        });
    }



let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function() {
    let trlist = document.getElementsByClassName("todolist__single-task");
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
    $("#popup").css("display", "block")
    $("#overlay").css("display", "block")
}
// Popup Close
function popupClose() {
    $("#popup").css("display", "none")
    $("#overlay").css("display", "none")
}