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
  props: ["showDlg"],
  data() {
    return {
      active: this.showDlg,
      name: '',
    }
  },
  inject: ['request'],
  methods : {
    async createTeam() {
      const {...team} = this.form;

      await this.request('/api/teams', 'POST', team);

      this.form.name = '';
    }
  },
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}
</style>
