<template>
  <v-dialog
    v-model="isActive"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="headline">Willkommen!</v-card-title>
      <v-card-subtitle class="subtitle-1 pb-0">Bitte einsteigen!</v-card-subtitle>

      <v-card-text class="pb-0">
        <v-text-field
          v-model="playerName"
          autofocus
          counter
          maxlength="16"
          hint="Gib deinen Namen ein"
          persistent-hint
          hide-details="auto"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          text
          :disabled="isEmptyString(playerName)"
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
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      playerName: '',
    };
  },
  methods: {
    isEmptyString,
    ...vuex.mapMutations([
      'SET_PLAYER_NAME',
    ]),
    submitPlayerName(): void {
      const name = this.playerName.trim();
      this.SET_PLAYER_NAME(name);
      this.playerName = '';
    },
  },
});
</script>
