import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/src/locale/de';
import Logo from '@/components/common/Logo.vue';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: 'de',
  },
  theme: {
    dark: true,
  },
  icons: {
    values: {
      logo: {
        component: Logo,
      },
    },
  },
});
