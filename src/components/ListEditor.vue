<template>
  <b-row align-h="start">
    <b-col cols="12">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
            id="list-name-group"
        >
          <b-input-group>
            <b-form-input
                id="list-name"
                v-model="name"
                :disabled="!editList"
                size="lg"
            />
            <b-input-group-append>
              <b-button v-if="!editList && !newList" @click="editName"><b-icon-pen></b-icon-pen></b-button>
              <b-button v-if="editList && !newList" @click="saveName"><b-icon-check></b-icon-check></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group
            id="item-list-group"
            label="Items"
            v-if="!newList"
        >
          <item-viewer :id="id" :list-items="items" :editable="!newList"></item-viewer>
        </b-form-group>
        <b-button v-if="newList" type="submit" variant="primary">Create</b-button>
        <b-button v-if="newList" type="reset" variant="danger">Cancel</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import ItemViewer from "@/components/ItemViewer";

export default {
  name: "ListEditor",
  components: {
    ItemViewer
  },
  props: {
    "id": String
  },
  data() {
    let listDetails = this.$store.getters.getListById(this.id);
    let editList = false;
    let newList = false
    if(!listDetails){
      listDetails = {
        name:"",
        items: []
      }
      editList = true;
      newList = true;
    }
    return {
      name: listDetails.name,
      items: listDetails.items,
      editList,
      newList
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.commit("addList", {
        id: this.id,
        name: this.name,
        items: this.items
      });
      this.newList = false;
      this.editList = false;
      // this.$router.push({path:'/lists'})
    },
    onReset(){
      this.$router.push({path:'/lists'})
    },
    editName() {
      this.$data.editList = true;
    },
    saveName() {
      this.$data.editList = false;
      this.$store.commit("updateListName", {
        id: this.id,
        name: this.name
      })
    }
  }
}
</script>

<style scoped>

</style>