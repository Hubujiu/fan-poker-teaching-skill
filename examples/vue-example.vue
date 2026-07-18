<script setup>
import "@hubujiu/fan-poker-deck";

const cards = [
  {
    label: "Vue world",
    html: `
      <style>
        :host { display:block; min-height:100%; background:#ecfff8; font-family:system-ui; }
        main { min-width:100%; min-height:100%; padding:28px; }
      </style>
      <main><h1>Vue card world</h1></main>
    `
  }
];

function ready(event) {
  event.currentTarget.setCards(cards);
}
</script>

<template>
  <fan-poker
    card-width="390px"
    card-height="520px"
    aria-label="Vue lesson"
    @ready="ready"
  />
</template>
