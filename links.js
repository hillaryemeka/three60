
let linksCard = document.getElementById("linksCard_Div").style.display
let overlay = document.getElementById("darkOverlay").style.display
let test = document.getElementById("test").style.display

function createLink() {
  if (linksCard == "none" && overlay == "none") {
    document.getElementById("linksCard_Div").style.display = "flex"
    document.getElementById("darkOverlay").style.display = "block"
    console.log("first")
  } else{
    document.getElementById("linksCard_Div").style.display = "none"
    document.getElementById("darkOverlay").style.display = "none"
    console.log("second")
  }
}