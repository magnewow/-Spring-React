<template>
    <div>
      <h4>Список преподавателей</h4>
      <router-link class="item btn btn-primary btn-md" to="/addTeacher">Добавить преподавателя</router-link>
      <ul class="list-group">
        <!-- Вывод списка учебных дисциплин -->
        <li class="list-group-item list-group-item-action list-group-item-primary" v-for="(teacher, index) in teachers" :key="index">
            <router-link class="btn btn-outline-primary btn-md" :to="{
                                name: 'teacher-details',
                                params: { id: teacher.id }
                }">
            {{teacher.name}}
            </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
  export default {
    name: "ListTeachers", // Имя шаблона
    data() { // данные компонента (определение переменных)
      return {
        teachers: []
      };
    },
    methods: { // методы компонента
      getTeachers() {
        http
            .get("/listTeachers") // обращаемся к серверу для получения списка учебных дисциплин
            .then(response => { // запрос выполнен успешно
              this.teachers = response.data;
            })
            .catch(e => { // запрос выполнен с ошибкой
              console.log(e);
            });
      }
    },
    mounted() { // загружаем данные учебных дисциплин. Обработчик mounted() вызывается после монтирования экземпляра шаблона
      this.getTeachers();
    }
  }
  </script>
  
  <style>
  
  </style>