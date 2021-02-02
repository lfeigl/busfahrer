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
        :disabled="room.owner.id !== player.id || Object.keys(room.players).length < 2"
        @click="startGame"
      >
        Losfahren
      </v-btn>
    </v-card-actions>

    <RemoveRoomDialog/>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import RemoveRoomDialog from '@/components/join/RemoveRoomDialog.vue';

export default Vue.extend({
  name: 'ControlCard',
  components: {
    RemoveRoomDialog,
  },
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
      'SET_ACTIVE_DIALOG',
    ]),
    leaveRoom(): void {
      if (this.room.owner.id === this.player.id) {
        this.SET_ACTIVE_DIALOG({
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
      console.log(this.room);
    },
  },
});
</script>
