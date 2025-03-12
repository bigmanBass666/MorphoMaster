// input.js
import { checkAnswers } from './word.js'

export function clearInputs(inputs, clearValues = false) {
  inputs.forEach((input) => {
    input.classList.remove('correct', 'incorrect')
    if (clearValues) input.value = ''
  })
}

export function setupEnterHandler(...inputs) {
  inputs.forEach((input) => {
    input.addEventListener(
      'keydown',
      (e) => e.key === 'Enter' && checkAnswers()
    )
  })
}
