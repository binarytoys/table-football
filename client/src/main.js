/*
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
*/

import Vue from 'vue'
import App from './App.vue'
import DashboardView from './components/dashboard'
import GamesView from './components/games'
import TeamsView from './components/teams'
import PlayersView from './components/players'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

new Vue({
  el: '#app',
  components: { App, DashboardView, GamesView, TeamsView, PlayersView },
  template: '<App/>',
})
