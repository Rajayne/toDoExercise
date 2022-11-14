document.addEventListener("DOMContentLoaded", function() {
    // Your code goes here

const form = document.querySelector('#toDoForm');
const addToDo = document.querySelector('#addToDo');
const toDoList = document.querySelector('#toDoList');

// retrieve from localStorage
const savedToDos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedToDos.length; i++) {
    let newToDo = document.createElement('li');
    newToDo.innerText = savedToDos[i].addToDo;
    newToDo.completed = savedToDos[i].completed ? true : false;
    toDoList.appendChild(newToDo);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(addToDo.value);
    
    let newToDo = document.createElement('li');
    let toDoValue = document.getElementById("addToDo").value;
    newToDo.innerText = `${toDoValue} `;
    
    let removeToDo = document.createElement('button');
    removeToDo.innerText = "X";
    addToDo.value = '';
    newToDo.completed = false;
    newToDo.appendChild(removeToDo);
    toDoList.appendChild(newToDo);

  // save to localStorage
  savedToDos.push({ addToDo: newToDo.innerText, isCompleted: false });
  localStorage.setItem("todos", JSON.stringify(savedToDos));
});

toDoList.addEventListener("click", function(event) {
    let clickedListItem = event.target;
  
    if (!clickedListItem.isCompleted) {
      clickedListItem.style.textDecoration = "line-through";
      clickedListItem.isCompleted = true;
    } else {
      clickedListItem.style.textDecoration = "none";
      clickedListItem.isCompleted = false;
    }
  
    // breaks for duplicates - another option is to have dynamic IDs
    for (let i = 0; i < savedToDos.length; i++) {
      if (savedToDos[i].task === clickedListItem.innerText) {
        savedToDos[i].isCompleted = !savedToDos[i].isCompleted;
        localStorage.setItem("todos", JSON.stringify(savedToDos));
      }
    }
  });

toDoList.addEventListener('click',function(e) {
    if(e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    } else {
        e.target.classList.toggle('completed');
    }
});

}); //end of DOMContentLoaded