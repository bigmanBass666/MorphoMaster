;(function () {
  'use strict'

  // 封装状态管理
  const state = {
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

  // 主题管理
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    document.body.classList.toggle('dark-mode', savedTheme === 'dark')
    state.elements.themeToggle.innerHTML =
      savedTheme === 'dark' ? '&#9788;' : '&#9790;'
  }

  // 进度管理
  const progressManager = {
    load() {
      const saved = localStorage.getItem('progress')
      if (!saved) return
      const { currentIndex, progressBarWidth } = JSON.parse(saved)
      state.currentWordIndex = currentIndex
      state.elements.progressBar.style.width = `${progressBarWidth}%`
    },
    save() {
      const progress = (state.currentWordIndex / state.words.length) * 100
      localStorage.setItem(
        'progress',
        JSON.stringify({
          currentIndex: state.currentWordIndex,
          progressBarWidth: progress,
        })
      )
    },
  }

  // 输入框管理
  const inputManager = {
    clearStyles(...inputs) {
      inputs.forEach((input) => {
        input.classList.remove('correct', 'incorrect')
        input.value = ''
      })
    },
    setupEnterHandler(...inputs) {
      inputs.forEach((input) => {
        input.addEventListener(
          'keydown',
          (e) => e.key === 'Enter' && checkAnswers()
        )
      })
    },
  }

  // 单词操作
  function updateCurrentWord() {
    const { currentWord } = getCurrentWord()
    const { elements } = state

    elements.currentWord.textContent = currentWord.original
    elements.wordDefinition.textContent = currentWord.definition
    elements.wordIPA.textContent = currentWord.ipa || ''
    elements.result.classList.add('hidden')

    const isNoun = currentWord.type === 'noun'
    elements.pluralInputGroup.classList.toggle('hidden', !isNoun)
    elements.verbInputs.classList.toggle('hidden', isNoun)

    if (isNoun) {
      inputManager.clearStyles(elements.pluralInput)
      elements.pluralInput.focus()
    } else {
      inputManager.clearStyles(elements.pastInput, elements.pastParticipleInput)
      elements.pastInput.focus()
    }
  }

  function getCurrentWord() {
    return {
      currentWord: state.words[state.currentWordIndex],
      total: state.words.length,
    }
  }

  // 答案验证
  function validateNoun(currentWord) {
    const input = state.elements.pluralInput.value.toLowerCase().trim()
    if (input !== currentWord.plural) {
      state.elements.result.innerHTML = currentWord.plural
      state.elements.pluralInput.classList.add('incorrect')
      return false
    }
    return true
  }

  function validateVerb(currentWord) {
    const past = state.elements.pastInput.value.toLowerCase().trim()
    const participle = state.elements.pastParticipleInput.value
      .toLowerCase()
      .trim()
    let result = ''

    ;[past, participle].forEach((val, i) => {
      const correctVal = i ? currentWord.pastParticiple : currentWord.past
      const element = i
        ? state.elements.pastParticipleInput
        : state.elements.pastInput
      if (val !== correctVal) {
        result += `${correctVal}<br>`
        element.classList.add('incorrect')
        element.select()
      } else {
        element.classList.add('correct')
      }
    })

    state.elements.result.innerHTML = result
    return result === ''
  }

  function checkAnswers() {
    const { currentWord } = getCurrentWord()
    let isCorrect = false

    if (currentWord.type === 'noun') {
      isCorrect = validateNoun(currentWord)
    } else {
      isCorrect = validateVerb(currentWord)
    }

    handleAnswerResult(isCorrect)
  }

  function updateProgress() {
    const progress = (state.currentWordIndex / state.words.length) * 100
    document.getElementById('progress').style.width = `${progress}%`
  }

  function previousWord() {
    if (state.currentWordIndex > 0) {
      state.currentWordIndex--
      updateCurrentWord()
      updateProgress()
      progressManager.save()
    }
  }

  function nextWord() {
    if (state.currentWordIndex < state.words.length - 1) {
      state.currentWordIndex++
      updateCurrentWord()
      updateProgress()
      progressManager.save()
    }
  }

  function handleAnswerResult(isCorrect) {
    const { result } = state.elements
    result.className = `result ${isCorrect ? 'correct' : 'incorrect'}`
    result.classList.remove('hidden')

    if (!isCorrect) return

    state.currentWordIndex++
    progressManager.save()

    if (state.currentWordIndex < state.words.length) {
      updateProgress()
      updateCurrentWord()
    } else {
      toggleConfetti()
      state.currentWordIndex = 0
      localStorage.removeItem('progress')
      updateProgress()
      updateCurrentWord()
    }
  }

  // 其他函数保持类似结构，略作整理...
  // 初始化
  fetch('words_Upgrade2Bach.json')
    .then((res) => res.json())
    .then((data) => {
      state.words = data
      progressManager.load()
      updateCurrentWord()
    })
    .catch(console.error)

  // 事件监听
  document.addEventListener('keydown', (e) => {
    if (e.altKey) {
      switch (e.key) {
        case 'h':
          previousWord()
          break
        case 'l':
          nextWord()
          break
        case 'c':
          toggleConfetti()
          break
        case 't':
          toggleTheme()
          break
      }
    }
  })

  // click themeToggle
  function toggleTheme() {
    state.elements.themeToggle.click()
  }

  state.elements.themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    const isDark = document.body.classList.contains('dark-mode')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    state.elements.themeToggle.innerHTML = isDark ? '&#9788;' : '&#9790;'
  })

  inputManager.setupEnterHandler(
    state.elements.pluralInput,
    state.elements.pastInput,
    state.elements.pastParticipleInput
  )

  // submitBtn, previousBtn, nextBtn的点击事件监听器
  state.elements.submitBtn.addEventListener('click', checkAnswers)
  state.elements.previousBtn.addEventListener('click', previousWord)
  state.elements.nextBtn.addEventListener('click', nextWord)

  function toggleConfetti() {
    let end = Date.now() + 10 * 1000

    // go Buckeyes!
    let colors = ['#bb0000', '#ffffff']

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

  initTheme()
})()
