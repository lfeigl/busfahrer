<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-row>
          <v-col cols="12">
            <JoinRoom />
          </v-col>
          <v-col cols="12">
            <CreateRoom />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <Player />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import JoinRoom from '@/components/home/JoinRoom.vue';
import CreateRoom from '@/components/home/CreateRoom.vue';
import Player from '@/components/home/Player.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    JoinRoom,
    CreateRoom,
    Player,
  },
});
</script>
