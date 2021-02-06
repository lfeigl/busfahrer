<template>
  <v-app>
    <AppBar v-if="playerName"/>

    <v-main>
      <WelcomeDialog/>
      <router-view v-if="playerName"/>
    </v-main>

    <Footer v-if="playerName"/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import AppBar from '@/components/common/AppBar.vue';
import WelcomeDialog from '@/components/common/WelcomeDialog.vue';
import Footer from '@/components/common/Footer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
    WelcomeDialog,
    Footer,
  },
  computed: {
    ...vuex.mapState([
      'player',
    ]),
    playerName(): string {
      return this.player.name;
    },
  },
  watch: {
    playerName(): void {
      this.$socket.client.emit('setPlayer', this.player);
    },
  },
});
</script>

<style>
html {
  overflow-y: auto;
}
</style>
