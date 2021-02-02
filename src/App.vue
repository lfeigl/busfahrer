<template>
  <v-app>
    <AppBar/>

    <v-main>
      <router-view v-if="playerName"/>
      <WelcomeDialog :is-active="!playerName"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import AppBar from '@/components/common/AppBar.vue';
import WelcomeDialog from '@/components/common/WelcomeDialog.vue';

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
