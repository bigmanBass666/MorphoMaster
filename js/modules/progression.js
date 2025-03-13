import { resetProgress, saveProgress, updateProgress } from '../progress.js'
import { state } from '../state.js'
import { toggleConfetti } from './confetti.js'
import { updateCurrentWord } from './word.js'

function handleCorrectAnswer() {
  state.currentWordIndex++
  saveProgress()

  if (state.currentWordIndex < state.words.length) {
    updateProgress()
    updateCurrentWord()
  } else {
    handleCompletion()
  }
}

function handleCompletion() {
  toggleConfetti()
  resetProgress() // 调用新方法
  updateCurrentWord()
}

export function handleAnswerResult(isCorrect) {
  const { result } = state.domElements
  result.className = `result ${isCorrect ? 'correct' : 'incorrect'}`
  result.classList.remove('hidden')

  if (isCorrect) handleCorrectAnswer()
}
