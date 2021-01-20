<template>
  <v-app-bar
    app
  >
    <v-app-bar-title>
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
});
</script>
