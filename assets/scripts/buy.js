const homepod = document.querySelectorAll(".homepod")
const colors = document.querySelectorAll(".colorSelection")

let pricePanel = document.querySelector("#price")
let price = 349

document.querySelector(".addCarePlan").addEventListener("click", function(e) {
    let selected = this.getAttribute("data-selected")
    if (selected == "false") {
        this.classList.add("active")
        this.setAttribute("data-selected", "true")
        price += 45
        pricePanel.innerHTML = price + ",00€"
        document.querySelector("#appleCare").innerHTML = "Avec"
    } else {
        this.classList.remove("active")
        this.setAttribute("data-selected", "false")
        price -= 45
        pricePanel.innerHTML = price + ",00€"
        document.querySelector("#appleCare").innerHTML = "Sans"
    }
})

colors.forEach((color) => {
    color.addEventListener("click", function(e) {
        e.preventDefault()
        let selected = this.getAttribute("data-color")
        let allActive = document.querySelectorAll(".colorSelection.active")

        if (allActive.length > 0) allActive[0].classList.remove("active")


        homepod.forEach((elm) => {
            elm.classList.remove("active")
            elm.classList.remove("back")

            if (elm.id == selected) {
                color.classList.add("active")
                elm.classList.add("active")

                document.querySelector("#colortype").innerHTML = this.innerHTML
            } else {
                elm.classList.add("back")
            }
        })
    })
})