// state.js
export const state = {
  words: [],
  currentWordIndex: 0,
  elements: {
    progressBar: document.querySelector('#progress'),
    currentWord: document.querySelector('#currentWord'),
    wordDefinition: document.querySelector('#wordDefinition'),
    wordIPA: document.querySelector('#wordIPA'),
    pluralInputGroup: document.querySelector('#pluralInputGroup'),
    verbInputs: document.querySelector('#verbInputs'),
    pluralInput: document.querySelector('#pluralInput'),
    pastInput: document.querySelector('#pastInput'),
    pastParticipleInput: document.querySelector('#pastParticipleInput'),
    submitBtn: document.querySelector('#submitBtn'),
    previousBtn: document.querySelector('#previousBtn'),
    nextBtn: document.querySelector('#nextBtn'),
    result: document.querySelector('#result'),
    themeToggle: document.querySelector('#themeToggle'),
  },
}
