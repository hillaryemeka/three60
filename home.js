
function displayUserDetails() {

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  if (user && token) {
    document.getElementById('userAcount').innerText = user.firstName
  } else {
   // window.location.href = "sign_in.html"
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
  let displayBlock = document.getElementById('user-details').style.display
  document.getElementById('hello-user').innerText = user.firstName +" "+ user.lastName
  document.getElementById('user-email').innerText = user.email

  if (displayBlock == "none") {
    document.getElementById('user-details').style.display = "flex"
  } else{
    document.getElementById('user-details').style.display = "none"
  }
}

function createTask() {
  const emptyTodo = document.querySelector('.no_todo_div').style.display = 'none'
  const emptyTodoWord = document.querySelector('.noTodo_word').style.display = 'none'
  const listSection = document.querySelector('.list')
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((todos) => {
      listSection.classList.add("showList");
      const todoList = listSection.querySelector("ul");
      const myTodos = todos.slice(0, 4);

      for (let t of myTodos) {
        const li = document.createElement("div");
        li.textContent = t.title;
        todoList.appendChild(li);
      }
    })
}