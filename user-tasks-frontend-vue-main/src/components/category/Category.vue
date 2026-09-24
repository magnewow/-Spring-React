<template>
    <div v-if="category" class="container-md">
      <div class="row">
        <div class="col-sm-4">
          <br>
          <h4>Категория</h4>
          <form @submit="updateCategory">
              <div>
                  <input type="text" name="name" id="name" class="form-control" placeholder="Наименование категории" required v-model="category.name">
              </div>
              <br>
              <div class="btn-group">
                <button type="submit" class="btn btn-success rounded">Обновить</button>
                <button class="btn btn-danger mx-1 rounded"  v-on:click="deleteCategory()">Удалить</button>
              </div>
          </form>
      </div>
      </div>
    </div>
    <div v-else class="px-4">
      <br>
      <p>Выберите категорию</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "category-details",
        props: ['id'],
        data() {
            return {
                category: null
            };
        },
        methods: {
            getCategory() {
                http
                    .get("/category/"+ this.id)
                    .then(response => {
                        this.category = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.category.name,
                };
                http
                    .post("/updateCategory/" + this.category.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listCategories'); // переходим к списку категорий
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            deleteCategory() {
                http
                    .post("/deleteCategory/" + this.category.id)
                    .then(() => {
                        this.$router.push('/listCategories'); // переходим к списку категорий
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные категории
            this.getCategory();
        }
    }
</script>