<template>
  <v-card>
    <v-card-title class="headline">
      <span>{{ player.name || '...' }}</span>

      <v-spacer/>

      <v-btn
        icon
        @click="resetPlayerName"
      >
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-row dense>
          <v-col
            v-for="(statGroup, index) in statGroups"
            :key="index"
            cols="12"
          >
            <v-row
              dense
              align="center"
            >
              <v-col cols="1">
                <span class="display-1">
                  {{ statGroup.icon }}
                </span>
              </v-col>
              <v-col
                v-for="stat in statGroup.stats"
                :key="stat.key"
                cols="5.5"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{ stat.value }}</v-list-item-title>
                    <v-list-item-subtitle class="subtitle-1">{{ stat.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-divider/>
          </v-col>
        </v-row>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import vuex from 'vuex';

export default Vue.extend({
  name: 'PlayerCard',
  computed: {
    ...vuex.mapState([
      'player',
    ]),
  },
  methods: {
    ...vuex.mapMutations([
      'SET_PLAYER_NAME',
    ]),
    resetPlayerName(): void {
      this.SET_PLAYER_NAME('');
    },
  },
  data() {
    return {
      statGroups: [
        {
          icon: '🚍',
          stats: [
            {
              key: 'totalFahrten',
              name: 'Fahrten',
              value: 0,
            },
            {
              key: 'totalBusfahrer',
              name: 'davon Busfahrer gewesen',
              value: 0,
            },
          ],
        },
        {
          icon: '🍺',
          stats: [
            {
              key: 'totalGulpsReceived',
              name: 'Schlücke bekommen',
              value: 0,
            },
            {
              key: 'averageGulpsReceived',
              name: '∅ Schlücke pro Fahrt',
              value: 0,
            },
          ],
        },
        {
          icon: '🍻',
          stats: [
            {
              key: 'totalGulpsDispensed',
              name: 'Schlücke verteilt',
              value: 0,
            },
            {
              key: 'averageGulpsDispensed',
              name: '∅ Schlücke pro Fahrt',
              value: 0,
            },
          ],
        },
      ],
    };
  },
});
</script>
