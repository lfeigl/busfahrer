<template>
  <v-dialog
    v-model="activeDialogs.welcome"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="text-h4">
        Willkommen zu Busfahrer!
      </v-card-title>

      <v-card-subtitle class="text-h6">
        Bitte einsteigen!
      </v-card-subtitle>

      <v-card-text>
        <v-text-field
          v-model="playerName"
          counter
          maxlength="16"
          label="Dein Name"
          hide-details="auto"
        />

        <v-checkbox
          v-model="isOfLegalAge"
          label="Ich darf in meinem Land legal Alkohol konsumieren."
        />

        <v-alert
          class="mt-4"
          type="success"
          outlined
        >
          Es werden <strong>keine</strong> personenbezogene Daten erhoben
          und <strong>keine</strong> Cookies verwendet.
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          :disabled="isEmptyString(playerName) || !isOfLegalAge"
          @click="submitPlayerName"
        >
          Einsteigen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { isEmptyString } from '@/utils';

export default Vue.extend({
  name: 'WelcomeDialog',
  data() {
    return {
      playerName: '',
      isOfLegalAge: false,
    };
  },
  computed: {
    ...vuex.mapState([
      'activeDialogs',
    ]),
  },
  methods: {
    isEmptyString,
    ...vuex.mapMutations([
      'SET_PLAYER_NAME',
      'SET_ACTIVE_DIALOG',
    ]),
    submitPlayerName(): void {
      this.SET_PLAYER_NAME(this.playerName.trim());
      this.playerName = '';
      this.SET_ACTIVE_DIALOG({
        dialogName: 'welcome',
        isActive: false,
      });
    },
  },
});
</script>
