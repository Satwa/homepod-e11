// Hamburger menu
const menu = document.querySelector("#rightMenu ul")
let previousWidth = 0

document.querySelector("#mobileMenu").addEventListener("click", function(){00
  this.classList.toggle("is-active")
  menu.classList.toggle("is-active")
})