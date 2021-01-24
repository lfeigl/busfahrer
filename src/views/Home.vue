<template>
  <v-container fluid>
    <v-row>
      <v-col cols="7">

      </v-col>
      <v-col cols="5">
        <UserCard/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import UserCard from '@/components/UserCard.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    UserCard,
  },
});
</script>
