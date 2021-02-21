<template>
  <div>
    <md-dialog :md-active.sync="active" :md-click-outside-to-close="false">
      <md-dialog-title>{{this.editTeam ? "Edit Team" : "Add Team"}}</md-dialog-title>
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

    <md-dialog-alert
        :md-active.sync="error"
        :md-click-outside-to-close="false"
        :md-content="`${errorMsg}`"
        md-confirm-text="OK" />
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
      errorMsg: '',
      name: '',
    }
  },
  inject: ['request'],
  methods : {
    showError(msg) {
      this.errorMsg = msg;
      if (this.error) {
        this.error = false;
        setTimeout(() => {this.error = true;}, 100);
      } else {
        this.error = true;
      }
    },
    async createTeam() {
      const team = {id: this.editTeam ? this.editTeam.id : null, name: this.name};

      console.log(team);
      const res = this.editTeam ? await this.request('/api/teams', 'PUT', team) : await this.request('/api/teams', 'POST', team);

      if (res && res.error) {
        console.error(`ERROR: ${res.error}`);
        this.showError(res.error);
      } else {
        this.active = false;
        this.$emit('refresh');
      }
    }
  },
  async mounted() {
    if (this.editTeam) {
      this.name = this.editTeam.name;
    }
  }
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}
</style>
