function makeImageElement(src) {
  const element = document.createElement('img')
  element.src = browser.extension.getURL(src)
  element.ondragstart = () => false
  return element
}
class LesserDog {
  constructor() {
    this.makeLesserDog()
    window.addEventListener('scroll', this.changeHeight)
    this.changeHeight()
    this.droidHead.addEventListener('mousedown', this.startScrolling)
  }
  makeLesserDog() {
    this.parent = document.createElement('div')
    this.parent.style.position = 'fixed'
    this.parent.style.right = '0'
    this.parent.style.bottom = '0'
    this.parent.style.height = '100%'
    this.parent.style.zIndex = '999'
    this.parent.style.display = 'flex'
    this.parent.style.flexDirection = 'column'
    this.droidHead = makeImageElement('droid-head.png')
    this.parent.appendChild(this.droidHead)
    this.droidBody = makeImageElement('droid-body.png')
    this.droidBody.style.flex = '1'
    this.parent.appendChild(this.droidBody)
    this.droidLegs = makeImageElement('droid-legs.png')
    this.parent.appendChild(this.droidLegs)
  }
  getFullHeight() {
    return document.scrollingElement.scrollHeight
  }
  getCurrentPosition() {
    return document.scrollingElement.scrollTop
  }
  changeHeight = () => {
    this.parent.style.height = `${100 - this.getCurrentPosition() / this.getFullHeight() * 100}%`
  }
  startScrolling = event => {
    this.startY = event.layerY
    window.addEventListener('mousemove', this.scroll)
    window.addEventListener('mouseup', this.finishScrolling)
  }
  scroll = event => {
    const percent = (event.clientY - this.startY) / window.innerHeight
    document.scrollingElement.scrollTop = this.getFullHeight() * percent
  }
  finishScrolling = () => {
    window.removeEventListener('mousemove', this.scroll)
    window.removeEventListener('mouseup', this.finishScrolling)
  }
}

const lesserDog = new LesserDog()
document.body.appendChild(lesserDog.parent)
