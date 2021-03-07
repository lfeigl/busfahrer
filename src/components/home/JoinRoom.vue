<template>
  <v-card>
    <v-card-title class="text-h5">
      🚍 Einsteigen
    </v-card-title>

    <v-card-text>
      Lass dir einen Link zusenden, um in einen Bus einzusteigen!
      <br>
      Beispiel: <code>{{ exampleJoinLink }}</code>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'JoinRoom',
  computed: {
    exampleJoinLink(): string {
      return window.location.origin + this.$router.resolve({
        name: 'Join',
        params: {
          roomId: '123e4567-e89b-12d3-a456-426614174000',
        },
      }).href;
    },
  },
});
</script>
