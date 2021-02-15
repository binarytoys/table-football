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
        <add-player-dialog
            :show-dlg="addDialog"
            :teams="teams"
            @refresh="refreshTable"
            :editPlayer="editPlayer"></add-player-dialog>
      </template>
      <md-dialog-confirm
          :md-active.sync="deletePlayerCmd"
          md-title="Delete player"
          :md-content="`Do you want to delete player: ${delPlayer.name} ${delPlayer.surname}?`"
          md-confirm-text="Agree"
          md-cancel-text="Cancel"
          @md-confirm="onDelete" />
      <md-button class="md-fab md-accent top-fab" @click="showAddDialog()" v-if="!isHistory">
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
          <md-table-cell md-label="Team" md-sort-by="team">{{ item.teamName }}</md-table-cell>
          <md-table-cell md-label="Goals" md-sort-by="goals">{{ item.goals }}</md-table-cell>

          <md-table-cell md-label="" style="width: 48px;">
            <div class="action-cell">
              <md-button class="md-icon-button" @click="showEditDialog(item)">
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="top">Edit {{item.name}} {{item.surname}}</md-tooltip>
              </md-button>
              <md-button class="md-icon-button" @click="showDelDialog(item)">
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="top">Delete {{item.name}} {{item.surname}}</md-tooltip>
              </md-button>
              <md-button class="md-icon-button" @click="showHistory(item)">
                <md-icon>history</md-icon>
                <md-tooltip md-direction="top">Games</md-tooltip>
              </md-button>
            </div>
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

.action-cell {
  display: flex;
  flex-direction: row;
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
      teams: [],
      delPlayer: {name: '', surname: '', id: ''},
      deletePlayerCmd: false,
      editPlayer: null,
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
    },
    showAddDialog() {
      this.editPlayer = null;
      if (this.addDialog) {
        this.addDialog = false;
        setTimeout(()=>{this.addDialog = true;}, 100)
      } else {
        this.addDialog = true;
      }
    },
    showEditDialog(item) {
      this.editPlayer = {...item};
      console.log(this.editPlayer);
      if (this.addDialog) {
        this.addDialog = false;
        setTimeout(()=>{this.addDialog = true;}, 100)
      } else {
        this.addDialog = true;
      }
    },
    showDelDialog(item) {
      this.delPlayer = item;
      if (this.deletePlayerCmd) {
        this.deletePlayerCmd = false;
        setTimeout(()=>{this.deletePlayerCmd = true;}, 100)
      } else {
        this.deletePlayerCmd = true;
      }
    },
    async onDelete () {
      console.log(`DELETE: ${this.delPlayer.id}`);
      await this.request(`/api/players/${this.delPlayer.id}`, 'DELETE');
      await this.refreshTable();
    },
    async refreshTable() {
      console.log('REFRESH');
      this.addDialog = false;
      this.loading = true;
      const playersRaw = await this.request('/api/players');
      console.log(playersRaw);
      this.teams = await this.request('/api/teams');
      console.log(this.teams);
      this.players = playersRaw.map( item => {
        const found = this.teams.find( team => team.id === item.team );
        if (found) {
          item.team = found.id;
          item.teamName = found.name;

        }
        return item;
      });
      this.loading = false;
    }
  },
  async mounted() {
    await this.refreshTable();
  }
}
</script>
