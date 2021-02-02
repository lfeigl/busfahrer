<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <ControlCard/>
      </v-col>

      <v-col cols="4">
        <PlayersCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { Route } from 'vue-router';
import ControlCard from '@/components/join/ControlCard.vue';
import PlayersCard from '@/components/join/PlayersCard.vue';
import {
  Room,
} from '@/types';

export default Vue.extend({
  name: 'Join',
  components: {
    ControlCard,
    PlayersCard,
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
  methods: {
    ...vuex.mapMutations([
      'SET_ROOM',
    ]),
  },
  created() {
    this.$socket.client.emit('joinRoom', {
      player: this.player,
      roomId: this.roomId,
    }, (room: Room) => {
      if (room) {
        this.SET_ROOM(room);
      } else {
        this.$router.push({
          name: 'Home',
        });
      }
    });
  },
  beforeRouteLeave(to: Route, from: Route, next: Function): void {
    this.$socket.client.emit('leaveRoom', {
      player: this.player,
      roomId: this.roomId,
    }, (room: Room) => {
      console.log(room);
    });

    next();
  },
  sockets: {
    ownerLeftRoom(): void {
      this.$router.push({
        name: 'Home',
      });
    },
  },
});
</script>
