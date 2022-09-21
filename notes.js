
let title = document.getElementById('title')
let description = document.getElementById('description')
let titleMsg = document.getElementById('titleMsg')
let descriptionMsg = document.getElementById('descriptionMsg')


function validateNote(event) {
  event.preventDefault()

  if (title.value == ""){
    titleMsg.innerText = "Please enter the title of your note"
    title.style.borderColor = "red"
  }else if (title.value.length < 6){
    console.log(title.value.length)
    titleMsg.innerText = "The length of your title cannot be less than 6"
    title.style.borderColor = "red"
  } else{
    titleMsg.innerText = ""
    title.style.borderColor = "green"
  }
  if (description.value == ""){
    descriptionMsg.innerText = "Please the description cannot be empty"
    description.style.borderColor = "red"
  } else{
    descriptionMsg.innerText = ""
    description.style.borderColor = "green"
    createNote()
  }
}

function createNote() {
  let modal = document.querySelector('.modal')
  let formData = new FormData(notesForm)
  let userObj = {
    title: formData.get('title'),
    body: formData.get('description')
  }

  let accessToken = localStorage.getItem("token")
  fetch('https://my-diary-dev.herokuapp.com/api/v1/entries', {
    headers: {
      'Content-Type': 'Application/json',
      'x-access-token': accessToken
    },
    method: 'POST',
    body: JSON.stringify(userObj)
  })
  .then(response => response.json())
  .then(data => {
    if(data.status === 'success') {
      title.value = ""
      description.value = ""
      modal.classList.remove('show')
      displayNotes()
    }    
  })
}

function displayNotes(){
  let accessToken = localStorage.getItem("token")
  let containerUl = document.querySelector('.notesContent')
  fetch('https://my-diary-dev.herokuapp.com/api/v1/entries', {
    headers: {
      'x-access-token': accessToken
    },
    method: 'GET',
  })
  .then((resp) => resp.json())
  .then((notes) => {
    let elementString = ''
    let count = 0
    for(let n of notes.entries){
      count ++
      const noteElement = 
      `<li class="notesDetails">
        <div class="notesP">
          <div class="notes-p1">${n.title}</div>
          <div class="notes-p2">${n.body}</div>
        </div>
        <div class="personalNote">
          <div class="personalNoteDiv">Personal Note</div>
          <div class="menu">
            <img src="images/menu.png" alt="" onclick="notesMenu(${count})">
            <div class="todoAction notesMenu-${count}">
              <div class="markAsCompleted">
                <img src="images/Rectangle.png" alt="">
                <div>Mark as complete</div>
              </div>
              <div class="edit"  onclick="editNote()">
                <img src="images/pen.png" alt="">
                <div>Edit</div>
              </div>
              <div class="delete"  onclick="deleteNote()">
                <img src="images/delete.png" alt="">
                <div>delete</div>
              </div>
            </div>
          </div>
        </div>
      </li>`
      elementString += noteElement
      containerUl.innerHTML = elementString
    }
  })
}
displayNotes()

let logoutTimerID = undefined
const timeoutEvent = ['click', 'mousemove', 'mousedown', 'keydown']  

function sessionTime(){
  window.addEventListener('DOMContentLoaded', ()=>{
    if(window.location.pathname === '/notes.html') {
      logoutTimerID = setTimeout(logout, 100000000)
      timeoutEvent.forEach(event => {
        window.addEventListener(event, eventHandler)
      })
    }
  })
}
sessionTime()

function eventHandler(){
  clearTimeout(logoutTimerID)
  logoutTimerID = setTimeout(logout, 100000000)
}

function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.href = "sign_in.html"
}

function notesMenu(count){
  let display = document.querySelector(`.notesMenu-${count}`).style.display
  if (display == 'none'){
    document.querySelector(`.notesMenu-${count}`).style.display = 'flex'
  } else {
    document.querySelector(`.notesMenu-${count}`).style.display = 'none'
  }
}

// function toggleMenu(count) {
//   let modal = document.querySelectorAll(`.todoAction .notesMenu-${count}`)
//   if(modal.classList.contains('show')){
//     modal.classList.remove('show')
//   } else{
//     modal.classList.add('show')
//   }
// }

function editNote(){
 console.log("Edit note clicked") 
}
