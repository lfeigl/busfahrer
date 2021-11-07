<template>
  <div>
    <InvalidPlay />
    <JoinRejected />
    <RemoveRoom />
    <RoomRemoved />
    <Welcome />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvalidPlay from './InvalidPlay.vue';
import JoinRejected from './JoinRejected.vue';
import RemoveRoom from './RemoveRoom.vue';
import RoomRemoved from './RoomRemoved.vue';
import Welcome from './Welcome.vue';

export default Vue.extend({
  name: 'Dialogs',
  components: {
    InvalidPlay,
    JoinRejected,
    RemoveRoom,
    RoomRemoved,
    Welcome,
  },
});
</script>
