<template>
  <div class="container">
    <div class="header">
      <h1 class="md-title" style="padding-left: 16px">TEAMS</h1>
    </div>
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
  name: 'TeamsView',
  data() {
    return {
      teams: [
        {
          id: 1,
          name: 'Bern'
        },
        {
          id: 2,
          name: 'Zurich'
        },
        {
          id: 3,
          name: 'Basel'
        },
        {
          id: 4,
          name: 'Bern'
        },
        {
          id: 5,
          name: 'Geneva'
        },
        {
          id: 6,
          name: 'Friburg'
        },
        {
          id: 7,
          name: 'Luzern',
        },
        {
          id: 8,
          name: 'Chur'
        },
      ],
    }
  }
}
</script>
