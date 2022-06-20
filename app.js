let password = document.getElementById("pwd")
let confirm_pwd = document.getElementById("confirm_pwd")
let email_msg = document.getElementById("email_msg")
let pwd_msg = document.getElementById("pwd_msg")
let check_pwd = document.getElementById("confirm_pwd_msg")
let form = document.getElementById("form")
let email = document.getElementById("email")
let success = document.getElementById("success")

form.addEventListener('submit', (e) => {
  
  if (email.value === ""){
    e.preventDefault()
    email_msg.innerText = "Please the email cannot be empty"
    email.style.borderColor = "red"
  }else{
    email_msg.innerText = ""
    email.style.borderColor = "green"
  }

  if (password.value === ""){
    e.preventDefault()
    pwd_msg.innerText = "Please the password cannot be empty"
    password.style.borderColor = "red" 
  } else {
    password.style.borderColor = "green"
    pwd_msg.innerText = ""
  }

  if (confirm_pwd.value === ""){
    e.preventDefault()
    check_pwd.innerText = "Please confirm your password"
    confirm_pwd.style.borderColor = "red" 
  } else if (confirm_pwd.value !== password.value) {
    e.preventDefault()
    check_pwd.innerText = "Password doesn't match"
    confirm_pwd.style.borderColor = "red" 
  } else {
    confirm_pwd.style.borderColor = "green"
    check_pwd.innerText = ""
    success.innerHTML = "Congratulations your account has been created"
  }
})

