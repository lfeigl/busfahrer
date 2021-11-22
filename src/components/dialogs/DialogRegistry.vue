<template>
  <div>
    <InvalidPlay />
    <JoinRejected />
    <ReceivedGulps />
    <RemoveRoom />
    <RoomRemoved />
    <Welcome />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvalidPlay from '@/components/dialogs/InvalidPlay.vue';
import JoinRejected from '@/components/dialogs/JoinRejected.vue';
import ReceivedGulps from '@/components/dialogs/ReceivedGulps.vue';
import RemoveRoom from '@/components/dialogs/RemoveRoom.vue';
import RoomRemoved from '@/components/dialogs/RoomRemoved.vue';
import Welcome from '@/components/dialogs/Welcome.vue';

export default Vue.extend({
  name: 'Dialogs',
  components: {
    InvalidPlay,
    JoinRejected,
    ReceivedGulps,
    RemoveRoom,
    RoomRemoved,
    Welcome,
  },
});
</script>
