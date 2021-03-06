<template>
  <v-footer padless>
    <v-row no-gutters>
      <v-col
        cols="4"
        class="text-left"
      >
        <v-btn
          text
          :href="busfahrerApp.homepage"
          target="_blank"
        >
          <v-icon left>
            mdi-code-tags
          </v-icon>
          Contribute
        </v-btn>
      </v-col>

      <v-col
        cols="4"
        class="text-center"
      >
        <span class="text-body-2 font-weight-light">
          <strong>{{ busfahrerApp.name }} v{{ busfahrerApp.version }}</strong>
          by {{ busfahrerApp.author }}
        </span>
      </v-col>

      <v-col
        cols="4"
        class="text-right"
      >
        <v-btn
          text
          :href="aidPage"
          target="_blank"
        >
          <v-icon left>
            mdi-lifebuoy
          </v-icon>
          Alkohol? Kenn dein Limit.
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';

export default Vue.extend({
  name: 'Footer',
  data() {
    return {
      aidPage: 'https://www.kenn-dein-limit.de',
    };
  },
  computed: {
    ...vuex.mapState([
      'busfahrerApp',
    ]),
  },
});
</script>

<style scoped>
.text-center {
  padding-top: 6px;
}
</style>
