import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeApp from './App.vue';
import GameApp from '../app/App.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {path: '/:game', component: GameApp},
    {path: '/app', component: GameApp}
  ]
});

window.Vue = new Vue({
  router: router,
  render: h => {
    if (window.location.pathname === '/') {
      return h(HomeApp);
    } else {
      return h(GameApp);
    }
  },
}).$mount('#app')
