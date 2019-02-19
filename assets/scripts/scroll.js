const body = document.querySelector('body'),
      html = document.querySelector('html'),
      homepod_container = html.querySelector('.homepod-container'),
      space_recognition_video_control = html.querySelector('.video_container__control')
      space_recognition_video = html.querySelector('#space_recognition'),
      video_position = document.querySelector('.video_container').offsetTop - document.documentElement.clientHeight/3
let video_already_played = false

// Animations on scroll
updateScrollPosition()
window.onscroll = function(){
  updateScrollPosition()
}
function updateScrollPosition() {
  const scroll = getScrollPosition()
  homepod_container.style.top = -scroll*0.3 + "px"
  if (space_recognition_video.paused && video_position < scroll && !video_already_played ) {
    video_already_played = true;
    playVideo()
  }
}
function getScrollPosition() {
  scrollBody = body.scrollTop
  scrollHtml = html.scrollTop
  return scrollBody == 0 ? scrollHtml : scrollBody
}
// gestion vidéo
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
