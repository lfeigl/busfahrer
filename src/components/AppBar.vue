<template>
  <v-app-bar
    app
  >
    <v-app-bar-title class="headline">
      <v-btn
        icon
        large
        to="/"
      >
        <v-icon>mdi-bus</v-icon>
      </v-btn>
      Busfahrer
    </v-app-bar-title>

    <v-spacer/>

    <v-btn
      icon
      large
      @click="toggleTheme"
    >
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>

    <v-btn
      icon
      large
      to="/about"
    >
      <v-icon>mdi-information</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',
  methods: {
    toggleTheme(): void {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      const theme = this.$vuetify.theme.dark ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    },
  },
  created() {
    const theme = localStorage.getItem('theme');
    this.$vuetify.theme.dark = theme !== 'light';
  },
});
</script>
