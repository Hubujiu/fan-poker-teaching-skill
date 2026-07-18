# Fan Poker Deck

一个零依赖 Web Component，用扑克牌式扇形动画承载**完全由使用者定义的卡片世界**。

从 v2 开始，组件不再强制封面、编号、标签、标题、正文或页脚。`<fan-poker>` 只维护卡片边界、圆角、牌堆排列、切牌动画和滚动协调；每个 `<fan-card>` 内部的 HTML 与 CSS 都会进入独立 Shadow Root。

## CDN

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@2.0.0/dist/fan-poker.js">
</script>
```

```html
<fan-poker card-width="390px" card-height="520px" aria-label="学习卡片">
  <fan-card aria-label="学习仪表盘">
    <style>
      :host {
        display: block;
        min-height: 100%;
        background: #fff8ed;
        color: #171717;
        font-family: system-ui, sans-serif;
      }

      main {
        min-width: 100%;
        min-height: 100%;
        padding: 28px;
      }
    </style>

    <main>
      <h1>整个卡面都由你决定</h1>
      <button>卡片内部按钮</button>
    </main>
  </fan-card>
</fan-poker>
```

## npm

```bash
npm install @hubujiu/fan-poker-deck@2.0.0
```

```js
import "@hubujiu/fan-poker-deck";
```

Node 与 SSR 环境可安全导入：

```js
import {
  FanPokerElement,
  FanCardElement,
  defineFanPokerElements
} from "@hubujiu/fan-poker-deck";
```

## v2 的卡片模型

- 每张卡片拥有独立 Shadow Root，卡片之间的 CSS 不会互相污染
- 用户 HTML 占据整个卡面，组件不插入固定标题区或正文区
- 内容超出边界时，卡片内部正常滚动
- 原生滚动条被隐藏，鼠标靠近右边缘或底边时显示浮动滚动条
- 横向溢出存在时，横拖优先滚动卡片内容，不会误触牌组切换
- 横向拖动方向与底部滑块一致
- 不显示组件焦点框
- 按钮、链接、表单、编辑器与嵌套组件可留在自己的卡片世界中

## 切牌

- 在没有横向溢出的当前卡片上左右拖动
- 点击露出的后方卡片
- 使用方向键、Page Up / Page Down、Home / End
- 调用 `next()`、`previous()` 或 `goTo(index)`

当前卡片存在横向溢出时，横拖属于卡片内部。此时可点击后方卡片、使用键盘或调用 API 切牌。

## JavaScript API

```js
const deck = document.querySelector("fan-poker");

deck.setCards([
  {
    label: "仪表盘",
    html: `
      <style>
        :host { display:block; min-height:100%; background:#111; color:white; }
        main { min-width:720px; min-height:100%; padding:24px; }
      </style>
      <main>完全自定义的横向画布</main>
    `
  },
  {
    label: "纯文本",
    content: "content 会按纯文本处理"
  }
]);

deck.appendCard({
  label: "新卡片",
  html: "<article>Runtime card</article>"
});

deck.goTo(1);
```

详见：

- [稳定 API](./docs/API.md)
- [无障碍与交互](./docs/ACCESSIBILITY.md)
- [框架接入](./docs/FRAMEWORKS.md)
- [v1 → v2 迁移](./docs/VERSIONING.md)

## 当前稳定版本：v2.0.0

v1.0.3 仍可用于依赖旧版固定卡面结构的页面：

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@hubujiu/fan-poker-deck@1.0.3/dist/fan-poker.js">
</script>
```

## License

MIT
