<div align="center">

# 🃏 Fan Poker Teaching Skill

**一行引入，把任意知识变成可点击、可拖动、会回到牌尾的教学卡片。**

A dependency-free Web Component and Agent Skill for interactive lessons, tutorials, onboarding flows and revision cards.

[![version](https://img.shields.io/badge/version-0.1.0-e96d2f)](./CHANGELOG.md)
[![Web Component](https://img.shields.io/badge/Web%20Component-fan--poker-111111)](./dist/fan-poker.js)
[![No runtime dependencies](https://img.shields.io/badge/runtime%20dependencies-0-2ea44f)](./package.json)
[![Validate](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml/badge.svg)](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[在线演示](https://hubujiu.github.io/fan-poker-teaching-skill/) · [基础示例](./examples/basic.html) · [JavaScript API](./examples/javascript-api.html) · [English](./README_EN.md)

<img src="./media/preview.svg" alt="Fan Poker Teaching Skill preview" width="760" />

</div>

## 快速开始

引入组件：

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/Hubujiu/fan-poker-teaching-skill@main/dist/fan-poker.js">
</script>
```

然后直接写卡片：

```html
<fan-poker card-width="390px" card-height="520px">
  <fan-card tag="Git" title="工作区" symbol="01" accent="#f2a65a">
    工作区保存尚未提交的修改。
  </fan-card>

  <fan-card tag="Git" title="暂存区" symbol="02" accent="#7dcfb6">
    <p><code>git add</code> 将修改放入暂存区。</p>
    <pre><code>git add README.md</code></pre>
  </fan-card>

  <fan-card tag="Git" title="提交" symbol="03" accent="#8e9aef">
    <code>git commit</code> 创建一次版本快照。
  </fan-card>
</fan-poker>
```

卡片数量会根据 `<fan-card>` 自动计算，不需要额外配置。

> 当前 GitHub CDN 地址适合预览和自托管。npm 包 `@hubujiu/fan-poker-deck` 已准备完成，发布后可改用固定版本 CDN。

## 为什么采用 Web Component

- **真正适合嵌入**：普通 HTML、Halo、Vue、React、Svelte、Astro 都能使用。
- **生成内容更短**：AI 只生成 `<fan-card>`，不再复制整套动画代码。
- **样式隔离**：Shadow DOM 防止博客主题、Bootstrap 或 Tailwind 污染牌面。
- **零运行时依赖**：不加载框架和第三方动画库。
- **原有动效保留**：单侧扇形、完整回牌、连续点击提速、拖动和键盘控制。
- **仍有离线方案**：需要单个离线文件时，可继续使用 `assets/fan-poker-base.html`。

## 配置

```html
<fan-poker
  card-width="390px"
  card-height="520px"
  start-index="0"
  keyboard="true"
  wheel="true"
  draggable="true"
  aria-label="Docker 入门教学">
</fan-poker>
```

| 属性 | 默认值 | 说明 |
|---|---:|---|
| `card-width` | `390px` | 卡片宽度，必须包含 CSS 单位 |
| `card-height` | `520px` | 卡片高度，必须包含 CSS 单位 |
| `start-index` | `0` | 初始卡片，下标从 0 开始 |
| `keyboard` | `true` | 聚焦组件后支持方向键与空格 |
| `wheel` | `true` | 支持鼠标滚轮切换 |
| `draggable` | `true` | 支持左右拖动 |

也可以通过 CSS 变量统一定制：

```css
fan-poker {
  --fan-card-width: 420px;
  --fan-card-height: 560px;
  --fan-card-bg: #ffffff;
  --fan-text: #171717;
  --fan-muted: #737373;
  --fan-line: rgba(23, 23, 23, 0.15);
  --fan-accent: #e96d2f;
  --fan-radius: 24px;
}
```

## JavaScript API

```js
const deck = document.querySelector("fan-poker");

deck.next();
deck.previous();
deck.goTo(3);
deck.reset();

console.log(deck.currentIndex);
console.log(deck.cardCount);
```

动态设置卡片：

```js
deck.cards = [
  {
    tag: "Docker",
    title: "检查服务",
    content: "确认 Docker daemon 已启动。",
    symbol: "01",
    accent: "#f2a65a"
  },
  {
    tag: "Docker",
    title: "运行容器",
    html: "<pre><code>docker run --rm hello-world</code></pre>",
    symbol: "02",
    accent: "#7dcfb6"
  }
];
```

监听切换事件：

```js
deck.addEventListener("cardchange", event => {
  console.log(event.detail);
});
```

事件数据：

```js
{
  index: 2,
  previousIndex: 1,
  cardCount: 6,
  direction: "next",
  source: "click"
}
```

## AI Skill

安装仓库后，可以直接要求 AI：

```text
使用 fan-poker-teaching-skill，生成一份 Linux 部署 Docker 的交互式教学卡片。
```

Skill 默认只生成组件引入和卡片标签。只有明确要求完全离线的单文件时，才回退到内嵌动画模板。

## 项目结构

```text
fan-poker-teaching-skill/
├── src/fan-poker.js             # Web Component 源码
├── dist/fan-poker.js            # CDN 与 npm 分发文件
├── types/fan-poker.d.ts         # TypeScript 类型
├── examples/basic.html          # 基础标签用法
├── examples/javascript-api.html # 动态数据与外部控制
├── assets/fan-poker-base.html   # 传统离线单文件底座
├── SKILL.md                     # AI 生成规范
└── scripts/                     # 构建与校验
```

## 开发与校验

无需安装运行时依赖：

```bash
npm test
```

它会重新生成 `dist/fan-poker.js`，并检查：

- 源码与 dist 是否一致
- Custom Elements 是否注册
- 公共 API 与事件是否存在
- Skill 与 README 是否使用新组件 API
- 顶栏、计数器和底部导航是否回归
- npm v0.1.0 元数据是否完整

## 浏览器兼容性

目标为支持 Custom Elements、Shadow DOM、ResizeObserver 和 ES Modules 的现代浏览器。旧浏览器需要自行提供 polyfill。

## Roadmap

- [x] v0.1.0：Web Component、尺寸配置、四种输入、公共 API、事件
- [ ] v0.2.0：稳定主题令牌、更多动态数据能力、Vue / React 示例
- [ ] v1.0.0：固定 API、完整浏览器测试、npm 正式发布

## License

MIT © [Hubujiu](https://github.com/Hubujiu)

---

<div align="center">

**这个组件对你的教程有帮助，可以点一个 Star，让更多内容创作者发现它。** ⭐

</div>
