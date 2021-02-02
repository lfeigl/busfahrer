<template>
  <v-card>
    <v-card-title class="headline">
      Mitfahrer
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item
          v-for="coPlayer in room.players"
          :key="coPlayer.id"
        >
          <v-list-item-icon>
            <v-icon
              :color="playerIsMe(coPlayer.id) ? 'primary': 'warning'"
              v-if="room.owner.id === coPlayer.id"
            >
              mdi-account-star
            </v-icon>
            <v-icon
              :color="playerIsMe(coPlayer.id) ? 'primary': ''"
              v-else
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
  name: 'PlayersCard',
  computed: {
    ...vuex.mapState([
      'player',
      'room',
    ]),
  },
  methods: {
    playerIsMe(playerId: string): boolean {
      return playerId === this.player.id;
    },
  },
});
</script>
