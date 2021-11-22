<template>
  <Dialog
    name="receivedGulps"
    title="🍺 Prost!"
  >
    <template #content>
      <div v-if="data">
        <span class="text-h6 font-weight-light white--text">{{ data.playerName }}</span>
        lässt dich
        <span class="text-h4 font-weight-light blue--text">{{ data.gulps }}</span>
        <span v-if="data.gulps === 1">Schluck</span>
        <span v-else>Schlücke</span>
        trinken.
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';
import Dialog from '@/components/common/Dialog.vue';
import { ReceivedGulpsPayload } from '@/types';

export default Vue.extend({
  name: 'ReceivedGulps',
  components: {
    Dialog,
  },
  computed: {
    ...vuex.mapState([
      'dialogs',
    ]),
    data(): ReceivedGulpsPayload | null {
      return this.dialogs.receivedGulps.data;
    },
  },
});
</script>
