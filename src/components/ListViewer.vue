<template>
  <b-list-group v-if="listCount !== 0">
    <b-list-group-item v-for="list of lists" :key="list.id" href="#" @click="$router.push({path: `/list/${list.id}`})" class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h4>{{list.name}}</h4>
        <b-button @click.stop="deleteList(list.id)" variant="danger"><b-icon icon="trash" href="#" variant="dark"></b-icon></b-button>
      </div>
    </b-list-group-item>
  </b-list-group>
  <div v-else class="d-flex flex-column justify-content-center h-100">
    <p>
      No Lists Found, how about you try creating one
    </p>
  </div>
</template>

<script>

export default {
  name: "ListViewer",
  data() {
    let lists = this.$store.state.lists;
    let listCount = this.$store.getters.listCount;
    return {
      lists,
      listCount
    }
  },
  methods: {
    deleteList(id) {
      this.$store.commit("deleteList", id);
    }
  }
}
</script>

<style scoped>

</style>