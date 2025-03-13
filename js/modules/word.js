// word.js
import { toggleConfetti } from './confetti.js'
import { clearInputs } from './input.js'
import { saveProgress, updateProgress } from '../progress.js'
import { state } from '../state.js'
import { validateNoun, validateVerb } from './validation.js'
import { resetProgress } from '../progress.js'

export function updateCurrentWord() {
  if (state.currentWordIndex >= state.words.length) {
    localStorage.removeItem('progress')
  }

  const { currentWord } = getCurrentWord()
  const { domElements: elements } = state

  const updates = [
    { element: elements.currentWord, value: currentWord.original },
    { element: elements.wordDefinition, value: currentWord.definition },
    { element: elements.wordIPA, value: currentWord.ipa || '' },
  ]

  elements.result.classList.add('hidden')

  const isNoun = currentWord.type === 'noun'
  elements.pluralInputGroup.classList.toggle('hidden', !isNoun)
  elements.verbInputs.classList.toggle('hidden', isNoun)

  if (isNoun) {
    handleNounInput()
  } else {
    handleVerbInputs()
  }

  // 一次性更新 DOM
  updates.forEach(({ element, value }) => {
    element.textContent = value
  })
}

function handleNounInput() {
  clearInputs([state.domElements.pluralInput], true)
  // 添加延时确保 DOM 更新后触发焦点
  // setTimeout(() => state.domElements.pluralInput.focus(), 0)
}

function handleVerbInputs() {
  clearInputs(
    [state.domElements.pastInput, state.domElements.pastParticipleInput],
    true
  )
  // 如果焦点在于过去分词输入框或复数输入框，则将焦点移到过去式输入框
  if (
    document.activeElement === state.domElements.pastParticipleInput ||
    document.activeElement === state.domElements.pluralInput
  ) {
    setTimeout(() => {
      state.domElements.pastInput.focus()
    }, 0)
  }
}

export function getCurrentWord() {
  return {
    currentWord: state.words[state.currentWordIndex],
    total: state.words.length,
  }
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
