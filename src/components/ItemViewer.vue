<template>
  <b-container>
    <b-row class="pt-10">
      <b-col>
        <b-list-group>
          <b-list-group-item v-for="item of items" :key="item.id">
            {{item.name}}
          </b-list-group-item>
          <b-list-group-item>
            <b-input-group>
              <b-form-input v-model="newItem" :disabled="!editable"></b-form-input>
              <b-input-group-append>
                <b-button @click="addItem" :disabled="!editable"><b-icon-plus></b-icon-plus></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {uuid} from "vue-uuid";

export default {
  name: "ItemViewer",
  props: ["id", "listItems", "editable"],
  data() {
    let listId = this.id;
    let listDetails = this.$store.getters.getListById(listId);
    return {
      items: listDetails?.items ?? this.listItems,
      newItem: ""
    }
  },
  methods: {
    addItem() {
      this.$store.commit("addItemToList", {
        id: this.id,
        item: {
          id: uuid.v4(),
          name: this.newItem
        }
      })
      this.newItem = "";
    }
  }
}
</script>

<style scoped>

</style>