import { state } from './state.js'
// progress.js
export function loadProgress() {
  const saved = localStorage.getItem('progress')
  if (!saved) return
  const { currentIndex, progressBarWidth } = JSON.parse(saved)
  state.currentWordIndex = currentIndex
  state.elements.progressBar.style.width = `${progressBarWidth}%`
}

export function saveProgress() {
  const progress = (state.currentWordIndex / state.words.length) * 100
  localStorage.setItem(
    'progress',
    JSON.stringify({
      currentIndex: state.currentWordIndex,
      progressBarWidth: progress,
    })
  )
}

export function updateProgress() {
  const progress = (state.currentWordIndex / state.words.length) * 100
  document.getElementById('progress').style.width = `${progress}%`
}
