import { state } from './state.js'

export function loadProgress() {
  if (state.words.length === 0) return // 新增校验

  const saved = localStorage.getItem('progress')

  if (!saved) {
    setProgressUI(0)
    return
  }

  const { currentIndex, progressBarWidth } = JSON.parse(saved)

  state.currentWordIndex = currentIndex

  setProgressUI(progressBarWidth)
}

export function saveProgress() {
  try {
    const progress = calculateProgress()
    localStorage.setItem(
      'progress',
      JSON.stringify({
        currentIndex: state.currentWordIndex,
        progressBarWidth: progress,
      })
    )
  } catch (error) {
    console.error('保存进度失败:', error)
    alert('无法保存进度，请检查浏览器设置。')
  }
}

export function updateProgress() {
  const progress = calculateProgress()
  setProgressUI(progress)
}

function calculateProgress() {
  const index = Math.min(state.currentWordIndex, state.words.length - 1)
  return (index / state.words.length) * 100
}

function setProgressUI(progress) {
  // 添加按钮状态控制
  state.domElements.previousBtn.disabled = state.currentWordIndex === 0
  state.domElements.nextBtn.disabled =
    state.currentWordIndex === state.words.length - 1

  const progressText = `${state.currentWordIndex + 1}/${state.words.length}`
  state.domElements.progressBar.style.width = `${progress}%`
  state.domElements.progressText.textContent = progressText
}

export function resetProgress() {
  state.currentWordIndex = 0
  localStorage.removeItem('progress')
  updateProgress()
}
