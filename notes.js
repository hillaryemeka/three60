
let title = document.getElementById('title')
let description = document.getElementById('description')
let titleMsg = document.getElementById('titleMsg')
let descriptionMsg = document.getElementById('descriptionMsg')


function validateNote(event) {
  event.preventDefault()

  if (title.value == ""){
    titleMsg.innerText = "Please enter the title of your note"
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
  title.value = ""
  description.value = ""
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
      modal.classList.remove('show')
    }    
  })
}

function displayNotes(){
  let accessToken = localStorage.getItem("token")
  let containerUl = document.querySelector('.notesContent')
  fetch('https://my-diary-dev.herokuapp.com/api/v1/entries?perpage=10', {
    headers: {
      'x-access-token': accessToken
    },
    method: 'GET',
  })
  .then((resp) => resp.json())
  .then((notes) => {
    console.log(notes)
    let elementString = ''
    for(let n of notes.entries){
      const noteElement = 
      `<li class="notesDetails">
        <div class="notesP">
          <div class="notes-p1">${n.title}</div>
          <div class="notes-p2">${n.body}</div>
        </div>
        <div class="personalNote">
          <div class="personalNoteDiv">Personal Note</div>
          <img src="images/menu.png" alt="">
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
      logoutTimerID = setTimeout(logout, 10000)
      timeoutEvent.forEach(event => {
        window.addEventListener(event, eventHandler)
      })
    }
  })
}
sessionTime()

function eventHandler(){
  clearTimeout(logoutTimerID)
  logoutTimerID = setTimeout(logout, 10000)
}

function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  window.location.href = "sign_in.html"
}