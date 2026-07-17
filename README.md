<div align="center">

# 🃏 Fan Poker Teaching Skill

**一行引入，把任意知识变成可点击、可拖动、会回到牌尾的教学卡片。**

零运行时依赖的 Web Component 与 AI Skill，适合教程、复习卡、产品引导和步骤说明。

[![npm](https://img.shields.io/npm/v/%40hubujiu%2Ffan-poker-deck)](https://www.npmjs.com/package/@hubujiu/fan-poker-deck)
[![Validate](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml/badge.svg)](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[在线演示](https://hubujiu.github.io/fan-poker-teaching-skill/) · [基础示例](./examples/basic.html) · [运行时 API](./examples/theme-and-runtime.html) · [English](./README_EN.md)

</div>

## 快速开始

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@0.2.0/dist/fan-poker.js">
</script>

<fan-poker card-width="390px" card-height="520px" theme="auto">
  <fan-card tag="Git" title="工作区" symbol="01" accent="#f2a65a">
    工作区保存尚未提交的修改。
  </fan-card>

  <fan-card tag="Git" title="暂存区" symbol="02" accent="#7dcfb6">
    <p><code>git add</code> 将修改放入暂存区。</p>
    <pre><code>git add README.md</code></pre>
  </fan-card>
</fan-poker>
```

也可以通过 npm 安装：

```bash
npm install @hubujiu/fan-poker-deck
```

```js
import "@hubujiu/fan-poker-deck";
```

卡片数量根据 `<fan-card>` 自动计算，不需要额外设置。

## v0.2.0 新能力

- `theme="auto|light|dark"` 稳定主题模式
- `setCards()`、`appendCard()`、`updateCard()`、`removeCard()`、`clear()`
- `cardschange` 事件用于同步动态列表
- 更多 Shadow DOM `part`，支持 `::part()` 精细定制
- TypeScript 类型增强
- `custom-elements.json`，便于编辑器和组件工具识别
- Vue 与 React 接入示例

## 配置

| 属性 | 默认值 | 说明 |
|---|---:|---|
| `card-width` | `390px` | 卡片宽度，包含 CSS 单位 |
| `card-height` | `520px` | 卡片高度，包含 CSS 单位 |
| `start-index` | `0` | 初始卡片，下标从 0 开始 |
| `theme` | `auto` | `auto`、`light` 或 `dark` |
| `keyboard` | `true` | 方向键、PageUp、PageDown 与空格 |
| `wheel` | `true` | 鼠标滚轮切换 |
| `draggable` | `true` | 左右拖动切换 |

## 运行时卡片

```js
const deck = document.querySelector("fan-poker");

deck.setCards([
  { tag: "Docker", title: "检查服务", content: "确认 daemon 已启动。", symbol: "01" },
  { tag: "Docker", title: "运行容器", html: "<pre><code>docker run --rm hello-world</code></pre>", symbol: "02" }
]);

deck.appendCard({ tag: "Next", title: "Compose", content: "组织多容器应用。" });
deck.updateCard(0, { title: "服务状态" });
deck.removeCard(1);
```

动态 HTML 应只来自可信内容。

## 导航 API 与事件

```js
deck.next();
deck.previous();
deck.goTo(3);
deck.reset();

deck.addEventListener("cardchange", (event) => {
  console.log(event.detail.index);
});

deck.addEventListener("cardschange", (event) => {
  console.log(event.detail.cardCount);
});
```

## 样式定制

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

fan-poker::part(title) {
  letter-spacing: -0.02em;
}
```

## Vue 与 React

- Vue：[`examples/vue-example.vue`](./examples/vue-example.vue)
- React：[`examples/react-example.jsx`](./examples/react-example.jsx)

Vue + Vite 项目建议在编译配置中将 `fan-poker` 与 `fan-card` 标记为 Custom Elements。React 示例通过 `ref` 设置复杂的 `cards` 属性并监听原生事件。

## AI Skill

克隆仓库到 Agent 或 CLI 使用的 Skills 目录，然后描述主题：

```text
使用 fan-poker-teaching-skill，生成一份 Linux 部署 Docker 的交互式教学卡片。
```

Skill 默认生成简短的组件引入和卡片标签。明确要求完全离线单文件时，才使用传统内嵌模板。

## 开发

```bash
npm test
npm pack --dry-run
```

测试会检查源码与分发文件、主题和运行时 API、类型声明、Custom Elements Manifest、示例以及 npm 元数据。

## License

MIT © [Hubujiu](https://github.com/Hubujiu)
