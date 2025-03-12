// word.js
import { saveProgress, updateProgress } from './progress.js'
import { clearInputStyles, clearInputStylesAndValue } from './input.js'
import { state } from './state.js'
import { toggleConfetti } from './confetti.js'

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
    clearInputStylesAndValue(elements.pluralInput)
    elements.pluralInput.focus()
  } else {
    clearInputStylesAndValue(elements.pastInput, elements.pastParticipleInput)
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
    state.elements.result.innerHTML = `${currentWord.plural}<br>${currentWord.pluralIPA}`
    state.elements.pluralInput.classList.add('incorrect')
    state.elements.pluralInput.select()
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

  ;[participle, past].forEach((val, i) => {
    const correctVal = i ? currentWord.past : currentWord.pastParticiple
    const IPA = i ? currentWord.pastIPA : currentWord.pastParticipleIPA

    const element = i
      ? state.elements.pastInput
      : state.elements.pastParticipleInput
    if (val !== correctVal) {
      result += `${correctVal} ${IPA}<br>`

      clearInputStyles(element)
      element.classList.add('incorrect')

      element.select()
    } else {
      clearInputStyles(element)
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
