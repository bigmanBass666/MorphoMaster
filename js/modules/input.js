// input.js
import { checkAnswers } from './answer.js'
import { state } from '../state.js'

export function handleNounInput() {
  clearInputs([state.domElements.pluralInput], true)
  // 添加延时确保 DOM 更新后触发焦点
  // setTimeout(() => state.domElements.pluralInput.focus(), 0)
}

export function handleVerbInputs() {
  clearInputs(
    [state.domElements.pastInput, state.domElements.pastParticipleInput],
    true
  )
  // 如果焦点在过去分词输入框或复数输入框，则将焦点移到过去式输入框
  manageVerbInputFocus()
}

export function manageVerbInputFocus() {
  if (
    document.activeElement === state.domElements.pastParticipleInput ||
    document.activeElement === state.domElements.pluralInput
  ) {
    setTimeout(() => {
      state.domElements.pastInput.focus()
    }, 0)
  }
}

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
