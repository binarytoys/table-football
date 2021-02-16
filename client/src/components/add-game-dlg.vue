<template>
  <div>
    <md-dialog :md-active.sync="active" :md-click-outside-to-close="false">
      <md-dialog-title>New Game</md-dialog-title>
      <md-dialog-content>
        <template v-if="loading">
          <loader style="flex: 1"></loader>
        </template>
        <template v-else>
          <div class="content">
            <div class="item">
              <md-field>
                <label for="homeSel">Home</label>
                <md-select v-model="teamHome" name="homeSel" id="homeSel">
                  <md-option v-for="item of teamsHome" :key="item.id" :value="item.id">{{item.name}}</md-option>
                </md-select>
              </md-field>
            </div>
<!--            <div class="gap"></div>-->
            <div class="item">
              <md-field>
                <label for="awaySel">Away</label>
                <md-select v-model="teamAway" name="awaySel" id="awaySel">
                  <md-option v-for="item of teamsAway" :key="item.id" :value="item.id">{{item.name}}</md-option>
                </md-select>
              </md-field>
            </div>

            <template v-if="started">
              <div class="result">
                <span style="font-size: 24px; font-weight: 600;">{{home}} : {{away}}</span>
              </div>
              <div class="item">
                <md-field>
                  <label for="homePlayers">Players</label>
                  <md-select v-model="playerHome" name="homePlayers" id="homePlayers">
                    <md-option v-for="item of playersHome" :key="item.id" :value="item.id">{{item.name}}</md-option>
                  </md-select>
                </md-field>
                <md-button class="md-primary" @click="addHome()">ADD GOAL</md-button>
              </div>
              <div class="item">
                <md-field>
                  <label for="awayPlayers">Players</label>
                  <md-select v-model="playerAway" name="awayPlayers" id="awayPlayers">
                    <md-option v-for="item of playersAway" :key="item.id" :value="item.id">{{item.name}}</md-option>
                  </md-select>
                </md-field>
                <md-button class="md-primary" @click="addAway()">ADD GOAL</md-button>
              </div>
              <div class="result">
                <md-list>
                  <md-list-item v-for="goal of goals" :key="goal.id">

                  </md-list-item>
                </md-list>
              </div>
            </template>
            <template v-else>
              <div class="result">
                <md-button class="md-primary" @click="beginGame()" :disabled="!canBegin">BEGIN GAME</md-button>
              </div>
            </template>
          </div>
        </template>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="active=false">{{started ? 'End game' : 'Close'}}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Loader from "@/components/loader";

export default {
  name: 'AddGameDialog',
  components: {Loader},
  props: ["showDlg"],
  data() {
    return {
      active: this.showDlg,
      loading: false,
      teamHomeInt: null,
      teamAwayInt: null,
      teams: [],
      teamsHome: [],
      teamsAway: [],
      playersHome: [],
      playersAway: [],
      players: [],
      playerHome: null,
      playerAway: null,
      goalsHome: [],
      goalsAway: [],
      goals: [],
      game: '',
      started: false,
      home: 0,
      away: 0
    }
  },
  inject: ['request'],
  computed: {
    canBegin() {
      return this.teamHomeInt && this.teamAwayInt;
    },
    teamHome: {
      get: function () {
        return this.teamHomeInt;
      },
      set: function (value) {
        this.teamHomeInt = value;
        this.playersHome = this.players.filter(item => item.team === this.teamHomeInt);
        this.playerHome = this.playersHome.length > 0 ? this.playersHome[0].id : null;
        this.buildTeams();
      }
    },
    teamAway: {
      get: function () {
        return this.teamAwayInt;
      },
      set: function (value) {
        this.teamAwayInt = value;
        this.playersAway = this.players.filter(item => item.team === this.teamAwayInt);
        this.playerAway = this.playersAway.length > 0 ? this.playersAway[0].id : null;
        this.buildTeams();
      }
    }
  },
  methods : {
    beginGame() {
      this.started = true;
    },
    async addHome() {
      const goal = { player: this.playerHome, team: this.teamHomeInt, game: this.game};

      console.log(goal);

      const res = await this.request('/api/goals', 'POST', goal)

      if (res && res.error) {
        console.error(`ERROR: ${res.error}`);
        this.error = true;
      } else {
        this.active = false;
        this.$emit('refresh');
      }

    },
    addAway() {

    },
    buildTeams() {
      console.log('Update lists');
      this.teamsHome = this.teams.filter( item => item.id !== this.teamAwayInt);
      this.teamsAway = this.teams.filter( item => item.id !== this.teamHomeInt);
      console.log(this.teamsHome);
      console.log(this.teamsAway);
    }
  },
  async mounted() {
    console.log('REFRESH TEAMS');
    this.loading = true;
    this.teams = await this.request('/api/teams');
    console.log(this.teams);
    this.players = await this.request('/api/players');
    console.log(this.players);
    this.buildTeams();
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}

.content {
  min-width: 432px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.viewport {
  width: 200px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: auto;
  //border: 1px solid rgba(#000, .12);
}

.item {
  width: 48%;
  margin-bottom: 2%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
}

.result {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-around;
}

.gap {
  min-width: 32px;
  min-height: 1px;
}
</style>
