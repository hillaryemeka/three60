
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

displayUserDetails()