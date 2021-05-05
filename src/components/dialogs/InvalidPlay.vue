<template>
  <v-dialog
    v-model="activeDialogs.invalidPlay"
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
      'activeDialogs',
    ]),
  },
  methods: {
    ...vuex.mapMutations([
      'SET_ACTIVE_DIALOG',
    ]),
    closeDialog(): void {
      this.SET_ACTIVE_DIALOG({
        dialogName: 'invalidPlay',
        isActive: false,
      });
    },
  },
});
</script>
