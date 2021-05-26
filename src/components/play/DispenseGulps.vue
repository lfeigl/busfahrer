<template>
  <v-card>
    <v-card-title class="text-h5">
      🍺 Schlücke verteilen
      <v-spacer />
      <v-btn
        icon
        :disabled="playFinished"
        @click="finishPlay"
      >
        <v-icon color="success">
          mdi-thumb-up
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle class="subtitle-1">
      {{ availableGulps }} / {{ totalGulps }} Schlücke verfügbar
    </v-card-subtitle>

    <v-card-text>
      <v-list>
        <v-list-item
          v-for="player in players"
          :key="player.id"
        >
          <v-list-item-icon>
            <v-icon v-if="room.owner.id === player.id">
              mdi-account-star
            </v-icon>
            <v-icon v-else>
              mdi-account
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-row no-gutters>
              <v-col cols="5">
                <v-list-item-title class="py-2">
                  {{ player.name }}
                </v-list-item-title>
              </v-col>

              <v-col cols="7">
                <v-text-field
                  v-model="playerGulps[player.id]"
                  :disabled="playFinished"
                  readonly
                  outlined
                  dense
                  class="input-text-center px-1"
                  hide-details="auto"
                  prepend-icon="mdi-format-vertical-align-bottom"
                  prepend-inner-icon="mdi-minus-circle-outline"
                  append-icon="mdi-plus-circle-outline"
                  append-outer-icon="mdi-format-vertical-align-top"
                  @click:prepend="setToZero(player.id)"
                  @click:prepend-inner="decrement(player.id)"
                  @click:append="increment(player.id)"
                  @click:append-outer="setToMax(player.id)"
                />
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { Players } from '@/types';

export default Vue.extend({
  name: 'DispenseGulps',
  data() {
    return {
      playFinished: false,
      totalGulps: 42,
      availableGulps: 0,
      playerGulps: {} as { [playerId: string]: number },
    };
  },
  computed: {
    ...vuex.mapState([
      'player',
      'room',
    ]),
    players(): Players {
      const players = { ...this.room.players };
      delete players[this.player.id];
      return players;
    },
  },
  created() {
    this.availableGulps = this.totalGulps;
    Object.keys(this.players).forEach((playerId) => {
      Vue.set(this.playerGulps, playerId, 0);
    });
  },
  methods: {
    increment(playerId: string): void {
      const gulps = this.playerGulps[playerId];

      if (this.availableGulps > 0) {
        Vue.set(this.playerGulps, playerId, gulps + 1);
        this.availableGulps -= 1;
      }
    },
    decrement(playerId: string): void {
      const gulps = this.playerGulps[playerId];

      if (gulps > 0) {
        Vue.set(this.playerGulps, playerId, gulps - 1);
        this.availableGulps += 1;
      }
    },
    setToMax(playerId: string): void {
      Object.keys(this.room.players).forEach((playerId1) => {
        Vue.set(this.playerGulps, playerId1, 0);
      });
      Vue.set(this.playerGulps, playerId, this.totalGulps);
      this.availableGulps = 0;
    },
    setToZero(playerId: string): void {
      const gulps = this.playerGulps[playerId];

      Vue.set(this.playerGulps, playerId, 0);

      this.availableGulps += gulps;
    },
    finishPlay(): void {
      this.playFinished = true;
    },
  },
});
</script>

<style scoped>
.input-text-center >>> input {
  text-align: center;
}
</style>
