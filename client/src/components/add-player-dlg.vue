<template>
  <div>
    <md-dialog :md-active.sync="active" :md-click-outside-to-close="false">
      <md-dialog-title>{{this.editPlayer ? "Edit PLayer" : "Add player"}}</md-dialog-title>
      <md-dialog-content>
          <md-field>
            <label>Name</label>
            <md-input v-model="name"></md-input>
          </md-field>
          <md-field>
            <label>Surname</label>
            <md-input v-model="surname"></md-input>
          </md-field>
          <md-field>
            <label for="teamSel">Team</label>
            <md-select v-model="team" name="teamSel" id="teamSel">
              <md-option v-for="item of teams" :key="item.id" :value="item.id">{{item.name}}</md-option>
            </md-select>
          </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="active=false">Close</md-button>
        <md-button class="md-primary" @click="createPlayer" :disabled="!canCreate">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog-alert
        :md-active.sync="error"
        :md-click-outside-to-close="false"
        md-content="Player already exist"
        md-confirm-text="OK" />

  </div>
</template>

<script>
export default {
  name: 'AddPlayerDialog',
  props: ["showDlg", "editPlayer", "teams"],
  data() {
    return {
      active: this.showDlg,
      error: false,
      name: '',
      surname: '',
      teamInt: null
    }
  },
  inject: ['request'],
  methods : {
    async createPlayer() {
      const player = {id: this.editPlayer ? this.editPlayer.id : null, name: this.name, surname: this.surname, team: this.team};

      console.log(player);
      const res = this.editPlayer ? await this.request('/api/players', 'PUT', player) : await this.request('/api/players', 'POST', player);

      if (res && res.error) {
        console.error(`ERROR: ${res.error}`);
        this.error = true;
      } else {
        this.active = false;
        this.$emit('refresh');
      }
    }
  },
  computed : {
    canCreate() {
      return this.name.trim() || this.surname.trim();
    },
    team: {
      // getter
      get: function () {
        return this.teamInt;
      },
      // setter
      set: function (value) {
        if (value === '0') {
          this.teamInt = null; // reset current value
          // add new team
        } else {
          console.log(`selected ${value}`)
          this.teamInt = value;
        }
      }
    }
  },
  async mounted() {
    if (this.editPlayer) {
      this.name = this.editPlayer.name;
      this.surname = this.editPlayer.surname;
      this.team = this.editPlayer.team;
    }
  }
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}
</style>
