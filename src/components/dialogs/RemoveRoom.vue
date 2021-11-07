<template>
  <Dialog
    name="removeRoom"
    title="Warnung"
    text="Wenn du aussteigst müssen alle Mitfahrer den Bus verlassen!"
  >
    <template #buttons>
      <v-btn
        color="primary"
        text
        @click="closeDialog"
      >
        Sitzenbleiben
      </v-btn>

      <v-spacer />

      <v-btn
        color="error"
        text
        @click="leaveRoom"
      >
        Aussteigen
      </v-btn>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import Dialog from '@/components/common/Dialog.vue';

export default Vue.extend({
  name: 'RemoveRoom',
  components: {
    Dialog,
  },
  methods: {
    ...vuex.mapMutations([
      'SET_DIALOG_STATE',
    ]),
    closeDialog(): void {
      this.SET_DIALOG_STATE({
        dialogName: 'removeRoom',
        isActive: false,
      });
    },
    leaveRoom(): void {
      this.closeDialog();
      this.$router.push({
        name: 'Home',
      });
    },
  },
});
</script>
