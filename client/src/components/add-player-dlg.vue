<template>
  <div>
    <md-dialog :md-active.sync="active" :md-click-outside-to-close="false">
      <md-dialog-title>Add player</md-dialog-title>

<!--
        <md-field :class="getValidationClass('firstName')">
          <label for="name">Player Name</label>
          <md-input name="name" id="name" autocomplete="given-name" v-model="form.name"/>
          <span class="md-error" v-if="!$v.form.name.required">The first name is required</span>
          <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid first name</span>
        </md-field>
-->
      <md-dialog-content>
        <md-field>
          <label>Name</label>
          <md-input v-model="name"></md-input>
        </md-field>
        <md-field>
          <label>Surname</label>
          <md-input v-model="surname"></md-input>
        </md-field>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="active=false">Close</md-button>
        <md-button class="md-primary" @click="createPlayer()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
} from 'vuelidate/lib/validators';

export default {
  name: 'AddPlayerDialog',
  props: ["showDlg"],
  mixins: [validationMixin],
  data() {
    return {
      active: this.showDlg,
      name: '',
      surname: ''
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(2)
      },
    }
  },
  inject: ['request'],
  methods : {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    async createPlayer() {
      const {...player} = this.form;

      await this.request('/api/players', 'POST', player);

      // this.contacts.push(newContact)

      this.form.name = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.md-dialog ::v-deep.md-dialog-container {
  max-width: 768px;
}
</style>
