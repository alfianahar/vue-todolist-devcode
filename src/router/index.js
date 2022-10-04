import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                title: "Home"
            }
        },
        {
            path: "/detail/:id",
            name: "detail",
            component: DetailView,
            meta: {
                title: "Detail"
            }
        },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | The Local Weather `;
    next();
})

export default router;