<script setup>
import { onMounted, ref } from "vue";
import "@hubujiu/fan-poker-deck";

const deck = ref(null);
const current = ref(0);
const cards = [
  { tag: "Vue", title: "Reactive state", content: "State drives the interface.", symbol: "01", accent: "#42b883" },
  { tag: "Vue", title: "Components", content: "Components package reusable UI and behavior.", symbol: "02", accent: "#7dcfb6" },
  { tag: "Vue", title: "Composables", content: "Composables reuse stateful logic.", symbol: "03", accent: "#8e9aef" }
];

onMounted(() => {
  deck.value.cards = cards;
});
</script>

<template>
  <section>
    <fan-poker
      ref="deck"
      card-width="390px"
      card-height="520px"
      theme="auto"
      aria-label="Vue learning cards"
      @cardchange="current = $event.detail.index"
    />

    <p>Current card: {{ current + 1 }}</p>
    <button type="button" @click="deck.previous()">Previous</button>
    <button type="button" @click="deck.next()">Next</button>
  </section>
</template>
