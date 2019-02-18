const slider = document.querySelector(".slider"),
      slider__container = document.querySelector(".slider__container"),
      slides = document.querySelectorAll('.slider__container__infoCard'),
      slidesCounter = slides.length
      arrow_left = document.querySelector("#arrow-left"),
      arrow_right = document.querySelector("#arrow-right")
let pos = 0,
    slide_width = slider.offsetWidth

setInfoCardWidth()

function setInfoCardWidth() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.width = (slide_width-arrow_left.offsetWidth-arrow_right.offsetWidth)+"px"
  }
}

window.addEventListener('resize',function(){
  slide_width = slider.offsetWidth
  move()
  setInfoCardWidth()
});

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
