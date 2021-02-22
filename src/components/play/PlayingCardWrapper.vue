<template>
  <v-img
    class="ma-1"
    contain
    :src="require(`@/assets/cards/suits/${suit}/${playingCard.fileName}`)"
    :max-width="maxWidth"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { playingCards } from '@/utils';

export default Vue.extend({
  name: 'PlayingCardWrapper',
  props: {
    name: {
      type: String,
      required: true,
    },
    suit: {
      type: String,
      required: true,
    },
    maxWidth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      playingCard: playingCards[this.name],
    };
  },
});
</script>
