<template>
  <v-dialog
    v-model="isActive"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="text-h5">
        Alle aussteigen!
      </v-card-title>

      <v-card-text>
        Der Ersteller der Buslinie ist ausgestiegen.
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
  name: 'RoomRemoved',
  computed: {
    ...vuex.mapState([
      'dialogs',
    ]),
    isActive(): boolean {
      return this.dialogs.roomRemoved.isActive;
    },
  },
  methods: {
    ...vuex.mapMutations([
      'SET_DIALOG_STATE',
    ]),
    closeDialog(): void {
      this.SET_DIALOG_STATE({
        dialogName: 'roomRemoved',
        isActive: false,
      });
    },
  },
});
</script>
