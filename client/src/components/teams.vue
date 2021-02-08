<template>
  <div class="container">
    <md-table v-model="teams" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">TEAMS</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
<!--        <md-table-cell md-label="Surname" md-sort-by="surname">{{ item.surname }}</md-table-cell>-->
      </md-table-row>
    </md-table>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 16px;
  display: flex;
  flex-direction: column;
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
