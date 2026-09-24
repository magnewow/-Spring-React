<template>
  <div class="container-md mt-3">
    <div class="col-md-5">
      <h4 class="mx-auto mt-4">Регистрация пользователя</h4>
      <form name="form" @submit="handleRegister">
        <div v-if="!successful">
          <div class="form-group mt-2">
            <input type="text" class="form-control" name="username" placeholder="Логин" v-model="user.username" required/>
          </div>
          <div class="form-group mt-2">
            <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password" required/>
          </div>
          <div class="form-group mt-2">
            <select class="form-control" name="role" v-model="user.role" required>
              <option value="">Выберите роль</option>
              <option value="ROLE_USER">Пользователь</option>
              <option value="ROLE_ADMIN">Администратор</option>
            </select>
          </div>
          <div class="form-group mt-2">
            <button class="btn btn-success">Зарегистрировать</button>
          </div>
        </div>
        <div class="form-group mt-2">
          <div v-if="successMessage" class="alert alert-success" role="alert">{{successMessage}}</div>
        </div>
        <div class="form-group  mt-2">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{errorMessage}}</div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      user: {
        username: "",
        password: "",
        role: ""
      },
      successful: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      // Авторизация прошла успешно, переходим к главной странице.
      // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
      window.location.href = '/';
    }
  },
  methods: {
    handleRegister(e) {
      e.preventDefault();
      this.successMessage = '';
      this.errorMessage = '';
      this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
          .then(data => {
            this.successMessage = data.message;
            this.successful = true;
          })
          .catch(e => {
            this.errorMessage = e.response.data.message;
          });
    }
  }
};
</script>