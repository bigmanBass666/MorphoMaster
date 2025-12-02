# MorphoMaster - 英语形态学习助手

> 此文档由DeepSeek生成, 我修改.
> 项目名由DeepSeek生成, 项目第一版是Kimi生成.
> 后面几版由我和它俩一起完善.
> 仅供个人娱乐, 无推广目的.

![MorphoMaster 界面截图](https://pic2.ziyuan.wang/user/bigmanBass666/2025/03/1741889876284_118dad7818eb6.png)

![MorphoMaster 界面截图](https://pic2.ziyuan.wang/user/bigmanBass666/2025/03/1741889955184_613e6a24846c7.png)

一款专注于英语名词复数、动词过去式/过去分词形态练习的交互式学习工具

## ✨ 核心特性

- **动态词库支持**  
  从JSON文件加载CET4/升级词库，自动生成练习内容
- **智能反馈系统**  
  ✅ 实时输入验证 ✔️ 错误高亮提示 ✔️ IPA音标对照
- **学习进度跟踪**  
  📊 本地保存进度 🔄 断点续学功能
- **多主题切换**  
  🌞 明亮模式 🌚 暗黑模式 ⚡ 一键切换
- **交互增强**  
  🎉 粒子动画效果 ⌨️ 快捷键支持 📱 响应式布局

## 🛠️ 技术栈

[![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)]()

- **核心架构**: 模块化JavaScript + 状态管理模式
- **数据持久化**: LocalStorage 进度存储
- **网络请求**: Fetch API + JSON数据加载
- **动画效果**: CSS Transform + 动态Confetti粒子

## 🚀 快速开始

### 本地运行

```bash
git clone https://github.com/yourusername/morphomaster.git
cd morphomaster
# 使用Live Server或直接打开index.html
```

### 在线体验

[![GitHub Pages](https://img.shields.io/badge/netlify-在线演示-2088FF?logo=netlify)](https://morphomaster.netlify.app/)  

## 📂 项目结构

```text
morphomaster/
├── data/                 # 词库文件
│   ├── words_CET4.json
│   └── words_Upgrade2Bach.json
├── js/
│   ├── modules/         # 功能模块
│   │   ├── validation.js
│   │   ├── navigation.js
│   │   └── ...
│   ├── config.js        # 配置常量
│   └── main.js          # 主入口
├── css/                 # 样式文件
│   ├── var.css          # CSS变量
│   └── index.css        # 核心样式
└── index.html           # 主界面
```

## 🎮 使用指南

### 基本操作

1. 输入答案后按 `Enter` 提交
2. 使用侧边按钮或快捷键导航：
   - `Alt+H`: 上一个单词
   - `Alt+L`: 下一个单词
   - `Alt+T`: 切换主题

### 功能演示

```javascript
// 示例：验证名词复数
function validateNoun(input) {
  return input === currentWord.plural;
}
```

## 📜 许可证

[MIT License](LICENSE) © 2024 [Your Name]

## todo

⬜ 找个框架重写, 方便平时更改, 也方便以后增加功能 (笑死🤣一开始鬼知道这个项目会变得这么大型)
⬜ 可以切换模式: 复数, 过去式和过去分词, 比较级和最高级等
⬜ 错题回顾

## 🌟 特别致谢

- [DeepSeek](https://www.deepseek.com/): 提供项目名和文档模板等
- [Kimi](https://kimi.moonshot.cn/): 提供项目第一版, 部分单词数据等
- 粒子动画：[canvas-confetti](https://github.com/catdad/canvas-confetti)
- 图标资源：[iconfont](https://iconfont.cn)
- 主题配色: <https://uchu.style/simple.html>

---

**提示**：实际使用时请：

1. 替换 `yourusername` 为您的实际账号名
2. 添加项目截图至 `/assets/screenshot.png`
3. 更新许可证信息和致谢内容
4. 根据实际部署情况调整在线演示链接

建议通过 [Shields.io](https://shields.io) 生成个性化徽章增强可读性！

---

哈哈哈
