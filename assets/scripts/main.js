// General variables
let video_already_played = false,
    clientHeight = document.documentElement.clientHeight,
    sectionsToAnim = document.querySelectorAll('.entryAnim:not(.opened)')
const body = document.querySelector('body'),
      html = document.querySelector('html'),
      homepod_container = html.querySelector('.homepod-container'),
      space_recognition_video_control = html.querySelector('.video_container__control')
      space_recognition_video = html.querySelector('#space_recognition'),
      video_position = document.querySelector('.video_container').offsetTop - clientHeight/2,
      hello_siri = body.querySelector('#hello_siri'),
      at_home = body.querySelector('#at-home')

// Slider variables
const slider = document.querySelector(".slider"),
      slider__container = document.querySelector(".slider__container"),
      slides = document.querySelectorAll('.slider__container__infoCard'),
      slidesCounter = slides.length
      arrow_left = document.querySelector("#arrow-left"),
      arrow_right = document.querySelector("#arrow-right")
let pos = 0,
    slide_width = slider.offsetWidth

// Global event listener
updateScrollPosition()
setInfoCardWidth()

window.onscroll = function(){
  updateScrollPosition()
}
window.addEventListener('resize',function(){
  clientHeight = document.documentElement.clientHeight
  slide_width = slider.offsetWidth
  move()
  setInfoCardWidth()
})

// Animations on scroll
function updateScrollPosition() {
  const scroll = getScrollPosition()
  homepod_container.style.top = -scroll*0.3 + "px"
  //videoAutolaunch(scroll)
  entryAnimations(scroll)
  homepodAtHome(scroll)
  // Hello Siri animation
  hello_siri.currentTime = (scroll - (hello_siri.offsetTop - clientHeight*2/3))/100
}
// function videoAutolaunch(scroll) {
//   if (space_recognition_video.paused && video_position < scroll && !video_already_played ) {
//     video_already_played = true;
//     playVideo()
//   }
// }
function entryAnimations(scroll){
  for (var i = 0; i < sectionsToAnim.length; i++) {
    if (sectionsToAnim[i].offsetTop - clientHeight*2/3 < scroll) {
      sectionsToAnim[i].classList.add('opened')
      i -= 1
      sectionsToAnim = document.querySelectorAll('.entryAnim:not(.opened)')
    }
  }
}
function homepodAtHome(scroll) {
  let top = (at_home.offsetTop - clientHeight)
  console.log(scroll)
  console.log("at_home.offsetTop - clientHeight : "+ top )
  if (top < scroll) {
    let opacity =  (scroll - top)/at_home.offsetHeight
    console.log('Update opacity : '+ opacity )
    at_home.style.opacity = opacity
    if (opacity > 1) {
      at_home.classList.add('animationEnded')
    } else {
      at_home.classList.remove('animationEnded')
    }
  }
}
function getScrollPosition() {
  scrollBody = body.scrollTop
  scrollHtml = html.scrollTop
  return scrollBody == 0 ? scrollHtml : scrollBody
}

// Gestion vidéo
space_recognition_video_control.addEventListener('click',function(e){
  e.preventDefault()
  space_recognition_video.paused ? playVideo() : pauseVideo()
})

function playVideo(){
  space_recognition_video.play()
  if (!space_recognition_video.paused) {
    space_recognition_video_control.classList.add('playing')
  }
}
function pauseVideo(){
  space_recognition_video.pause()
  space_recognition_video_control.classList.remove('playing')
}


// Slider
function setInfoCardWidth() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.width = (slide_width-arrow_left.offsetWidth-arrow_right.offsetWidth)+"px"
  }
}

arrow_left.addEventListener('click',function(e){
  e.preventDefault()
  pos = (pos-1+slidesCounter)%slidesCounter
  move()
});
arrow_right.addEventListener('click',function(e){
  e.preventDefault()
  pos = (pos+1)%slidesCounter
  move()
});

function move() {
  // Gestion affichage image homepod
  document.querySelector('#homepod-state-'+pos).classList.add('homepod-focused')
  // gestion animation opacité card
  document.querySelector('.card-focused').classList.toggle('card-focused')
  slides[pos].classList.add('card-focused')
  // gestion slide
  slider__container.style.left = -(slide_width * pos)+"px";
  setTimeout(function(){
    document.querySelector('.homepod-focused:not(#homepod-state-'+pos+')').classList.toggle('homepod-focused')
  },300)
}
