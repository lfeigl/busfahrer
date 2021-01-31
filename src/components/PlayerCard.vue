<template>
  <v-card>
    <v-card-title class="headline">
      <v-container fluid>
        <v-row
          dense
          v-if="isEditingPlayerName"
        >
          <v-text-field
            v-model="playerName"
            autofocus
            counter
            maxlength="16"
            hint="Gib deinen Namen ein"
            persistent-hint
            hide-details="auto"
          />

          <v-btn
            icon
            :disabled="isEmptyString(playerName)"
            @click="submitPlayerName"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>

          <v-btn
            icon
            @click="isEditingPlayerName = false;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>

        <v-row
          dense
          v-else
        >
          <span>{{ player.name || '...' }}</span>

          <v-spacer/>

          <v-btn
            icon
            @click="editPlayerName"
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </v-row>
      </v-container>
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
import { isEmptyString } from '@/utils';

export default Vue.extend({
  name: 'PlayerCard',
  computed: {
    ...vuex.mapState([
      'player',
    ]),
  },
  methods: {
    isEmptyString,
    ...vuex.mapMutations([
      'SET_PLAYER_NAME',
    ]),
    editPlayerName(): void {
      this.playerName = this.player.name;
      this.isEditingPlayerName = true;
    },
    submitPlayerName(): void {
      this.SET_PLAYER_NAME(this.playerName);
      this.isEditingPlayerName = false;
    },
  },
  data() {
    return {
      isEditingPlayerName: false,
      playerName: '',
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
