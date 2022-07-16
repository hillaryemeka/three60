
function displayUserDetails() {

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  if (user && token) {
    console.log(user)
    document.getElementById('userAcount').innerText = user.firstName
  } else {
    window.location.href = "sign_in.html"
  }
}



function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  // localStorage.clear()
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

displayUserDetails()