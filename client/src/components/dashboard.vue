<template>
  <div class="container">
    <h1 class="md-title" style="padding-left: 16px">DASHBOARD</h1>
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
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      games: [
        {
          id: 1,
          name: 'Bern',
          wins: 10,
          loses: 2,
          ratio: 10 / 2,
          goals: 15,
          lose: 10,
          diff: 15 - 10
        },
        {
          id: 2,
          name: 'Zurich',
          wins: 5,
          loses: 7,
          ratio: 5 / 7,
          goals: 8,
          lose: 12,
          diff: 8 - 12
        },
        {
          id: 3,
          name: 'Basel',
          wins: 6,
          loses: 6,
          ratio: 6 / 6,
          goals: 10,
          lose: 12,
          diff: 10 - 12
        },
        {
          id: 4,
          name: 'Geneva',
          wins: 7,
          loses: 6,
          ratio: 7 / 6,
          goals: 14,
          lose: 12,
          diff: 14 - 12
        },
      ],
    }
  }
}
</script>
