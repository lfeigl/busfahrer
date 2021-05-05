<template>
  <div>
    <InvalidPlayDialog />
    <RemoveRoomDialog />
    <RoomRemovedDialog />
    <WelcomeDialog />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvalidPlayDialog from './InvalidPlayDialog.vue';
import RemoveRoomDialog from './RemoveRoomDialog.vue';
import RoomRemovedDialog from './RoomRemovedDialog.vue';
import WelcomeDialog from './WelcomeDialog.vue';

export default Vue.extend({
  name: 'Dialogs',
  components: {
    InvalidPlayDialog,
    RemoveRoomDialog,
    RoomRemovedDialog,
    WelcomeDialog,
  },
});
</script>
