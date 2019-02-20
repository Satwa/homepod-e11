const siriBlock = document.querySelector(".onSiri")
let isAlreadyPlaying = false


// Getting some DOMException while triggering play with no user action
// FIX: User has to perfom at least one action
let playAudio = (name) => {
    let audio = document.querySelector("#audio-" + name)
    let play = audio.play()

    play.then( () => {
        isAlreadyPlaying = true
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
    let tellMeAbout = (name) => { // In case we want to build a real assistant
        playAudio("secret")
        console.log(name)
    }

    let tellWeather = (city) => { // In case we want to build a real assistant
        playAudio("weather")
    }

    let tellPodcast = (name) => { // In case we want to build a real assistant
        playAudio("podcast")
    }

    let commands = {
        'dis siri': function(){
            playAudio("question")
        },
        'dis siri *text': (data) => {
            console.log(data)
            playAudio("watusay")
        },
        'bonjour': function(){ // DEBUG
            console.log("Bonjour")
            playAudio("question")
        },
        '(dis siri) joue ma musique': function(){
            playAudio("music")
        },
        '(dis siri) reprends ma musique': function(){
            playAudio("music")
        },
        '(dis siri) joue le dernier épisode de *name': tellPodcast, 
        '(dis siri) reprend l\'épisode de *name': tellPodcast, 
        '(dis siri) reprend la lecture de *name': tellPodcast, 
        '(dis siri) joue mon épisode de *name': tellPodcast, 
        '(dis siri) quelle est la météo (du jour)': tellWeather,
        '(dis siri) quelle est la météo (d\'aujourd\'hui)': tellWeather,
        '(dis siri) quelle est la météo (à *city)': tellWeather,
        '(dis siri) quelle est la météo (de *city)': tellWeather,
        '(dis siri) quelle est la météo (prévue)': tellWeather,
        '(dis siri) quelle est la météo (prévue à *city)': tellWeather,
        '(dis siri) quelle est la météo (prévue aujourd\'hui)': tellWeather,
        '(dis siri) quelle est la météo (prévue aujourd\'hui à *city)': tellWeather,
        '(dis siri) parle moi de *name': tellMeAbout,
        '(dis siri) qui est *name': tellMeAbout,
    }

    annyang.addCommands(commands)
    annyang.setLanguage('fr-FR')

    annyang.addCallback('result', function(phrases) {
        console.log(phrases)
    })

    annyang.start({ autoRestart: true, continuous: false })
}

// Adding clickListener
const questions = document.querySelectorAll(".siriGradient")
questions.forEach((question) => {
    question.addEventListener("click", function(e) {
        if(!isAlreadyPlaying){
            // playAudio("question") // DEBUG
            playAudio(this.getAttribute("data-sentence"))
        }
    })
})