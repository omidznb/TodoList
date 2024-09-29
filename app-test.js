//form --> submit --> create new Todo =>(id , creaedAt , title, iscomplited)
 // cons todos = => [] => todos.pus(...)

// let todos = [];
let filtervalue = "all";
 // selecting


 const todoInput = document.querySelector(".todo-input");
 const todoForm = document.querySelector(".todo-form");
 const todoList = document.querySelector(".todolist");
 const selectFilter = document.querySelector(".filter-todos")
//  const editButton = document.querySelector(".todo__edit")
 const modalWindows =document.querySelector(".modal")


// event

document.addEventListener("DOMContentLoaded",(e) =>{
     todos =getAllTodos();
    creatTodos(todos)
})


//  editButton.addEventListener("click",(e) => {
//     modal.style.display ="block"
//  })

 todoForm.addEventListener("submit",addNewTodo);

 selectFilter.addEventListener("change",(e) => {
    filtervalue =e.target.value;
    filterTodos();
 })




 
//function
 function addNewTodo (e){
    const todos =getAllTodos();
    e.preventDefault(); // to avoid of refreshing page

    if(!todoInput.value) return null;
    if (todo) {  
        modalTitle.textContent = "ویرایش Todo"; // Edit title  
        modalInput.value = todo.title; // Set input with the todo title  
        currentEditId = todo.id; // Set the id of the todo to be edited  
    } else {  
        modalTitle.textContent = "اضافه کردن Todo"; // Add title  
        modalInput.value = ""; // Clear input  
        currentEditId = null; }// Reset to indicate a new todo  
    

  const newTodo = {
    id : Date.now(),
    createdAt : new Date().toISOString(),
    title : todoInput.value,
    isCompleted : false 
    
  };

//   todos.push(newTodo);


  saveTodo(newTodo)
  filterTodos(todos);

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
    openModal()
    filterTodos(todos)
    saveAllTodo(todos)
    

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
    filterTodos(todos)
    console.log(todos);
    saveAllTodo(todos)
}







// localStorage => web API


// localStorage.setItem("todos",JSON.stringify(todos));
// JSON.parse(localStorage.getItem("todos")


function getAllTodos(){
 
    const savedTodos = JSON.parse(localStorage.getItem("todos") || [])
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

