<template>
  <v-app>
    <AppBar/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/AppBar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
  },
});
</script>

<style>
html {
  overflow-y: auto;
}
</style>
