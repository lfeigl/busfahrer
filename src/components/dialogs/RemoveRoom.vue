<template>
  <v-dialog
    v-model="activeDialogs.removeRoom"
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
      'activeDialogs',
    ]),
  },
  methods: {
    ...vuex.mapMutations([
      'SET_ACTIVE_DIALOG',
    ]),
    closeDialog(): void {
      this.SET_ACTIVE_DIALOG({
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
