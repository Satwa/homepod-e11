const siriBlock = document.querySelector(".onSiri")
let isAlreadyPlaying = false

document.querySelector("#startRecognition").addEventListener("click", function(e) {
    e.preventDefault()
    this.parentNode.style.top = "-200%"
    this.parentNode.style.opacity = 0
    setTimeout(function() {
        document.querySelector(".popupContainer").style.display = "none"
    }, 300)
})

let playAudio = (name) => {
    let audio = document.querySelector("#audio-" + name)
    let play = audio.play()

    play.then(() => {
        isAlreadyPlaying = true
        siriBlock.style.opacity = 1
        if (annyang) annyang.pause()
    }).catch((err) => console.log("Error happened:", err))

    audio.addEventListener("ended", () => {
        isAlreadyPlaying = false
        siriBlock.style.opacity = 0
        if (annyang) annyang.resume()
    })
}

if (annyang) {
    let tellMeAbout = (name) => { // In case we want to build a real assistant
        playAudio("mpuget")
        console.log(name)
    }

    let tellWeather = (city) => { // In case we want to build a real assistant
        playAudio("weather")
    }

    let tellPodcast = (name) => { // In case we want to build a real assistant
        playAudio("parlonsdesign")
    }

    let commands = {
        'dis siri': function() {
            playAudio("question")
        },
        'bonjour': function() { // DEBUG
            console.log("Bonjour")
            playAudio("question")
        },
        '(dis siri) joue ma musique': function() {
            playAudio("music")
        },
        '(dis siri) jouer ma musique': function() {
            playAudio("music")
        },
        '(dis siri) reprends ma musique': function() {
            playAudio("music")
        },
        '(dis siri) joue le dernier épisode de *name': tellPodcast,
        '(dis siri) reprend l\'épisode de *name': tellPodcast,
        '(dis siri) reprend la lecture de *name': tellPodcast,
        '(dis siri) joue mon épisode de *name': tellPodcast,
        '(dis siri) quelle est la météo (du jour)': tellWeather,
        '(dis siri) quel temps fait-il (aujourd\'hui)': tellWeather,
        '(dis siri) quelle est la météo (d\'aujourd\'hui)': tellWeather,
        '(dis siri) quelle est la météo (à *city)': tellWeather,
        '(dis siri) quelle est la météo (de *city)': tellWeather,
        '(dis siri) quelle est la météo (prévue)': tellWeather,
        '(dis siri) quelle est la météo (prévue à *city)': tellWeather,
        '(dis siri) quelle est la météo (prévue aujourd\'hui)': tellWeather,
        '(dis siri) quelle est la météo (prévue aujourd\'hui à *city)': tellWeather,
        '(dis siri) parle moi de *name': tellMeAbout,
        '(dis siri) qui est *name': tellMeAbout,
        'dis siri *text': (data) => {
            console.log(data)
            playAudio("watusay")
        },
    }

    annyang.addCommands(commands)
    annyang.setLanguage('fr-FR')

    annyang.addCallback('result', function(phrases) {
        console.log(phrases)
    })

    annyang.start({
        autoRestart: true,
        continuous: false
    })
}

// Adding clickListener
const questions = document.querySelectorAll(".siriGradient")
questions.forEach((question) => {
    question.addEventListener("click", function(e) {
        if (!isAlreadyPlaying) {
            playAudio(this.getAttribute("data-sentence"))
        }
    })
})