import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RedirectPage from '../views/RedirectPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/:id',
        name: 'RedirectPage',
        component: RedirectPage,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
