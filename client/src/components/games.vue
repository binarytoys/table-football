<template>
  <div class="container">
    <div class="header">
      <h1 class="md-title" style="padding-left: 16px">GAMES</h1>
    </div>
    <md-button class="md-fab md-accent top-fab">
      <md-icon>add</md-icon>
    </md-button>
    <md-table v-model="games" md-sort="name" md-sort-order="asc" md-card>
<!--
      <md-table-toolbar>
        <h1 class="md-title">GAMES</h1>
      </md-table-toolbar>
-->

      <md-table-row slot="md-table-row" slot-scope="{ item }">
<!--        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>-->
        <md-table-cell md-label="Home" md-sort-by="home">{{ item.home }}</md-table-cell>
        <md-table-cell md-label="Away" md-sort-by="away">{{ item.away }}</md-table-cell>
        <md-table-cell md-label="Result" md-sort-by="away">{{ item.result }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
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
export default {
  name: 'GamesView',
  data() {
    return {
      games: [
        {
          id: 1,
          home: 'Bern',
          away: 'Zurich',
          result: '3:1'
        },
        {
          id: 2,
          home: 'Basel',
          away: 'Bern',
          result: '2:3'
        },
        {
          id: 3,
          home: 'Geneva',
          away: 'Friburg',
          result: '1:0'
        },
        {
          id: 4,
          home: 'Luzern',
          away: 'Chur',
          result: '1:1'
        }
      ],
    }
  }
}
</script>
