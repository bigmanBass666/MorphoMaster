import { saveProgress, updateProgress } from '../progress.js'
import { state } from '../state.js'
import { updateCurrentWord } from './word.js'

export function previousWord() {
  if (state.currentWordIndex > 0) {
    state.currentWordIndex--
    updateCurrentWord()
    updateProgress()
    saveProgress()
  }
}

export function nextWord() {
  if (state.currentWordIndex < state.words.length - 1) {
    state.currentWordIndex++
    updateCurrentWord()
    updateProgress()
    saveProgress()
  }
}
