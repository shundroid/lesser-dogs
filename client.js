class LesserDog {
  constructor() {
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
    this.parent.appendChild(this.lesserHead)
    this.lesserBody = document.createElement('img')
    this.lesserBody.src = browser.extension.getURL('lesserBody.png')
    this.lesserBody.style.flex = '1'
    this.parent.appendChild(this.lesserBody)
  }
  changeHeight(height) {
    this.parent.style.height = height
  }
}

const lesserDog = new LesserDog()
document.body.appendChild(lesserDog.parent)

function changeHeight() {
  lesserDog.changeHeight(`${100 - document.scrollingElement.scrollTop / document.scrollingElement.scrollHeight * 100}%`)
}
window.addEventListener('scroll', changeHeight)
changeHeight()
