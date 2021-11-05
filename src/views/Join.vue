<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <Control />
      </v-col>

      <v-col cols="4">
        <CoPlayers />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { Route, NavigationGuardNext } from 'vue-router';
import Control from '@/components/join/Control.vue';
import CoPlayers from '@/components/common/CoPlayers.vue';
import {
  Room,
} from '@/types';

export default Vue.extend({
  name: 'Join',
  components: {
    Control,
    CoPlayers,
  },
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    if (to.name !== 'Play') {
      this.$socket.client.emit('leaveRoom', this.roomId);
    }

    next();
  },
  computed: {
    ...vuex.mapState([
      'player',
      'room',
    ]),
    roomId(): string {
      return this.$route.params.roomId;
    },
  },
  created() {
    this.$socket.client.emit('joinRoom', this.roomId, (room: Room, rejectReason: string) => {
      if (room) {
        this.SET_ROOM(room);
      } else {
        this.SET_DIALOG_STATE({
          dialogName: 'joinRejected',
          isActive: true,
          data: rejectReason,
        });

        this.$router.push({
          name: 'Home',
        });
      }
    });
  },
  methods: {
    ...vuex.mapMutations([
      'SET_ROOM',
      'SET_DIALOG_STATE',
    ]),
  },
});
</script>
