<template>
  <div class="container">
    <div class="header">
      <h1 class="md-title" style="padding-left: 16px">PLAYERS</h1>
    </div>
    <template v-if="loading">
      <loader style="flex: 1"></loader>
    </template>
    <template v-else>
      <template v-if="addDialog">
        <add-player-dialog :show-dlg="addDialog"></add-player-dialog>
      </template>
      <md-button class="md-fab md-accent top-fab" @click="addDialog = true" v-if="!isHistory">
        <md-icon>add</md-icon>
      </md-button>
      <md-table v-model="players" md-sort="name" md-sort-order="asc" md-card>
        <!--
              <md-table-toolbar>
                <h1 class="md-title">PLAYERS</h1>
              </md-table-toolbar>
        -->
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!--        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>-->
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Surname" md-sort-by="surname">{{ item.surname }}</md-table-cell>
          <md-table-cell md-label="Team" md-sort-by="team">{{ item.team }}</md-table-cell>
          <md-table-cell md-label="Goals" md-sort-by="goals">{{ item.goals }}</md-table-cell>
          <md-table-cell md-label="" style="width: 64px;">
            <md-button class="md-icon-button" @click="showHistory(item)">
              <md-icon>history</md-icon>
              <md-tooltip md-direction="top">Games</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>

      <md-drawer class="md-right" :md-active.sync="isHistory">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Games history for {{historyFor.name}} {{historyFor.surname}}</span>
        </md-toolbar>

        <template v-if="loadingHistory">
          <loader style="flex: 1"></loader>
        </template>
        <template v-else>
          <md-list>
            <md-list-item v-for="game of historyGames" :key="game.home" style="display: flex; justify-content: space-between">
              <span class="md-list-item-text">{{game.home}} : {{game.away}}</span>
              <span class="md-list-item-text">{{game.goals}}</span>
            </md-list-item>
          </md-list>
        </template>
      </md-drawer>

    </template>
  </div>

</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.top-fab {
  position: absolute;
  right: 16px;
  z-index: 100;
}
</style>

<script>
import Loader from "@/components/loader";
import AddPlayerDialog from "@/components/add-player-dlg"
export default {
  name: 'PlayersView',
  components: {Loader, AddPlayerDialog},
  data() {
    return {
      loading: false,
      addDialog: false,
      isHistory: false,
      players: [],
      historyFor: {name: '', surname: ''},
      loadingHistory: false,
      historyGames: [{home: 'Bern', away: 'Basel', goals: 1}]
    }
  },
  inject: ['request'],
  methods : {
    showHistory(player) {
      this.historyFor = player;
      this.isHistory = true;
      (async ()=> {
        this.loadingHistory = true;
        // this.historyGames = await this.request(`/api/players/history/${player.id}`);
        this.loadingHistory = false;
      })();
    }
  },
  async mounted() {
    this.loading = true;
    const res = await this.request('/api/players');
    console.log(res);
    this.players = res;
    this.loading = false;
  }
}
</script>
