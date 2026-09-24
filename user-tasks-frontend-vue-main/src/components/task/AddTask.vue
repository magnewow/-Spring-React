<template>
  <div class="container-md mt-3">
    <div class="col-sm-5">
      <form @submit="addTask">
        <div class="form-group mb-3">
          <input type="text" v-model="formData.title" placeholder="Заголовок задачи" class="form-control" />
        </div>
        <div class="form-group mb-3">
          <input type="text" v-model="formData.description" placeholder="Описание задачи" class="form-control" />
        </div>
        <div class="form-group mb-3">
          <select v-model="formData.selectedCategory" class="form-control" required>
            <option value="">Выберите категорию</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <input type="file" id="file" @change="handleFileChange" class="form-control" required />
        </div>
        <input type="submit" class="btn btn-success" value="Добавить">
      </form>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  data() {
    return {
      formData: {
        title: "",
        description: "",
        submitted: false,
        file: null,
        selectedCategory: ""
      },
      categories: []
    };
  },
  methods: {
    listCategories() {
      http.get("/categories")
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    handleFileChange(event) {
      this.formData.file = event.target.files[0];
    },
    addTask(e) {
      e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
      const formData = new FormData();
      formData.append("title", this.formData.title);
      formData.append("description", this.formData.description);
      formData.append("user_id", this.$store.state.auth.user.id);
      formData.append("category_id", this.formData.selectedCategory);
      formData.append("file", this.formData.file);

      http
          .post("/addTask", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
          .then(() => {
            this.formData.submitted = true;
            this.$router.push('/myTasks');
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