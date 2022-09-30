
function displayUserDetails() {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  if (user && token) {
    document.getElementById('userAcount').innerText = user.firstName
  } else {
   window.location.href = "sign_in.html"
  }
}
displayUserDetails()

function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.href = "sign_in.html"
}

function displayUser() {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  let displayBlock = document.querySelector('.user-details')
  document.getElementById('hello-user').innerText = user.firstName +" "+ user.lastName
  document.getElementById('user-email').innerText = user.email

  if (displayBlock.classList.contains('show')) {
    displayBlock.classList.remove('show')
  } else{
    displayBlock.classList.add('show')
  }
}

function createTask() {
  const parentUl = document.querySelector('.todo-list-container')
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((todos) => {
      const myTodos = todos.slice(0, 6);
      let elementString = ""
      let count = 0
      for (let t of myTodos) {
        count ++
        const todoElement =
        `<li class="todo-list">
          <div class="todo-p">
            <p>${t.title}</p>
            <p class="list101">Created on 13 July 2019 at 08:33AM</p>
          </div>
          <div class="list102">${t.completed ? 'finished' : 'In Progress'}</div>
          <div class="menu" onclick="todoMenu(${count})">
            <img src="images/menu.png"/>
            <div class="todoAction todoMenu-${count}">
            <div class="markAsCompleted">
              <img src="images/Rectangle.png" alt="">
              <div>Mark as complete</div>
            </div>
            <div class="edit">
              <img src="images/pen.png" alt="">
              <div>Edit</div>
            </div>
            <div class="delete">
              <img src="images/delete.png" alt="">
              <div>delete</div>
            </div>
          </div>
          </div>
        </li>`
        elementString += todoElement

        parentUl.innerHTML = elementString
      }
    })
}
createTask()

function todoMenu(count){
  let display = document.querySelector(`.todoMenu-${count}`).style.display
  if (display == 'none'){
    document.querySelector(`.todoMenu-${count}`).style.display = 'flex'
  } else {
    document.querySelector(`.todoMenu-${count}`).style.display = 'none'
  }
}
function toggleModal() {
  let modal = document.querySelector('.modal')

  if(modal.classList.contains('show')){
    modal.classList.remove('show')
  } else{
    modal.classList.add('show')
  }
}
