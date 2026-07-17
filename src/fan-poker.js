const STYLES = String.raw`
  :host {
    --fan-card-width: 390px;
    --fan-card-height: 520px;
    --fan-card-bg: #ffffff;
    --fan-text: #171717;
    --fan-muted: #737373;
    --fan-line: rgba(23, 23, 23, 0.15);
    --fan-accent: #e96d2f;
    --fan-radius: 24px;
    --fan-cover-text: #171717;
    display: block;
    min-width: 0;
    color: var(--fan-text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    outline: none;
  }

  :host([theme="light"]) {
    color-scheme: light;
    --fan-card-bg: #ffffff;
    --fan-text: #171717;
    --fan-muted: #737373;
    --fan-line: rgba(23, 23, 23, 0.15);
    --fan-cover-text: #171717;
  }

  :host([theme="dark"]) {
    color-scheme: dark;
    --fan-card-bg: #1b1b1b;
    --fan-text: #f3f3f3;
    --fan-muted: #b2b2b2;
    --fan-line: rgba(255, 255, 255, 0.14);
    --fan-cover-text: #171717;
  }

  :host(:focus-visible) .stage {
    outline: 2px solid color-mix(in srgb, var(--fan-accent) 65%, transparent);
    outline-offset: 4px;
    border-radius: calc(var(--fan-radius) + 4px);
  }

  *, *::before, *::after { box-sizing: border-box; }

  .stage {
    position: relative;
    margin: 0 auto;
    overflow: visible;
    perspective: 1600px;
    touch-action: pan-y;
    user-select: none;
    contain: layout style;
  }

  .deck {
    position: absolute;
    width: var(--fan-card-width);
    height: var(--fan-card-height);
    transform-origin: 0 0;
    transform-style: preserve-3d;
  }

  .card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--fan-line);
    border-radius: var(--fan-radius);
    background: var(--fan-card-bg);
    box-shadow: none;
    backface-visibility: hidden;
    transform-origin: 50% 112%;
    container-type: size;
    will-change: transform;
    isolation: isolate;
  }

  .card.is-current { cursor: grab; }
  .deck.is-dragging .card.is-current { cursor: grabbing; }

  .card-inner {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    pointer-events: none;
  }

  .card.is-current .card-inner { pointer-events: auto; }

  .card-cover {
    position: relative;
    flex: 0 1 41%;
    min-height: min(156px, 36%);
    padding: clamp(14px, 6cqh, 46px) clamp(14px, 7cqw, 54px);
    overflow: hidden;
    border-bottom: 1px solid var(--fan-line);
    background: var(--card-accent, #f2a65a);
    color: var(--fan-cover-text);
  }

  .card-index {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 38px;
    height: 38px;
    padding: 0 10px;
    border: 1px solid rgba(23, 23, 23, 0.18);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.84);
    color: #171717;
    font-size: 12px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .card-symbol {
    position: absolute;
    right: clamp(20px, 5cqw, 30px);
    bottom: clamp(12px, 3cqh, 20px);
    color: rgba(23, 23, 23, 0.74);
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(58px, 28cqh, 126px);
    line-height: 0.88;
  }

  .card-content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    padding: clamp(14px, 6cqh, 46px) clamp(14px, 7cqw, 54px) clamp(20px, 8cqh, 68px);
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
  }

  .card-tag {
    margin: 0 0 12px;
    color: var(--fan-accent);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-title {
    margin: 0;
    overflow-wrap: anywhere;
    font-size: clamp(18px, 9cqw, 42px);
    line-height: 1.12;
    letter-spacing: -0.04em;
  }

  .card-body {
    margin: 20px 0 0;
    overflow-wrap: anywhere;
    color: var(--fan-muted);
    font-size: clamp(11px, 3.8cqw, 15px);
    line-height: 1.75;
  }

  .card-body > :first-child { margin-top: 0; }
  .card-body > :last-child { margin-bottom: 0; }
  .card-body a { color: var(--fan-accent); }
  .card-body img { max-width: 100%; height: auto; border-radius: 12px; }
  .card-body pre {
    max-width: 100%;
    padding: 14px;
    overflow: auto;
    border: 1px solid var(--fan-line);
    border-radius: 12px;
    background: color-mix(in srgb, var(--fan-text) 6%, transparent);
    color: var(--fan-text);
    font-size: 0.88em;
    line-height: 1.65;
  }
  .card-body code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }

  .card-footer {
    margin-top: auto;
    padding-top: clamp(28px, 7cqh, 44px);
    color: var(--fan-muted);
    font-size: 12px;
  }

  .empty {
    width: min(100%, 460px);
    margin: 30px auto;
    padding: 24px;
    border: 1px dashed var(--fan-line);
    border-radius: var(--fan-radius);
    color: var(--fan-muted);
    text-align: center;
  }

  @media (max-width: 430px) {
    :host { --fan-radius: 20px; }
  }

  @media (prefers-color-scheme: dark) {
    :host(:not([theme="light"]):not([theme="dark"])) {
      color-scheme: dark;
      --fan-card-bg: #1b1b1b;
      --fan-text: #f3f3f3;
      --fan-muted: #b2b2b2;
      --fan-line: rgba(255, 255, 255, 0.14);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card { will-change: auto; }
  }
`;

const SPEED = Object.freeze({ normal: 620, fast: 360, turbo: 180 });
const TRUE_VALUES = new Set(["", "true", "1", "yes", "on"]);
const FALSE_VALUES = new Set(["false", "0", "no", "off"]);

function readBoolean(element, attribute, fallback = true) {
  if (!element.hasAttribute(attribute)) return fallback;
  const value = element.getAttribute(attribute)?.trim().toLowerCase() ?? "";
  if (FALSE_VALUES.has(value)) return false;
  if (TRUE_VALUES.has(value)) return true;
  return fallback;
}

function copySafeChildren(source, target) {
  for (const node of source.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") continue;
    const clone = node.cloneNode(true);
    if (clone.nodeType === Node.ELEMENT_NODE) {
      clone.querySelectorAll?.("script").forEach((script) => script.remove());
    }
    target.append(clone);
  }
}

function normalizeCardInput(card, index = 0) {
  if (card == null || typeof card !== "object") {
    throw new TypeError(`Card at index ${index} must be an object`);
  }
  return {
    tag: card.tag == null ? "Card" : String(card.tag),
    title: card.title == null ? `Card ${index + 1}` : String(card.title),
    symbol: card.symbol == null ? String(index + 1) : String(card.symbol),
    accent: card.accent == null ? "#f2a65a" : String(card.accent),
    content: card.content == null ? "" : String(card.content),
    html: card.html == null ? null : String(card.html)
  };
}

class FanCardElement extends HTMLElement {
  connectedCallback() {
    this.hidden = true;
  }
}

class FanPokerElement extends HTMLElement {
  static get observedAttributes() {
    return [
      "card-width",
      "card-height",
      "start-index",
      "keyboard",
      "wheel",
      "draggable",
      "theme",
      "aria-label"
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._cards = [];
    this._nodes = [];
    this._index = 0;
    this._queue = [];
    this._active = null;
    this._drag = null;
    this._frame = 0;
    this._resizeFrame = 0;
    this._mutationFrame = 0;
    this._lastIntent = 0;
    this._lastWheel = 0;
    this._blockClickUntil = 0;
    this._ready = false;
    this._suspendObserver = false;
    this._reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this._onResize = () => this._queueMeasure();
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector(".stage")) this._renderShell();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
    this.setAttribute("role", "region");
    this._syncLabel();
    this._syncConfig();
    this._bindEvents();
    this._observe();
    this._rebuild({ preserveIndex: false, emit: false });
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._frame);
    cancelAnimationFrame(this._resizeFrame);
    cancelAnimationFrame(this._mutationFrame);
    this._mutationObserver?.disconnect();
    this._resizeObserver?.disconnect();
    removeEventListener("resize", this._onResize);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) return;
    if (name === "aria-label") this._syncLabel();
    if (name === "start-index") this.reset();
    this._syncConfig();
    this._queueMeasure();
  }

  get currentIndex() {
    return this._index;
  }

  get cardCount() {
    return this._cards.length;
  }

  get cards() {
    return this._cards.map(({ element, ...card }) => ({ ...card }));
  }

  set cards(value) {
    this.setCards(value);
  }

  setCards(cards, options = {}) {
    if (!Array.isArray(cards)) throw new TypeError("fan-poker cards must be an array");
    const { preserveIndex = false } = options;
    const normalized = cards.map(normalizeCardInput);
    const fragment = document.createDocumentFragment();

    for (const card of normalized) fragment.append(this._createSourceCard(card));

    this._suspendObserver = true;
    this.replaceChildren(fragment);
    this._mutationObserver?.takeRecords();
    this._suspendObserver = false;
    this._rebuild({ preserveIndex, emit: true });
    return this;
  }

  appendCard(card) {
    const normalized = normalizeCardInput(card, this.cardCount);
    this._suspendObserver = true;
    this.append(this._createSourceCard(normalized));
    this._mutationObserver?.takeRecords();
    this._suspendObserver = false;
    this._rebuild({ preserveIndex: true, emit: true });
    return this.cardCount - 1;
  }

  updateCard(index, patch) {
    const normalizedIndex = this._normalizeExistingIndex(index);
    const target = this.querySelectorAll(":scope > fan-card")[normalizedIndex];
    if (!target || patch == null || typeof patch !== "object") return false;
    const current = this.cards[normalizedIndex];
    const merged = { ...current, ...patch };
    if (Object.hasOwn(patch, "content") && !Object.hasOwn(patch, "html")) merged.html = null;
    const next = normalizeCardInput(merged, normalizedIndex);

    this._suspendObserver = true;
    for (const key of ["tag", "title", "symbol", "accent"]) target.setAttribute(key, next[key]);
    if (next.html != null) {
      target.dataset.contentMode = "html";
      target.innerHTML = next.html;
    } else {
      target.dataset.contentMode = "text";
      target.textContent = next.content;
    }
    this._mutationObserver?.takeRecords();
    this._suspendObserver = false;
    this._rebuild({ preserveIndex: true, emit: true });
    return true;
  }

  removeCard(index) {
    const normalized = this._normalizeExistingIndex(index);
    const target = this.querySelectorAll(":scope > fan-card")[normalized];
    if (!target) return null;
    const removed = this.cards[normalized];
    this._suspendObserver = true;
    target.remove();
    this._mutationObserver?.takeRecords();
    this._suspendObserver = false;
    this._rebuild({ preserveIndex: true, emit: true });
    return removed;
  }

  clear() {
    this._suspendObserver = true;
    this.replaceChildren();
    this._mutationObserver?.takeRecords();
    this._suspendObserver = false;
    this._rebuild({ preserveIndex: false, emit: true });
    return this;
  }

  next() {
    return this._requestStep(1, "api");
  }

  previous() {
    return this._requestStep(-1, "api");
  }

  goTo(index) {
    if (this._cards.length < 2 || this._drag) return false;
    const target = this._mod(Number(index) || 0);
    this._queue.length = 0;
    if (this._active?.target === 1) this._active.ms = SPEED.turbo;
    const projected = this._projectedIndex();
    if (projected === target) return true;

    const forward = this._mod(target - projected);
    const backward = this._mod(projected - target);
    const direction = forward <= backward ? 1 : -1;
    const steps = direction > 0 ? forward : backward;
    for (let step = 0; step < steps; step += 1) {
      this._queue.push({ direction, ms: SPEED.turbo, source: "goto" });
    }
    if (!this._active) this._startNext();
    return true;
  }

  reset() {
    const target = this._normalizeStartIndex();
    if (this._ready) return this.goTo(target);
    this._index = target;
    return true;
  }

  _createSourceCard(card) {
    const element = document.createElement("fan-card");
    for (const key of ["tag", "title", "symbol", "accent"]) {
      element.setAttribute(key, card[key]);
    }
    if (card.html != null) {
      element.dataset.contentMode = "html";
      element.innerHTML = card.html;
    } else {
      element.dataset.contentMode = "text";
      element.textContent = card.content;
    }
    return element;
  }

  _renderShell() {
    this.shadowRoot.innerHTML = `
      <style>${STYLES}</style>
      <section class="stage" part="stage">
        <div class="deck" part="deck"></div>
        <div class="empty" part="empty" hidden>Add one or more &lt;fan-card&gt; elements.</div>
      </section>
    `;
    this._stage = this.shadowRoot.querySelector(".stage");
    this._deck = this.shadowRoot.querySelector(".deck");
    this._empty = this.shadowRoot.querySelector(".empty");
  }

  _syncLabel() {
    this.setAttribute("aria-label", this.getAttribute("aria-label") || "Interactive fan poker card deck");
  }

  _syncConfig() {
    const width = this.getAttribute("card-width") || "390px";
    const height = this.getAttribute("card-height") || "520px";
    this.style.setProperty("--fan-card-width", width);
    this.style.setProperty("--fan-card-height", height);
  }

  _bindEvents() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    this._stage.addEventListener("click", (event) => {
      this.focus({ preventScroll: true });
      if (performance.now() < this._blockClickUntil) return;
      const interactive = event.composedPath().some(
        (node) => node instanceof Element && node.matches?.("a, button, input, textarea, select")
      );
      if (!interactive) this._requestStep(1, "click");
    });

    this._stage.addEventListener(
      "wheel",
      (event) => {
        if (!readBoolean(this, "wheel", true)) return;
        event.preventDefault();
        const now = performance.now();
        if (Math.abs(event.deltaY) < 8 || now - this._lastWheel < 58) return;
        this._lastWheel = now;
        this._requestStep(event.deltaY > 0 ? 1 : -1, "wheel");
      },
      { passive: false }
    );

    this.addEventListener("keydown", (event) => {
      if (!readBoolean(this, "keyboard", true)) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        this._requestStep(1, "keyboard");
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        this._requestStep(-1, "keyboard");
      }
    });

    this._stage.addEventListener("pointerdown", (event) => {
      if (!readBoolean(this, "draggable", true)) return;
      const current = event.composedPath().find(
        (node) => node instanceof Element && node.classList?.contains("is-current")
      );
      if (!current || this._active || this._queue.length || this._cards.length < 2) return;
      this.focus({ preventScroll: true });
      current.setPointerCapture?.(event.pointerId);
      this._deck.classList.add("is-dragging");
      this._drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        lastX: event.clientX,
        lastTime: performance.now(),
        velocityX: 0,
        dx: 0,
        moved: false
      };
    });

    this._stage.addEventListener("pointermove", (event) => {
      const drag = this._drag;
      if (!drag || drag.pointerId !== event.pointerId) return;
      const now = performance.now();
      const elapsed = Math.max(8, now - drag.lastTime);
      drag.velocityX = drag.velocityX * 0.7 + ((event.clientX - drag.lastX) / elapsed) * 0.3;
      drag.lastX = event.clientX;
      drag.lastTime = now;
      drag.dx = event.clientX - drag.startX;
      drag.moved ||= Math.abs(drag.dx) > 4;
      const direction = drag.dx <= 0 ? 1 : -1;
      const progress = Math.min(1, Math.abs(drag.dx) / Math.max(1, this._cardWidth * 0.72));
      this._renderTransition(direction, progress);
    });

    const finishDrag = (event) => {
      const drag = this._drag;
      if (!drag || drag.pointerId !== event.pointerId) return;
      this._drag = null;
      this._deck.classList.remove("is-dragging");
      const direction = drag.dx <= 0 ? 1 : -1;
      const progress = Math.min(1, Math.abs(drag.dx) / Math.max(1, this._cardWidth * 0.72));
      const velocity = Math.abs(drag.velocityX);
      const commit = progress > 0.22 || velocity > 0.5;
      const duration = velocity > 1.15 ? SPEED.turbo : velocity > 0.62 ? SPEED.fast : commit ? SPEED.normal : 240;
      this._startFromProgress(direction, progress, commit ? 1 : 0, duration);
      if (drag.moved) this._blockClickUntil = performance.now() + 360;
    };

    this._stage.addEventListener("pointerup", finishDrag);
    this._stage.addEventListener("pointercancel", finishDrag);
    addEventListener("resize", this._onResize);
  }

  _observe() {
    this._mutationObserver?.disconnect();
    this._mutationObserver = new MutationObserver(() => {
      if (this._suspendObserver) return;
      cancelAnimationFrame(this._mutationFrame);
      this._mutationFrame = requestAnimationFrame(() => this._rebuild({ preserveIndex: true, emit: true }));
    });
    this._mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["tag", "title", "symbol", "accent"]
    });

    this._resizeObserver?.disconnect();
    if ("ResizeObserver" in window) {
      this._resizeObserver = new ResizeObserver(() => this._queueMeasure());
      this._resizeObserver.observe(this);
      this._resizeObserver.observe(this._deck);
    }
  }

  _collectCards() {
    return [...this.querySelectorAll(":scope > fan-card")].map((element, index) => ({
      element,
      tag: element.getAttribute("tag") || "Card",
      title: element.getAttribute("title") || `Card ${index + 1}`,
      symbol: element.getAttribute("symbol") || String(index + 1),
      accent: element.getAttribute("accent") || "#f2a65a",
      content: element.textContent || "",
      html: element.dataset.contentMode === "text" ? null : element.innerHTML
    }));
  }

  _rebuild({ preserveIndex = true, emit = false } = {}) {
    const previousCount = this._cards.length;
    const previousIndex = this._index;
    this._cards = this._collectCards();
    this._queue.length = 0;
    this._active = null;
    cancelAnimationFrame(this._frame);

    if (!preserveIndex) this._index = this._normalizeStartIndex();
    else if (this._cards.length) this._index = Math.min(this._index, this._cards.length - 1);
    else this._index = 0;

    this._deck.replaceChildren();
    this._nodes = this._cards.map((card, index) => this._createRenderedCard(card, index));
    this._deck.append(...this._nodes);
    this._empty.hidden = this._cards.length > 0;
    this._deck.hidden = this._cards.length === 0;
    this._queueMeasure();
    this._renderRest();

    if (!this._ready) {
      this._ready = true;
      queueMicrotask(() => {
        this.dispatchEvent(
          new CustomEvent("ready", {
            bubbles: true,
            composed: true,
            detail: { index: this._index, cardCount: this.cardCount }
          })
        );
      });
    }

    if (emit) {
      this.dispatchEvent(
        new CustomEvent("cardschange", {
          bubbles: true,
          composed: true,
          detail: {
            cardCount: this.cardCount,
            previousCardCount: previousCount,
            index: this._index,
            previousIndex
          }
        })
      );
    }
  }

  _createRenderedCard(card, index) {
    const article = document.createElement("article");
    article.className = "card";
    article.setAttribute("part", "card");
    article.dataset.sourceIndex = String(index);
    article.style.setProperty("--card-accent", card.accent);
    article.innerHTML = `
      <div class="card-inner" part="inner">
        <header class="card-cover" part="cover">
          <span class="card-index" part="index">${String(index + 1).padStart(2, "0")}</span>
          <span class="card-symbol" part="symbol"></span>
        </header>
        <section class="card-content" part="content">
          <p class="card-tag" part="tag"></p>
          <h2 class="card-title" part="title"></h2>
          <div class="card-body" part="body"></div>
          <div class="card-footer" part="footer">Click, drag, wheel, or use the keyboard.</div>
        </section>
      </div>
    `;
    article.querySelector(".card-symbol").textContent = card.symbol;
    article.querySelector(".card-tag").textContent = card.tag;
    article.querySelector(".card-title").textContent = card.title;
    copySafeChildren(card.element, article.querySelector(".card-body"));
    return article;
  }

  _queueMeasure() {
    cancelAnimationFrame(this._resizeFrame);
    this._resizeFrame = requestAnimationFrame(() => this._measure());
  }

  _measure() {
    const hostWidth = Math.max(1, this.clientWidth || this.parentElement?.clientWidth || 390);
    const css = getComputedStyle(this);
    const desiredWidth = parseFloat(css.getPropertyValue("--fan-card-width")) || 390;
    const desiredHeight = parseFloat(css.getPropertyValue("--fan-card-height")) || 520;
    const fanAllowance = Math.min(104, Math.max(34, desiredWidth * 0.22));
    const scale = Math.min(1, Math.max(0.36, (hostWidth - 8) / (desiredWidth + fanAllowance)));
    this._cardWidth = desiredWidth;
    this._cardHeight = desiredHeight;
    this._scale = scale;
    this._deck.style.transform = `scale(${scale})`;
    this._stage.style.width = `${Math.min(hostWidth, (desiredWidth + fanAllowance) * scale)}px`;
    this._stage.style.height = `${(desiredHeight + 84) * scale}px`;
    this._renderRest();
  }

  _normalizeStartIndex() {
    if (!this._cards.length) return 0;
    return this._mod(Number.parseInt(this.getAttribute("start-index") || "0", 10) || 0);
  }

  _normalizeExistingIndex(index) {
    if (!this._cards.length) return -1;
    const number = Number(index);
    if (!Number.isFinite(number)) return -1;
    const integer = Math.trunc(number);
    if (integer < 0 || integer >= this._cards.length) return -1;
    return integer;
  }

  _mod(value) {
    const count = this._cards.length;
    return count ? ((value % count) + count) % count : 0;
  }

  _offsetFor(sourceIndex, index = this._index) {
    return this._mod(sourceIndex - index);
  }

  _fanPose(offset) {
    const visibleOffset = Math.min(offset, 8);
    const x = Math.min(92, visibleOffset * 14);
    const y = Math.min(26, visibleOffset * 3.2);
    const rotation = Math.min(13, visibleOffset * 1.65);
    const scale = Math.max(0.86, 1 - visibleOffset * 0.018);
    const z = -visibleOffset * 22;
    return { x, y, rotation, scale, z };
  }

  _outgoingPose(progress, direction) {
    const width = this._cardWidth || 390;
    const height = this._cardHeight || 520;
    if (direction > 0) {
      if (progress < 0.48) {
        const p = progress / 0.48;
        return {
          x: -width * 0.64 * this._easeOut(p),
          y: height * 0.08 * p,
          rotation: -19 * p,
          scale: 1 - 0.02 * p,
          z: 80 * p
        };
      }
      const p = (progress - 0.48) / 0.52;
      const back = this._fanPose(Math.max(1, this._cards.length - 1));
      return {
        x: this._lerp(-width * 0.64, back.x, this._easeInOut(p)),
        y: this._lerp(height * 0.08, back.y, this._easeInOut(p)),
        rotation: this._lerp(-19, back.rotation, this._easeInOut(p)),
        scale: this._lerp(0.98, back.scale, this._easeInOut(p)),
        z: this._lerp(80, back.z, p)
      };
    }

    const back = this._fanPose(Math.max(1, this._cards.length - 1));
    if (progress < 0.52) {
      const p = progress / 0.52;
      return {
        x: this._lerp(back.x, -width * 0.62, this._easeInOut(p)),
        y: this._lerp(back.y, height * 0.07, this._easeInOut(p)),
        rotation: this._lerp(back.rotation, -18, this._easeInOut(p)),
        scale: this._lerp(back.scale, 0.98, this._easeInOut(p)),
        z: this._lerp(back.z, 72, p)
      };
    }
    const p = (progress - 0.52) / 0.48;
    return {
      x: this._lerp(-width * 0.62, 0, this._easeOut(p)),
      y: this._lerp(height * 0.07, 0, this._easeOut(p)),
      rotation: this._lerp(-18, 0, this._easeOut(p)),
      scale: this._lerp(0.98, 1, p),
      z: this._lerp(72, 0, p)
    };
  }

  _setPose(node, pose, offset, current = false) {
    node.style.transform = `translate3d(${pose.x}px, ${pose.y}px, ${pose.z}px) rotate(${pose.rotation}deg) scale(${pose.scale})`;
    node.style.zIndex = String(1000 - Math.min(offset, 999));
    node.style.opacity = offset > 16 ? "0" : "1";
    node.style.pointerEvents = current ? "auto" : "none";
    node.classList.toggle("is-current", current);
    node.setAttribute("aria-hidden", current ? "false" : "true");
  }

  _renderRest() {
    if (!this._nodes.length || this._active || this._drag) return;
    this._nodes.forEach((node, sourceIndex) => {
      const offset = this._offsetFor(sourceIndex);
      this._setPose(node, this._fanPose(offset), offset, offset === 0);
    });
  }

  _renderTransition(direction, progress) {
    const count = this._cards.length;
    if (count < 2) return;
    const clamped = Math.max(0, Math.min(1, progress));
    const currentIndex = this._index;
    const incomingIndex = direction > 0 ? this._mod(currentIndex + 1) : this._mod(currentIndex - 1);

    this._nodes.forEach((node, sourceIndex) => {
      const oldOffset = this._offsetFor(sourceIndex, currentIndex);
      let newOffset;
      if (direction > 0) newOffset = oldOffset === 0 ? count - 1 : oldOffset - 1;
      else newOffset = sourceIndex === incomingIndex ? 0 : oldOffset + 1;

      let pose;
      if ((direction > 0 && oldOffset === 0) || (direction < 0 && sourceIndex === incomingIndex)) {
        pose = this._outgoingPose(clamped, direction);
      } else {
        const from = this._fanPose(oldOffset);
        const to = this._fanPose(newOffset);
        const eased = this._easeInOut(clamped);
        pose = {
          x: this._lerp(from.x, to.x, eased),
          y: this._lerp(from.y, to.y, eased),
          rotation: this._lerp(from.rotation, to.rotation, eased),
          scale: this._lerp(from.scale, to.scale, eased),
          z: this._lerp(from.z, to.z, eased)
        };
      }

      const effectiveOffset = Math.round(this._lerp(oldOffset, newOffset, clamped));
      const current = clamped < 0.5 ? oldOffset === 0 : newOffset === 0;
      this._setPose(node, pose, effectiveOffset, current);
    });
  }

  _requestStep(direction, source) {
    if (this._cards.length < 2 || this._drag) return false;
    const now = performance.now();
    const gap = now - this._lastIntent;
    this._lastIntent = now;
    const ms = gap < 130 ? SPEED.turbo : gap < 280 ? SPEED.fast : SPEED.normal;
    if (this._active) this._active.ms = Math.min(this._active.ms, ms);
    this._queue.push({ direction: direction > 0 ? 1 : -1, ms, source });
    if (!this._active) this._startNext();
    return true;
  }

  _projectedIndex() {
    let index = this._index;
    if (this._active?.target === 1) index = this._mod(index + this._active.direction);
    for (const item of this._queue) index = this._mod(index + item.direction);
    return index;
  }

  _startNext() {
    if (this._active || !this._queue.length) return;
    const item = this._queue.shift();
    this._startAnimation({ ...item, from: 0, target: 1 });
  }

  _startFromProgress(direction, from, target, ms) {
    this._startAnimation({ direction, from, target, ms, source: "drag" });
  }

  _startAnimation({ direction, from, target, ms, source }) {
    if (this._reducedMotion) ms = 1;
    const previousIndex = this._index;
    this._active = { direction, from, target, ms, source, started: performance.now() };
    this.dispatchEvent(
      new CustomEvent("cardchangestart", {
        bubbles: true,
        composed: true,
        detail: {
          index: target === 1 ? this._mod(this._index + direction) : this._index,
          previousIndex,
          cardCount: this.cardCount,
          direction: direction > 0 ? "next" : "previous",
          source
        }
      })
    );

    const tick = (now) => {
      const active = this._active;
      if (!active) return;
      const elapsed = Math.max(0, now - active.started);
      const fraction = Math.min(1, elapsed / Math.max(1, active.ms));
      const progress = this._lerp(active.from, active.target, this._easeInOut(fraction));
      this._renderTransition(active.direction, progress);
      if (fraction < 1) {
        this._frame = requestAnimationFrame(tick);
        return;
      }

      const committed = active.target === 1;
      const oldIndex = this._index;
      if (committed) this._index = this._mod(this._index + active.direction);
      this._active = null;
      this._renderRest();

      if (committed) {
        this.dispatchEvent(
          new CustomEvent("cardchange", {
            bubbles: true,
            composed: true,
            detail: {
              index: this._index,
              previousIndex: oldIndex,
              cardCount: this.cardCount,
              direction: active.direction > 0 ? "next" : "previous",
              source: active.source
            }
          })
        );
      }
      this._startNext();
    };

    this._frame = requestAnimationFrame(tick);
  }

  _lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  _easeInOut(value) {
    return value < 0.5 ? 2 * value * value : 1 - ((-2 * value + 2) ** 2) / 2;
  }

  _easeOut(value) {
    return 1 - (1 - value) ** 3;
  }
}

if (!customElements.get("fan-card")) customElements.define("fan-card", FanCardElement);
if (!customElements.get("fan-poker")) customElements.define("fan-poker", FanPokerElement);

export { FanCardElement, FanPokerElement };
