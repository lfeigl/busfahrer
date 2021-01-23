<template>
  <v-app>
    <AppBar/>

    <v-main>
      <router-view/>
      <WelcomeDialog :is-active="!user.name"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/AppBar.vue';
import WelcomeDialog from '@/components/WelcomeDialog.vue';
import vuex from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
    WelcomeDialog,
  },
  computed: {
    ...vuex.mapState([
      'user',
    ]),
  },
});
</script>

<style>
html {
  overflow-y: auto;
}
</style>
