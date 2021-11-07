<template>
  <Dialog
    name="invalidPlay"
    title="Ungültiger Spielzug!"
    text="Du kannst diese Karte jetzt nicht ablegen."
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from '@/components/common/Dialog.vue';

export default Vue.extend({
  name: 'InvalidPlay',
  components: {
    Dialog,
  },
});
</script>
