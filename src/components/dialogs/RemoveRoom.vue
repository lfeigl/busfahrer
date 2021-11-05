<template>
  <v-dialog
    v-model="isActive"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="text-h5">
        Warnung
      </v-card-title>

      <v-card-text>
        Wenn du aussteigst müssen alle Mitfahrer den Bus verlassen!
      </v-card-text>

      <v-card-actions>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';

export default Vue.extend({
  name: 'RemoveRoom',
  computed: {
    ...vuex.mapState([
      'dialogs',
    ]),
    isActive(): boolean {
      return this.dialogs.removeRoom.isActive;
    },
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
