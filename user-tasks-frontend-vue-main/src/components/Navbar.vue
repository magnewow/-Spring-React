<template>
  <nav class="navbar navbar-project navbar-expand-lg navbar-light" style="background: #72beda;">
    <div class="ms-3">
      <router-link v-if="currentUser" class="navbar-brand" to="/myTasks">Мои задачи</router-link>
      <router-link v-else class="navbar-brand" to="/listTasks">Все задачи</router-link>
    </div>
    <div class="ms-3">
      <router-link class="navbar-brand" to="/listCategories">Категории</router-link>
    </div>
    <div class="ml-auto">
      <template v-if="currentUser">
        <router-link class="navbar-brand btn" to="/profile">{{ currentUser.username }}</router-link>
        <button class="navbar-brand btn" @click="logOut">Выйти</button>
      </template>
      <template v-else>
        <router-link to="/register" class="nav-link navbar-brand btn navbar-brand-button">Регистрация</router-link>
        <router-link to="/login" class="nav-link navbar-brand btn navbar-brand-button">Вход в систему</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
  </script>
  
  <style>
    .ml-auto{
      margin-left: auto;
    }
    .navbar-brand{
      font-size: 12pt !important;
    }
    .navbar-brand-button{
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  </style>