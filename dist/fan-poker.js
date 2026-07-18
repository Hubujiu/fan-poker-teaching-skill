const DECK_STYLES = String.raw`
  :host {
    --fan-card-width: 390px;
    --fan-card-height: 520px;
    --fan-card-radius: 24px;
    --fan-card-line: rgba(23, 23, 23, 0.15);
    --fan-card-background: #ffffff;
    --fan-offset-x: 28px;
    --fan-offset-y: 6px;
    --fan-rotation: 2.1deg;
    --fan-motion-normal: 520ms;
    --fan-motion-fast: 300ms;
    --fan-motion-turbo: 180ms;
    --fan-scrollbar-accent: #e96d2f;
    --fan-scrollbar-track: rgba(255, 255, 255, 0.22);
    --fan-scrollbar-thumb: rgba(24, 24, 24, 0.58);
    --fan-scrollbar-size: 12px;
    display: block;
    min-width: 0;
    outline: none;
    color: inherit;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  :host(:focus),
  :host(:focus-visible) {
    outline: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .stage {
    position: relative;
    width: 100%;
    min-width: 0;
    overflow: visible;
    perspective: 1700px;
    contain: layout style;
    user-select: none;
  }

  .deck {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--fan-card-width);
    height: var(--fan-card-height);
    transform-style: preserve-3d;
  }

  .card {
    position: absolute;
    inset: 0;
    width: var(--fan-card-width);
    height: var(--fan-card-height);
    overflow: hidden;
    border: 1px solid var(--fan-card-line);
    border-radius: var(--fan-card-radius);
    background: var(--fan-card-background);
    box-shadow: none;
    transform-origin: 50% 112%;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    isolation: isolate;
    will-change: transform;
    transition:
      transform var(--fan-motion-normal) cubic-bezier(.22, 1, .36, 1),
      opacity 180ms ease;
  }

  .card.is-current {
    cursor: grab;
  }

  .card.is-deck-dragging {
    cursor: grabbing;
    transition: none;
  }

  .card.is-leaving {
    pointer-events: none;
    transition: transform var(--fan-motion-fast) cubic-bezier(.4, 0, .6, 1);
  }

  .card:not(.is-current) .world-host {
    pointer-events: none;
  }

  .world-host {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: inherit;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .empty {
    width: min(100%, 430px);
    padding: 24px;
    border: 1px dashed var(--fan-card-line);
    border-radius: var(--fan-card-radius);
    background: var(--fan-card-background);
    color: color-mix(in srgb, currentColor 62%, transparent);
    text-align: center;
  }

  @media (max-width: 620px) {
    .card {
      transform-origin: 50% 108%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card {
      transition-duration: 1ms !important;
      will-change: auto;
    }
  }
`;

const WORLD_STYLES = String.raw`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    color: inherit;
    font: inherit;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .world-shell {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border-radius: inherit;
  }

  .world-scroll {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
    touch-action: pan-x pan-y;
  }

  .world-scroll::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .world-canvas {
    display: inline-block;
    min-width: 100%;
    min-height: 100%;
    vertical-align: top;
  }

  .world-canvas > :only-child {
    min-width: 100%;
    min-height: 100%;
  }

  .world-scroll.has-horizontal-overflow {
    cursor: grab;
  }

  .world-shell.panning-x {
    user-select: none;
  }

  .world-shell.panning-x .world-scroll {
    cursor: grabbing;
  }

  .floating-scrollbar {
    position: absolute;
    z-index: 40;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.52);
    border-radius: 999px;
    background: var(--fan-scrollbar-track);
    box-shadow:
      0 5px 18px rgba(0, 0, 0, 0.13),
      inset 0 0 0 1px rgba(20, 20, 20, 0.08);
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    transition:
      opacity 160ms ease,
      transform 220ms cubic-bezier(.22, 1, .36, 1);
  }

  .floating-scrollbar.vertical {
    top: 12px;
    right: 7px;
    bottom: 12px;
    width: var(--fan-scrollbar-size);
    transform: translateX(15px) scaleX(.78);
  }

  .floating-scrollbar.horizontal {
    right: 12px;
    bottom: 7px;
    left: 12px;
    height: var(--fan-scrollbar-size);
    transform: translateY(15px) scaleY(.78);
  }

  .world-shell.show-y .floating-scrollbar.vertical.has-overflow,
  .world-shell.dragging-y .floating-scrollbar.vertical.has-overflow,
  .world-shell.scrolling-y .floating-scrollbar.vertical.has-overflow {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0) scaleX(1);
  }

  .world-shell.show-x .floating-scrollbar.horizontal.has-overflow,
  .world-shell.dragging-x .floating-scrollbar.horizontal.has-overflow,
  .world-shell.panning-x .floating-scrollbar.horizontal.has-overflow,
  .world-shell.scrolling-x .floating-scrollbar.horizontal.has-overflow {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0) scaleY(1);
  }

  .scroll-thumb {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: inherit;
    background: var(--fan-scrollbar-thumb);
    box-shadow:
      0 2px 7px rgba(0, 0, 0, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.22);
    cursor: grab;
    transition:
      background-color 140ms ease,
      box-shadow 140ms ease;
  }

  .vertical .scroll-thumb {
    top: 1px;
    left: 2px;
    width: calc(var(--fan-scrollbar-size) - 6px);
    min-height: 42px;
  }

  .horizontal .scroll-thumb {
    top: 2px;
    left: 0;
    height: calc(var(--fan-scrollbar-size) - 6px);
    min-width: 42px;
  }

  .scroll-thumb:hover {
    background: color-mix(in srgb, var(--fan-scrollbar-thumb) 82%, #000);
    box-shadow:
      0 3px 9px rgba(0, 0, 0, 0.27),
      inset 0 1px 0 rgba(255, 255, 255, 0.28);
  }

  .world-shell.dragging-y .vertical .scroll-thumb,
  .world-shell.dragging-x .horizontal .scroll-thumb,
  .world-shell.panning-x .horizontal .scroll-thumb {
    cursor: grabbing;
    background: var(--fan-scrollbar-accent);
    box-shadow:
      0 4px 12px color-mix(in srgb, var(--fan-scrollbar-accent) 32%, transparent),
      inset 0 1px 0 rgba(255, 255, 255, 0.34);
  }

  @media (hover: none) {
    .floating-scrollbar.vertical {
      right: 5px;
    }

    .floating-scrollbar.horizontal {
      bottom: 5px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .floating-scrollbar {
      transition-duration: 1ms;
    }
  }
`;

const HTMLElementBase = globalThis.HTMLElement ?? class {};
const SPEED = Object.freeze({ normal: 520, fast: 300, turbo: 180 });
const TRUE_VALUES = new Set(["", "true", "1", "yes", "on"]);
const FALSE_VALUES = new Set(["false", "0", "no", "off"]);
const INTERACTIVE_SELECTOR =
  "button, a, input, textarea, select, summary, [contenteditable='true'], " +
  "[data-fan-interactive], .floating-scrollbar, .scroll-thumb";

function readBoolean(element, attribute, fallback = true) {
  if (!element.hasAttribute(attribute)) return fallback;
  const value = element.getAttribute(attribute)?.trim().toLowerCase() ?? "";
  if (FALSE_VALUES.has(value)) return false;
  if (TRUE_VALUES.has(value)) return true;
  return fallback;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeCardInput(card, index = 0) {
  if (card == null || typeof card !== "object") {
    throw new TypeError(`Card at index ${index} must be an object`);
  }

  const label = card.label ?? card.title ?? `Card ${index + 1}`;
  const html = card.html != null ? String(card.html) : escapeHtml(card.content ?? "");

  return {
    label: String(label),
    html
  };
}

function copySafeWorld(source, target) {
  const template = document.createElement("template");
  template.innerHTML = source.innerHTML;
  template.content.querySelectorAll("script").forEach((script) => script.remove());
  target.append(template.content.cloneNode(true));
}

export class FanCardElement extends HTMLElementBase {
  connectedCallback() {
    this.hidden = true;
  }
}

export class FanPokerElement extends HTMLElementBase {
  static get observedAttributes() {
    return [
      "card-width",
      "card-height",
      "start-index",
      "keyboard",
      "draggable",
      "fan-offset",
      "aria-label"
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._cards = [];
    this._index = 0;
    this._queue = [];
    this._active = null;
    this._drag = null;
    this._blockClickUntil = 0;
    this._ready = false;
    this._eventsBound = false;
    this._suspendObserver = false;
    this._resizeFrame = 0;
    this._mutationFrame = 0;
    this._reducedMotion =
      globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    this._onResize = () => this._queueMeasure();
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector(".stage")) this._renderShell();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;

    this.setAttribute("role", "region");
    this.setAttribute("aria-roledescription", "interactive card deck");
    this.setAttribute(
      "aria-keyshortcuts",
      "ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Home End"
    );

    this._syncLabel();
    this._syncConfig();
    this._bindEvents();
    this._observe();
    this._rebuild({ preserveIndex: false, emit: false });
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._resizeFrame);
    cancelAnimationFrame(this._mutationFrame);
    this._mutationObserver?.disconnect();
    this._resizeObserver?.disconnect();
    removeEventListener("resize", this._onResize);
    this._destroyRenderedCards();
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
    return [...this.querySelectorAll(":scope > fan-card")].map((source, index) => ({
      label:
        source.getAttribute("aria-label") ||
        source.getAttribute("title") ||
        `Card ${index + 1}`,
      html: source.innerHTML
    }));
  }

  set cards(value) {
    this.setCards(value);
  }

  setCards(cards, options = {}) {
    if (!Array.isArray(cards)) {
      throw new TypeError("fan-poker cards must be an array");
    }

    const { preserveIndex = false } = options;
    const fragment = document.createDocumentFragment();

    cards
      .map(normalizeCardInput)
      .forEach((card) => fragment.append(this._createSourceCard(card)));

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

    if (Object.hasOwn(patch, "content") && !Object.hasOwn(patch, "html")) {
      merged.html = escapeHtml(patch.content ?? "");
    }

    const next = normalizeCardInput(merged, normalizedIndex);

    this._suspendObserver = true;
    target.setAttribute("aria-label", next.label);
    target.innerHTML = next.html;
    this._mutationObserver?.takeRecords();
    this._suspendObserver = false;
    this._rebuild({ preserveIndex: true, emit: true });

    return true;
  }

  removeCard(index) {
    const normalizedIndex = this._normalizeExistingIndex(index);
    const target = this.querySelectorAll(":scope > fan-card")[normalizedIndex];

    if (!target) return null;

    const removed = this.cards[normalizedIndex];

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
    if (this.cardCount < 2 || this._drag) return false;

    const target = this._mod(Number(index) || 0);
    const projected = this._projectedIndex();

    if (projected === target) return true;

    this._queue.length = 0;

    const forward = this._mod(target - projected);
    const backward = this._mod(projected - target);
    const direction = forward <= backward ? 1 : -1;
    const steps = direction > 0 ? forward : backward;

    for (let step = 0; step < steps; step += 1) {
      this._queue.push({ direction, source: "goto", ms: SPEED.turbo });
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
    element.setAttribute("aria-label", card.label);
    element.innerHTML = card.html;
    return element;
  }

  _renderShell() {
    this.shadowRoot.innerHTML = `
      <style>${DECK_STYLES}</style>
      <section class="stage" part="stage">
        <div class="deck" part="deck"></div>
        <div class="sr-only" part="status" aria-live="polite" aria-atomic="true"></div>
        <div class="empty" part="empty" hidden>Add one or more &lt;fan-card&gt; elements.</div>
      </section>
    `;

    this._stage = this.shadowRoot.querySelector(".stage");
    this._deck = this.shadowRoot.querySelector(".deck");
    this._status = this.shadowRoot.querySelector(".sr-only");
    this._empty = this.shadowRoot.querySelector(".empty");
  }

  _syncLabel() {
    if (!this.getAttribute("aria-label")) {
      this.setAttribute("aria-label", "Interactive fan poker card deck");
    }
  }

  _syncConfig() {
    this.style.setProperty(
      "--fan-card-width",
      this.getAttribute("card-width") || "390px"
    );
    this.style.setProperty(
      "--fan-card-height",
      this.getAttribute("card-height") || "520px"
    );

    const offset = this.getAttribute("fan-offset");
    if (offset) this.style.setProperty("--fan-offset-x", offset);
  }

  _bindEvents() {
    if (this._eventsBound) return;
    this._eventsBound = true;

    this._stage.addEventListener("click", (event) => {
      if (performance.now() < this._blockClickUntil) return;

      const path = event.composedPath();
      const card = path.find(
        (node) =>
          node instanceof Element &&
          node.classList?.contains("card")
      );

      if (!card || card.classList.contains("is-current")) return;

      this.goTo(Number(card.dataset.index));
    });

    this.addEventListener("keydown", (event) => {
      if (!readBoolean(this, "keyboard", true)) return;

      if (["ArrowRight", "ArrowDown", "PageDown"].includes(event.key)) {
        event.preventDefault();
        this._requestStep(1, "keyboard");
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        this._requestStep(-1, "keyboard");
      } else if (event.key === "Home") {
        event.preventDefault();
        this.goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        this.goTo(Math.max(0, this.cardCount - 1));
      }
    });

    const finishDrag = (event, cancelled = false) => {
      const drag = this._drag;
      if (!drag || drag.pointerId !== event.pointerId) return;

      this._drag = null;
      drag.card.classList.remove("is-deck-dragging");

      if (drag.card.hasPointerCapture?.(drag.pointerId)) {
        drag.card.releasePointerCapture(drag.pointerId);
      }

      const committed =
        !cancelled &&
        drag.horizontal &&
        Math.abs(drag.dx) >= Math.max(54, this._cardWidth * 0.17);

      if (drag.horizontal) {
        this._blockClickUntil = performance.now() + 360;
      }

      this._renderRest();

      if (committed) {
        this._requestStep(drag.dx < 0 ? 1 : -1, "drag");
      }
    };

    this._stage.addEventListener("pointerdown", (event) => {
      if (!readBoolean(this, "draggable", true) || !event.isPrimary) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (this._active || this._queue.length || this.cardCount < 2) return;

      const path = event.composedPath();
      const current = path.find(
        (node) =>
          node instanceof Element &&
          node.classList?.contains("card") &&
          node.classList.contains("is-current")
      );

      if (!current) return;

      const interactive = path.some(
        (node) =>
          node instanceof Element &&
          node.matches?.(INTERACTIVE_SELECTOR)
      );

      const horizontalWorld = path.find(
        (node) =>
          node instanceof HTMLElement &&
          node.classList?.contains("world-scroll") &&
          node.scrollWidth > node.clientWidth + 1
      );

      if (interactive || horizontalWorld) return;

      this._drag = {
        pointerId: event.pointerId,
        card: current,
        startX: event.clientX,
        startY: event.clientY,
        dx: 0,
        horizontal: false
      };
    });

    this._stage.addEventListener(
      "pointermove",
      (event) => {
        const drag = this._drag;
        if (!drag || drag.pointerId !== event.pointerId) return;

        if (event.pointerType === "mouse" && event.buttons === 0) {
          finishDrag(event, true);
          return;
        }

        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;

        if (!drag.horizontal) {
          if (Math.abs(dx) < 8) return;
          if (Math.abs(dx) <= Math.abs(dy) + 5) return;

          drag.horizontal = true;
          drag.card.classList.add("is-deck-dragging");
          drag.card.setPointerCapture?.(event.pointerId);
        }

        drag.dx = dx;

        const baseX = Number(drag.card.dataset.baseX || 0);
        const baseY = Number(drag.card.dataset.baseY || 0);
        const baseR = Number(drag.card.dataset.baseR || 0);
        const baseS = Number(drag.card.dataset.baseS || 1);

        drag.card.style.transform = `
          translate3d(${baseX + dx}px, ${baseY + Math.abs(dx) * 0.045}px, 0)
          rotate(${baseR + dx * 0.035}deg)
          scale(${baseS})
        `;

        event.preventDefault();
      },
      { passive: false }
    );

    this._stage.addEventListener("pointerup", (event) => finishDrag(event));
    this._stage.addEventListener("pointercancel", (event) => finishDrag(event, true));
    this._stage.addEventListener("lostpointercapture", (event) => finishDrag(event, true));
  }

  _observe() {
    if (!this._mutationObserver) {
      this._mutationObserver = new MutationObserver(() => {
        if (this._suspendObserver) return;
        cancelAnimationFrame(this._mutationFrame);
        this._mutationFrame = requestAnimationFrame(() => {
          this._rebuild({ preserveIndex: true, emit: true });
        });
      });
    }

    this._mutationObserver.disconnect();
    this._mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    if (!this._resizeObserver && globalThis.ResizeObserver) {
      this._resizeObserver = new ResizeObserver(this._onResize);
    }

    this._resizeObserver?.disconnect();
    this._resizeObserver?.observe(this);
    addEventListener("resize", this._onResize);
  }

  _rebuild({ preserveIndex, emit }) {
    const previousCount = this.cardCount;
    const previousIndex = this._index;
    const sources = [...this.querySelectorAll(":scope > fan-card")];

    this._queue.length = 0;
    this._active = null;
    this._drag = null;
    this._destroyRenderedCards();
    this._deck.replaceChildren();

    this._cards = sources.map((source, index) =>
      this._createRenderedCard(source, index, sources.length)
    );

    this._cards.forEach(({ element }) => this._deck.append(element));
    this._empty.hidden = this.cardCount > 0;

    if (this.cardCount === 0) {
      this._index = 0;
      this._status.textContent = "";
      this._queueMeasure();
    } else {
      this._index = preserveIndex
        ? Math.min(previousIndex, this.cardCount - 1)
        : this._normalizeStartIndex();

      this._renderRest();
      this._announce();
      this._queueMeasure();
    }

    if (!this._ready) {
      this._ready = true;
      queueMicrotask(() => {
        this.dispatchEvent(
          new CustomEvent("ready", {
            detail: { index: this._index, cardCount: this.cardCount }
          })
        );
      });
    }

    if (emit) {
      this.dispatchEvent(
        new CustomEvent("cardschange", {
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

  _createRenderedCard(source, index, total) {
    const element = document.createElement("article");
    const label =
      source.getAttribute("aria-label") ||
      source.getAttribute("title") ||
      `Card ${index + 1}`;

    element.className = "card";
    element.dataset.index = String(index);
    element.setAttribute("part", "card");
    element.setAttribute("role", "group");
    element.setAttribute("aria-roledescription", "card");
    element.setAttribute("aria-label", `${label}, ${index + 1} of ${total}`);

    const worldHost = document.createElement("div");
    worldHost.className = "world-host";
    worldHost.setAttribute("part", "world");
    worldHost.setAttribute(
      "exportparts",
      "vertical-scrollbar,horizontal-scrollbar,vertical-thumb,horizontal-thumb"
    );

    const worldRoot = worldHost.attachShadow({ mode: "open" });
    worldRoot.innerHTML = `
      <style>${WORLD_STYLES}</style>
      <div class="world-shell">
        <div class="world-scroll">
          <div class="world-canvas"></div>
        </div>
        <div class="floating-scrollbar vertical" part="vertical-scrollbar" aria-hidden="true">
          <div class="scroll-thumb" part="vertical-thumb"></div>
        </div>
        <div class="floating-scrollbar horizontal" part="horizontal-scrollbar" aria-hidden="true">
          <div class="scroll-thumb" part="horizontal-thumb"></div>
        </div>
      </div>
    `;

    const shell = worldRoot.querySelector(".world-shell");
    const scroll = worldRoot.querySelector(".world-scroll");
    const canvas = worldRoot.querySelector(".world-canvas");
    const vertical = worldRoot.querySelector(".floating-scrollbar.vertical");
    const horizontal = worldRoot.querySelector(".floating-scrollbar.horizontal");

    copySafeWorld(source, canvas);

    const cleanup = this._installFloatingScrollbars(
      shell,
      scroll,
      vertical,
      horizontal
    );

    element.append(worldHost);

    return {
      source,
      element,
      worldHost,
      label,
      cleanup
    };
  }

  _installFloatingScrollbars(shell, scroll, vertical, horizontal) {
    const verticalThumb = vertical.querySelector(".scroll-thumb");
    const horizontalThumb = horizontal.querySelector(".scroll-thumb");
    const controller = new AbortController();
    const { signal } = controller;

    const state = {
      previousTop: scroll.scrollTop,
      previousLeft: scroll.scrollLeft,
      hideY: 0,
      hideX: 0,
      frame: 0,
      thumbDrag: null,
      contentPan: null
    };

    const clearTimer = (axis) => {
      const key = axis === "y" ? "hideY" : "hideX";
      clearTimeout(state[key]);
      state[key] = 0;
    };

    const scheduleHide = (axis, delay = 760) => {
      clearTimer(axis);
      const key = axis === "y" ? "hideY" : "hideX";
      const className = axis === "y" ? "scrolling-y" : "scrolling-x";

      state[key] = setTimeout(() => {
        shell.classList.remove(className);
      }, delay);
    };

    const update = () => {
      state.frame = 0;

      const maxY = Math.max(0, scroll.scrollHeight - scroll.clientHeight);
      const maxX = Math.max(0, scroll.scrollWidth - scroll.clientWidth);
      const hasY = maxY > 1;
      const hasX = maxX > 1;

      vertical.classList.toggle("has-overflow", hasY);
      horizontal.classList.toggle("has-overflow", hasX);
      scroll.classList.toggle("has-horizontal-overflow", hasX);

      if (!hasY) {
        shell.classList.remove("show-y", "scrolling-y", "dragging-y");
      }

      if (!hasX) {
        shell.classList.remove(
          "show-x",
          "scrolling-x",
          "dragging-x",
          "panning-x"
        );
      }

      if (hasY) {
        const trackLength = vertical.clientHeight;
        const thumbLength = Math.max(
          42,
          Math.min(
            trackLength,
            trackLength * (scroll.clientHeight / scroll.scrollHeight)
          )
        );
        const travel = Math.max(0, trackLength - thumbLength);
        const top = maxY > 0 ? (scroll.scrollTop / maxY) * travel : 0;

        verticalThumb.style.height = `${thumbLength}px`;
        verticalThumb.style.transform = `translate3d(0, ${top}px, 0)`;
      }

      if (hasX) {
        const trackLength = horizontal.clientWidth;
        const thumbLength = Math.max(
          42,
          Math.min(
            trackLength,
            trackLength * (scroll.clientWidth / scroll.scrollWidth)
          )
        );
        const travel = Math.max(0, trackLength - thumbLength);
        const left = maxX > 0 ? (scroll.scrollLeft / maxX) * travel : 0;

        horizontalThumb.style.width = `${thumbLength}px`;
        horizontalThumb.style.transform = `translate3d(${left}px, 0, 0)`;
      }
    };

    const queueUpdate = () => {
      if (state.frame) return;
      state.frame = requestAnimationFrame(update);
    };

    shell.addEventListener(
      "pointermove",
      (event) => {
        const rect = shell.getBoundingClientRect();
        const nearRight =
          rect.right - event.clientX <= 38 && event.clientX >= rect.left;
        const nearBottom =
          rect.bottom - event.clientY <= 38 && event.clientY >= rect.top;

        if (!state.thumbDrag || state.thumbDrag.axis !== "y") {
          shell.classList.toggle(
            "show-y",
            nearRight && vertical.classList.contains("has-overflow")
          );
        }

        if (!state.thumbDrag || state.thumbDrag.axis !== "x") {
          shell.classList.toggle(
            "show-x",
            nearBottom && horizontal.classList.contains("has-overflow")
          );
        }
      },
      { signal }
    );

    shell.addEventListener(
      "pointerleave",
      () => {
        if (!state.thumbDrag && !state.contentPan) {
          shell.classList.remove("show-y", "show-x");
        }
      },
      { signal }
    );

    scroll.addEventListener(
      "scroll",
      () => {
        const movedY = scroll.scrollTop !== state.previousTop;
        const movedX = scroll.scrollLeft !== state.previousLeft;

        state.previousTop = scroll.scrollTop;
        state.previousLeft = scroll.scrollLeft;

        if (movedY && vertical.classList.contains("has-overflow")) {
          shell.classList.add("scrolling-y");
          scheduleHide("y");
        }

        if (movedX && horizontal.classList.contains("has-overflow")) {
          shell.classList.add("scrolling-x");
          scheduleHide("x");
        }

        queueUpdate();
      },
      { passive: true, signal }
    );

    const isInteractiveContent = (event) =>
      event.composedPath().some(
        (node) =>
          node instanceof Element &&
          node.matches?.(INTERACTIVE_SELECTOR)
      );

    scroll.addEventListener(
      "pointerdown",
      (event) => {
        const hasHorizontalOverflow =
          scroll.scrollWidth > scroll.clientWidth + 1;

        if (!hasHorizontalOverflow || !event.isPrimary) return;
        if (isInteractiveContent(event)) return;

        event.stopPropagation();

        if (event.pointerType !== "mouse" || event.button !== 0) return;

        state.contentPan = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startLeft: scroll.scrollLeft,
          moved: false
        };

        scroll.setPointerCapture?.(event.pointerId);
        shell.classList.add("panning-x", "scrolling-x");
        clearTimer("x");
        event.preventDefault();
      },
      { signal }
    );

    scroll.addEventListener(
      "pointermove",
      (event) => {
        const pan = state.contentPan;
        if (!pan || pan.pointerId !== event.pointerId) return;

        const dx = event.clientX - pan.startX;
        if (!pan.moved && Math.abs(dx) < 2) return;

        pan.moved = true;
        scroll.scrollLeft = pan.startLeft + dx;
        queueUpdate();

        event.preventDefault();
        event.stopPropagation();
      },
      { passive: false, signal }
    );

    const finishContentPan = (event) => {
      const pan = state.contentPan;
      if (!pan || pan.pointerId !== event.pointerId) return;

      if (scroll.hasPointerCapture?.(event.pointerId)) {
        scroll.releasePointerCapture(event.pointerId);
      }

      state.contentPan = null;
      shell.classList.remove("panning-x");
      scheduleHide("x", 620);

      event.preventDefault();
      event.stopPropagation();
    };

    scroll.addEventListener("pointerup", finishContentPan, { signal });
    scroll.addEventListener("pointercancel", finishContentPan, { signal });
    scroll.addEventListener(
      "lostpointercapture",
      (event) => {
        if (state.contentPan) finishContentPan(event);
      },
      { signal }
    );

    scroll.addEventListener(
      "wheel",
      (event) => {
        const hasHorizontalOverflow =
          scroll.scrollWidth > scroll.clientWidth + 1;

        if (!hasHorizontalOverflow) return;

        const horizontalDelta =
          Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.shiftKey
              ? event.deltaY
              : 0;

        if (!horizontalDelta) return;

        scroll.scrollLeft += horizontalDelta;
        shell.classList.add("scrolling-x");
        scheduleHide("x");

        event.preventDefault();
        event.stopPropagation();
      },
      { passive: false, signal }
    );

    const beginThumbDrag = (event, axis) => {
      if (!event.isPrimary) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const bar = axis === "y" ? vertical : horizontal;
      const thumb = axis === "y" ? verticalThumb : horizontalThumb;
      const trackLength = axis === "y" ? bar.clientHeight : bar.clientWidth;
      const thumbLength = axis === "y" ? thumb.offsetHeight : thumb.offsetWidth;
      const maxScroll =
        axis === "y"
          ? Math.max(0, scroll.scrollHeight - scroll.clientHeight)
          : Math.max(0, scroll.scrollWidth - scroll.clientWidth);

      state.thumbDrag = {
        axis,
        pointerId: event.pointerId,
        startPointer: axis === "y" ? event.clientY : event.clientX,
        startScroll: axis === "y" ? scroll.scrollTop : scroll.scrollLeft,
        travel: Math.max(1, trackLength - thumbLength),
        maxScroll
      };

      shell.classList.add(axis === "y" ? "dragging-y" : "dragging-x");
      clearTimer(axis);
      thumb.setPointerCapture?.(event.pointerId);

      event.preventDefault();
      event.stopPropagation();
    };

    const moveThumbDrag = (event) => {
      const drag = state.thumbDrag;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const pointer = drag.axis === "y" ? event.clientY : event.clientX;
      const delta = pointer - drag.startPointer;
      const next =
        drag.startScroll + (delta / drag.travel) * drag.maxScroll;

      if (drag.axis === "y") scroll.scrollTop = next;
      else scroll.scrollLeft = next;

      event.preventDefault();
      event.stopPropagation();
    };

    const finishThumbDrag = (event) => {
      const drag = state.thumbDrag;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const thumb = drag.axis === "y" ? verticalThumb : horizontalThumb;
      const className = drag.axis === "y" ? "dragging-y" : "dragging-x";

      if (thumb.hasPointerCapture?.(event.pointerId)) {
        thumb.releasePointerCapture(event.pointerId);
      }

      shell.classList.remove(className);
      state.thumbDrag = null;
      scheduleHide(drag.axis, 520);

      event.preventDefault();
      event.stopPropagation();
    };

    verticalThumb.addEventListener(
      "pointerdown",
      (event) => beginThumbDrag(event, "y"),
      { signal }
    );
    horizontalThumb.addEventListener(
      "pointerdown",
      (event) => beginThumbDrag(event, "x"),
      { signal }
    );

    verticalThumb.addEventListener("pointermove", moveThumbDrag, { signal });
    horizontalThumb.addEventListener("pointermove", moveThumbDrag, { signal });
    verticalThumb.addEventListener("pointerup", finishThumbDrag, { signal });
    horizontalThumb.addEventListener("pointerup", finishThumbDrag, { signal });
    verticalThumb.addEventListener("pointercancel", finishThumbDrag, { signal });
    horizontalThumb.addEventListener("pointercancel", finishThumbDrag, { signal });

    const jumpTrack = (event, axis) => {
      const thumb = axis === "y" ? verticalThumb : horizontalThumb;
      if (event.target === thumb) return;

      const bar = axis === "y" ? vertical : horizontal;
      const rect = bar.getBoundingClientRect();
      const position =
        axis === "y" ? event.clientY - rect.top : event.clientX - rect.left;
      const thumbLength = axis === "y" ? thumb.offsetHeight : thumb.offsetWidth;
      const trackLength = axis === "y" ? bar.clientHeight : bar.clientWidth;
      const maxScroll =
        axis === "y"
          ? Math.max(0, scroll.scrollHeight - scroll.clientHeight)
          : Math.max(0, scroll.scrollWidth - scroll.clientWidth);
      const ratio = Math.max(
        0,
        Math.min(
          1,
          (position - thumbLength / 2) /
            Math.max(1, trackLength - thumbLength)
        )
      );

      if (axis === "y") {
        scroll.scrollTo({ top: ratio * maxScroll, behavior: "smooth" });
      } else {
        scroll.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
      }

      event.preventDefault();
      event.stopPropagation();
    };

    vertical.addEventListener(
      "pointerdown",
      (event) => jumpTrack(event, "y"),
      { signal }
    );
    horizontal.addEventListener(
      "pointerdown",
      (event) => jumpTrack(event, "x"),
      { signal }
    );

    const resizeObserver = globalThis.ResizeObserver
      ? new ResizeObserver(queueUpdate)
      : null;

    resizeObserver?.observe(shell);
    resizeObserver?.observe(scroll);

    const mutationObserver = new MutationObserver(queueUpdate);
    mutationObserver.observe(scroll, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    queueMicrotask(queueUpdate);

    return () => {
      controller.abort();
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      cancelAnimationFrame(state.frame);
      clearTimeout(state.hideX);
      clearTimeout(state.hideY);
    };
  }

  _destroyRenderedCards() {
    for (const card of this._cards) {
      card.cleanup?.();
    }
    this._cards = [];
  }

  _queueMeasure() {
    cancelAnimationFrame(this._resizeFrame);
    this._resizeFrame = requestAnimationFrame(() => this._measure());
  }

  _measure() {
    if (!this._stage || !this._deck) return;

    const card = this._cards[0]?.element;
    const width =
      card?.getBoundingClientRect().width ||
      Number.parseFloat(getComputedStyle(this).getPropertyValue("--fan-card-width")) ||
      390;
    const height =
      card?.getBoundingClientRect().height ||
      Number.parseFloat(getComputedStyle(this).getPropertyValue("--fan-card-height")) ||
      520;

    const visible = Math.min(Math.max(0, this.cardCount - 1), this._maxVisibleCards());
    const offset = this._fanOffset();
    const fanRoom = visible > 0 ? 38 + visible * offset : 0;

    this._cardWidth = width;
    this._cardHeight = height;
    this._stage.style.height = `${height + 34}px`;
    this._deck.style.width = `${width}px`;
    this._deck.style.height = `${height}px`;
    this._deck.style.left = `${Math.max(
      0,
      (this._stage.clientWidth - width - fanRoom) / 2
    )}px`;

    this._renderRest();
  }

  _renderRest() {
    if (!this.cardCount) return;

    const maxVisible = this._maxVisibleCards();
    const offsetX = this._fanOffset();
    const offsetY =
      Number.parseFloat(
        getComputedStyle(this).getPropertyValue("--fan-offset-y")
      ) || 6;
    const rotation =
      Number.parseFloat(
        getComputedStyle(this).getPropertyValue("--fan-rotation")
      ) || 2.1;

    this._cards.forEach((card, cardIndex) => {
      const slot = this._mod(cardIndex - this._index);
      const visibleSlot = Math.min(slot, maxVisible);
      const isCurrent = slot === 0;
      const x = isCurrent ? 0 : 34 + visibleSlot * offsetX;
      const y = isCurrent ? 0 : 4 + visibleSlot * offsetY;
      const angle = isCurrent ? 0 : 1.7 + visibleSlot * rotation;
      const scale = isCurrent ? 1 : 1 - Math.min(visibleSlot, 5) * 0.007;

      card.element.dataset.baseX = String(x);
      card.element.dataset.baseY = String(y);
      card.element.dataset.baseR = String(angle);
      card.element.dataset.baseS = String(scale);
      card.element.style.zIndex = String(this.cardCount - slot);
      card.element.style.opacity = slot > maxVisible + 1 ? "0" : "1";
      card.element.style.pointerEvents = slot > maxVisible + 1 ? "none" : "";
      card.element.style.transform = `
        translate3d(${x}px, ${y}px, ${-slot}px)
        rotate(${angle}deg)
        scale(${scale})
      `;

      card.element.classList.toggle("is-current", isCurrent);
      card.element.setAttribute("aria-hidden", isCurrent ? "false" : "true");
      card.worldHost.inert = !isCurrent;
    });
  }

  _requestStep(direction, source) {
    if (this.cardCount < 2 || this._drag) return false;

    const normalizedDirection = direction > 0 ? 1 : -1;
    const now = performance.now();
    const rapid = now - (this._lastIntent || 0) < 240;
    this._lastIntent = now;

    this._queue.push({
      direction: normalizedDirection,
      source,
      ms: rapid ? SPEED.fast : SPEED.normal
    });

    if (!this._active) this._startNext();
    return true;
  }

  _startNext() {
    if (this._active || !this._queue.length || this.cardCount < 2) return;

    const intent = this._queue.shift();
    const previousIndex = this._index;
    const nextIndex = this._mod(previousIndex + intent.direction);
    const duration = this._reducedMotion ? 1 : intent.ms;

    this._active = {
      ...intent,
      previousIndex,
      nextIndex
    };

    this.dispatchEvent(
      new CustomEvent("cardchangestart", {
        detail: {
          index: nextIndex,
          previousIndex,
          cardCount: this.cardCount,
          direction: intent.direction > 0 ? "next" : "previous",
          source: intent.source
        }
      })
    );

    if (intent.direction > 0) {
      const current = this._cards[previousIndex].element;
      current.classList.add("is-leaving");
      current.style.zIndex = String(this.cardCount + 10);
      current.style.transitionDuration = `${duration}ms`;
      current.style.transform =
        "translate3d(-165px, 92px, 0) rotate(-19deg) scale(.93)";

      setTimeout(() => {
        current.classList.remove("is-leaving");
        current.style.transitionDuration = "";
        this._index = nextIndex;
        this._completeStep();
      }, duration);
    } else {
      this._index = nextIndex;
      const incoming = this._cards[nextIndex].element;

      incoming.style.transition = "none";
      incoming.style.zIndex = String(this.cardCount + 10);
      incoming.style.transform =
        "translate3d(-145px, 85px, 0) rotate(-17deg) scale(.94)";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.style.transition = "";
          incoming.style.transitionDuration = `${duration}ms`;
          this._renderRest();

          setTimeout(() => {
            incoming.style.transitionDuration = "";
            this._completeStep();
          }, duration);
        });
      });
    }
  }

  _completeStep() {
    const active = this._active;
    if (!active) return;

    this._active = null;
    this._renderRest();
    this._announce();

    this.dispatchEvent(
      new CustomEvent("cardchange", {
        detail: {
          index: this._index,
          previousIndex: active.previousIndex,
          cardCount: this.cardCount,
          direction: active.direction > 0 ? "next" : "previous",
          source: active.source
        }
      })
    );

    this._startNext();
  }

  _announce() {
    const active = this._cards[this._index];
    if (!active) {
      this._status.textContent = "";
      return;
    }

    this._status.textContent =
      `${active.label}, ${this._index + 1} of ${this.cardCount}`;
  }

  _normalizeStartIndex() {
    if (!this.cardCount) return 0;
    const value = Number.parseInt(this.getAttribute("start-index") || "0", 10);
    return this._mod(Number.isFinite(value) ? value : 0);
  }

  _normalizeExistingIndex(index) {
    if (!this.cardCount) return -1;
    const number = Number(index);
    if (!Number.isInteger(number)) return -1;
    return number < 0 || number >= this.cardCount ? -1 : number;
  }

  _projectedIndex() {
    let projected = this._active?.nextIndex ?? this._index;
    for (const intent of this._queue) {
      projected = this._mod(projected + intent.direction);
    }
    return projected;
  }

  _fanOffset() {
    const compact = globalThis.matchMedia?.("(max-width: 620px)")?.matches ?? false;
    const fallback = compact ? 18 : 28;
    return (
      Number.parseFloat(
        getComputedStyle(this).getPropertyValue("--fan-offset-x")
      ) || fallback
    );
  }

  _maxVisibleCards() {
    const compact = globalThis.matchMedia?.("(max-width: 620px)")?.matches ?? false;
    return compact ? 5 : 6;
  }

  _mod(value) {
    const count = Math.max(1, this.cardCount);
    return ((value % count) + count) % count;
  }
}

export function defineFanPokerElements(registry = globalThis.customElements) {
  if (!registry) return false;
  if (!registry.get("fan-card")) registry.define("fan-card", FanCardElement);
  if (!registry.get("fan-poker")) registry.define("fan-poker", FanPokerElement);
  return true;
}

defineFanPokerElements();
