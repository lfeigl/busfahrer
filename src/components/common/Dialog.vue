<template>
  <v-dialog
    v-model="isActive"
    persistent
    width="unset"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>

      <v-card-subtitle
        v-if="subtitle"
        class="text-h6"
      >
        {{ subtitle }}
      </v-card-subtitle>

      <v-card-text v-if="hasContentSlot">
        <slot name="content" />
      </v-card-text>
      <v-card-text v-else-if="text">
        {{ text }}
      </v-card-text>

      <v-card-actions v-if="hasButtonsSlot">
        <slot name="buttons" />
      </v-card-actions>
      <v-card-actions v-else>
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
  name: 'Dialog',
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...vuex.mapState([
      'dialogs',
    ]),
    isActive(): boolean {
      return this.dialogs[this.name].isActive;
    },
    hasContentSlot(): boolean {
      return !!this.$slots.content;
    },
    hasButtonsSlot(): boolean {
      return !!this.$slots.buttons;
    },
  },
  methods: {
    ...vuex.mapMutations([
      'SET_DIALOG_STATE',
    ]),
    closeDialog(): void {
      this.SET_DIALOG_STATE({
        dialogName: this.name,
        isActive: false,
      });
    },
  },
});
</script>
