<template>
    <div>
        <h4>Добавление студента</h4>
        <form @submit="addStudent">
            <div>
                <input type="text" class="form-control" name="name" id="name" placeholder="ФИО" required v-model="student.name">
            </div>
            <div>
                <select class="form-select" aria-label="Default select example" required v-model="student.student_group_id">
                    <option value="" disabled selected>Выберите студенческую группу</option>
                    <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
                        {{studentGroup.name}}
                    </option>
                </select>
            </div>
            <div>
                <input class="btn btn-outline-primary" type="submit" value="Добавить">
            </div>
        </form>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddStudent",
        data() {
            return {
                student: {
                    name: "",
                    student_group_id: null
                },
                studentGroups: []
            };
        },
        methods: {
            addStudent(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.student.name,
                    student_group_id: this.student.student_group_id
                };
                http
                    .post("/addStudent", data)
                    .then(() => { // запрос выполнился успешно
                        this.$router.push('/listStudents'); // переходим к списку студентов
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
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
            }
        },
        mounted(){ // при монтировании компонента подгружаем список групп
            this.getStudentGroups();
        }
    }
</script>