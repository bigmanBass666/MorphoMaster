import { state } from './state.js'
// theme.js
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'
  state.theme = savedTheme
  document.body.classList.toggle('dark-mode', savedTheme === 'dark')
}

export function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light'
  document.body.classList.toggle('dark-mode', state.theme === 'dark')
  localStorage.setItem('theme', state.theme)
}

// 源码切换按钮逻辑
export function initSourceCodeToggle() {
  const toggle = document.querySelector('#sourceCodeToggle')

  toggle.addEventListener('click', (e) => {
    e.stopPropagation()
    toggle.classList.toggle('active')
  })

  // 点击页面其他区域关闭子菜单
  document.addEventListener('click', () => {
    toggle.classList.remove('active')
  })
}
