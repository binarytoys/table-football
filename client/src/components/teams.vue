<template>
  <div class="container">
    <div class="header">
      <h1 class="md-title" style="padding-left: 16px">TEAMS</h1>
    </div>
    <template v-if="loading">
      <loader style="flex: 1"></loader>
    </template>
    <template v-else>
      <template v-if="addDialog">
        <add-team-dialog
            :show-dlg="addDialog"
            @refresh="refreshTable"
            :editTeam="editTeam"></add-team-dialog>
      </template>

      <md-button class="md-fab md-accent top-fab" @click="showAddDialog()">
        <md-icon>add</md-icon>
      </md-button>
      <md-table v-model="teams" md-sort="name" md-sort-order="asc" md-card>
  <!--
        <md-table-toolbar>
          <h1 class="md-title">TEAMS</h1>
        </md-table-toolbar>
  -->

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Players">
            <span v-for="(player, index) of item.players" :key="player.surname">{{index > 0 ? ', ' : ' '}}{{ player }}</span>
          </md-table-cell>
        </md-table-row>
      </md-table>
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
import AddTeamDialog from "@/components/add-team-dlg"

export default {
  name: 'TeamsView',
  components: {Loader, AddTeamDialog},
  data() {
    return {
      loading: false,
      addDialog: false,
      editTeam: null,
      teams: [],
    }
  },
  inject: ['request'],
  methods: {

    showAddDialog() {
      this.editTeam = null;
      if (this.addDialog) {
        this.addDialog = false;
        setTimeout(()=>{this.addDialog = true;}, 100)
      } else {
        this.addDialog = true;
      }
    },
    async refreshTable() {
      console.log('REFRESH TEAMS');
      this.addDialog = false;
      this.loading = true;
      const teamsRaw = await this.request('/api/teams');
      console.log(teamsRaw);
      const players = await this.request('/api/players');
      console.log(players);
      this.teams = teamsRaw.map( item => {
        item['players'] = players.filter( player => player.team === item.id ).map( item => item.surname);
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
