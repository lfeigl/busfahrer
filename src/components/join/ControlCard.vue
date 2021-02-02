<template>
  <v-card>
    <v-card-title class="headline">
      Einsteigen in Buslinie "{{ room.name }}"
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

      <v-spacer/>

      <v-btn
        large
        text
        v-clipboard="joinLink"
      >
        Link kopieren
      </v-btn>

      <v-spacer/>

      <v-btn
        x-large
        color="primary"
        text
        :disabled="room.owner.id !== player.id"
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

export default Vue.extend({
  name: 'ControlCard',
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
    leaveRoom(): void {
      this.$router.push({
        name: 'Home',
      });
    },
    startGame(): void {
      console.log(this.room);
    },
  },
});
</script>
