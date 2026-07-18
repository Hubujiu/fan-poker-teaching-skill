import { useEffect, useRef } from "react";
import "@hubujiu/fan-poker-deck";

export default function FanPokerExample() {
  const deckRef = useRef(null);

  useEffect(() => {
    deckRef.current?.setCards([
      {
        label: "React world",
        html: `
          <style>
            :host { display:block; min-height:100%; background:#eef4ff; font-family:system-ui; }
            main { min-width:100%; min-height:100%; padding:28px; }
          </style>
          <main><h1>React card world</h1></main>
        `
      }
    ]);
  }, []);

  return (
    <fan-poker
      ref={deckRef}
      card-width="390px"
      card-height="520px"
      aria-label="React lesson"
    />
  );
}
