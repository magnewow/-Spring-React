<template>
  <div class="container">
    <header>
      <h3>
        Профиль <strong>{{currentUser.username}}</strong>
      </h3>
    </header>
    <p>
      <strong>Токен JWT:</strong>
      <!--вообще токен нельзя выводить на веб-странице, но для ознакомления он будет отображён на странице профиля пользователя-->
      {{currentUser.token}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Логин:</strong>
      {{currentUser.username}}
    </p>
  </div>
</template>
<script>
export default {
  name: 'ProfileUser',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>