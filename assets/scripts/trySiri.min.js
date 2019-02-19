const siriBlock = document.querySelector(".onSiri")
let isAlreadyPlaying = false

let playAudio = (name) => {
    console.log(window.location.origin + "/assets/audio/" + name + ".mp3")
    let audio = new Audio(window.location.origin + "/assets/audio/" + name + ".mp3")
    // audio.type = 'audio/mp3'

    let play = audio.play()
    

    play.then(() => {
        siriBlock.style.opacity = 1
        annyang.pause()
    }).catch((err) => console.log("Error happened:", err))
    
    audio.addEventListener("ended", () => {
        isAlreadyPlaying = false
        siriBlock.style.opacity = 0
        annyang.resume()
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
            // Disable * questions
            // Play audio
            if(!isAlreadyPlaying){
                playAudio("watusay")
            }
        })
    })
    // alert("DEBUG: La reconnaissance vocale n'est pas supportée")
    // Ajouter un clickListener sur les phrases
}