export function toggleConfetti() {
  // 动态导入 confetti 库
  import(
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
  ).then(() => {
    let end = Date.now() + 10 * 1000

    // go Buckeyes!
    let colors = ['#bb0000', '#ffffff']

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  })
}
