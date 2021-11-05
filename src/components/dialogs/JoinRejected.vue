<template>
  <v-dialog
    v-model="isActive"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="text-h5">
        Bitte nicht einsteigen!
      </v-card-title>

      <v-card-text v-if="rejectReason === 'alreadyStarted'">
        Der Bus ist bereits losgefahren.
      </v-card-text>
      <v-card-text v-else-if="rejectReason === 'nonExistent'">
        Die Buslinie existiert nicht mehr.
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="closeDialog"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';

export default Vue.extend({
  name: 'JoinRejected',
  computed: {
    ...vuex.mapState([
      'dialogs',
    ]),
    isActive(): boolean {
      return this.dialogs.joinRejected.isActive;
    },
    rejectReason(): string {
      return this.dialogs.joinRejected.data;
    },
  },
  methods: {
    ...vuex.mapMutations([
      'SET_DIALOG_STATE',
    ]),
    closeDialog(): void {
      this.SET_DIALOG_STATE({
        dialogName: 'joinRejected',
        isActive: false,
      });
    },
  },
});
</script>
