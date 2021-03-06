<template>
  <v-card
    outlined
    rounded="xl"
    elevation="4"
  >
    <v-card-title class="text-h5 text-no-wrap justify-center">
      Meine Karten
    </v-card-title>

    <v-card-text :id="containerId">
      <div class="d-flex flex-wrap justify-center">
        <PlayingCard
          v-for="(card, i) in playingCards"
          :key="i"
          :name="card.name"
          :suit="card.suit"
          :max-width="playingCardMaxWidth"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import PlayingCard from '@/components/play/PlayingCard.vue';
import PlayingCardMaxWidth from '@/mixins/playing-card-max-width';

export default Vue.extend({
  name: 'PlayersCards',
  components: {
    PlayingCard,
  },
  mixins: [
    PlayingCardMaxWidth,
  ],
  data() {
    return {
      containerId: 'player-hand',
      // card title + bottom padding
      additionalOffset: (32 + 16 * 2) + 16,
      playingCards: [
        {},
        {},
        {},
      ],
    };
  },
});
</script>
