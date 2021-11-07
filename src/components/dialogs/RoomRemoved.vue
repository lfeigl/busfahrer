<template>
  <Dialog
    name="roomRemoved"
    title="Alle aussteigen!"
    text="Der Ersteller der Buslinie ist ausgestiegen."
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from '@/components/common/Dialog.vue';

export default Vue.extend({
  name: 'RoomRemoved',
  components: {
    Dialog,
  },
});
</script>
