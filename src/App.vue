<template>
  <v-app>
    <AppBar/>

    <v-main>
      <router-view/>
      <WelcomeDialog :is-active="welcomeDialogIsActive"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/AppBar.vue';
import WelcomeDialog from '@/components/WelcomeDialog.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
    WelcomeDialog,
  },
  data() {
    return {
      welcomeDialogIsActive: true,
    };
  },
});
</script>

<style>
html {
  overflow-y: auto;
}
</style>
