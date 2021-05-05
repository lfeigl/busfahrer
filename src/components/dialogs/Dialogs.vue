<template>
  <div>
    <InvalidPlay />
    <RemoveRoom />
    <RoomRemoved />
    <Welcome />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InvalidPlay from './InvalidPlay.vue';
import RemoveRoom from './RemoveRoom.vue';
import RoomRemoved from './RoomRemoved.vue';
import Welcome from './Welcome.vue';

export default Vue.extend({
  name: 'Dialogs',
  components: {
    InvalidPlay,
    RemoveRoom,
    RoomRemoved,
    Welcome,
  },
});
</script>
