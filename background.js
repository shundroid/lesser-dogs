const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

function changeSize(width) {
  console.log(width)
  canvas.width = width
  canvas.height = 80
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img')
    image.src = src
    image.onload = () => {
      resolve(image)
    }
  })
}

let lesser1, lesser2
let scroll = 0

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(lesser1, 0, canvas.height - 38, scroll, 38)
  ctx.drawImage(lesser2, scroll, canvas.height - 38, 38, 38)

  browser.theme.update({
    images: {
      headerURL: canvas.toDataURL()
    },
    colors: {
      accentcolor: '#fff',
      textcolor: '#111',
    }
  })
}

Promise.all([loadImage('./lesser1.png'), loadImage('./lesser2.png')]).then(imgs => {
  [lesser1, lesser2] = imgs
  setInterval(draw, 200)
})

browser.runtime.onMessage.addListener(message => {
  if (message.type === 'scroll') {
    scroll += Math.abs(message.scroll / 100)
  } else if (message.type === 'resize') {
    changeSize(message.width)
  }
})
