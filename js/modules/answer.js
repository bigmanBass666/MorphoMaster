import { handleAnswerResult } from './progression.js'
import { validateNoun, validateVerb } from './validation.js'
import { getCurrentWord } from './word.js'

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
