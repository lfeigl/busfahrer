<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <PlayerHand />
      </v-col>

      <v-col cols="6">
        <Fir />
      </v-col>

      <v-col cols="3">
        <CoPlayers />
      </v-col>
    </v-row>

    <InvalidPlayDialog />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { Route, NavigationGuardNext } from 'vue-router';
import PlayerHand from '@/components/play/PlayerHand.vue';
import Fir from '@/components/play/Fir.vue';
import CoPlayers from '@/components/common/CoPlayers.vue';
import InvalidPlayDialog from '@/components/play/InvalidPlayDialog.vue';
import EventListenerResize from '@/mixins/event-listener-resize';

export default Vue.extend({
  name: 'Play',
  components: {
    PlayerHand,
    Fir,
    CoPlayers,
    InvalidPlayDialog,
  },
  mixins: [
    EventListenerResize,
  ],
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    if (from.name === 'Join') {
      next();
    } else {
      next({
        name: 'Home',
      });
    }
  },
  computed: {
    ...vuex.mapState([
      'room',
    ]),
  },
});
</script>
