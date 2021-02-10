<template>
  <div class="container">
    <h1 class="md-title" style="padding-left: 16px">DASHBOARD</h1>
    <template v-if="loading">
      <loader style="flex: 1"></loader>
    </template>
    <template v-else>
      <md-table v-model="games" md-sort="name" md-sort-order="asc" md-card>
  <!--
        <md-table-toolbar>
          <h1 class="md-title">DASHBOARD</h1>
        </md-table-toolbar>
  -->

        <md-table-row slot="md-table-row" slot-scope="{ item }">
  <!--        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>-->
          <md-table-cell md-label="Team/Player name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Wins" md-sort-by="wins" md-numeric>{{ item.wins }}</md-table-cell>
          <md-table-cell md-label="Loses" md-sort-by="loses" md-numeric>{{ item.loses }}</md-table-cell>
          <md-table-cell md-label="Ratio" md-sort-by="ratio" md-numeric>{{ (item.ratio.toFixed(2) - item.ratio) === 0 ? item.ratio : item.ratio.toFixed(2) }}</md-table-cell>
          <md-table-cell md-label="GF" md-sort-by="goals" md-numeric>{{ item.goals }}</md-table-cell>
          <md-table-cell md-label="GA" md-sort-by="lose" md-numeric>{{ item.lose }}</md-table-cell>
          <md-table-cell md-label="GD" md-sort-by="diff" md-numeric>{{ item.diff}}</md-table-cell>
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
</style>

<script>
import Loader from "@/components/loader";

export default {
  name: 'DashboardView',
  components: {Loader},
  data() {
    return {
      loading: false,
      games: [],
    }
  },
  inject: ['request'],
  async mounted() {
    this.loading = true;
    const res = await this.request('/api/dashboard');
    console.log(res);
    this.games = res;
    this.loading = false;
  }

}
</script>
