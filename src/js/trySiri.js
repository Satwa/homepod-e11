var synth = window.speechSynthesis
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
if(annyang){
    let commands = {
        'dis siri': function(){
            console.log("Dis Siri")
            // synth.speak("Bonjour")
        },
        'bonjour': function(){
            console.log("bonjour")
            // synth.speak("Bonjour")
        },
        'bonjour quelle est la meteo du jour': function(){
            console.log("Meteo du jour")
            // synth.speak("Bonjour")
        },
    }
    
    annyang.debug()
    annyang.addCommands(commands)

    annyang.setLanguage('fr-FR')

    annyang.addCallback('result', function(phrases) {
        console.log("I think the user said: ", phrases[0]);
        console.log("But then again, it could be any of the following: ", phrases);
    })

    annyang.start()
}else{
    alert("La reconnaissance vocale n'est pas supportée")
}