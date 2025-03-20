import { state } from '../state.js'

// const SPECIAL_CHARS_REGEX = /[-\/\\^$*+?.()|[\]{}]/g
const SPECIAL_CHARS_REGEX = /[-\\^$*+?.()|[\]{}]/g // 不限制斜杠/

function normalizeInput(input) {
  return input
    .toLowerCase()
    .replace(SPECIAL_CHARS_REGEX, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function validateNoun(currentWord) {
  const plural = normalizeInput(state.domElements.pluralInput.value)

  if (plural !== currentWord.plural) {
    state.domElements.result.innerHTML = `${currentWord.plural}<br>${currentWord.pluralIPA}`
    state.domElements.pluralInput.classList.add('incorrect')
    state.domElements.pluralInput.select()
    return false
  }
  return true
}

export function validateVerb(currentWord) {
  let hasError = false
  let resultHTML = ''

  const checkInput = (input, correctVal, correctIPA) => {
    const normalized = normalizeInput(input.value)
    const isCorrect = normalized === correctVal

    input.classList.remove('correct', 'incorrect')
    input.classList.add(isCorrect ? 'correct' : 'incorrect')

    if (!isCorrect) {
      resultHTML += `${correctVal} ${correctIPA}<br>`
      input.select()
      hasError = true
    }
  }

  checkInput(state.domElements.pastInput, currentWord.past, currentWord.pastIPA)
  checkInput(
    state.domElements.pastParticipleInput,
    currentWord.pastParticiple,
    currentWord.pastParticipleIPA
  )

  state.domElements.result.innerHTML = resultHTML
  return !hasError
}
