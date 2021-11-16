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
      {{ availableGulps }} / {{ distributableGulps }} Schlücke verfügbar
      <v-btn
        icon
        @click="withdraw"
      >
        <v-icon color="error">
          mdi-arrow-u-left-top
        </v-icon>
      </v-btn>
    </v-card-subtitle>

    <v-card-text>
      <v-list>
        <v-list-item
          v-for="player in coPlayers"
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
                >
                  <template #prepend-inner>
                    <v-icon
                      :disabled="playerGulps[player.id] === 0"
                      @click="decrement(player.id)"
                    >
                      mdi-minus-circle-outline
                    </v-icon>
                  </template>

                  <template #append>
                    <v-icon
                      :disabled="availableGulps === 0"
                      @click="increment(player.id)"
                    >
                      mdi-plus-circle-outline
                    </v-icon>
                  </template>

                  <template #append-outer>
                    <v-icon
                      :disabled="playerGulps[player.id] === distributableGulps"
                      @click="setToMax(player.id)"
                    >
                      mdi-plus-circle-multiple-outline
                    </v-icon>
                  </template>
                </v-text-field>
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
      playerGulps: {} as { [playerId: string]: number },
    };
  },
  computed: {
    ...vuex.mapState([
      'player',
      'room',
      'game',
    ]),
    distributableGulps(): number {
      return this.game.gulps.distributable;
    },
    availableGulps(): number {
      return this.game.gulps.available;
    },
    coPlayers(): Players {
      const players = { ...this.room.players };
      delete players[this.player.id];
      return players;
    },
  },
  created() {
    Object.keys(this.coPlayers).forEach((playerId) => {
      Vue.set(this.playerGulps, playerId, 0);
    });
  },
  methods: {
    ...vuex.mapMutations([
      'SET_AVAILABLE_GULPS',
    ]),
    withdraw(): void {
      Object.keys(this.coPlayers).forEach((playerId) => {
        Vue.set(this.playerGulps, playerId, 0);
      });

      this.SET_AVAILABLE_GULPS(this.distributableGulps);
    },
    increment(playerId: string): void {
      const gulps = this.playerGulps[playerId];

      if (this.availableGulps > 0) {
        Vue.set(this.playerGulps, playerId, gulps + 1);
        this.SET_AVAILABLE_GULPS(this.availableGulps - 1);
      }
    },
    decrement(playerId: string): void {
      const gulps = this.playerGulps[playerId];

      if (gulps > 0) {
        Vue.set(this.playerGulps, playerId, gulps - 1);
        this.SET_AVAILABLE_GULPS(this.availableGulps + 1);
      }
    },
    setToMax(playerId: string): void {
      this.withdraw();
      Vue.set(this.playerGulps, playerId, this.distributableGulps);
      this.SET_AVAILABLE_GULPS(0);
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
