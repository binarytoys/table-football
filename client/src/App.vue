<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Football table</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item @click="currentView = 'dashboard'">
            <md-icon>emoji_events</md-icon>
            <span class="md-list-item-text" :style="{fontWeight: currentView==='dashboard' ? 'bold' : 'normal'}">Dashboard</span>
          </md-list-item>

          <md-list-item @click="currentView = 'games'">
            <md-icon>sports_soccer</md-icon>
            <span class="md-list-item-text" :style="{fontWeight: currentView==='games' ? 'bold' : 'normal'}">Games</span>
          </md-list-item>

          <md-list-item @click="currentView = 'teams'">
            <md-icon>groups</md-icon>
            <span class="md-list-item-text" :style="{fontWeight: currentView==='teams' ? 'bold' : 'normal'}">Teams</span>
          </md-list-item>

          <md-list-item @click="currentView = 'players'">
            <md-icon>person</md-icon>
            <span class="md-list-item-text" :style="{fontWeight: currentView==='players' ? 'bold' : 'normal'}">Players</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <p>Content view: {{currentView}}</p>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  border: 1px solid rgba(#000, .12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      currentView: 'dashboard',
    }
  },
}
</script>
