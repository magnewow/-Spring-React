<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-sm-4">
        <form @submit="addCategory" class="row g-2">
          <div>
            <input type="text" name="name" id="name" class="form-control" placeholder="Наименование категории" required v-model="category.name">
          </div>
          <div>
            <input type="submit" class="btn btn-success" value="Добавить">
          </div>
        </form>
      </div>
    </div>
  </div>
    <div class="px-4">
        <br>

    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddCategory",
        data() {
            return {
                category: {
                    name: ""
                }
            };
        },
        methods: {
            addCategory(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.category.name
                };
                http
                    .post("/addCategory", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listCategories'); // переходим к списку категорий
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            }
        }
    }
</script>