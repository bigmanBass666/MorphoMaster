import { state } from './state.js'
// theme.js
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light'
  state.theme = savedTheme
  document.body.classList.toggle('dark-mode', savedTheme === 'dark')
  state.domElements.themeToggle.innerHTML =
    savedTheme === 'dark' ? '&#9788;' : '&#9790;'
}

export function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light'
  document.body.classList.toggle('dark-mode', state.theme === 'dark')
  localStorage.setItem('theme', state.theme)
  state.domElements.themeToggle.innerHTML =
    state.theme === 'dark' ? '&#9788;' : '&#9790;'
}
