<template>
  <div>
    <md-dialog :md-active.sync="active" :md-click-outside-to-close="false">
      <md-dialog-title>Add Team</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Name</label>
          <md-input v-model="name"></md-input>
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="active=false">Close</md-button>
        <md-button class="md-primary" @click="createTeam()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>

export default {
  name: 'AddTeamDialog',
  props: ["showDlg", "editTeam"],
  data() {
    return {
      active: this.showDlg,
      error: false,
      name: '',
    }
  },
  inject: ['request'],
  methods : {
    async createTeam() {
      const team = {id: this.editTeam ? this.editTeam.id : null, name: this.name};

      console.log(team);
      const res = this.editTeam ? await this.request('/api/teams', 'PUT', team) : await this.request('/api/teams', 'POST', team);

      if (res && res.error) {
        console.error(`ERROR: ${res.error}`);
        this.error = true;
      } else {
        this.active = false;
        this.$emit('refresh');
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}
</style>
