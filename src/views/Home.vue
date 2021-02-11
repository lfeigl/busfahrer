<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col cols="12">
            <JoinRoomCard />
          </v-col>
          <v-col cols="12">
            <CreateRoomCard />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <PlayerCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import JoinRoomCard from '@/components/home/JoinRoomCard.vue';
import CreateRoomCard from '@/components/home/CreateRoomCard.vue';
import PlayerCard from '@/components/home/PlayerCard.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    JoinRoomCard,
    CreateRoomCard,
    PlayerCard,
  },
});
</script>
