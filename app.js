let firstName = document.getElementById("first_name")
let firstNameMsg = document.getElementById("first_name_msg")
let lastNameMsg = document.getElementById("last_name_msg")
let lastName = document.getElementById("last_name")
let password = document.getElementById("pwd")
let email_msg = document.getElementById("email_msg")
let pwd_msg = document.getElementById("pwd_msg")
let signUpForm = document.getElementById("signUpForm")
let signInForm = document.getElementById("signInForm")
let email = document.getElementById("email")
let signInEmail = document.getElementById("signIn_email")
let signInPwd = document.getElementById("signIn_pwd")
let signInEmailMsg = document.getElementById("signIn_email_msg")
let signInPwdMsg = document.getElementById("signIn_pwd_msg")
let confirmPwd = document.getElementById('confirmPwd')
let confirmPwdMsg = document.getElementById('confirmPwd_msg')
let userAccount = document.getElementById('userAcount')


function signup(event){
  event.preventDefault()
      
  if (firstName.value === ""){
    firstNameMsg.innerText = "Please Enter your first name"
    firstName.style.borderColor = "red"
  }else{
    firstNameMsg.innerText = ""
    firstName.style.borderColor = "green"
  }
  if (lastName.value === ""){
    lastNameMsg.innerText = "Please Enter your last name"
    lastName.style.borderColor = "red"
  }else{
    lastNameMsg.innerText = ""
    lastName.style.borderColor = "green"
  }
  if (email.value === ""){
    email_msg.innerText = "Please the email cannot be empty"
    email.style.borderColor = "red"
  }else{
    email_msg.innerText = ""
    email.style.borderColor = "green"
  }
  if (password.value === ""){
    pwd_msg.innerText = "Please the password cannot be empty"
    password.style.borderColor = "red" 
  } else {
    password.style.borderColor = "green"
    pwd_msg.innerText = ""
  }
  if (confirmPwd.value === ""){
    confirmPwdMsg.innerText = "Please confirm your password"
    confirmPwd.style.borderColor = "red"
  }else if (confirmPwd.value !== password.value){
    confirmPwdMsg.innerText = "Password doesn't match"
    confirmPwd.style.borderColor = "red"
  }else{
    confirmPwd.style.borderColor = "green"
    confirmPwdMsg.innerText = ""
    submitForm()
  }
  
  function submitForm(){
  let formData = new FormData(signUpForm)
  const userObject = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  }
  const loading = document.querySelector('.loading')
  loading.classList.add("show")
  fetch('https://my-diary-dev.herokuapp.com/auth/signup', {
    headers: {
      'Content-Type': 'Application/json'
    },
    method: 'POST',
    body: JSON.stringify(userObject)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success")
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      window.location="home.html"
    })
  }
}

function signIn(event){
  event.preventDefault()

  if (signInEmail.value === ""){
    signInEmailMsg.innerText = "Please the email cannot be empty"
    signInEmail.style.borderColor = "red"
  }else{
    signInEmailMsg.innerText = ""
    signInEmail.style.borderColor = "green"
  }
  if (signInPwd.value === ""){
    signInPwdMsg.innerText = "Please the password cannot be empty"
    signInPwd.style.borderColor = "red" 
  } else {
    signInPwd.style.borderColor = "green"
    signInPwdMsg.innerText = ""
    sign_in()
  }
}

function sign_in(){
  let formdata = new FormData(signInForm)
  const userObj = {
    email: formdata.get('email'),
    password: formdata.get('password'),
  }
  const loading = document.querySelector('.loading')
  loading.classList.add("show")
  fetch('https://my-diary-dev.herokuapp.com/auth/login', {
    headers: {
      'Content-Type': 'Application/json'
    },
    method: "POST",
    body: JSON.stringify(userObj)
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === "success"){
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        window.location="home.html"
      } else {
        alert("Email or password is incorect")
      }
    })
}

function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")
  if (user && token ){
    window.location.href = "home.html"
  }
}

checkLogin()