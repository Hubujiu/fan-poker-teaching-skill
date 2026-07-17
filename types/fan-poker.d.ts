export type FanPokerTheme = "auto" | "light" | "dark";
export type FanPokerDirection = "next" | "previous";
export type FanPokerChangeSource = "api" | "click" | "drag" | "wheel" | "keyboard" | "goto";

export interface FanPokerCardInput {
  tag?: string;
  title?: string;
  symbol?: string;
  accent?: string;
  content?: string;
  html?: string;
}

export interface FanPokerChangeDetail {
  index: number;
  previousIndex: number;
  cardCount: number;
  direction: FanPokerDirection;
  source: FanPokerChangeSource;
}

export interface FanPokerCardsChangeDetail {
  cardCount: number;
  previousCardCount: number;
  index: number;
  previousIndex: number;
}

export class FanCardElement extends HTMLElement {}

export class FanPokerElement extends HTMLElement {
  get currentIndex(): number;
  get cardCount(): number;
  get cards(): FanPokerCardInput[];
  set cards(value: FanPokerCardInput[]);

  setCards(cards: FanPokerCardInput[], options?: { preserveIndex?: boolean }): this;
  appendCard(card: FanPokerCardInput): number;
  updateCard(index: number, patch: Partial<FanPokerCardInput>): boolean;
  removeCard(index: number): FanPokerCardInput | null;
  clear(): this;

  next(): boolean;
  previous(): boolean;
  goTo(index: number): boolean;
  reset(): boolean;

  addEventListener(
    type: "ready",
    listener: (event: CustomEvent<{ index: number; cardCount: number }>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "cardchangestart" | "cardchange",
    listener: (event: CustomEvent<FanPokerChangeDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "cardschange",
    listener: (event: CustomEvent<FanPokerCardsChangeDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
}

declare global {
  interface HTMLElementTagNameMap {
    "fan-card": FanCardElement;
    "fan-poker": FanPokerElement;
  }
}
