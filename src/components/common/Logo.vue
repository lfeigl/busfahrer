<template>
  <v-img
    contain
    :src="require(`@/assets/${filename}`)"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Logo',
  data() {
    return {
      filename: 'logo.svg',
    };
  },
});
</script>
