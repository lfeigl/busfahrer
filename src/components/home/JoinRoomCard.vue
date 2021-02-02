<template>
  <v-card>
    <v-card-title class="headline">
      🚍 Einsteigen
    </v-card-title>

    <v-card-text>
      Lass dir einen Link zusenden, um in einen Bus einzusteigen!
      <br/>
      Beispiel: <code>{{ exampleJoinLink }}</code>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'JoinRoomCard',
  computed: {
    exampleJoinLink(): string {
      return window.location.origin + this.$router.resolve({
        name: 'Join',
        params: {
          roomId: 'busfahrt',
        },
      }).href;
    },
  },
});
</script>
