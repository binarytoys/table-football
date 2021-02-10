<template>
  <div class="container">
    <div class="header">
      <h1 class="md-title" style="padding-left: 16px">TEAMS</h1>
    </div>
    <template v-if="loading">
      <loader style="flex: 1"></loader>
    </template>
    <template v-else>
      <md-button class="md-fab md-accent top-fab">
        <md-icon>add</md-icon>
      </md-button>
      <md-table v-model="teams" md-sort="name" md-sort-order="asc" md-card>
  <!--
        <md-table-toolbar>
          <h1 class="md-title">TEAMS</h1>
        </md-table-toolbar>
  -->

        <md-table-row slot="md-table-row" slot-scope="{ item }">
  <!--        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>-->
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Players">{{ item.players }}</md-table-cell>
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

export default {
  name: 'TeamsView',
  components: {Loader},
  data() {
    return {
      loading: false,
      teams: [],
    }
  },
  inject: ['request'],
  async mounted() {
    this.loading = true;
    const res = await this.request('/api/teams');
    console.log(res);
    this.teams = res;
    this.loading = false;
  }
}
</script>
