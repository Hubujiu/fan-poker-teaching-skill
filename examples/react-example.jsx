import { useEffect, useRef, useState } from "react";
import "@hubujiu/fan-poker-deck";

const cards = [
  { tag: "React", title: "Components", content: "Components describe reusable interface pieces.", symbol: "01", accent: "#61dafb" },
  { tag: "React", title: "State", content: "State records information that changes over time.", symbol: "02", accent: "#7dcfb6" },
  { tag: "React", title: "Effects", content: "Effects synchronize with external systems.", symbol: "03", accent: "#8e9aef" }
];

export default function FanPokerReactExample() {
  const deckRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const deck = deckRef.current;
    deck.cards = cards;
    const handleChange = (event) => setCurrent(event.detail.index);
    deck.addEventListener("cardchange", handleChange);
    return () => deck.removeEventListener("cardchange", handleChange);
  }, []);

  return (
    <section>
      <fan-poker
        ref={deckRef}
        card-width="390px"
        card-height="520px"
        theme="auto"
        aria-label="React learning cards"
      />

      <p>Current card: {current + 1}</p>
      <button type="button" onClick={() => deckRef.current?.previous()}>Previous</button>
      <button type="button" onClick={() => deckRef.current?.next()}>Next</button>
    </section>
  );
}
