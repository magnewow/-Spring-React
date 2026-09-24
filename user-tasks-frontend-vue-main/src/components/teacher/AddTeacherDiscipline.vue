<template>
    <div class="col-sm-6">
      <h4>Назначение преподавателю учебной дисциплины</h4>
      <form @submit="addTeacherDiscipline">
        <div class="form-group mb-3">
          <select required v-model="teacher_discipline.teacher_id" @change="teacherChange" class="form-select">
            <option value="" disabled selected>Выберите преподавателя</option>
            <option v-for="teacher in teachers" v-bind:key="teacher.id" v-bind:value="teacher.id">
              {{teacher.name}}
            </option>
          </select>
        </div>
        <div class="form-group mb-3">
          <select required v-model="teacher_discipline.discipline_id" class="form-select">
            <option value="" disabled selected>Выберите учебную дисциплину</option>
            <option v-for="discipline in disciplines" v-bind:key="discipline.id" v-bind:value="discipline.id">
              {{discipline.name}}
            </option>
          </select>
        </div>
        <div>
          <input type="submit" value="Добавить" class="btn btn-success">
        </div>
      </form>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
    export default {
      name: "AddTeacherDiscipline",
      data() {
        return {
          teacher_discipline: {
            teacher_id: null,
            discipline_id: null
          },
          teachers: [],
          disciplines: []
        };
      },
      methods: {
        getTeachers() {
          http
              .get("/listTeachers")
              .then(response => {
                this.teachers = response.data;
              })
              .catch(e => {
                console.log(e);
              });
        },
        getDisciplinesNotTeacher() {
          http
              .get("/disciplinesNotTeacher/teacherId=" + this.teacher_discipline.teacher_id)
              .then(response => {
                this.disciplines = response.data;
              })
              .catch(e => {
                console.log(e);
              });
        },
        teacherChange() {
          this.getDisciplinesNotTeacher();
        },
        addTeacherDiscipline(e) {
          e.preventDefault();
          var data = this.teacher_discipline;
          http
              .post("/addTeacherDiscipline", data)
              .then(() => {
                this.$router.push('/listTeacherDiscipline');
              })
              .catch(e => {
                console.log(e);
              });
        },
      },
      mounted(){
        this.getTeachers();
      }
    }
  </script>