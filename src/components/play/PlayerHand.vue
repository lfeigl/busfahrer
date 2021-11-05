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
        <PlayingCardComponent
          v-for="(card, i) in hand"
          :key="i"
          :name="card.name"
          :suit="card.suit"
          :max-width="playingCardMaxWidth"
          class="playing-card"
          @click.native="playCard(card)"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import PlayingCardComponent from '@/components/play/PlayingCard.vue';
import PlayingCardMaxWidth from '@/mixins/playing-card-max-width';
import { PlayingCard } from '@/types';

export default Vue.extend({
  name: 'PlayersCards',
  components: {
    PlayingCardComponent,
  },
  mixins: [
    PlayingCardMaxWidth,
  ],
  data() {
    return {
      containerId: 'player-hand',
      // card title + bottom padding
      additionalOffset: (32 + 16 * 2) + 16,
      playingCardRowCount: 0,
    };
  },
  computed: {
    ...vuex.mapState([
      'hand',
    ]),
  },
  created() {
    this.playingCardRowCount = Math.ceil(this.hand.length / 3);
  },
  methods: {
    ...vuex.mapMutations([
      'SET_DIALOG_STATE',
    ]),
    playCard(card: PlayingCard): void {
      this.$socket.client.emit('playCard', card, (isValidPlay: boolean) => {
        if (isValidPlay) {
          // show dispense dialog
        } else {
          this.SET_DIALOG_STATE({
            dialogName: 'invalidPlay',
            isActive: true,
          });
        }
      });
    },
  },
});
</script>

<style scoped>
.playing-card {
  cursor: pointer;
}
</style>
