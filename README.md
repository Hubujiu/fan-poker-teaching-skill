<div align="center">

# 🃏 Fan Poker Teaching Skill

**一行引入，把任意知识变成可点击、可拖动、会回到牌尾的教学卡片。**

零运行时依赖、支持 SSR 安全导入的 Web Component 与 AI Skill。

[![npm](https://img.shields.io/npm/v/%40hubujiu%2Ffan-poker-deck)](https://www.npmjs.com/package/@hubujiu/fan-poker-deck)
[![Validate](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml/badge.svg)](https://github.com/Hubujiu/fan-poker-teaching-skill/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[在线演示](https://hubujiu.github.io/fan-poker-teaching-skill/) · [API 合同](./docs/API.md) · [框架与 SSR](./docs/FRAMEWORKS.md) · [无障碍](./docs/ACCESSIBILITY.md) · [English](./README_EN.md)

</div>

## 快速开始

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.0/dist/fan-poker.js">
</script>

<fan-poker
  card-width="390px"
  card-height="520px"
  theme="auto"
  aria-label="Git 基础教学牌组">
  <fan-card tag="Git" title="工作区" symbol="01" accent="#f2a65a">
    工作区保存尚未提交的修改。
  </fan-card>

  <fan-card tag="Git" title="暂存区" symbol="02" accent="#7dcfb6">
    <p><code>git add</code> 将修改放入暂存区。</p>
    <pre><code>git add README.md</code></pre>
  </fan-card>
</fan-poker>
```

卡片数量根据 `<fan-card>` 自动计算。

## npm 使用

```bash
npm install @hubujiu/fan-poker-deck@1.0.0
```

```js
import "@hubujiu/fan-poker-deck";
```

也可以显式使用稳定导出：

```js
import {
  FanPokerElement,
  FanCardElement,
  defineFanPokerElements
} from "@hubujiu/fan-poker-deck";
```

该模块在 Node 和 SSR 环境中可安全导入。浏览器存在 `customElements` 时会自动注册；`defineFanPokerElements()` 可以安全重复调用。

## v1.0.0 稳定版

- 固定 `<fan-poker>` 与 `<fan-card>` 公共 API 合同
- Node / SSR 安全导入
- 显式导出两个元素类与幂等注册函数
- 当前卡片位置的屏幕阅读器播报
- `role`、`aria-roledescription`、`aria-keyshortcuts` 与活动卡片语义
- Node 20、22、24 测试矩阵
- Chromium 交互与无障碍烟雾测试
- 48 KiB 分发文件体积预算
- API、框架、无障碍与版本策略文档

## 配置

| 属性 | 默认值 | 说明 |
|---|---:|---|
| `card-width` | `390px` | 卡片宽度，包含 CSS 单位 |
| `card-height` | `520px` | 卡片高度，包含 CSS 单位 |
| `start-index` | `0` | 初始卡片，下标从 0 开始 |
| `theme` | `auto` | `auto`、`light` 或 `dark` |
| `keyboard` | `true` | 键盘切换 |
| `wheel` | `true` | 鼠标滚轮切换 |
| `draggable` | `true` | 左右拖动切换 |
| `aria-label` | 自动生成 | 牌组的无障碍名称 |

## 运行时 API

```js
const deck = document.querySelector("fan-poker");

deck.setCards([
  { tag: "Docker", title: "检查服务", content: "确认 daemon 已启动。" },
  { tag: "Docker", title: "运行容器", html: "<pre><code>docker run --rm hello-world</code></pre>" }
]);

deck.appendCard({ tag: "Next", title: "Compose", content: "组织多容器应用。" });
deck.updateCard(0, { title: "服务状态" });
deck.removeCard(1);

deck.next();
deck.previous();
deck.goTo(3);
deck.reset();
```

`html` 字段不会自动清洗，只能传入可信内容。普通文本优先使用 `content`。

## 事件

```js
deck.addEventListener("cardchange", (event) => {
  console.log(event.detail.index, event.detail.source);
});

deck.addEventListener("cardschange", (event) => {
  console.log(event.detail.cardCount);
});
```

完整字段见 [`docs/API.md`](./docs/API.md)。

## 样式定制

```css
fan-poker {
  --fan-card-width: 420px;
  --fan-card-height: 560px;
  --fan-radius: 18px;
}

fan-poker::part(title) {
  letter-spacing: -0.02em;
}
```

稳定 CSS Parts 包括 `stage`、`deck`、`card`、`cover`、`content`、`title`、`body`、`footer`、`status` 等。

## 框架接入

- Vue：[`examples/vue-example.vue`](./examples/vue-example.vue)
- React：[`examples/react-example.jsx`](./examples/react-example.jsx)
- SSR / Next.js：[`docs/FRAMEWORKS.md`](./docs/FRAMEWORKS.md)

## AI Skill

```text
使用 fan-poker-teaching-skill，生成一份 Linux 部署 Docker 的交互式教学卡片。
```

Skill 默认生成固定版本 CDN 与简短组件标签。明确要求完全离线单文件时，才使用传统内嵌模板。

## 开发与发布质量门

```bash
npm test
npm run test:browser
npm pack --dry-run
```

测试覆盖源码与分发一致性、稳定 API、Node/SSR 导入、类型声明、Custom Elements Manifest、包体积、示例和 Chromium 交互。

## License

MIT © [Hubujiu](https://github.com/Hubujiu)
