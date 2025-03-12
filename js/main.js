// main.js
import { state } from './state.js'
import { initTheme, toggleTheme } from './theme.js'
import { loadProgress } from './progress.js'
import { setupEnterHandler } from './input.js'
import {
  updateCurrentWord,
  checkAnswers,
  previousWord,
  nextWord,
} from './word.js'

// 初始化应用
function initApp() {
  initTheme() // 初始化主题
  loadProgress() // 加载进度
  updateCurrentWord() // 更新当前单词显示
  // 其他可能的初始化逻辑...
}

// 获取单词数据
fetch('words_Upgrade2Bach.json')
  .then((res) => res.json())
  .then((data) => {
    state.words = data
    initApp()
  })
  .catch(console.error)

// 设置输入框的回车键处理
setupEnterHandler(
  state.elements.pluralInput,
  state.elements.pastInput,
  state.elements.pastParticipleInput
)

// 提交按钮点击事件
state.elements.submitBtn.addEventListener('click', checkAnswers)

// 上一个按钮点击事件
state.elements.previousBtn.addEventListener('click', previousWord)

// 下一个按钮点击事件
state.elements.nextBtn.addEventListener('click', nextWord)

// 主题切换按钮点击事件
state.elements.themeToggle.addEventListener('click', toggleTheme)

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
