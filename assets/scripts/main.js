// Hamburger menu
document.querySelector("#mobileMenu").addEventListener("click", function(){
  let menu = document.querySelector("#rightMenu ul")
  if(this.classList.contains("is-active")){
    menu.style.opacity = 0
    menu.style.bottom = "-100%"
  }else{
    menu.style.bottom = 0
    menu.style.opacity = 1   
  }
  this.classList.toggle("is-active")
})