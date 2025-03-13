import { state } from '../state.js'
import { clearInputs } from './input.js'

function normalizeInput(input) {
  return input.toLowerCase().replace(/\s+/g, ' ').trim()
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
  const past = normalizeInput(state.domElements.pastInput.value)
  const participle = normalizeInput(state.domElements.pastParticipleInput.value)
  let result = ''

  ;[participle, past].forEach((val, i) => {
    const correctVal = i ? currentWord.past : currentWord.pastParticiple
    const IPA = i ? currentWord.pastIPA : currentWord.pastParticipleIPA

    const element = i
      ? state.domElements.pastInput
      : state.domElements.pastParticipleInput
    if (val !== correctVal) {
      result += `${correctVal} ${IPA}<br>`

      clearInputs([element])
      element.classList.add('incorrect')

      element.select()
    } else {
      clearInputs([element])
      element.classList.add('correct')
    }
  })

  state.domElements.result.innerHTML = result
  return result === ''
}
