<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col">
        <router-link to="/addCategory" class="btn btn-success mb-3">Добавить категорию</router-link>
      </div>
    </div>
    <div class="col-sm-4 mt-2">
      <div class="list-group">
        <router-link
            v-for="(category, index) in categories"
            :key="index"
            :to="`/category/${category.id}`"
            class="list-group-item"
        >
          {{ category.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  name: "ListCategories",
  data() {
    return {
      categories: []
    };
  },
  methods: {
    listCategories() {
      http
          .get("/categories")
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.listCategories();
  },
};
</script>
