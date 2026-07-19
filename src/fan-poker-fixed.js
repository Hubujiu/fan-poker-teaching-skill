import {
  FanCardElement,
  FanPokerElement,
  defineFanPokerElements
} from "./fan-poker.js";

const PATCH_FLAG = Symbol.for("@hubujiu/fan-poker-deck/source-style-isolation");
const sourceStyleMedia = new WeakMap();
const cardObservers = new WeakMap();

function quarantineStyle(style) {
  const currentMedia = style.getAttribute("media");

  if (!sourceStyleMedia.has(style) || currentMedia !== "not all") {
    sourceStyleMedia.set(style, currentMedia);
  }

  if (currentMedia !== "not all") {
    style.setAttribute("media", "not all");
  }
}

function quarantineCard(card) {
  card.querySelectorAll("style").forEach(quarantineStyle);
}

function restoreStylePairs(sourceStyles, clonedStyles) {
  clonedStyles.forEach((style, index) => {
    const sourceStyle = sourceStyles[index];
    if (!sourceStyle || !sourceStyleMedia.has(sourceStyle)) return;

    const media = sourceStyleMedia.get(sourceStyle);
    if (media === null) {
      style.removeAttribute("media");
    } else {
      style.setAttribute("media", media);
    }
  });
}

function restoreRenderedStyles(source, worldRoot) {
  restoreStylePairs(
    [...source.querySelectorAll("style")],
    [...worldRoot.querySelectorAll(".world-canvas style")]
  );
}

function serializeCardWorld(source) {
  quarantineCard(source);

  const template = document.createElement("template");
  template.innerHTML = source.innerHTML;

  restoreStylePairs(
    [...source.querySelectorAll("style")],
    [...template.content.querySelectorAll("style")]
  );

  return template.innerHTML;
}

function observeCard(card) {
  quarantineCard(card);

  if (cardObservers.has(card) || !globalThis.MutationObserver) return;

  const observer = new globalThis.MutationObserver(() => {
    quarantineCard(card);
  });

  observer.observe(card, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["media"]
  });

  cardObservers.set(card, observer);
}

function stopObservingCard(card) {
  cardObservers.get(card)?.disconnect();
  cardObservers.delete(card);
}

function patchComponent() {
  const pokerPrototype = FanPokerElement.prototype;
  if (pokerPrototype[PATCH_FLAG]) return;

  Object.defineProperty(pokerPrototype, PATCH_FLAG, {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false
  });

  const originalCardConnected = FanCardElement.prototype.connectedCallback;
  const originalCardDisconnected = FanCardElement.prototype.disconnectedCallback;

  FanCardElement.prototype.connectedCallback = function connectedCallback(...args) {
    const result = originalCardConnected?.apply(this, args);
    observeCard(this);
    return result;
  };

  FanCardElement.prototype.disconnectedCallback = function disconnectedCallback(...args) {
    stopObservingCard(this);
    return originalCardDisconnected?.apply(this, args);
  };

  const originalCreateRenderedCard = pokerPrototype._createRenderedCard;
  pokerPrototype._createRenderedCard = function createRenderedCard(source, index, total) {
    observeCard(source);
    const rendered = originalCreateRenderedCard.call(this, source, index, total);
    restoreRenderedStyles(source, rendered.worldHost.shadowRoot);
    return rendered;
  };

  const cardsDescriptor = Object.getOwnPropertyDescriptor(pokerPrototype, "cards");
  Object.defineProperty(pokerPrototype, "cards", {
    configurable: cardsDescriptor?.configurable ?? true,
    enumerable: cardsDescriptor?.enumerable ?? false,
    get() {
      return [...this.querySelectorAll(":scope > fan-card")].map((source, index) => ({
        label:
          source.getAttribute("aria-label") ||
          source.getAttribute("title") ||
          `Card ${index + 1}`,
        html: serializeCardWorld(source)
      }));
    },
    set: cardsDescriptor?.set
  });
}

function upgradeExistingDecks() {
  if (!globalThis.document) return;

  document.querySelectorAll("fan-card").forEach(observeCard);
  document.querySelectorAll("fan-poker").forEach((deck) => {
    deck._rebuild?.({ preserveIndex: true, emit: false });
  });
}

patchComponent();

if (globalThis.document) {
  queueMicrotask(upgradeExistingDecks);
}

export {
  FanCardElement,
  FanPokerElement,
  defineFanPokerElements
};
