<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <CreateRoomCard/>
      </v-col>
      <v-col cols="6">
        <PlayerCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CreateRoomCard from '@/components/CreateRoomCard.vue';
import PlayerCard from '@/components/PlayerCard.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    CreateRoomCard,
    PlayerCard,
  },
});
</script>
