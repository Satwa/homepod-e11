const siriBlock = document.querySelector(".onSiri")
let isAlreadyPlaying = false


let playAudio = (name) => {
    let audio = document.querySelector("#audio-" + name)
    let play = audio.play()
    
    play.then(() => {
        siriBlock.style.opacity = 1
        if(annyang) annyang.pause()
    }).catch((err) => console.log("Error happened:", err))
    
    audio.addEventListener("ended", () => {
        isAlreadyPlaying = false
        siriBlock.style.opacity = 0
        if(annyang) annyang.resume()
    })
}

if(annyang){
    let tellMeAbout = (name) => {
        siriBlock.style.opacity = 1
        console.log(name)
        // Dans tous les cas c'est G.
    }

    let commands = {
        'dis siri': function(){
            playAudio("question")
        },
        'dis siri *text': (data) => {
            console.log(data)
            playAudio("watusay")
        },
        'bonjour': function(){
            siriBlock.style.opacity = 1
            console.log("Bonjour") // DEBUG
            playAudio("question")
        },
        '(dis siri) quelle est la météo (du jour)': function(){
            siriBlock.style.opacity = 1
            console.log("Meteo du jour")
        },
        '(dis siri) parle moi de *name': tellMeAbout,
        '(dis siri) qui est *name': tellMeAbout,
    }

    annyang.addCommands(commands)
    annyang.setLanguage('fr-FR')

    annyang.addCallback('result', function(phrases) {
        console.log(phrases)
    })

    annyang.start({ autoRestart: true, continuous: false })
}else{
    const questions = document.querySelectorAll(".siriGradient")
    questions.forEach((question) => {
        question.addEventListener("click", function(e) {
            if(!isAlreadyPlaying){
                playAudio(this.getAttribute("data-sentence"))
            }
        })
    })
}