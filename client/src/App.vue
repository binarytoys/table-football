<template>
  <div class="page-container">
    <md-app style="overflow-x: hidden;">
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

      <md-app-content style="height: 100%;">
<!--        <p>Content view: {{currentView}}</p>-->
        <template v-if="currentView === 'dashboard'">
          <dashboard-view></dashboard-view>
        </template>
        <template v-else-if="currentView === 'games'">
          <games-view></games-view>
        </template>
        <template v-else-if="currentView === 'teams'">
          <teams-view></teams-view>
        </template>
        <template v-else-if="currentView === 'players'">
          <players-view style="overflow-x: hidden;"></players-view>
        </template>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, .12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
import DashboardView from "@/components/dashboard";
import GamesView from "@/components/games";
import TeamsView from "@/components/teams";
import PlayersView from "@/components/players";
const  apiRoot = 'http://localhost:5900';

export default {
  name: 'App',
  components: {PlayersView, TeamsView, GamesView, DashboardView},
  data() {
    return {
      currentView: 'dashboard',
    }
  },
  provide: {
    request: async (url, method = 'GET', data = null) => {
      try {
        console.log(`${method} ${url} ${data ? JSON.stringify(data) : ''}`);
        const headers = {};
        let body;

        if (data) {
          headers['Content-Type'] = 'application/json'
          body = JSON.stringify(data)
        }

        const response = await fetch(apiRoot + url, {
          method,
          headers,
          body
        })
        if (response.ok) {
          return await response.json();
        } else {
          return new Promise((resolve) => {resolve({error: response.status});});
        }

      } catch (e) {
        console.warn('Error:', e.message)
        return new Promise((resolve) => {resolve([]);});
      }
    }
  }
}
</script>
