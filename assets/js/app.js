
const cl = console.log;

const todoListForm = document.getElementById('todoListForm');
const listContainer = document.getElementById('listContainer');
const todoList = document.getElementById('todoList');
const formControl = document.getElementById('formControl');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');

let todoArr = JSON.parse(localStorage.getItem('todoArr')) || [];

function renderTodo(arr) {
    let result = '';
    arr.forEach(t => {
        result += `<li class="list-group-item d-flex justify-content-between align-items-center" id="${t.todoId}">
                        <h4><strong>${t.todoName}</strong></h4>
                        <div>
                            <button class="btn btn-sm btn-info" onclick="editTodo(this)">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteTodo(this)">Delete</button>
                        </div>
                    </li>`;
    });
    listContainer.innerHTML = result;
}

renderTodo(todoArr);

function onTodoAdd(e) {
    e.preventDefault(); 
   
        const newTodo = {
            todoName: formControl.value,
            todoId: Date.now().toString()
        };
        cl(newTodo);
        todoArr.push(newTodo);
        todoListForm.reset();
        localStorage.setItem('todoArr', JSON.stringify(todoArr));        
        let li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.id = newTodo.todoId;
        li.innerHTML = `<h4><strong>${newTodo.todoName}</strong></h4>
                        <div>
                            <button class="btn btn-sm btn-info" onclick="editTodo(this)">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteTodo(this)">Delete</button>
                        </div>`;
        listContainer.append(li);
        Swal.fire("Added!", "Your todo has been Added.", "success");  

        
    }

function deleteTodo(ele) {
        let REMOVE_ID = ele.closest('li').id;
        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
     let getIndx = todoArr.findIndex(t => t.todoId == REMOVE_ID);
        todoArr.splice(getIndx, 1);
        localStorage.setItem('todoArr', JSON.stringify(todoArr));
        ele.closest('li').remove();     
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");  
  }
});
       
 }

 function editTodo(ele){
    let EDIT_ID = ele.closest('li').id;
    localStorage.setItem('EDIT_ID', EDIT_ID)
    let EDIT_OBJ = todoArr.find(todo => todo.todoId === EDIT_ID)
    // cl(EDIT_OBJ)
    formControl.value = EDIT_OBJ.todoName;
    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
 }

 function onUpdateTodo(ele){
    let UPDATE_ID = localStorage.getItem('EDIT_ID')
    // cl(UPDATE_ID)
    let UPDATE_OBJ = {
        todoName: formControl.value,
        todoId: UPDATE_ID
    }
    // cl(UPDATE_OBJ)
    let getIndx = todoArr.findIndex(t => t.todoId === UPDATE_ID)
    todoArr[getIndx] = UPDATE_OBJ;
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
    todoListForm.reset()
    let li = document.getElementById(UPDATE_ID)
    li.innerHTML = `
                        <h4><strong>${UPDATE_OBJ.todoName}</strong></h4>
                        <div>
                            <button class="btn btn-sm btn-info" onclick="editTodo(this)">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteTodo(this)">Delete</button>
                        </div>`
      updateBtn.classList.add('d-none')
      addBtn.classList.remove('d-none')
    Swal.fire("Updated!", "Your todo has been Updated.", "success");  

        
 }


todoListForm.addEventListener('submit', onTodoAdd);

updateBtn.addEventListener('click', onUpdateTodo)