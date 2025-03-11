let words = []
let currentWordIndex = 0

// 从 localStorage 加载进度
function loadProgress() {
  const savedProgress = localStorage.getItem('progress')
  if (savedProgress !== null) {
    const progressData = JSON.parse(savedProgress)
    currentWordIndex = progressData.currentIndex
    document.getElementById('progress').style.width = progressData.progressBarWidth + '%'
  }
}

// 保存进度到 localStorage
function saveProgress() {
  const progress = (currentWordIndex / words.length) * 100
  localStorage.setItem(
    'progress',
    JSON.stringify({
      currentIndex: currentWordIndex,
      progressBarWidth: progress,
    })
  )
}

// 加载单词数据
fetch('words_Upgrade2Bach.json')
  .then((response) => response.json())
  .then((data) => {
    words = data
    loadProgress() // 加载进度
    updateCurrentWord()
  })
  .catch((error) => {
    console.error('加载单词数据时出错:', error)
  })

const pluralInput = document.getElementById('pluralInput')
const pastInput = document.getElementById('pastInput')
const pastParticipleInput = document.getElementById('pastParticipleInput')

function updateCurrentWord() {
  const currentWord = words[currentWordIndex]
  document.getElementById('currentWord').textContent = `${currentWord.original}`
  document.getElementById('wordDefinition').textContent = `${currentWord.definition}`
  document.getElementById('wordIPA').textContent = `${currentWord.ipa || ''}`
  document.getElementById('result').className = 'result hidden'

  const pluralInputGroup = document.getElementById('pluralInputGroup')
  const verbInputs = document.getElementById('verbInputs')

  // 根据单词类型显示/隐藏输入框
  if (currentWord.type === 'noun') {
    // 移除pluralInput的correct, incorrect类
    clearCorrectIncorrect(pluralInput)

    // 清除pluralInput的value
    pluralInput.value = ''

    pluralInputGroup.classList.remove('hidden')
    verbInputs.classList.add('hidden')
  } else {
    // 移除pastInput和pastParticipleInput的correct, incorrect类
    clearCorrectIncorrect(pastInput)
    clearCorrectIncorrect(pastParticipleInput)

    // 清除2个input的value
    pastInput.value = ''
    pastParticipleInput.value = ''

    pluralInputGroup.classList.add('hidden')
    verbInputs.classList.remove('hidden')

    // 聚焦pastInput
    pastInput.focus()
  }

  // 清除correct, incorrect类
  function clearCorrectIncorrect(input) {
    input.classList.remove('correct')
    input.classList.remove('incorrect')
  }
}

function checkAnswers() {
  const currentWord = words[currentWordIndex]
  let isCorrect = false
  let resultText = ''

  if (currentWord.type === 'noun') {
    const pluralInputStr = pluralInput.value.toLowerCase().trim()

    if (pluralInputStr === currentWord.plural) {
      isCorrect = true
    } else {
      incorrect(pluralInput)
      pluralInput.select()
      resultText = `${currentWord.plural}`
    }
  } else {
    isCorrect = false

    const pastInputStr = pastInput.value.toLowerCase().trim()
    const pastParticipleInputStr = pastParticipleInput.value.toLowerCase().trim()

    let isPastInputCorrect = false
    let isPastParticipleInputCorrect = false

    if (pastInputStr === currentWord.past) {
      isPastInputCorrect = true
    } else {
      resultText += `${currentWord.past}<br>`
    }

    if (pastParticipleInputStr === currentWord.pastParticiple) {
      isPastParticipleInputCorrect = true
    } else {
      resultText += `${currentWord.pastParticiple}<br>`
    }

    if (isPastInputCorrect && !isPastParticipleInputCorrect) {
      // 标红标绿
      correct(pastInput)
      incorrect(pastParticipleInput)

      // 选中错误输入
      pastParticipleInput.select()
    } else if (isPastParticipleInputCorrect && !isPastInputCorrect) {
      correct(pastParticipleInput)
      incorrect(pastInput)

      // 选中错误输入
      pastInput.select()
    } else if (!isPastInputCorrect && !isPastParticipleInputCorrect) {
      incorrect(pastInput)
      incorrect(pastParticipleInput)

      // 两个都答错, 则选中第一个input文本
      pastInput.select()
    } else {
      isCorrect = true
      // 不规则动词答对清空
      pastInput.value = ''
      pastParticipleInput.value = ''
    }
  }

  const resultDiv = document.getElementById('result')
  resultDiv.className = isCorrect ? 'result correct' : 'result incorrect'
  resultDiv.innerHTML = resultText
  resultDiv.classList.remove('hidden')

  if (isCorrect) {
    currentWordIndex++
    saveProgress() // 保存进度
    if (currentWordIndex < words.length) {
      updateProgress()
      updateCurrentWord()
    } else {
      // 放烟花
      toggleConfetti()

      // 单词索引归零, 从头开始
      currentWordIndex = 0
      localStorage.removeItem('progress') // 清除进度
      updateProgress()
      updateCurrentWord()

      // alert('🎉🎉恭喜你，所有单词都已完成！🎉🎉')
    }
  }

  // 加答对的类, 并移除答错的类
  function correct(input) {
    input.classList.add('correct')
    input.classList.remove('incorrect')
  }

  // 加答错的类, 并移除答对的类
  function incorrect(input) {
    input.classList.add('incorrect')
    input.classList.remove('correct')
  }
}

function updateProgress() {
  const progress = (currentWordIndex / words.length) * 100
  document.getElementById('progress').style.width = `${progress}%`
}

function previousWord() {
  if (currentWordIndex > 0) {
    currentWordIndex--
    updateCurrentWord()
    updateProgress()
  }
}

function nextWord() {
  if (currentWordIndex < words.length - 1) {
    currentWordIndex++
    updateCurrentWord()
    updateProgress()
  }
}

function toggleConfetti() {
  let end = Date.now() + 4 * 1000

  // go Buckeyes!
  let colors = ['#bb0000', '#ffffff']

  ;(function frame() {
    confetti({
      particleCount: 2,
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

// 回车提交答案
document.getElementById('pluralInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkAnswers()
  }
})

document.getElementById('pastInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkAnswers()
  }
})

document.getElementById('pastParticipleInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkAnswers()
  }
})

// 添加快捷键支持, alt+h, alt+l
document.addEventListener('keydown', function (event) {
  if (event.altKey && event.key === 'h') {
    previousWord()
  } else if (event.altKey && event.key === 'l') {
    nextWord()
  }
})

document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode')

  if (document.body.classList.contains('dark-mode')) {
    document.getElementById('themeToggle').innerHTML = '&#9788;'
  } else {
    document.getElementById('themeToggle').innerHTML = '&#9790;'
  }
})
