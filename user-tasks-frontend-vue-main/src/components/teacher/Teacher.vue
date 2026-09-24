<template>
    <div v-if="this.teacher">
        <h4>Преподаватель</h4>
        <div v-if="!submitted">
            <form @submit="updateTeacher">
                <input type="text" class="form-control" name="name" id="name" placeholder="ФИО" required v-model="teacher.name">
                <input class="btn btn-primary" type="submit" value="Обновить">
            </form>
            <button class="btn btn-secondary" v-on:click="deleteTeacher()">Удалить</button>
        </div>
        <div v-else>
            <h4>Вы успешно обновили запись</h4>
            <router-link to="/listTeachers">Вернуться к списку преподавателей</router-link>
        </div>
    </div>
    <div v-else>
        <br>
        <p>Выберите преподавателя</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "teacher-details",
        props: ['id'],
        data() {
            return {
                teacher: null,
                submitted: false
            };
        },
        methods: {
            getTeacher() {
                http
                    .get("/teacher/" + this.id) // обращаемся к серверу для получения данных учебной дисциплины, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.teacher = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateTeacher(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.teacher.name
                };

                http
                    .post("/updateTeacher/" + this.teacher.id, data)
                    .then(() => { // при успешном обновлении можно добавить, например, вывод уведомления
                        // this.$router.push('/listDisciplines'); // переходим к списку учебных дисциплин
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteTeacher() {
                http
                    .post("/deleteTeacher" + this.teacher.id)
                    .then(() => {
                        // переходим к списку учебных дисциплин (переход по ссылкам программно)
                        this.$router.push('/listTeachers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные учебной дисциплины
            this.getTeacher();
        }
    }
</script>