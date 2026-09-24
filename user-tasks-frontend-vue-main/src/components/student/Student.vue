<template>
    <div v-if="student">
        <h4>Данные студента</h4>
        <form @submit="updateStudent">
            <div>
                <input type="text" class="form-control" name="name" id="name" placeholder="ФИО" required v-model="student.name">
            </div>
            <div>
                <select class="form-select" required v-model="student.student_group_id">
                    <option value="" disabled selected>Выберите студенческую группу</option>
                    <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
                        {{studentGroup.name}}
                    </option>
                </select>
            </div>
            <div>
                <input class="btn btn-primary" type="submit" value="Обновить">
            </div>
            <div>
                <button class="btn btn-secondary" v-on:click="deleteStudent()">Удалить</button>
            </div>
        </form>
    </div>
    <div v-else>
        <br>
        <p>Выберите студента</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "StudentDetails",
        props: ['id'],
        data() {
            return {
                student: null,
                studentGroups: []
            };
        },
        methods: {
            getStudent() {
                http
                    .get("/student/"+ this.id)
                    .then(response => {
                        this.student = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            getStudentGroups() { // получаем список студенческих групп для выпадающего списка
                http
                    .get("/listStudentGroups")
                    .then(response => {
                        this.studentGroups = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateStudent(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.student.name,
                    student_group_id: this.student.student_group_id
                };
                http
                    .post("/updateStudent/" + this.student.id, data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listStudents'); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });
            },
            deleteStudent() {
                http
                    .post("/deleteStudent/" + this.student.id)
                    .then(() => {
                        this.$router.push('/listStudents'); // переходим к списку студентов
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getStudent(); // подгрузка данных студента
            this.getStudentGroups();
        }
    }
</script>