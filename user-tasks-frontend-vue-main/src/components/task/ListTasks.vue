<template>
  <div class="container-md mt-3">
    <div class="row">
      <div class="col-sm-4 mt-2">
        <div class="list-group">
          <div
            v-for="(task, index) in tasks"
            :key="task.id"
            class="list-group-item"
          >
            <div class="task-header" @click="toggleTask(task.id)">
              {{ index + 1 }}. {{ task.title }} ({{ task.description }})
            </div>
            <div v-if="activeTaskId === task.id">
              <TaskComments
                :task-id="task.id"
                :current-user-id="currentUserId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
import TaskComments from "./TaskComments.vue";

export default {
  name: "ListTasks",
  components: {
    TaskComments,
  },
  data() {
    return {
      tasks: [],
      activeTaskId: null,
      currentUserId: null,
    };
  },
  methods: {
    listTasks() {
      http.get("/tasks")
          .then(response => {
            this.tasks = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    toggleTask(taskId) {
      this.activeTaskId = this.activeTaskId === taskId ? null : taskId;
    },
    loadCurrentUser() {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        this.currentUserId = user.id;
      }
    },
  },
  mounted() {
    this.listTasks();
    this.loadCurrentUser();
  },
};
</script>

<style scoped>
.task-header {
  cursor: pointer;
}
</style>