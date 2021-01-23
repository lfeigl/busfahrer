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
          v-model="username"
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
          :disabled="username.replaceAll(' ', '').length === 0"
          @click="submitUsername"
        >
          Einsteigen
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';

export default Vue.extend({
  name: 'WelcomeDialog',
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      username: '',
    };
  },
  methods: {
    ...mapMutations([
      'setUsername',
    ]),
    submitUsername(): void {
      const username = this.username.trim();
      this.setUsername(username);
    },
  },
});
</script>
