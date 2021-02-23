<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <ControlCard />
      </v-col>

      <v-col cols="4">
        <CoPlayersCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { Route } from 'vue-router';
import ControlCard from '@/components/join/ControlCard.vue';
import CoPlayersCard from '@/components/common/CoPlayersCard.vue';
import {
  Room,
} from '@/types';

export default Vue.extend({
  name: 'Join',
  components: {
    ControlCard,
    CoPlayersCard,
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
    this.$socket.client.emit('joinRoom', this.roomId, (room: Room) => {
      if (room) {
        this.SET_ROOM(room);
      } else {
        this.$router.push({
          name: 'Home',
        });
      }
    });
  },
  methods: {
    ...vuex.mapMutations([
      'SET_ROOM',
    ]),
  },
  beforeRouteLeave(to: Route, from: Route, next: Function): void {
    this.$socket.client.emit('leaveRoom', this.roomId, (room: Room) => {
      console.log(room);
    });

    next();
  },
});
</script>
