<template>
  <div>
    <md-dialog :md-active.sync="active" :md-click-outside-to-close="false">
      <md-dialog-title>Add player</md-dialog-title>
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
            <label for="team">Team</label>
            <md-select v-model="team" name="team" id="team">
              <md-option value="1">Bern</md-option>
              <md-option value="2">Zurich</md-option>
              <md-option value="3">Basel</md-option>
              <md-option value="4">Geneva</md-option>
              <!--
                          <md-divider></md-divider>
                          <md-option value="0">Add Team</md-option>
                          -->
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
  props: ["showDlg"],
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
      const player = {name: this.name, surname: this.surname, team: this.team};

      console.log(player);
      const res = await this.request('/api/players', 'POST', player);

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
      return this.name.trim() && this.surname.trim()
    },
    team: {
      // getter
      get: function () {
        return this.teamInt;
      },
      // setter
      set: function (newValue) {
        if (newValue === '0') {
          this.teamInt = null; // reset current value
          // add new team
        } else {
          this.teamInt = newValue;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}
</style>
