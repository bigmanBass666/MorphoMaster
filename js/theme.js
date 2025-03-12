import { state } from './state.js'
// theme.js
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'
  document.body.classList.toggle('dark-mode', savedTheme === 'dark')
  state.elements.themeToggle.innerHTML =
    savedTheme === 'dark' ? '&#9788;' : '&#9790;'
}

export function toggleTheme() {
  document.body.classList.toggle('dark-mode')
  const isDark = document.body.classList.contains('dark-mode')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
  state.elements.themeToggle.innerHTML = isDark ? '&#9788;' : '&#9790;'
}
