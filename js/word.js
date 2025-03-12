import { saveProgress, updateProgress } from './progress.js'
import { clearInputStyles, } from './input.js'
import { state } from './state.js'
import {toggleConfetti} from './confetti.js'

// word.js
export function updateCurrentWord() {
  const { currentWord } = getCurrentWord()
  const { elements } = state

  elements.currentWord.textContent = currentWord.original
  elements.wordDefinition.textContent = currentWord.definition
  elements.wordIPA.textContent = currentWord.ipa || ''
  elements.result.classList.add('hidden')

  const isNoun = currentWord.type === 'noun'
  elements.pluralInputGroup.classList.toggle('hidden', !isNoun)
  elements.verbInputs.classList.toggle('hidden', isNoun)

  if (isNoun) {
    clearInputStyles(elements.pluralInput)
    elements.pluralInput.focus()
  } else {
    clearInputStyles(elements.pastInput, elements.pastParticipleInput)
    elements.pastInput.focus()
  }
}

export function getCurrentWord() {
  return {
    currentWord: state.words[state.currentWordIndex],
    total: state.words.length,
  }
}
export function validateNoun(currentWord) {
  const input = state.elements.pluralInput.value.toLowerCase().trim()
  if (input !== currentWord.plural) {
    state.elements.result.innerHTML = currentWord.plural
    state.elements.pluralInput.classList.add('incorrect')
    return false
  }
  return true
}

export function validateVerb(currentWord) {
  const past = state.elements.pastInput.value.toLowerCase().trim()
  const participle = state.elements.pastParticipleInput.value
    .toLowerCase()
    .trim()
  let result = ''

  ;[past, participle].forEach((val, i) => {
    const correctVal = i ? currentWord.pastParticiple : currentWord.past
    const element = i
      ? state.elements.pastParticipleInput
      : state.elements.pastInput
    if (val !== correctVal) {
      result += `${correctVal}<br>`
      element.classList.add('incorrect')
      element.select()
    } else {
      element.classList.add('correct')
    }
  })

  state.elements.result.innerHTML = result
  return result === ''
}

export function checkAnswers() {
  const { currentWord } = getCurrentWord()
  let isCorrect = false

  if (currentWord.type === 'noun') {
    isCorrect = validateNoun(currentWord)
  } else {
    isCorrect = validateVerb(currentWord)
  }

  handleAnswerResult(isCorrect)
}

export function handleAnswerResult(isCorrect) {
  const { result } = state.elements
  result.className = `result ${isCorrect ? 'correct' : 'incorrect'}`
  result.classList.remove('hidden')

  if (!isCorrect) return

  state.currentWordIndex++
  saveProgress()

  if (state.currentWordIndex < state.words.length) {
    updateProgress()
    updateCurrentWord()
  } else {
    toggleConfetti()
    state.currentWordIndex = 0
    localStorage.removeItem('progress')
    updateProgress()
    updateCurrentWord()
  }
}

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
