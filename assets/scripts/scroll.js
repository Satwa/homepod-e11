const html = document.querySelector('html'),
      homepod_container = html.querySelector('.homepod-container')

updateScrollPosition()
window.onscroll = updateScrollPosition
function updateScrollPosition() {
  homepod_container.style.top = -html.scrollTop*0.3 + "px"
}
