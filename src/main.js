import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin, LayoutPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ListViewer from "@/components/ListViewer";
import ListEditor from "@/components/ListEditor";

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    {
      path: '/lists',
      component: ListViewer,
    },
    { path: '/list/:id', component: ListEditor, props:true},
    { path: '*', redirect: '/lists'}
  ]
})

const store = new Vuex.Store({
  state: {
    lists: []
  },
  getters: {
    getListById: (state) => (id) => {
      return state.lists.find(list => list.id === id);
    },
    listCount: (state) => {
      return state.lists.length;
    }
  },
  mutations: {
    deleteList (state, id) {
      const index = state.lists.findIndex(_list => _list.id === id);
      state.lists.splice(index, 1);
    },
    addList (state, details) {
      if(!state.lists.find(_list => _list.id === details.id))
        state.lists.push(details);
    },
    updateListName (state, listDetails) {
      const list = state.lists.find(_list => _list.id === listDetails.id);
      list.name = listDetails.name;
    },
    addItemToList (state, itemDetails) {
      const list = state.lists.find(_list => _list.id === itemDetails.id);
      if(list)
        list.items.push(itemDetails.item)
    }
  }
})

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
