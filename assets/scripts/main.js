// Hamburger menu
const menu = document.querySelector("#rightMenu ul"),
    footerLists = document.querySelectorAll('.footerList')
let previousWidth = 0

document.querySelector("#mobileMenu").addEventListener("click", function() {
    00
    this.classList.toggle("is-active")
    menu.classList.toggle("is-active")
})

for (let i = 0; i < footerLists.length; i++) {
    footerLists[i].addEventListener('click', function() {
        if (document.documentElement.clientWidth < 601) {
            toggleFooterList(i)
        }
    })
}

function toggleFooterList(i) {
    let opened = document.querySelector(".footerList.opened")
    if (opened != null && opened != footerLists[i]) {
        opened.classList.remove("opened")
    }
    footerLists[i].classList.toggle("opened")
}