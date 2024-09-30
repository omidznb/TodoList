//form --> submit --> create new Todo =>(id , creaedAt , title, iscomplited)
 // cons todos = => [] => todos.pus(...)

// let todos = [];
let filtervalue = "all";
 // selecting


 const todoInput = document.querySelector(".todo-input");
 const todoForm = document.querySelector(".todo-form");
 const todoList = document.querySelector(".todolist");
 const selectFilter = document.querySelector(".filter-todos")
 const editButton = document.querySelector("#btnEdit")
 const modalInput = document.querySelector("#edit-todo");
 const modalWindows =document.querySelector(".modal")


// event

document.addEventListener("DOMContentLoaded",(e) =>{
     todos =getAllTodos();
    creatTodos(todos)
})

editButton.addEventListener("click", editTodo);


 todoForm.addEventListener("submit",addNewTodo);

 selectFilter.addEventListener("change",(e) => {
    filtervalue =e.target.value;
    filterTodos();
 })




 
//function
function addNewTodo(e) {
    e.preventDefault();
  
    if (!todoInput.value) return null;
  
    const newTodo = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      title: todoInput.value,
      isCompleted: false,
    };
  
    // todos.push(newTodo);
    saveTodo(newTodo);
    filterTodos();
    // console.log(newTodo);
  }
  
  function editTodo(e) {
    e.preventDefault()
    const todos =  getAllTodos()
    const todoId = Number(modalInput.id);
    const todo = todos.find((t) => t.id === todoId);
    todo.title = modalInput.value;
    saveAllTodo(todos);
    creatTodos(todos);
    closeModal()
  }

    



function creatTodos(todos) {
    let result ="";
    todos.forEach((todo) => {
    
    result += `<li class="todo">
    <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title}</p> 
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")} </span>
    <button  data-todo-id =${todo.id} class="todo__check" ><i class="far fa-check-square"></i></button>
    <button  data-todo-id =${todo.id} class="todo__remove"><i class=" far fa-trash-alt"></i></button>
    <button  data-todo-id =${todo.id} class="todo__edit"><i class="far fa-edit"></i></button>
   </li>`
    });
    todoList.innerHTML = result;
    todoInput.value = "";
    const removeBtn= [...document.querySelectorAll(".todo__remove")]
    removeBtn.forEach((btn) => btn.addEventListener("click",removeTodo));
   
    const checkBtn= [...document.querySelectorAll(".todo__check")]
    checkBtn.forEach((btn) => btn.addEventListener("click",checkTodo));
    const editBtn=  [...document.querySelectorAll(".todo__edit")];
    editBtn.forEach((btn) => btn.addEventListener("click",openEditModal))

}

function openEditModal(e) {  
    todos = getAllTodos()
    const todoId = Number(e.target.dataset.todoId)
    const todo =todos.find((t) => t.id === todoId);
    modalInput.value= todo.title
    modalInput.id =todoId
    openModal()

    

}

function filterTodos(){
    // console.log(e.target.value); // mentioned to value of Option
    // const filter =e.target.value
    const todos =getAllTodos()
    switch(filtervalue){
        case "all":{
         creatTodos(todos);
         break;
        }
        case "completed":{
         const filteredTodos = todos.filter((t) => t.isCompleted) ;
         creatTodos(filteredTodos);
         break;  

        }
        case "uncompleted":{
            const filteredTodos = todos.filter((t) => !t.isCompleted) ;
         creatTodos(filteredTodos);
         break;  

        }
        
        default:
            creatTodos(todos)
    }

}


function removeTodo(e) {
    let todos =getAllTodos();

   const todoId = Number(e.target.dataset.todoId)
   todos= todos.filter((t) => t.id !== todoId);
   saveAllTodo(todos);
   filterTodos(todos);
   
}

function checkTodo(e) {
    const todos =getAllTodos();

   const todoId = Number(e.target.dataset.todoId)
    const todo =todos.find((t) => t.id === todoId);
    todo.isCompleted = !todo.isCompleted; 
    creatTodos(todos)
    console.log("checkTodos",todos);
    saveAllTodo(todos)
}







// localStorage => web API


// localStorage.setItem("todos",JSON.stringify(todos));
// JSON.parse(localStorage.getItem("todos")


function getAllTodos(){
 
    const savedTodos = JSON.parse(localStorage.getItem("todos") )|| []
    return savedTodos ;
}

function saveTodo(Todo) {
    const savedTodos = getAllTodos();
    savedTodos.push(Todo);
    localStorage.setItem("todos" , JSON.stringify(savedTodos));
    
    return savedTodos;
    
}
function saveAllTodo(todos) {
  
    localStorage.setItem("todos" , JSON.stringify(todos));
    
    
}

