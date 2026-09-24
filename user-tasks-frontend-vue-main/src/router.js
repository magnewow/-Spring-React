import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";
import store from "./store/index";

import ListCategories from "./components/category/ListCategories";
import AddCategory from "./components/category/AddCategory";
import Category from "./components/category/Category";

import ListTasks from "./components/task/ListTasks";
import AddTask from "./components/task/AddTask";
import TaskData from "./components/task/TaskData";
import UserTasks from "./components/task/UserTasks";

import { createWebHistory, createRouter } from "vue-router";

// определяем маршруты
const routes = [
    {
        path: "/listCategories",
        name: "list-categories",
        component: ListCategories,
        meta: {
            title: "Список категорий"
        }
    },
    {
        path: "/addCategory",
        name: "add-category",
        component: AddCategory,
        meta: {
            title: "Добавление категории"
        }
    },
    {
        path: "/category/:id",
        name: "category-details",
        component: Category,
        props: true,
        meta: {
            title: "Категория"
        }
    },
    {
        path: "/listTasks",
        name: "list-tasks",
        component: ListTasks,
        meta: {
            title: "Список задач"
        }
    },
    {
        path: "/addTask",
        name: "add-task",
        component: AddTask,
        meta: {
            title: "Добавление задачи"
        }
    },
    {
        path: "/task/:id",
        name: "task-details",
        component: TaskData,
        props: true,
        meta: {
            title: "Задача"
        }
    },
    {
        path: "/myTasks",
        name: "my-tasks",
        component: UserTasks,
        meta: {
            title: "Список задач пользователя"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;
