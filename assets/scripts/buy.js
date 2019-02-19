const homepod = document.querySelectorAll(".homepod")
const colors = document.querySelectorAll(".colorSelection")

colors.forEach((color) => {
    color.addEventListener("click", function(e){
        e.preventDefault()
        console.log("Triggered")
        let selected = this.getAttribute("data-color")
        // homepod.classList.remove(".active")
        homepod.forEach((elm) => {
            if(elm.id == selected){
                /*
                TODO:
                    - Ajouter classe active
                    - Déplacer l'autre & hover

                    - Si re-clique => on remet à la position de base
                    - Si on clique pendant que sélectionné, on inverse (z-index
                */
                elm.classList.add("active")
            }
        })
    })
})