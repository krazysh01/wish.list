<template>
  <div id="app">
    <b-navbar type="dark" variant="info" id="nav">
      <b-navbar-brand href="#" v-on:click.stop="$router.push({path:'/lists'})">WishList</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button v-if="$router.currentRoute.path === '/lists'" v-on:click="$router.push({path:'/list/'+uuid.v4()})"><b-icon icon="plus"></b-icon><span>Create</span></b-button>
      </b-navbar-nav>
    </b-navbar>
    <b-container fluid="sm">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import {uuid} from 'vue-uuid';

export default {
  name: 'App',
  data() {
    return {uuid}
  },
  methods: {
    listSelected(event) {
      console.log(event);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  margin-bottom: 10px;
}
</style>
