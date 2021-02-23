<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <PlayersCards />
      </v-col>

      <v-col cols="6">
        <Fir />
      </v-col>

      <v-col cols="4">
        <CoPlayers />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import PlayersCards from '@/components/play/PlayersCards.vue';
import Fir from '@/components/play/Fir.vue';
import CoPlayers from '@/components/common/CoPlayers.vue';
import EventListenerResize from '@/mixins/event-listener-resize';

export default Vue.extend({
  name: 'Play',
  components: {
    PlayersCards,
    Fir,
    CoPlayers,
  },
  mixins: [
    EventListenerResize,
  ],
});
</script>
