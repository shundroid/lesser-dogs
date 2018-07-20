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
    this.droidHead = document.createElement('img')
    this.droidHead.src = browser.extension.getURL('droid-head.png')
    this.droidHead.ondragstart = () => false
    this.parent.appendChild(this.droidHead)
    this.droidBody = document.createElement('img')
    this.droidBody.src = browser.extension.getURL('droid-body.png')
    this.droidBody.style.flex = '1'
    this.droidBody.ondragstart = () => false
    this.parent.appendChild(this.droidBody)
    this.droidLegs = document.createElement('img')
    this.droidLegs.src = browser.extension.getURL('droid-legs.png')
    this.droidLegs.ondragstart = () => false
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
