<template>
  <div class="container">
    <div class="header">
      <h1 class="md-title" style="padding-left: 16px">PLAYERS</h1>
    </div>
    <md-button class="md-fab md-accent top-fab">
      <md-icon>add</md-icon>
    </md-button>
    <md-table v-model="players" md-sort="name" md-sort-order="asc" md-card>
<!--
      <md-table-toolbar>
        <h1 class="md-title">PLAYERS</h1>
      </md-table-toolbar>
-->

      <md-table-row slot="md-table-row" slot-scope="{ item }">
<!--        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>-->
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Surname" md-sort-by="surname">{{ item.surname }}</md-table-cell>
        <md-table-cell md-label="Team" md-sort-by="team">{{ item.team }}</md-table-cell>
        <md-table-cell md-label="Goals" md-sort-by="goals">{{ item.goals }}</md-table-cell>
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
  name: 'PlayersView',
  data() {
    return {
      players: [
        {
          id: 1,
          name: 'Thomas',
          surname: 'Partey',
          team: 'Bern'
        },
        {
          id: 2,
          name: 'Robert',
          surname: 'Lewandovski',
          team: 'Bern'
        },
        {
          id: 3,
          name: 'Lionel',
          surname: 'Messi',
          team: 'Zurich'
        },
        {
          id: 4,
          name: 'Cristiano',
          surname: 'Ronaldo',
          team: 'Geneva'
        },
        {
          id: 5,
          name: 'Kylian',
          surname: 'Lottin',
          team: 'Basel'
        },
        {
          id: 6,
          name: 'Bruno',
          surname: 'Fernandes',
          team: 'Luzern'
        },
        {
          id: 7,
          name: 'Erlin',
          surname: 'Haaland',
          team: 'Chur'
        },
        {
          id: 8,
          name: 'Ciro',
          surname: 'Immobile',
          team: 'Geneva'
        },
      ],
    }
  }
}
</script>