<template>
  <v-card>
    <v-card-title class="text-h5">
      Mitfahrer
    </v-card-title>

    <v-card-subtitle class="subtitle-1">
      {{ playerCount }} / 18
    </v-card-subtitle>

    <v-card-text>
      <v-list>
        <v-list-item
          v-for="coPlayer in room.players"
          :key="coPlayer.id"
        >
          <v-list-item-icon>
            <v-icon
              v-if="room.owner.id === coPlayer.id"
              :color="playerIsMe(coPlayer.id) ? 'primary': ''"
            >
              mdi-account-star
            </v-icon>
            <v-icon
              v-else
              :color="playerIsMe(coPlayer.id) ? 'primary': ''"
            >
              mdi-account
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ coPlayer.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';

export default Vue.extend({
  name: 'CoPlayers',
  computed: {
    ...vuex.mapState([
      'player',
      'room',
    ]),
    playerCount(): number {
      return Object.keys(this.room.players).length;
    },
  },
  methods: {
    playerIsMe(playerId: string): boolean {
      return playerId === this.player.id;
    },
  },
});
</script>
