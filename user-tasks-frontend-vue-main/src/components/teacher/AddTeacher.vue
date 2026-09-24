<template>
    <div>
        <h4>Добавление преподавателя</h4>
        <div v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addDiscipline определён в script-->
            <form @submit="addTeacher">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <input type="text" class="form-control" name="name" id="name" placeholder="ФИО" required v-model="teacher.name">
                <input class="btn btn-outline-primary" type="submit" value="Добавить" >
            </form>
        </div>
        <div v-else>
            <h4>Вы успешно добавили запись</h4>
            <div>
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить новую учебную дисциплину"
                Обработчик newDiscipline определён в script-->
                <button class="btn btn-primary" v-on:click="newTeacher">Добавить нового преподавателя</button>
            </div>
            <div>
                <router-link to="/listTeachers">Вернуться к списку преподавателей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddTeacher",
        data() {
            return {
                teacher: {
                    id: null,
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addTeacher(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.teacher.name
                };
                // Либо var data = this.user;
                http
                    .post("/addTeacher", data)
                    .then(response => { // запрос выполнился успешно
                        this.teacher.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newTeacher() {
                this.submitted = false;
                this.teacher = {
                    id: null,
                    name: ""
                };
            }
        }
    }
</script>