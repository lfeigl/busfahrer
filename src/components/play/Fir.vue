<template>
  <div :id="containerId">
    <div
      v-for="(row, i) in fir"
      :key="i"
      class="d-flex justify-center"
    >
      <PlayingCardComponent
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
import vuex from 'vuex';
import PlayingCardComponent from '@/components/play/PlayingCard.vue';
import PlayingCardMaxWidth from '@/mixins/playing-card-max-width';
import { PlayingCard } from '@/types';

export default Vue.extend({
  name: 'Fir',
  components: {
    PlayingCardComponent,
  },
  mixins: [
    PlayingCardMaxWidth,
  ],
  data() {
    return {
      containerId: 'fir',
      playingCardRowCount: 5,
    };
  },
  computed: {
    ...vuex.mapState([
      'room',
    ]),
    fir(): PlayingCard[][] {
      const fir: PlayingCard[][] = [];
      const firCards = [...this.room.firCards];
      let end = 0;

      while (firCards.length < 15) {
        firCards.push({});
      }

      for (let i = 5; i >= 1; i -= 1) {
        const start = end;
        end = start + i;
        const row = firCards.slice(start, end);
        fir.push(row);
      }

      return fir.reverse();
    },
  },
});
</script>
