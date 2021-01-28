<template>
  <v-app>
    <AppBar/>

    <v-main>
      <router-view/>
      <WelcomeDialog :is-active="!player.name"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import AppBar from '@/components/AppBar.vue';
import WelcomeDialog from '@/components/WelcomeDialog.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
    WelcomeDialog,
  },
  computed: {
    ...vuex.mapState([
      'player',
    ]),
  },
});
</script>

<style>
html {
  overflow-y: auto;
}
</style>
