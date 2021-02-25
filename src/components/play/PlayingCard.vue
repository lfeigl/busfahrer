<template>
  <v-img
    class="ma-1 elevation-4"
    contain
    :src="require(`@/assets/playing-cards/${suit}/${playingCard.fileName}`)"
    :max-width="maxWidth"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { playingCards } from '@/utils';

export default Vue.extend({
  name: 'PlayingCard',
  props: {
    name: {
      type: String,
      default: 'back1',
    },
    suit: {
      type: String,
      default: 'back',
    },
    maxWidth: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      playingCard: playingCards[this.name],
    };
  },
});
</script>
