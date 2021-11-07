<template>
  <v-app>
    <AppBar
      v-if="playerName"
      id="app-bar"
    />

    <v-main>
      <DialogRegistry />
      <router-view v-if="playerName" />
    </v-main>

    <Footer
      v-if="playerName"
      id="footer"
    />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import AppBar from '@/components/common/AppBar.vue';
import Footer from '@/components/common/Footer.vue';
import DialogRegistry from '@/components/dialogs/DialogRegistry.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
    Footer,
    DialogRegistry,
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
