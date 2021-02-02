<template>
  <v-card>
    <v-card-title class="headline">
      Mitfahrer
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item
          v-for="player in room.players"
          :key="player.id"
        >
          <v-list-item-icon>
            <v-icon
              color="primary"
              v-if="room.owner.id === player.id"
            >
              mdi-account-star
            </v-icon>
            <v-icon v-else>
              mdi-account
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ player.name }}
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
      'room',
    ]),
  },
});
</script>
