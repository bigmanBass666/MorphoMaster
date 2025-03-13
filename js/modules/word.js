// word.js
import { state } from '../state.js'
import { handleNounInput, handleVerbInputs } from './input.js'

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

export function getCurrentWord() {
  return {
    currentWord: state.words[state.currentWordIndex],
    total: state.words.length,
  }
}
