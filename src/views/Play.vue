<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <PlayersCardsCard />
      </v-col>

      <v-col cols="6">
        <Fir />
      </v-col>

      <v-col cols="4">
        <CoPlayersCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import PlayersCardsCard from '@/components/play/PlayersCardsCard.vue';
import Fir from '@/components/play/Fir.vue';
import CoPlayersCard from '@/components/common/CoPlayersCard.vue';
import EventListenerResize from '@/mixins/event-listener-resize';

export default Vue.extend({
  name: 'Play',
  components: {
    PlayersCardsCard,
    Fir,
    CoPlayersCard,
  },
  mixins: [
    EventListenerResize,
  ],
});
</script>
