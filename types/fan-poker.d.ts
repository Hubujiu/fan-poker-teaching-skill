export interface FanPokerCardInput {
  tag?: string;
  title?: string;
  symbol?: string | number;
  accent?: string;
  content?: string;
  html?: string;
}

export interface FanPokerChangeDetail {
  index: number;
  previousIndex: number;
  cardCount: number;
  direction: "next" | "previous";
  source: string;
}

export class FanCardElement extends HTMLElement {}

export class FanPokerElement extends HTMLElement {
  readonly currentIndex: number;
  readonly cardCount: number;
  cards: FanPokerCardInput[];
  next(): boolean;
  previous(): boolean;
  goTo(index: number): boolean;
  reset(): boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    "fan-card": FanCardElement;
    "fan-poker": FanPokerElement;
  }

  interface HTMLElementEventMap {
    ready: CustomEvent<{ index: number; cardCount: number }>;
    cardchangestart: CustomEvent<{ index: number; direction: number; source: string }>;
    cardchange: CustomEvent<FanPokerChangeDetail>;
  }
}
