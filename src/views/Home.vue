<template>
  <v-container fluid>
    <v-row>
      <v-col cols="7">

      </v-col>
      <v-col cols="5">
        <PlayerCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import PlayerCard from '@/components/PlayerCard.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    PlayerCard,
  },
});
</script>
