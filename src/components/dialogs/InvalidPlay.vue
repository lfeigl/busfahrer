<template>
  <v-dialog
    v-model="isActive"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="text-h5">
        Ungültiger Spielzug!
      </v-card-title>

      <v-card-text>
        Du kannst diese Karte jetzt nicht ablegen.
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
  name: 'InvalidPlay',
  computed: {
    ...vuex.mapState([
      'dialogs',
    ]),
    isActive(): boolean {
      return this.dialogs.invalidPlay.isActive;
    },
  },
  methods: {
    ...vuex.mapMutations([
      'SET_DIALOG_STATE',
    ]),
    closeDialog(): void {
      this.SET_DIALOG_STATE({
        dialogName: 'invalidPlay',
        isActive: false,
      });
    },
  },
});
</script>
