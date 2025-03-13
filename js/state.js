// state.js

export const createState = () => ({
  words: [],
  currentWordIndex: 0,
  theme: 'light',
  isConfettiActive: false,
  progress: {
    currentIndex: 0,
    total: 0,
    percentage: 0,
  },
  domElements: {
    progressBar: document.querySelector('#progress'),
    progressText: document.querySelector('#progressText'),
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
})

export const state = createState()
