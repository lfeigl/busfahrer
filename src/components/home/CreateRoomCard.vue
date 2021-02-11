<template>
  <v-card>
    <v-card-title class="headline">
      🚍 Neue Busfahrt
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="roomName"
        counter
        maxlength="25"
        label="Name der Buslinie"
        hide-details="auto"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        text
        :disabled="isEmptyString(roomName)"
        @click="createRoom"
      >
        Türen öffnen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { Room } from '@/types';
import { isEmptyString } from '@/utils';

export default Vue.extend({
  name: 'CreateRoomCard',
  data() {
    return {
      roomName: '',
    };
  },
  computed: {
    ...vuex.mapState([
      'player',
    ]),
  },
  methods: {
    isEmptyString,
    createRoom(): void {
      this.$socket.client.emit('createRoom', this.roomName.trim(), (room: Room) => {
        this.$router.push({
          name: 'Join',
          params: {
            roomId: room.id,
          },
        });
      });
    },
  },
});
</script>
