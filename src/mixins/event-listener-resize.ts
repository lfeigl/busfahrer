import Vue from 'vue';
import debounce from 'debounce';
import EventBus from '@/event-bus';

export default Vue.extend({
  mounted() {
    window.addEventListener('resize', this.debounceResizeEvent);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceResizeEvent);
  },
  methods: {
    debounceResizeEvent: debounce(() => {
      EventBus.$emit('resized');
    }, 100),
  },
});
