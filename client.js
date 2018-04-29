let beforeY = window.pageYOffset
document.addEventListener('scroll', event => {
  browser.runtime.sendMessage({ type: 'scroll', scroll: event.pageY - beforeY })
  beforeY = event.pageY
})
window.addEventListener('resize', () => {
  browser.runtime.sendMessage({ type: 'resize', width: window.outerWidth })
})
browser.runtime.sendMessage({ type: 'resize', width: window.outerWidth })
