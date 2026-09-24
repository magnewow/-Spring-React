<template>
  <div class="container-md mt-3">
    <div v-if="displayContent" class="col-sm-4 mt-2">
      <router-link to="/addTask" class="btn btn-success">Добавить задачу</router-link>
      <div class="list-group mt-2">
        <div v-for="(task, index) in tasks" :key="task.id" class="list-group-item">
          <router-link :to="{ name: 'task-details', params: { id: task.id } }">
            {{ index + 1 }}. {{ task.title }} ({{ task.description }})
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      Контент доступен только авторизованным пользователям
    </div>
  </div>
</template>

<script>
import http from '../../http-common';

export default {
  data() {
    return {
      tasks: [],
      displayContent: false
    };
  },
  computed: { // вычисляемые свойства
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getUserTasks() {
      http.get(`/tasks/userId=${this.currentUser.id}`)
          .then(response => {
            this.tasks = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  mounted() {
    this.getUserTasks();
    this.displayContent = this.currentUser !== null ? true : false;
  }
};
</script>

<style>
/* Add your component's styles here */
</style>
