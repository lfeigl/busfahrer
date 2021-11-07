<template>
  <Dialog
    name="welcome"
    title="Willkommen zu Busfahrer!"
    subtitle="Bitte einsteigen!"
  >
    <template #content>
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
    </template>

    <template #buttons>
      <v-spacer />
      <v-btn
        color="primary"
        text
        :disabled="isEmptyString(playerName) || !isOfLegalAge"
        @click="submitPlayerName"
      >
        Einsteigen
      </v-btn>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import { isEmptyString } from '@/utils';
import Dialog from '@/components/common/Dialog.vue';

export default Vue.extend({
  name: 'Welcome',
  components: {
    Dialog,
  },
  data() {
    return {
      playerName: '',
      isOfLegalAge: false,
    };
  },
  methods: {
    isEmptyString,
    ...vuex.mapMutations([
      'SET_PLAYER_NAME',
      'SET_DIALOG_STATE',
    ]),
    submitPlayerName(): void {
      this.SET_PLAYER_NAME(this.playerName.trim());
      this.playerName = '';
      this.SET_DIALOG_STATE({
        dialogName: 'welcome',
        isActive: false,
      });
    },
  },
});
</script>
