<template>
    <div class="col-sm-6">
      <h4>Учебные дисциплины преподавателей</h4>
      <router-link to="/addTeacherDiscipline" class="btn btn-success">Добавить новую запись</router-link>
      <table border="1" class="table table-bordered table-striped mt-3">
        <thead class="table-primary">
          <tr>
              <th>№</th>
              <th>Преподаватель</th>
              <th>Дисциплина</th>
              <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(el, index) in teacherDiscipline" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ el.teacher.name }}</td>
            <td>{{ el.discipline.name }}</td>
            <td>
              <button v-on:click="deleteTeacherDiscipline(el.teacher_id, el.discipline_id)" class="btn btn-danger">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    name: "ListTeacherDiscipline",
    data() {
      return {
        teacherDiscipline: []
      };
    },
    methods: {
      getTeacherDiscipline() {
        http
            .get("/listTeacherDiscipline")
            .then(response => {
              this.teacherDiscipline = response.data;
            })
            .catch(e => {
              console.log(e);
            });
      },
      deleteTeacherDiscipline(teacher_id, discipline_id) {
        http
            .post(`/deleteTeacherDiscipline/teacherId=${teacher_id}/disciplineId=${discipline_id}/`)
            .then(() => {
              this.getTeacherDiscipline(); // обновляем список на странице
            })
            .catch(e => {
              console.log(e);
            });
      }
    },
    mounted() {
      this.getTeacherDiscipline();
    }
  }
  </script>
