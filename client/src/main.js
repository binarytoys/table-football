/*
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
*/

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import DashboardView from './components/dashboard';
import GamesView from './components/games';
import TeamsView from './components/teams';
import PlayersView from './components/players';
import Loader from './components/loader';
import AddPlayerDialog from './components/add-player-dlg';
import AddTeamDialog from './components/add-team-dlg'
import AddGameDialog from './components/add-game-dlg'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial);
Vue.use(Vuelidate);

new Vue({
  el: '#app',
  components: { App,
    DashboardView,
    GamesView,
    TeamsView,
    PlayersView,
    Loader,
    AddPlayerDialog,
    AddTeamDialog,
    AddGameDialog
  },
  template: '<App/>',
})
