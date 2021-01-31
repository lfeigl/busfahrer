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
            counter
            maxlength="16"
            label="Dein Name"
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
                    <v-list-item-subtitle class="subtitle-1">{{ stat.title }}</v-list-item-subtitle>
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
  data() {
    return {
      isEditingPlayerName: false,
      playerName: '',
    };
  },
  computed: {
    ...vuex.mapState([
      'player',
      'playerStatsFormatting',
    ]),
    statGroups(): object[] {
      const groupsByName = {};

      Object.keys(this.player.stats).forEach((statKey: string) => {
        const stat = this.player.stats[statKey];
        const statFormatted = {
          key: statKey,
          value: stat.value,
          title: this.playerStatsFormatting.titles[statKey],
        };

        if (groupsByName[stat.groupName]) {
          groupsByName[stat.groupName].push(statFormatted);
        } else {
          groupsByName[stat.groupName] = [statFormatted];
        }
      });

      return Object.keys(groupsByName).map((groupName: string) => ({
        stats: groupsByName[groupName],
        icon: this.playerStatsFormatting.groupIcons[groupName],
      }));
    },
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
});
</script>
