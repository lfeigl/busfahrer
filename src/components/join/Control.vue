<template>
  <v-card>
    <v-card-title class="text-h5">
      In Bus der Linie "{{ room.name }}" einsteigen
    </v-card-title>

    <v-card-text>
      Mitfahrer können über diesen Link einsteigen:
      <code>{{ joinLink }}</code>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="error"
        text
        @click="leaveRoom"
      >
        Aussteigen
      </v-btn>

      <v-spacer />

      <v-btn
        v-clipboard="joinLink"
        large
        text
      >
        Link kopieren
      </v-btn>

      <v-spacer />

      <v-btn
        x-large
        color="primary"
        text
        :disabled="room.owner.id !== player.id || Object.keys(room.players).length < 2"
        @click="startGame"
      >
        Losfahren
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { PlayingCard } from '@/types';

export default Vue.extend({
  name: 'Control',
  computed: {
    ...vuex.mapState([
      'player',
      'room',
    ]),
    joinLink(): string {
      return window.location.origin + this.$route.path;
    },
  },
  methods: {
    ...vuex.mapMutations([
      'SET_DIALOG_STATE',
      'ADD_FIR_CARD',
    ]),
    leaveRoom(): void {
      if (this.room.owner.id === this.player.id && Object.keys(this.room.players).length > 1) {
        this.SET_DIALOG_STATE({
          dialogName: 'removeRoom',
          isActive: true,
        });
      } else {
        this.$router.push({
          name: 'Home',
        });
      }
    },
    startGame(): void {
      this.$socket.client.emit('startGame', this.room.id, (firCard: PlayingCard) => {
        this.ADD_FIR_CARD(firCard);
        this.$router.push({
          name: 'Play',
        });
      });
    },
  },
});
</script>
