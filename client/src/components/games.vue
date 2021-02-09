<template>
  <div class="container">
    <h1 class="md-title" style="padding-left: 16px">GAMES</h1>
    <md-table v-model="games" md-sort="name" md-sort-order="asc" md-card>
<!--
      <md-table-toolbar>
        <h1 class="md-title">GAMES</h1>
      </md-table-toolbar>
-->

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Home" md-sort-by="home">{{ item.home }}</md-table-cell>
        <md-table-cell md-label="Away" md-sort-by="away">{{ item.away }}</md-table-cell>
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
  name: 'GamesView',
  data() {
    return {
      games: [
        {
          id: 1,
          home: 'Bern',
          away: 'Zurich',
        },
        {
          id: 2,
          home: 'Basel',
          away: 'Bern',
        },
        {
          id: 3,
          home: 'Geneva',
          away: 'Friburg',
        },
        {
          id: 4,
          home: 'Luzern',
          away: 'Chur',
        }
      ],
    }
  }
}
</script>
