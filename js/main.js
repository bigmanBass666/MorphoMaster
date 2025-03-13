// main.js
import { API_ENDPOINTS } from './config.js'
import { checkAnswers } from './modules/answer.js'
import { toggleConfetti } from './modules/confetti.js'
import { setupEnterHandler } from './modules/input.js'
import { nextWord, previousWord } from './modules/navigation.js'
import { updateCurrentWord } from './modules/word.js'
import { loadProgress } from './progress.js'
import { state } from './state.js'
import { initTheme, toggleTheme } from './theme.js'

// 获取单词数据
// 在 main.js 中使用兼容性更好的 fetch 错误处理
fetch(API_ENDPOINTS.WORDS)
  .then((res) => {
    if (!res.ok) throw new Error('网络响应不正常')
    return res.json()
  })
  .then((data) => {
    state.words = data
    initApp()
  })
  .catch((error) => {
    console.error('获取单词数据失败:', error)
    alert('无法加载单词数据，请检查网络连接。')
  })

// 初始化应用
function initApp() {
  initTheme() // 初始化主题
  loadProgress() // 加载进度
  updateCurrentWord() // 更新当前单词显示
  // 其他可能的初始化逻辑...
}

// 检测是否支持 localStorage
if (typeof localStorage === 'undefined') {
  alert('您的浏览器不支持本地存储功能，请升级浏览器。')
}

// 检测是否支持 fetch API
if (!window.fetch) {
  alert('您的浏览器不支持 fetch API，请升级浏览器。')
}

// 按钮区3个按钮
document.querySelector('.button-area').addEventListener('click', (e) => {
  const { target } = e
  if (target.id === 'submitBtn') checkAnswers()
  if (target.id === 'previousBtn') previousWord()
  if (target.id === 'nextBtn') nextWord()
})

// 主题切换按钮点击事件
state.domElements.themeToggle.addEventListener('click', toggleTheme)

// 设置输入框的回车键处理
setupEnterHandler(
  state.domElements.pluralInput,
  state.domElements.pastInput,
  state.domElements.pastParticipleInput
)

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
