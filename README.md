# MorphoMaster

<div align="center">

![MorphoMaster Logo](assets/favicon.ico)

一个专业的英语单词形态变化学习工具，帮助用户掌握英语名词复数形式和动词时态变化。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Latest-orange.svg)](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Latest-blue.svg)](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

[在线演示](https://bigmanBass666.github.io/morphomaster/) | [GitHub](https://github.com/bigmanBass666/morphomaster) | [Gitee](https://gitee.com/bigmanBass666/morphomaster)

</div>

## 📖 项目简介

MorphoMaster 是一款专为英语学习者设计的交互式单词形态变化学习工具。它通过简洁直观的界面，帮助用户掌握英语名词复数形式和动词时态变化，提高英语词汇应用能力。

### 项目背景

英语单词的形态变化是英语学习中的难点之一，尤其是不规则变化形式。传统学习方式往往枯燥且效率低下，MorphoMaster 通过互动式学习体验，让单词形态变化学习变得更加高效和有趣。

### 主要功能

- **名词复数形式练习**：涵盖规则和不规则名词复数变化
- **动词时态变化练习**：包括过去式和过去分词形式
- **音标显示**：提供标准国际音标(IPA)帮助发音学习
- **进度追踪**：实时记录学习进度，支持断点续学
- **主题切换**：支持亮色/暗色主题，适应不同使用环境
- **快捷键支持**：提供便捷的键盘操作方式
- **响应式设计**：适配各种屏幕尺寸，支持移动设备

## 🛠️ 环境要求

### 开发环境

- **现代浏览器**：支持 ES6+、Fetch API 和 LocalStorage
  - Chrome 60+
  - Firefox 55+
  - Safari 12+
  - Edge 79+

### 运行环境

- **Web 服务器**：由于使用了 Fetch API，需要通过 HTTP 服务器运行
  - 可使用 Live Server、http-server 或其他本地服务器工具

### 依赖项

本项目无外部依赖，所有功能均使用原生 JavaScript 实现。

## 🚀 安装指南

### 方式一：直接下载

1. 克隆或下载项目到本地

```bash
git clone https://github.com/bigmanBass666/morphomaster.git
# 或
wget https://github.com/bigmanBass666/morphomaster/archive/refs/heads/main.zip
```

2. 进入项目目录

```bash
cd morphomaster
```

3. 启动本地服务器（推荐使用 Node.js 的 http-server）

```bash
# 如果已安装 http-server
npx http-server

# 或使用 Python 3
python -m http.server 8000

# 或使用 PHP
php -S localhost:8000
```

4. 在浏览器中访问 `http://localhost:8000`

### 方式二：使用 Live Server（VS Code 扩展）

1. 在 VS Code 中安装 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 扩展
2. 右键点击 `index.html` 文件
3. 选择 "Open with Live Server"

## 📖 使用说明

### 基本操作流程

1. **选择学习模式**：系统会自动显示单词，根据单词类型（名词/动词）显示相应的输入框
   - 名词：输入复数形式
   - 动词：输入过去式和过去分词形式

2. **输入答案**：在对应的输入框中填写答案

3. **提交答案**：点击 "OK" 按钮或按 Enter 键提交答案

4. **查看结果**：系统会立即显示答案是否正确

5. **继续学习**：使用导航按钮或快捷键切换到下一个单词

### 快捷键操作

| 快捷键 | 功能 |
|--------|------|
| `Enter` | 提交答案 |
| `Alt + H` | 上一个单词 |
| `Alt + L` | 下一个单词 |
| `Alt + T` | 切换主题 |
| `Alt + I` | 切换彩带效果 |

### 主题切换

点击右上角的主题切换按钮或使用 `Alt + T` 快捷键，可在亮色和暗色主题间切换。系统会自动保存您的主题偏好。

### 进度保存

系统会自动保存您的学习进度，下次打开时会从上次学习的位置继续。进度数据存储在浏览器的 LocalStorage 中。

## 📁 项目结构

``` bash
MorphoMaster/
├── assets/                 # 静态资源
│   ├── favicon.ico        # 网站图标
│   └── icons/             # 图标资源
│       ├── checkmark.png  # 正确标记
│       └── cross.png      # 错误标记
├── css/                   # 样式文件
│   ├── common.css         # 通用样式
│   ├── iconfont/          # 字体图标
│   ├── index.css          # 首页样式
│   ├── main.css           # 主样式文件
│   ├── normalize.css      # 样式重置
│   ├── utils.css          # 工具样式
│   └── vars.css           # CSS 变量
├── data/                  # 数据文件
│   ├── sort-words.js      # 单词排序工具
│   └── words_Upgrade2Bach.json  # 单词数据
├── js/                    # JavaScript 文件
│   ├── config.js          # 配置文件
│   ├── main.js            # 主入口文件
│   ├── progress.js        # 进度管理
│   ├── state.js           # 状态管理
│   ├── theme.js           # 主题管理
│   └── modules/           # 功能模块
│       ├── answer.js      # 答案检查
│       ├── confetti.js    # 彩带效果
│       ├── input.js       # 输入处理
│       ├── navigation.js  # 导航控制
│       ├── progression.js # 学习进度
│       ├── validation.js  # 答案验证
│       └── word.js        # 单词处理
└── index.html             # 主页面
```

### 核心文件说明

- **index.html**：应用主页面，包含所有UI元素
- **js/main.js**：应用入口点，负责初始化和事件绑定
- **js/state.js**：全局状态管理，集中管理应用数据
- **js/modules/word.js**：单词显示和更新逻辑
- **js/modules/answer.js**：答案检查和验证逻辑
- **data/words_Upgrade2Bach.json**：包含所有学习单词的数据文件

## 🤝 贡献指南

我们欢迎所有形式的贡献！如果您想为 MorphoMaster 做出贡献，请遵循以下指南：

### 代码规范

1. **JavaScript**：
   - 使用 ES6+ 语法
   - 采用模块化开发
   - 遵循驼峰命名法
   - 函数和类添加适当的注释

2. **CSS**：
   - 使用 BEM 命名约定
   - 优先使用 Flexbox 和 Grid 布局
   - 确保响应式设计

3. **HTML**：
   - 使用语义化标签
   - 保持结构清晰
   - 添加适当的注释

### 提交流程

1. **Fork 项目**：点击 GitHub 页面右上角的 Fork 按钮

2. **创建分支**：

```bash
git checkout -b feature/您的功能名称
```

3. **提交更改**：

```bash
git commit -m "添加：简要描述您的更改"
```

4. **推送分支**：

```bash
git push origin feature/您的功能名称
```

5. **创建 Pull Request**：在 GitHub 上提交 Pull Request，详细描述您的更改

### 问题报告

如果您发现 bug 或有功能建议，请在 GitHub Issues 中提交：

- 标题：简明扼要地描述问题
- 内容：详细描述问题现象、重现步骤和期望结果
- 环境：说明您的操作系统和浏览器版本

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)，您可以自由使用、修改和分发本项目。

## 📞 联系方式

- **作者**：Jason Liu
- **邮箱**：[通过网易云音乐联系](https://music.163.com/#/user/home?id=1394582249)
- **GitHub**：[bigmanBass666](https://github.com/bigmanBass666)
- **Gitee**：[bigmanBass666](https://gitee.com/bigmanBass666)

## 🙏 致谢

感谢所有为 MorphoMaster 做出贡献的开发者和用户，您的反馈和支持是我们不断改进的动力！

---

<div align="center">

如果这个项目对您有帮助，请给我们一个 ⭐️！

</div>
