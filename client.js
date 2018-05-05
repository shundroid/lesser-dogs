class LesserDog {
  constructor() {
    this.makeLesserDog()
    window.addEventListener('scroll', this.changeHeight)
    this.changeHeight()
    this.lesserHead.addEventListener('mousedown', this.startScrolling)
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
    this.lesserHead = document.createElement('img')
    this.lesserHead.src = browser.extension.getURL('lesserHead.png')
    this.lesserHead.ondragstart = () => false
    this.parent.appendChild(this.lesserHead)
    this.lesserBody = document.createElement('img')
    this.lesserBody.src = browser.extension.getURL('lesserBody.png')
    this.lesserBody.style.flex = '1'
    this.lesserBody.ondragstart = () => false
    this.parent.appendChild(this.lesserBody)
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
