<template>
  <Dialog
    name="joinRejected"
    title="Bitte nicht einsteigen!"
    :text="text"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import Dialog from '@/components/common/Dialog.vue';

export default Vue.extend({
  name: 'JoinRejected',
  components: {
    Dialog,
  },
  computed: {
    ...vuex.mapState([
      'dialogs',
    ]),
    rejectReason(): string {
      return this.dialogs.joinRejected.data;
    },
    text(): string {
      if (this.rejectReason === 'alreadyStarted') {
        return 'Der Bus ist bereits losgefahren.';
      }

      if (this.rejectReason === 'nonExistent') {
        return 'Diese Buslinie existiert nicht (mehr).';
      }

      return 'Ein unbekannter Fehler ist aufgetreten.';
    },
  },
});
</script>
