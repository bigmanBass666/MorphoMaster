import { checkAnswers } from "./word.js"
// input.js
export function clearInputStyles(...inputs) {
  inputs.forEach((input) => {
    input.classList.remove('correct', 'incorrect')
    input.value = ''
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
