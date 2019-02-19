const homepod = document.querySelectorAll(".homepod")
const colors = document.querySelectorAll(".colorSelection")

document.querySelector(".addCarePlan").addEventListener("click", function(e){
    let selected = this.getAttribute("data-selected")
    if(selected == "false"){
        this.classList.add("active")
        this.setAttribute("data-selected", "true")
    }else{
        this.classList.remove("active")
        this.setAttribute("data-selected", "false")
    }
})

colors.forEach((color) => {
    color.addEventListener("click", function(e){
        e.preventDefault()
        let selected = this.getAttribute("data-color")
        let allActive = document.querySelectorAll(".colorSelection.active")

        if(allActive.length > 0) allActive[0].classList.remove("active")


        homepod.forEach((elm) => {
            elm.classList.remove("active")
            elm.classList.remove("back")
            
            if(elm.id == selected){
                color.classList.add("active")
                elm.classList.add("active")
            }else{
                elm.classList.add("back")
            }
        })
    })
})