<div align="center">

# 🃏 Fan Poker Teaching Skill

**把任意知识变成一叠可点击、可拖动、会“回牌”的交互式教学卡片。**

An Agent Skill that turns lessons, tutorials, onboarding flows and explainers into a dependency-free, single-file HTML poker deck.

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-SKILL.md-111111)](./SKILL.md)
[![HTML](https://img.shields.io/badge/output-single--file%20HTML-E34F26?logo=html5&logoColor=white)](./assets/fan-poker-base.html)
[![No Dependencies](https://img.shields.io/badge/dependencies-0-2ea44f)](./package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[查看示例](#-快速体验) · [安装 Skill](#-安装) · [中文文档](#-为什么值得用) · [English](./README_EN.md)

<img src="./media/demo.gif" alt="Fan Poker Teaching Skill demo" width="760" />

</div>

## ✨ 为什么值得用

大多数 AI 教程最后都会变成长页面。这个 Skill 选择另一条路：一次只展示一个清晰知识点，让学习过程像翻牌一样自然。

- **交互有记忆点**：点击、拖动、滚轮、键盘都能切牌，前牌会沿纵深回到牌堆末尾。
- **AI 生成稳定**：动画引擎与教学内容分区，Agent 默认只修改 `cardData`，避免“改内容顺手拆动画”。
- **真正零依赖**：纯 HTML + CSS + JavaScript，无框架、无 CDN，双击即可运行。
- **适合嵌入**：透明背景、响应式尺寸，可放进博客、课程页、文档站或产品引导。
- **无多余界面**：没有顶栏、页码计数和底部导航，视觉焦点只留给卡片。
- **照顾可访问性**：保留键盘操作、语义标签和 `prefers-reduced-motion`。

## 🚀 快速体验

直接下载并打开以下任意文件：

| 示例 | 适合查看 |
|---|---|
| [`index.html`](./index.html) | 动画能力与交互方式 |
| [`examples/docker-lesson.html`](./examples/docker-lesson.html) | AI 生成真实教学内容的效果 |
| [`assets/fan-poker-base.html`](./assets/fan-poker-base.html) | 最干净的可复用底座 |

操作方式：

- 点击当前卡片：下一张
- 左右拖动：上一张 / 下一张
- 鼠标滚轮：连续切换
- `←` `↑` `PageUp`：上一张
- `→` `↓` `PageDown` `Space`：下一张

## 📦 安装

Agent Skills 的核心就是一个带有 `SKILL.md` 的自包含目录。将本仓库克隆到你的 Agent 或 CLI 所读取的 Skills 目录即可：

```bash
git clone https://github.com/Hubujiu/fan-poker-teaching-skill.git
```

也可以只下载仓库 ZIP，然后把整个目录放入你的 Skills 目录。不同客户端的目录位置不同，请以对应客户端文档为准。

安装后直接对 AI 说：

```text
使用 fan-poker-teaching-deck skill，生成一份 Linux 部署 Docker 的交互式教学 HTML。
```

或者：

```text
把这篇文章改造成 8 张扑克牌式复习卡片，保留代码示例和常见错误。
```

## 🧠 它如何工作

```text
你的主题 / 文档 / 教程需求
          ↓
Agent 读取 SKILL.md
          ↓
复制 assets/fan-poker-base.html
          ↓
只替换 AI CONTENT ZONE 中的 cardData
          ↓
输出可直接运行的单文件 HTML
```

Skill 默认建议使用 5 到 10 张卡片，并按照「目标 → 核心知识 → 示例 / 练习 → 总结」组织，但不会强迫所有内容套入同一种结构。

## 🧩 卡片格式

简单内容使用字段模式：

```js
{
  tag: "步骤",
  title: "确认 Docker 已启动",
  description: "运行 docker version。客户端与服务端均有输出，说明 Docker daemon 正常响应。",
  symbol: "03",
  accent: "#7dcfb6"
}
```

需要代码、列表或警告时使用 `html`：

```js
{
  tag: "实践",
  title: "运行第一个容器",
  symbol: "04",
  accent: "#8e9aef",
  html: `
    <p class="card-tag">实践</p>
    <h2 class="card-title">运行第一个容器</h2>
    <div class="card-description">
      <pre><code>docker run --rm hello-world</code></pre>
      <p>看到欢迎信息后，说明镜像拉取、容器创建和日志输出链路都正常。</p>
    </div>
  `
}
```

完整字段说明见 [`references/card-data-schema.md`](./references/card-data-schema.md)。

## 🎛️ 外部控制

生成后的页面暴露一个轻量 API：

```js
window.fanPokerDeck.requestStep(1);   // 下一张
window.fanPokerDeck.requestStep(-1);  // 上一张
window.fanPokerDeck.goTo(3);          // 跳到第 4 张，自动选择最短路径
```

因此你可以在博客主题、课程目录或自己的按钮中控制牌堆，而不必修改动画类。

## 📁 仓库结构

```text
fan-poker-teaching-skill/
├── SKILL.md                         # Agent 的触发条件与生成规范
├── assets/
│   └── fan-poker-base.html          # 稳定动画底座
├── examples/
│   ├── animation-features-demo.html # 动画功能示例
│   └── docker-lesson.html           # 教学内容示例
├── references/
│   └── card-data-schema.md          # 卡片字段与内容密度规范
├── scripts/
│   └── validate.mjs                 # 零依赖静态检查
├── index.html                       # 快速预览入口
└── .github/workflows/validate.yml   # 自动校验
```

## ✅ 本地校验

只需要 Node.js，无需安装依赖：

```bash
npm test
```

检查内容包括：

- HTML 中的 JavaScript 是否能解析
- `cardData` 是否存在且非空
- 顶栏、计数器和底部页码导航是否被重新引入
- 模板是否仍然暴露 `window.fanPokerDeck`

## 🗺️ Roadmap

- [ ] 增加更多教学示例：Git、Spring Boot、算法、语言学习
- [ ] 提供亮色 / 暗色主题令牌，而不改变透明背景
- [ ] 增加可选的代码复制按钮
- [ ] 增加 Skill 触发测试集与生成质量评测
- [ ] 发布更多适用于博客和课程平台的嵌入示例

欢迎提交 Issue、示例课程和新的卡片内容模式。一个好示例，往往比十页说明更有力量。

## 🤝 贡献

请先阅读 [`CONTRIBUTING.md`](./CONTRIBUTING.md)。动画改动请说明视觉目的并附预览，内容示例则优先保证准确、简洁、每张卡只有一个核心任务。

## 📄 License

MIT © [Hubujiu](https://github.com/Hubujiu)

---

<div align="center">

**觉得这叠牌有用，可以点一个 Star。它会让更多正在写教程的人发现这个小工具。** ⭐

</div>
