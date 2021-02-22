import Vue from 'vue';
import EventBus from '@/event-bus';

export default Vue.extend({
  data() {
    return {
      playingCardMaxWidth: 0,
      containerId: '',
      additionalOffset: 0,
      playingCards: [],
    };
  },
  created() {
    EventBus.$on('resized', () => {
      this.playingCardMaxWidth = this.calcPlayingCardMaxWidth();
    });
  },
  mounted() {
    this.playingCardMaxWidth = this.calcPlayingCardMaxWidth();
  },
  methods: {
    calcElementContentWidth(element: HTMLElement): number {
      const style = window.getComputedStyle(element);
      const width = parseFloat(style.width);
      const xPadding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const xBorder = parseFloat(style.borderLeft) + parseFloat(style.borderRight);
      const xMargin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);

      return Math.round(width - xPadding - xBorder - xMargin);
    },
    calcPlayingCardMaxWidth(): number {
      const heightWidthRatio = 1.4;
      const rowCount = this.playingCards.length;
      const appBar = document.getElementById('app-bar');
      const footer = document.getElementById('footer');
      const container = document.getElementById(this.containerId);

      // playing cards y-margins + column y-paddings + additional offset + buffer
      const heightOffset = (rowCount * 4 * 2) + (12 * 2) + this.additionalOffset + 4;

      if (appBar && footer && container) {
        const containerWidth = this.calcElementContentWidth(container);
        const mainContainerHeight = window.innerHeight - appBar.offsetHeight - footer.offsetHeight;
        const maxPlayingCardHeight = (mainContainerHeight - heightOffset) / rowCount;
        const maxPlayingCardWidth = Math.round(maxPlayingCardHeight / heightWidthRatio);

        return maxPlayingCardWidth <= containerWidth ? maxPlayingCardWidth : containerWidth;
      }

      return 0;
    },
  },
});
