<template>
  <div :id="containerId">
    <div
      v-for="(row, i) in playingCards"
      :key="i"
      class="d-flex justify-center"
    >
      <PlayingCard
        v-for="(card, j) in row"
        :key="j"
        :name="card.name"
        :suit="card.suit"
        :max-width="playingCardMaxWidth"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PlayingCard from '@/components/play/PlayingCard.vue';
import PlayingCardMaxWidth from '@/mixins/playing-card-max-width';

export default Vue.extend({
  name: 'Fir',
  components: {
    PlayingCard,
  },
  mixins: [
    PlayingCardMaxWidth,
  ],
  data() {
    return {
      containerId: 'fir',
      playingCards: [
        [
          {},
        ],
        [
          {},
          {},
        ],
        [
          {},
          {},
          {},
        ],
        [
          {},
          {},
          {},
          {},
        ],
        [
          {},
          {},
          {},
          {},
          {},
        ],
      ],
    };
  },
});
</script>
