<template>
  <v-dialog
    v-model="activeDialogs.roomRemoved"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="headline">
        Alle aussteigen!
      </v-card-title>

      <v-card-text>
        Der Ersteller der Buslinie ist ausgestiegen.
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          text
          @click="closeDialog"
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
  name: 'RoomRemovedDialog',
  computed: {
    ...vuex.mapState([
      'activeDialogs',
    ]),
  },
  methods: {
    ...vuex.mapMutations([
      'SET_ACTIVE_DIALOG',
    ]),
    closeDialog(): void {
      this.SET_ACTIVE_DIALOG({
        dialogName: 'roomRemoved',
        isActive: false,
      });
    },
  },
});
</script>
