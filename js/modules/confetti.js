export function toggleConfetti() {
  // 动态导入 confetti 库
  import('../libs/confetti.browser.min.js').then(() => {
    let end = Date.now() + 10 * 1000

    // go Buckeyes!
    let colors = document.body.classList.contains('dark-mode')
      ? ['#bb0000', '#ffffff'] // 暗色背景下的颜色
      : ['#bb0000', '#1a1a2e'] // 亮色背景下的颜色

    ;(function frame() {
      confetti({
        particleCount: 2,
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
